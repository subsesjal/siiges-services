const { Op } = require('sequelize');
const { createSearchQuery } = require('../src/utils/pagination.utils');

describe('createSearchQuery', () => {
  it('uses the underlying database column names for joined search fields', () => {
    const query = createSearchQuery('juanpere');

    expect(query[Op.or]).toEqual(expect.arrayContaining([
      { '$Usuario.usuario$': { [Op.like]: '%juanpere%' } },
      { '$Usuario.correo$': { [Op.like]: '%juanpere%' } },
      { '$persona.nombre$': { [Op.like]: '%juanpere%' } },
      { '$persona.apellido_paterno$': { [Op.like]: '%juanpere%' } },
      { '$persona.apellido_materno$': { [Op.like]: '%juanpere%' } },
    ]));
  });
});
