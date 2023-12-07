const { Logger, checkers } = require('@siiges-services/shared');

const findOneFile = (findOneQuery) => async (
  identifierObj,
  attributes,
  include,
  getFile = false,
) => {
  Logger.info(`[files:findOne]: Getting file with identifier ${identifierObj}`);

  if (getFile) {
    const file = await findOneQuery(
      { ...identifierObj },
      { attributes, include },
    );
    checkers.throwErrorIfDataIsFalsy(file, 'File', 'FILE');

    return {
      ...file.dataValues,
      url: `${process.env.SWAGGER_HOST}${file.ubicacion}`,
    };
  }
  return findOneQuery(
    { ...identifierObj },
    { attributes, include },
  );
};

module.exports = findOneFile;
