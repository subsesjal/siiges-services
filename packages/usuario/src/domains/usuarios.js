const { Op } = require('sequelize');

const findAllQuery = (usuarioModel) => async () => {
  const usuarios = await usuarioModel.findAll({
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
    include: [
      {
        association: 'persona',
      },
    ],
  });

  return usuarios;
};

const findOneQuery = (usuarioModel) => async (id) => {
  const usuario = await usuarioModel.findByPk(id, {
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
    include: [
      {
        association: 'persona',
      },
    ],
  });
  return usuario;
};

const findOneDetailedQuery = (usuarioModel) => async (id) => {
  const usuario = await usuarioModel.findByPk(id, {
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
    include: [
      {
        association: 'persona',
        include: [
          {
            association: 'domicilio',
            include: [
              {
                association: 'estado',
              },
              {
                association: 'municipio',
              },
            ],
          },
        ],
      },
    ],
  });
  return usuario;
};

const createQuery = (usuarioModel) => async (data) => {
  let newUsuario;
  if (!data.persona) {
    const persona = {
      nombre: 'SIN DATO',
      apellidoPaterno: 'SIN DATO',
    };
    const newData = { ...data, persona };

    newUsuario = await usuarioModel.create(newData, {
      include: [
        {
          association: 'persona',
          include: ['domicilio'],
        },
      ],
    });
  } else {
    newUsuario = await usuarioModel.create(data, {
      include: [
        {
          association: 'persona',
          include: ['domicilio'],
        },
      ],
    });
  }

  return newUsuario;
};

module.exports = {
  findAllQuery,
  findOneQuery,
  findOneDetailedQuery,
  createQuery,
};
