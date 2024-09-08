const { Model, DataTypes, Sequelize } = require('sequelize');
const { ESTATUS_SOLICITUD_TABLE } = require('./estatusSolicitud');
const { SOLICITUD_TABLE } = require('./solicitud');

const SOLICITUD_ESTADO_SOLICITUD_TABLE = 'solicitudes_estatus_solicitudes';

const SolicitudEstatusSolicitudSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  estatusSolicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_solicitud_id',
    references: {
      model: ESTATUS_SOLICITUD_TABLE,
      key: 'id',
    },
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
  comentario: {
    allowNull: true,
    type: DataTypes.TEXT,
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

class SolicitudEstatusSolicitud extends Model {
  static associate(models) {
    this.belongsTo(models.EstatusSolicitud, { as: 'estatusSolicitud' });
    this.belongsTo(models.Solicitud, { as: 'solicitud' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_ESTADO_SOLICITUD_TABLE,
      modelName: 'SolicitudEstatusSolicitud',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUD_ESTADO_SOLICITUD_TABLE,
  SolicitudEstatusSolicitudSchema,
  SolicitudEstatusSolicitud,
};
