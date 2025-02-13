const { Model, DataTypes, Sequelize } = require('sequelize');
const { CICLO_ESCOLAR_TABLE } = require('./cicloEscolar');
const { DOMICILIO_TABLE } = require('./domicilio');
const { ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE } = require('./estatusSolicitudesServicioSocial');

const SOLICITUDES_SERVICIO_SOCIAL_TABLE = 'solicitudes_servicio_social';

const SolicitudesServicioSocialSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  estatusSolicitudServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_solicitud_servicio_social_id',
    references: {
      model: ESTATUS_SOLICITUDES_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  cicloEscolarId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'ciclo_escolar_id',
    references: {
      model: CICLO_ESCOLAR_TABLE,
      key: 'id',
    },
  },
  domicilioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'domicilio_id',
    references: {
      model: DOMICILIO_TABLE,
      key: 'id',
    },
  },
  folio: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
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

class SolicitudesServicioSocial extends Model {
  static associate(models) {
    this.belongsTo(models.EstatusSolicitudesServicioSocial, { foreignKey: 'estatus_solicitud_servicio_social_id' });
    this.belongsTo(models.CicloEscolar, { foreignKey: 'ciclo_escolar_id' });
    this.belongsTo(models.Domicilio, { foreignKey: 'domicilio_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUDES_SERVICIO_SOCIAL_TABLE,
      modelName: 'SolicitudesServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUDES_SERVICIO_SOCIAL_TABLE,
  SolicitudesServicioSocialSchema,
  SolicitudesServicioSocial,
};
