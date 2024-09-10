const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_EVALUACION_TABLE } = require('./programaEvaluaciones');
const { EVALUACION_APARTADO_TABLE } = require('./evaluacionApartados');

const DICTAMEN_TABLE = 'dictamenes';

const DictamenSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaEvaluacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_evaluacion_id',
    references: {
      model: PROGRAMA_EVALUACION_TABLE,
      key: 'id',
    },
  },
  dictamenIntegral: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'dictamen_integral',
  },
  recomendaciones: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  evaluacionApartadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'evaluacion_apartado_id',
    references: {
      model: EVALUACION_APARTADO_TABLE,
      key: 'id',
    },
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

class Dictamen extends Model {
  static associate(models) {
    this.belongsTo(models.ProgramaEvaluacion, { as: 'programaEvaluacion' });
    this.belongsTo(models.EvaluacionApartado, { as: 'evaluacionApartado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DICTAMEN_TABLE,
      modelName: 'Dictamen',
      timestamps: false,
    };
  }
}

module.exports = { DICTAMEN_TABLE, DictamenSchema, Dictamen };
