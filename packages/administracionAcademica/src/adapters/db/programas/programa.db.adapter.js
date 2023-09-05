const { models, queries } = require('@siiges-services/core');
const { Op } = require('sequelize');

const {
  findAllQuery,
} = queries;

const {
  Programa,
} = models;

const include = [{
  association: 'plantel',
  include: [
    { association: 'institucion' },
    { association: 'domicilio' },
  ],
}];

const where = {
  acuerdoRvoe: { [Op.not]: null },
  fechaSurteEfecto: { [Op.gt]: new Date() },
};

module.exports = {
  findAllProgramaQuery: findAllQuery(Programa),
  findPlantelProgramasQuery: findAllQuery(Programa),
  includeProgramasQuery: include,
  whereProgramasQuery: where,
};
