const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIA_EVALUACION_PREGUNTA_TABLE = 'categorias_evaluacion_pregunta';

const CategoriaEvaluacionPreguntaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
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

class CategoriaEvaluacionPregunta extends Model {
  static associate() {
    // Define associations here if needed
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIA_EVALUACION_PREGUNTA_TABLE,
      modelName: 'CategoriaEvaluacionPregunta',
      timestamps: false,
    };
  }
}

module.exports = {
  CATEGORIA_EVALUACION_PREGUNTA_TABLE,
  CategoriaEvaluacionPreguntaSchema,
  CategoriaEvaluacionPregunta,
};
