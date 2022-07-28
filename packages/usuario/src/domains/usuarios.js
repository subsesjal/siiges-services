const { Op } = require('sequelize');
const boom = require('@hapi/boom');

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

const updateQuery = (usuarioModel, personaModel) => async (id, changes) => {
  const usuario = await usuarioModel.findByPk(id, {
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  if (!usuario) {
    throw boom.notFound(
      `[usuarios:finOne]: Usuario no encontrado con id: ${id}`,
    );
  }

  const persona = await personaModel.findByPk(usuario.personaId, {
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  const updatedAt = new Date().toISOString();

  const usuarioChanges = { ...changes, updatedAt };
  const personaChanges = { ...changes.persona, updatedAt };

  const usuarioUpdated = await usuario.update(usuarioChanges);
  const personaUpdated = await persona.update(personaChanges);
  usuarioUpdated.dataValues.persona = personaUpdated;

  return usuarioUpdated;
};

const deleteQuery = (usuarioModel, personaModel) => async (id) => {
  const usuario = await usuarioModel.findByPk(id, {
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  if (!usuario) {
    throw boom.notFound(
      `[usuarios:finOne]: Usuario no encontrado con id: ${id}`,
    );
  }

  const persona = await personaModel.findByPk(usuario.personaId, {
    where: {
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  const deletedAt = new Date().toISOString();

  const usuarioDeleted = await usuario.update({ deletedAt });
  const personaDeleted = await persona.update({ deletedAt });
  usuarioDeleted.dataValues.persona = personaDeleted;

  return usuarioDeleted;
};

module.exports = {
  findAllQuery,
  findOneQuery,
  findOneDetailedQuery,
  createQuery,
  updateQuery,
  deleteQuery,
};
