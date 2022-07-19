const { drivers } = require('@siiges-services/core');

const { sequelize } = drivers;
const setupModels = require('./models');

setupModels(sequelize);

module.exports = sequelize;
