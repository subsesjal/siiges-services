const findOneFile = (findOneQuery) => async (identifierObj, attributes, include) => findOneQuery(
  { ...identifierObj },
  { attributes, include },
);

module.exports = findOneFile;
