const { Model, DataTypes, Sequelize } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario');

const NOTIFICACION_TABLE = 'notificaciones';

const NotificacionSchema = {
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
  asunto: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  template: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'pendiente',
  },
  data: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  sentAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'sent_at',
    defaultValue: null,
  },
  openedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'opened_at',
    defaultValue: null,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class Notificacion extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { as: 'usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTIFICACION_TABLE,
      modelName: 'Notificacion',
      timestamps: false,
    };
  }
}

module.exports = { NOTIFICACION_TABLE, NotificacionSchema, Notificacion };
