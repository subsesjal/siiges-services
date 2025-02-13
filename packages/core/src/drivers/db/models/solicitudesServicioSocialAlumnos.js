const { Model, DataTypes, Sequelize } = require('sequelize');

const { SOLICITUDES_SERVICIO_SOCIAL } = require('./solicitudesServicioSocial');
const { ALUMNO_TABLE } = require('./alumno');
const { GRADO_TABLE } = require('./grado');
const { MODALIDAD_SERVICIO_SOCIAL_TABLE } = require('./modalidadServicioSocial');
const { SECTORES_SERVICIO_SOCIAL_TABLE } = require('./sectoresServicioSocial');
const { DIMENSIONES_SERVICIO_SOCIAL_TABLE } = require('./dimensionesServicioSocial');
const { EJES_SERVICIO_SOCIAL_TABLE } = require('./ejesServicioSocial');

const SOLICITUDES_SERVICIO_SOCIAL_ALUMNOS_TABLE = 'solicitudes_servicio_social_alumnos';

const SolicitudesServicioSocialAlumnosSchema = {
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
      model: SOLICITUDES_SERVICIO_SOCIAL,
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
      model: SECTORES_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  dimensionesServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'dimensiones_servicio_social_id',
    references: {
      model: DIMENSIONES_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  ejesServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'ejes_servicio_social_id',
    references: {
      model: EJES_SERVICIO_SOCIAL_TABLE,
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

class SolicitudesServicioSocialAlumnos extends Model {
  static associate(models) {
    this.belongsTo(models.SolicitudesServicioSocial, { foreignKey: 'solicitud_servicio_social_id' });
    this.belongsTo(models.Alumno, { foreignKey: 'alumno_id' });
    this.belongsTo(models.Grado, { foreignKey: 'grado_id' });
    this.belongsTo(models.ModalidadServicioSocial, { foreignKey: 'modalidad_servicio_social_id' });
    this.belongsTo(models.SectoresServicioSocial, { foreignKey: 'sector_servicio_social_id' });
    this.belongsTo(models.DimensionesServicioSocial, { foreignKey: 'dimensiones_servicio_social_id' });
    this.belongsTo(models.EjesServicioSocial, { foreignKey: 'ejes_servicio_social_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUDES_SERVICIO_SOCIAL_ALUMNOS_TABLE,
      modelName: 'SolicitudesServicioSocialAlumnos',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUDES_SERVICIO_SOCIAL_ALUMNOS_TABLE,
  SolicitudesServicioSocialAlumnosSchema,
  SolicitudesServicioSocialAlumnos,
};
