const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCION_TIPO_PREGUNTA_TABLE } = require('./inspeccionTipoPregunta');
const { INSPECCION_APARTADO_TABLE } = require('./inspeccionApartado');
const { INSPECCION_CATEGORIA_TABLE } = require('./inspeccionCategoria');

const INSPECCION_PREGUNTA_TABLE = 'inspeccion_preguntas';

const InspeccionPreguntaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  inspeccionTipoPreguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_tipo_pregunta_id',
    references: {
      model: INSPECCION_TIPO_PREGUNTA_TABLE,
      key: 'id',
    },
  },
  inspeccionApartadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_apartado_id',
    references: {
      model: INSPECCION_APARTADO_TABLE,
      key: 'id',
    },
  },
  inspeccionCategoriaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_categoria_id',
    references: {
      model: INSPECCION_CATEGORIA_TABLE,
      key: 'id',
    },
  },
  pregunta: {
    allowNull: false,
    type: DataTypes.STRING,
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

class InspeccionPregunta extends Model {
  static associate(models) {
    this.belongsTo(models.InspeccionTipoPregunta, { as: 'inspeccionTipoPregunta' });
    this.belongsTo(models.InspeccionApartado, { as: 'inspeccionApartado' });
    this.belongsTo(models.InspeccionCategoria, { as: 'inspeccionCategoria' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_PREGUNTA_TABLE,
      modelName: 'InspeccionPregunta',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_PREGUNTA_TABLE, InspeccionPreguntaSchema, InspeccionPregunta };
