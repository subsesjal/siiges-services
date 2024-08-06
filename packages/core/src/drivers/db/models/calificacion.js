const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { GRUPO_TABLE } = require('./grupo');
const { ASIGNATURA_TABLE } = require('./asignatura');

const CALIFICACION_TABLE = 'calificaciones';

const CalificacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  grupoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'grupo_id',
    references: {
      model: GRUPO_TABLE,
      key: 'id',
    },
  },
  asignaturaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
      key: 'id',
    },
  },
  calificacion: {
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  fechaExamen: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'fecha_examen',
  },
  tipo: {
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

class Calificacion extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.Grupo, { as: 'grupo' });
    this.belongsTo(models.Asignatura, { as: 'asignatura' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CALIFICACION_TABLE,
      modelName: 'Calificacion',
      timestamps: false,
    };
  }
}

module.exports = { CALIFICACION_TABLE, CalificacionSchema, Calificacion };
