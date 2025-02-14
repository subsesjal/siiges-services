const { Model, DataTypes, Sequelize } = require('sequelize');

const { SOLICITUD_SERVICIO_SOCIAL_TABLE } = require('./solicitudServicioSocial');
const { ALUMNO_TABLE } = require('./alumno');
const { GRADO_TABLE } = require('./grado');
const { MODALIDAD_SERVICIO_SOCIAL_TABLE } = require('./modalidadServicioSocial');
const { SECTOR_SERVICIO_SOCIAL_TABLE } = require('./sectorServicioSocial');
const { EJE_SERVICIO_SOCIAL_TABLE } = require('./ejeServicioSocial');

const SOLICITUD_SERVICIO_SOCIAL_ALUMNO_TABLE = 'solicitudes_servicio_social_alumnos';

const SolicitudServicioSocialAlumnoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_servicio_social_id',
    references: {
      model: SOLICITUD_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  alumnoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'alumno_id',
    references: {
      model: ALUMNO_TABLE,
      key: 'id',
    },
  },
  gradoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'grado_id',
    references: {
      model: GRADO_TABLE,
      key: 'id',
    },
  },
  modalidadServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'modalidad_servicio_social_id',
    references: {
      model: MODALIDAD_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  sectorServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'sector_servicio_social_id',
    references: {
      model: SECTOR_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  ejesServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'ejes_servicio_social_id',
    references: {
      model: EJE_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  lugarReceptor: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'lugar_receptor',
  },
  fechaInicio: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_inicio',
  },
  fechaTermino: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_termino',
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

class SolicitudServicioSocialAlumno extends Model {
  static associate(models) {
    this.belongsTo(models.SolicitudServicioSocial, { as: 'solicitudServicioSocial' });
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.Grado, { as: 'grado' });
    this.belongsTo(models.ModalidadServicioSocial, { as: 'modalidadServicioSocial' });
    this.belongsTo(models.SectorServicioSocial, { as: 'sectorServicioSocial' });
    this.belongsTo(models.DimensionServicioSocial, { as: 'dimensionServicioSocial' });
    this.belongsTo(models.EjeServicioSocial, { as: 'ejeServicioSocial' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_SERVICIO_SOCIAL_ALUMNO_TABLE,
      modelName: 'SolicitudServicioSocialAlumno',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUD_SERVICIO_SOCIAL_ALUMNO_TABLE,
  SolicitudServicioSocialAlumnoSchema,
  SolicitudServicioSocialAlumno,
};
