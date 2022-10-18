const findOneFileByParams = (findOneQuery) => (identifierObj, attributes, include) => findOneQuery(
  { ...identifierObj },
  { attributes, include },
);

module.exports = findOneFileByParams;
