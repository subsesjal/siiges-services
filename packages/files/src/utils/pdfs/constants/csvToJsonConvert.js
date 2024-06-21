const path = require('path');
const csvToJson = require('convert-csv-to-json');

const nivelesCSV = path.join(__dirname, '../../../../../core/src/drivers/db/CSVFiles/niveles.csv');
const modalidadesCSV = path.join(__dirname, '../../../../../core/src/drivers/db/CSVFiles/modalidades.csv');
const ciclosCSV = path.join(__dirname, '../../../../../core/src/drivers/db/CSVFiles/ciclos.csv');
const turnosCSV = path.join(__dirname, '../../../../../core/src/drivers/db/CSVFiles/turnos.csv');

const csvToJsonConvert = (csvFile) => csvToJson
  .fieldDelimiter(',')
  .getJsonFromCsv(csvFile);

const niveles = csvToJsonConvert(nivelesCSV);
const modalidades = csvToJsonConvert(modalidadesCSV);
const ciclos = csvToJsonConvert(ciclosCSV);
const turnos = csvToJsonConvert(turnosCSV);

module.exports = {
  niveles,
  modalidades,
  ciclos,
  turnos,
};
