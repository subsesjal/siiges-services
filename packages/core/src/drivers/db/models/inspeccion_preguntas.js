const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCION_TIPOS_PREGUNTAS_TABLE } = require('./inspeccion_tipo_preguntas');
const { INSPECCION_APARTADOS_TABLE } = require('./inspeccion_apartados');
const { INSPECCION_CATEGORIAS_TABLE } = require('./inspeccion_categorias');

const INSPECCION_PREGUNTAS_TABLE = 'preguntas';

const preguntasSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  pregunta: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  inspeccion_tipo_preguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_tipo_pregunta_id',
    references: {
      model: INSPECCION_TIPOS_PREGUNTAS_TABLE,
      key: 'id',
    },
  },
  inspeccion_apartadosId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_apartados_id',
    references: {
      model: INSPECCION_APARTADOS_TABLE,
      key: 'id',
    },
  },
  inspeccion_categoriasId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_categorias_id',
    references: {
      model: INSPECCION_CATEGORIAS_TABLE,
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

class preguntas extends Model {
  static associate(models) {
    this.belongsTo(models.inspeccion_tipo_preguntas, { as: 'inspeccion_tipo_preguntas' });
    this.belongsTo(models.inspeccion_apartados, { as: 'inspeccion_apartados' });
    this.belongsTo(models.inspeccion_categorias, { as: 'inspeccion_categorias' });
    this.hasMany(models.inspeccion_preguntas, { as: 'preguntas', foreignKey: 'preguntasId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_PREGUNTAS_TABLE,
      modelName: 'inspeccion_preguntas',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_PREGUNTAS_TABLE, preguntasSchema, preguntas };
