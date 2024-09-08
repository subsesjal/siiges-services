const { Model, DataTypes, Sequelize } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario');

const BITACORA_TABLE = 'bitacoras';

const BitacoraSchema = {
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
  entidad: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  accion: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lugar: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
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

class Bitacora extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { as: 'usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BITACORA_TABLE,
      modelName: 'Bitacora',
      timestamps: false,
    };
  }
}

module.exports = { BITACORA_TABLE, BitacoraSchema, Bitacora };
