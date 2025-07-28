const { Logger, checkers } = require('@siiges-services/shared');

const findOneFile = (findOneQuery) => async (
  identifierObj,
  attributes,
  include,
  getFile = false,
) => {
  Logger.info(`[files]: Obteniendo archivo con identificador: ${JSON.stringify(identifierObj)}`);

  if (getFile) {
    const file = await findOneQuery(
      { ...identifierObj },
      { attributes, include },
    );
    checkers.throwErrorIfDataIsFalsy(file, 'File', 'FILE');

    return {
      ...file.dataValues,
      url: `${process.env.API_BASE_URL}${file.ubicacion}`,
    };
  }
  return findOneQuery(
    { ...identifierObj },
    { attributes, include },
  );
};

module.exports = findOneFile;
