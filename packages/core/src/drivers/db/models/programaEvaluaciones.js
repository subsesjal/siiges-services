const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { CUMPLIMIENTO_TABLE } = require('./cumplimiento');
const { EVALUADOR_TABLE } = require('./evaluador');

const PROGRAMA_EVALUACION_TABLE = 'programa_evaluaciones';

const ProgramaEvaluacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  cumplimientoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cumplimiento_id',
    references: {
      model: CUMPLIMIENTO_TABLE,
      key: 'id',
    },
  },
  evaluadorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'evaluador_id',
    references: {
      model: EVALUADOR_TABLE,
      key: 'id',
    },
  },
  estatus: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fecha: {
    allowNull: true,
    type: DataTypes.DATEONLY,
  },
  cumplimiento: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  valoracion: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  numero: {
    allowNull: true,
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

class ProgramaEvaluacion extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.Cumplimiento, { as: 'cumplimiento' });
    this.belongsTo(models.Evaluador, { as: 'evaluador' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROGRAMA_EVALUACION_TABLE,
      modelName: 'ProgramaEvaluacion',
      timestamps: false,
    };
  }
}

module.exports = { PROGRAMA_EVALUACION_TABLE, ProgramaEvaluacionSchema, ProgramaEvaluacion };
