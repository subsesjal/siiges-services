const fs = require('fs');
const path = require('path');
const axios = require('axios');
const boom = require('@hapi/boom');
const { JWT } = require('google-auth-library');
const csvToJson = require('convert-csv-to-json');
const { checkers, Logger } = require('@siiges-services/shared');

const SHEET_EXPORT_URL = 'https://docs.google.com/spreadsheets/d/{spreadsheetId}/export';
const DRIVE_READONLY_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';

const readHeaders = (csvData) => {
  const [firstLine] = csvData.split(/\r?\n/, 1);

  return firstLine
    .replace(/^\uFEFF/, '')
    .split(',')
    .map((header) => header.trim());
};

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

  return data;
};

const getBecasCsvFromLocalFile = (csvPath) => fs.readFileSync(csvPath, 'utf8');

const findBeneficiariosBecas = (findOneUsuarioBeneficiarioBecaQuery) => async ({ correo }) => {
  const usuario = await findOneUsuarioBeneficiarioBecaQuery({ correo });

  checkers.throwErrorIfDataIsFalsy(usuario, 'usuariosBeneficiariosBecas', correo);

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

  let csvData;

  try {
    csvData = await getBecasCsvFromSheets();
  } catch (error) {
    Logger.warn('[beneficiariosBecas]: sheets export failed, falling back to local CSV', { error });
    csvData = readLocalFile();
  }

  const beneficiarios = csvToJson.fieldDelimiter(',').csvStringToJson(csvData);

  const data = beneficiarios.map((beca, index) => ({ id: index + 1, ...beca }));

  return { data, headers: readHeaders(csvData) };
};

module.exports = findBeneficiariosBecas;
