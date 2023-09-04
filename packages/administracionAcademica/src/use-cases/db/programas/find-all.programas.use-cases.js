const { Op } = require('sequelize');

const findAllProgramas = (findAllProgramaQuery) => async () => {
  const where = {
    acuerdoRvoe: { [Op.not]: null },
    fechaSurteEfecto: { [Op.gt]: new Date() },
  };
  const include = [{
    association: 'plantel',
    include: [
      { association: 'institucion' },
      { association: 'domicilio' },
    ],
  }];

  const getAllPrograms = await findAllProgramaQuery(where, { include });

  return getAllPrograms;
};

module.exports = findAllProgramas;
