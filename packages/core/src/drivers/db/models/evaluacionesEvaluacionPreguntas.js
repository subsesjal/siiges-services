const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_EVALUACION_TABLE } = require('./programaEvaluaciones');
const { EVALUACION_PREGUNTA_TABLE } = require('./evaluacionPreguntas');
const { ESCALA_TABLE } = require('./escalas');

const EVALUACIONES_EVALUACION_PREGUNTA_TABLE = 'evaluaciones_evaluacion_preguntas';

const EvaluacionesEvaluacionPreguntaSchema = {
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
  evaluacionPreguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'evaluacion_pregunta_id',
    references: {
      model: EVALUACION_PREGUNTA_TABLE,
      key: 'id',
    },
  },
  escalaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'escala_id',
    references: {
      model: ESCALA_TABLE,
      key: 'id',
    },
  },
  respuesta: {
    allowNull: false,
    type: DataTypes.STRING(2),
  },
  comentarios: {
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

class EvaluacionesEvaluacionPregunta extends Model {
  static associate(models) {
    this.belongsTo(models.ProgramaEvaluacion, { as: 'programaEvaluacion' });
    this.belongsTo(models.EvaluacionPregunta, { as: 'evaluacionPregunta' });
    this.belongsTo(models.Escala, { as: 'escala' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVALUACIONES_EVALUACION_PREGUNTA_TABLE,
      modelName: 'EvaluacionesEvaluacionPregunta',
      timestamps: false,
    };
  }
}

module.exports = {
  EVALUACIONES_EVALUACION_PREGUNTA_TABLE,
  EvaluacionesEvaluacionPreguntaSchema,
  EvaluacionesEvaluacionPregunta,
};
