const { Model, DataTypes, Sequelize } = require('sequelize');
const { EVALUADOR_TABLE } = require('./evaluador');

const EVALUACION_PROCESO_TABLE = 'evaluacion_procesos';

const EvaluacionProcesoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  registro: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  tipoProceso: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_proceso',
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

class EvaluacionProceso extends Model {
  static associate(models) {
    this.belongsTo(models.Evaluador, { as: 'evaluador' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVALUACION_PROCESO_TABLE,
      modelName: 'EvaluacionProceso',
      timestamps: false,
    };
  }
}

module.exports = { EVALUACION_PROCESO_TABLE, EvaluacionProcesoSchema, EvaluacionProceso };
