const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_BECA_TABLE } = require('./solicitudesBecas');
const { ALUMNO_TABLE } = require('./alumno');
const { GRADO_TABLE } = require('./grado');

const SOLICITUD_BECA_ALUMNO_TABLE = 'solicitud_beca_alumno';

const SolicitudBecaAlumnoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudBecaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_beca_id',
    references: {
    model: SOLICITUD_BECA_TABLE,
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
    model: GRADO_TABLE ,
    key: 'id',
    },
  },
  promedio: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'promedio',
  },
  porcentajeBeca: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

class SolicitudBecaAlumno extends Model {
  static associate(models){
    this.belongsTo(models.SolicitudBeca, { as: 'solicitudBeca' });
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.Grado, { as: 'grado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_BECA_ALUMNO_TABLE,
      modelName: 'SolicitudBecaAlumno',
      timestamps: false,
    };
  };
};
module.exports = { SOLICITUD_BECA_ALUMNO_TABLE, SolicitudBecaAlumnoSchema, SolicitudBecaAlumno }
