const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE = 'estatus_solicitudes_servicio_social';

const EstatusSolicitudServicioSocialSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: true,
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

class EstatusSolicitudServicioSocial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE,
      modelName: 'EstatusSolicitudServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE,
  EstatusSolicitudServicioSocialSchema,
  EstatusSolicitudServicioSocial,
};
