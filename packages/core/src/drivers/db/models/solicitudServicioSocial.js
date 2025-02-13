const { Model, DataTypes, Sequelize } = require('sequelize');
const { CICLO_ESCOLAR_TABLE } = require('./cicloEscolar');
const { DOMICILIO_TABLE } = require('./domicilio');
const { ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE } = require('./estatusSolicitudServicioSocial');

const SOLICITUD_SERVICIO_SOCIAL_TABLE = 'solicitudes_servicio_social';

const SolicitudServicioSocialSchema = {
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
      model: ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE,
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
  folioSolicitud: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    field: 'folio_solicitud',
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

class SolicitudServicioSocial extends Model {
  static associate(models) {
    this.belongsTo(models.EstatusSolicitudesServicioSocial, { as: 'estatusSolicitudServicioSocial' });
    this.belongsTo(models.CicloEscolar, { as: 'cicloEscolar' });
    this.belongsTo(models.Domicilio, { as: 'domicilio' });
    this.hasMany(models.SolicitudServicioSocialAlumno, { as: 'solicitudServicioSocialAlumnos', foreignKey: 'solicitud_servicio_social_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_SERVICIO_SOCIAL_TABLE,
      modelName: 'SolicitudServicioSocial',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUD_SERVICIO_SOCIAL_TABLE,
  SolicitudServicioSocialSchema,
  SolicitudServicioSocial,
};
