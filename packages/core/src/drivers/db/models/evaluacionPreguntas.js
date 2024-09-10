const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIA_EVALUACION_PREGUNTA_TABLE } = require('./categoriasEvaluacionPregunta');
const { EVALUACION_APARTADO_TABLE } = require('./evaluacionApartados');
const { MODALIDAD_TABLE } = require('./modalidad');
const { ESCALA_TABLE } = require('./escalas');

const EVALUACION_PREGUNTA_TABLE = 'evaluacion_preguntas';

const EvaluacionPreguntaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  categoriaEvaluacionPreguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'categoria_evaluacion_pregunta_id',
    references: {
      model: CATEGORIA_EVALUACION_PREGUNTA_TABLE,
      key: 'id',
    },
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
  modalidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'modalidad_id',
    references: {
      model: MODALIDAD_TABLE,
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
  nombre: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  item: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  evidencia: {
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

class EvaluacionPregunta extends Model {
  static associate(models) {
    this.belongsTo(models.CategoriaEvaluacionPregunta, { as: 'categoriaEvaluacionPregunta' });
    this.belongsTo(models.EvaluacionApartado, { as: 'evaluacionApartado' });
    this.belongsTo(models.Modalidad, { as: 'modalidad' });
    this.belongsTo(models.Escala, { as: 'escala' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVALUACION_PREGUNTA_TABLE,
      modelName: 'EvaluacionPregunta',
      timestamps: false,
    };
  }
}

module.exports = { EVALUACION_PREGUNTA_TABLE, EvaluacionPreguntaSchema, EvaluacionPregunta };
