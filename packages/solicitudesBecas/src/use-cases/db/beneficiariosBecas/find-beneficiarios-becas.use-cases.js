const fs = require('fs');
const path = require('path');
const axios = require('axios');
const boom = require('@hapi/boom');
const { JWT } = require('google-auth-library');
const Papa = require('papaparse');
const { Logger } = require('@siiges-services/shared');

const SHEET_EXPORT_URL = 'https://docs.google.com/spreadsheets/d/{spreadsheetId}/export';
const DRIVE_READONLY_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';

const parseBecasCsv = (csvData) => Papa.parse(csvData.replace(/^\uFEFF/, ''), {
  skipEmptyLines: true,
  relaxColumnCount: true,
});

const buildSheetExportUrl = () => {
  const { BENEFICIARIOS_SHEET_ID: spreadsheetId, BENEFICIARIOS_SHEET_GID: gid } = process.env;

  if (!spreadsheetId) {
    throw boom.badGateway('[beneficiariosBecas]: BENEFICIARIOS_SHEET_ID is not defined');
  }

  return `${SHEET_EXPORT_URL.replace('{spreadsheetId}', spreadsheetId)}?format=csv${gid ? `&gid=${gid}` : ''}`;
};

let sheetsClient;

const getSheetsClient = () => {
  if (!sheetsClient) {
    sheetsClient = new JWT({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
      scopes: [DRIVE_READONLY_SCOPE],
    });
  }

  return sheetsClient;
};

const getBecasCsvFromSheets = async () => {
  await getSheetsClient().authorize();

  const { token } = await getSheetsClient().getAccessToken();

  const { data } = await axios.get(buildSheetExportUrl(), {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'text',
    timeout: 20000,
  });

  if (!data || typeof data !== 'string' || !data.trim()) {
    throw boom.badGateway('[beneficiariosBecas]: sheets export returned an empty response');
  }

  if (/^\s*</.test(data)) {
    throw boom.badGateway('[beneficiariosBecas]: sheets export returned a non-csv response');
  }

  return data;
};

const getBecasCsvFromLocalFile = (csvPath) => fs.readFileSync(csvPath, 'utf8');

const buildBecasPayload = (csvData) => {
  const { data: records } = parseBecasCsv(csvData);

  if (!records.length || !records[0].length) {
    throw boom.badGateway('[beneficiariosBecas]: invalid csv content, no headers found');
  }

  const [headers, ...rows] = records;

  const data = rows
    .filter((record) => record.some((cell) => cell !== '' && cell !== undefined && cell !== null))
    .map((record, index) => {
      const beneficiario = headers.reduce((acc, header, i) => {
        acc[header] = record[i];
        return acc;
      }, {});

      return { id: index + 1, ...beneficiario };
    });

  return { data, headers };
};

const findBeneficiariosBecas = (findOneUsuarioBeneficiarioBecaQuery) => async ({ correo }) => {
  const usuario = await findOneUsuarioBeneficiarioBecaQuery({ correo });

  if (!usuario) {
    return { data: [], headers: [] };
  }

  const csvPath = path.join(
    process.env.PATH_FILE || 'C:/files',
    'beneficiarios',
    'beneficiarios.csv',
  );

  const readLocalFile = () => {
    if (!fs.existsSync(csvPath)) {
      throw boom.badGateway(
        `[beneficiariosBecas]: sheets export failed and no fallback file at: ${csvPath}`,
      );
    }

    return getBecasCsvFromLocalFile(csvPath);
  };

  try {
    return buildBecasPayload(await getBecasCsvFromSheets());
  } catch (error) {
    Logger.warn('[beneficiariosBecas]: sheets export failed, falling back to local CSV', { error });
    return buildBecasPayload(readLocalFile());
  }
};

module.exports = findBeneficiariosBecas;
