const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCION_TABLE } = require('./inspeccion');
const { INSPECCION_PREGUNTA_TABLE } = require('./inspeccionPregunta');

const INSPECCION_INSPECCION_PREGUNTA_TABLE = 'inspecciones_inspeccion_preguntas';

const InspeccionInspeccionPreguntaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  inspeccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_id',
    references: {
      model: INSPECCION_TABLE,
      key: 'id',
    },
  },
  inspeccionPreguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_pregunta_id',
    references: {
      model: INSPECCION_PREGUNTA_TABLE,
      key: 'id',
    },
  },
  respuesta: {
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

class InspeccionInspeccionPregunta extends Model {
  static associate(models) {
    this.belongsTo(models.Inspeccion, { as: 'inspeccion' });
    this.belongsTo(models.InspeccionPregunta, { as: 'inspeccionPregunta' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_INSPECCION_PREGUNTA_TABLE,
      modelName: 'InspeccionInspeccionPregunta',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCION_INSPECCION_PREGUNTA_TABLE,
  InspeccionInspeccionPreguntaSchema,
  InspeccionInspeccionPregunta,
};
