const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE = 'estatus_solicitudes_servicio_social';

const EstatusSolicitudesServicioSocialSchema = {
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

class EstatusSolicitudesServicioSocial extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE,
      modelName: 'EstatusSolicitudesServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE,
  EstatusSolicitudesServicioSocialSchema,
  EstatusSolicitudesServicioSocial,
};
