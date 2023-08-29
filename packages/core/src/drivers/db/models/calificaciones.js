const { Model, DataTypes, Sequelize } = require('sequelize');
const { ASIGNATURA_TABLE } = require('./asignatura');
const CALIFICACIONES_TABLE = "Calificaciones";

const CalificacionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  alumno_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  grupo_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  asignatura_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
      key: 'id',
    },
  },
  estatus_calificacion_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_calificacion_id',
    defaultValue: 0,
  },
  calificacion: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: null,
  },
  fecha_examen: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_examen',
    defaultValue: null,
  },
  tipo:{
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

class Calificaciones extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CALIFICACIONES_TABLE,
      modelName: 'Calificaciones',
      timestamps: false,
    };
  }
}

module.exports = { CALIFICACIONES_TABLE, CalificacionesSchema, Calificaciones};
