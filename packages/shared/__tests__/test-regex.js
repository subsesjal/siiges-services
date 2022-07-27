const rootDirectory = 'siiges-services';

const regexPattern = '[\\w:]?([/\\][\\w-.]+)+[\\/]';
const devFileInRootDirectory = `${rootDirectory}[\\/]development.env`;
const prodFileInRootDirectory = `${rootDirectory}[\\/]production.env`;

const devRegexPath = new RegExp(`${regexPattern}${devFileInRootDirectory}`);
const prodRegexPath = new RegExp(`${regexPattern}${prodFileInRootDirectory}`);

module.exports = {
  devRegexPath,
  prodRegexPath,
};
