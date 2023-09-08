const { models, queries } = require('@siiges-services/core');
const { Op } = require('sequelize');

const {
  findAllQuery,
} = queries;

const {
  Programa,
  Plantel,
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
  fechaSurteEfecto: { [Op.lt]: new Date() },
};

module.exports = {
  findAllProgramasQuery: findAllQuery(Programa),
  findPlantelProgramasQuery: findAllQuery(Programa),
  findInstitucionQuery: findAllQuery(Plantel),
  includeProgramasQuery: include,
  whereProgramasQuery: where,
};
