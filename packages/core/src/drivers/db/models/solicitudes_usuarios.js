const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_TABLE } = require('./solicitud');
const { USUARIO_TABLE } = require('./usuario');

const SOLICITUD_USUARIO_TABLE = 'solicitudes_usuarios';

const SolicitudUsuarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_id',
    references: {
      model: SOLICITUD_TABLE,
      key: 'id',
    },
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

class SolicitudUsuario extends Model {
  static associate(models) {
    this.belongsTo(models.Solicitud, { as: 'solicitud' });
    this.belongsTo(models.Usuario, { as: 'usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_USUARIO_TABLE,
      modelName: 'SolicitudUsuario',
      timestamps: false,
    };
  }
}

module.exports = { SOLICITUD_USUARIO_TABLE, SolicitudUsuarioSchema, SolicitudUsuario };
