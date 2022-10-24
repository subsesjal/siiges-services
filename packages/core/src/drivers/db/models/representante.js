const { Model, DataTypes } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario');

const REPRESENTANTE_TABLE = 'Representante';

const RepresentanteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  usuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'usuario_id',
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class Representante extends Model {
  static associate(models) {
    this.hasOne(models.Usuario, {
      as: 'usuario',
      foreignKey: 'rolId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REPRESENTANTE_TABLE,
      modelName: 'Representante',
      timestamps: false,
    };
  }
}

module.exports = { REPRESENTANTE_TABLE, RepresentanteSchema, Representante };
