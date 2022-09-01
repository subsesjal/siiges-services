const { dotenv } = require('@siiges-services/shared');

const mysql = {
  dbAdmin: 'mysql',
  dbHost: dotenv.getEnvironmentVar('DB_HOST_MYSQL'),
  dbPort: dotenv.getEnvironmentVar('DB_PORT_MYSQL'),
  dbUser: dotenv.getEnvironmentVar('DB_USER_MYSQL'),
  dbPassword: dotenv.getEnvironmentVar('DB_PASSWORD_MYSQL'),
  dbName: dotenv.getEnvironmentVar('DB_NAME_MYSQL'),
};

module.exports = {
  mysql,
};
