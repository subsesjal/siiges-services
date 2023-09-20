const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { CUMPLIMIENTO_TABLE } = require('./cumplimiento');
const { EVALUADOR_TABLE } = require('./evaluador');

const EVALUACION_TABLE = 'evaluaciones';

const EvaluacionSchema = {
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
    field: 'evaluador_Id',
    references: {
      model: EVALUADOR_TABLE,
      key: 'id',
    },
  },
  estatus: {
    type: DataTypes.INTEGER,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  cumplimineto: {
    type: DataTypes.STRING,
  },
  valoracion: {
    type: DataTypes.TEXT,
  },
  numero: {
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

class Evaluacion extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.Cumplimiento, { as: 'cumplimiento' });
    this.belongsTo(models.Evaluador, { as: 'evaluador' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVALUACION_TABLE,
      modelName: 'Evaluacion',
      timestamps: false,
    };
  }
}

module.exports = {
  EVALUACION_TABLE,
  EvaluacionSchema,
  Evaluacion,
};
