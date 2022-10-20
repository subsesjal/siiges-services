const { Logger } = require('@siiges-services/shared');

const findOneFile = (findOneQuery) => async (identifierObj, attributes, include) => {
  Logger.info(`[files:findOne]: Getting file with identifier ${identifierObj}`);

  return findOneQuery(
    { ...identifierObj },
    { attributes, include },
  );
};

module.exports = findOneFile;
