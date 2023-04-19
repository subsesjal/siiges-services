const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCIONES_TIPO_PREGUNTAS_TABLE } = require('./inspeccionesTipoPreguntas');
const { INSPECCIONES_APARTADOS_TABLE } = require('./inspeccionApartado');
const { INSPECCIONES_CATEGORIAS_TABLE } = require('./inspeccionCategorias');

const INSPECCION_PREGUNTAS_TABLE = 'inspeccion_preguntas';

const inspeccionPreguntasSchema = {
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
      model: INSPECCIONES_TIPO_PREGUNTAS_TABLE,
      key: 'id',
    },
  },
  inspeccionApartadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_apartado_id',
    references: {
      model: INSPECCIONES_APARTADOS_TABLE,
      key: 'id',
    },
  },
  inspeccionCategoriaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_categoria_id',
    references: {
      model: INSPECCIONES_CATEGORIAS_TABLE,
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

class InspeccionPreguntas extends Model {
  static associate(models) {
    this.belongsTo(models.TipoPreguntas, { as: 'tipoPreguntas' });
    this.belongsTo(models.InspeccionesApartados, { as: 'InspeccionApartado', foreignKey: 'estatusInspeccionesId' });
    this.belongsTo(models.InspeccionesCategorias, { as: 'InspeccionCategorias', foreignKey: 'estatusCategoriasId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_PREGUNTAS_TABLE,
      modelName: 'InspeccionPreguntas',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_PREGUNTAS_TABLE, inspeccionPreguntasSchema, InspeccionPreguntas };
