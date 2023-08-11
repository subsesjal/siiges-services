// eslint-disable-next-line import/no-extraneous-dependencies
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../../packages/core/src/drivers/db/connection');
const Logger = require('../../packages/shared/src/utils/logger/index');

const umzug = new Umzug({
  migrations: { glob: './packages/core/src/drivers/db/seeders/*.js' },
  // seeders: { glob: './packages/core/src/drivers/db/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();
    Logger.silent = true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const downSeed = async () => {
  await sequelize.drop();
};

module.exports = { upSeed, downSeed };
