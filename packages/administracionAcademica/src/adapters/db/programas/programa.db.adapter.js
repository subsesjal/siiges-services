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
  association: 'solicitud',
  where: { estatusSolicitudId: 11 },
},
{
  association: 'plantel',
  include: [
    { association: 'institucion' },
    { association: 'domicilio' },
  ],
}];

const where = {
  acuerdoRvoe: { [Op.or]: { [Op.ne]: null, [Op.ne]: '' } },
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
