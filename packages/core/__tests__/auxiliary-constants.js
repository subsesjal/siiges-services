// Externbal dependencies
const { Op } = require('sequelize');
const { faker } = require('@faker-js/faker');

const nestedInclude = [{
  association: faker.database.column(),
  include: [{
    association: faker.database.column(),
    include: [{ association: faker.database.column() }],
  }],
}];

const nestedIncludeResult = {
  association: expect.any(String),
  where: { deletedAt: { [Op.is]: null } },
  required: expect.any(Boolean),
  include: [{
    association: expect.any(String),
    where: { deletedAt: { [Op.is]: null } },
    required: expect.any(Boolean),
    include: [
      {
        association: expect.any(String),
        where: { deletedAt: { [Op.is]: null } },
        required: expect.any(Boolean),
      },
    ],
  }],
};

const includeList = [
  faker.database.column(),
  faker.database.column(),
  faker.database.column(),
];

const includeListResult = {
  association: expect.any(String),
  where: { deletedAt: { [Op.is]: null } },
  required: expect.any(Boolean),
};

module.exports = {
  nestedInclude,
  nestedIncludeResult,
  includeList,
  includeListResult,
};
