const { models, queries } = require('@siiges-services/core');
const { Op } = require('sequelize');

const {
  findAllQuery,
  findOneQuery,
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
  fechaSurteEfecto: { [Op.lte]: new Date() },
};

module.exports = {
  findAllProgramasQuery: findAllQuery(Programa),
  findOneProgramaQuery: findOneQuery(Programa),
  findPlantelProgramasQuery: findAllQuery(Programa),
  findInstitucionQuery: findAllQuery(Plantel),
  includeProgramasQuery: include,
  whereProgramasQuery: where,
};
