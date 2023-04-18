const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCIONES_TABLE } = require('./inspecciones');
const { INSPECCIONES_TIPO_PREGUNTAS_TABLE } = require('./inspeccionesTipoPreguntas');

const INSPECCION_INSPECCIONES_PREGUNTAS_TABLE = 'inspecciones_inspeccion_preguntas';

const inspeccionInspeccionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_id',
    references: {
      model: INSPECCIONES_TABLE,
      key: 'id',
    },
  },
  estatus_inspeccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_pregunta_id',
    references: {
      model: INSPECCIONES_TIPO_PREGUNTAS_TABLE,
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

class inspeccionPregunta extends Model {
  static associate(models) {
    this.belongsTo(models.Inspecciones, { as: 'inspecciones' });
    this.belongsTo(models.Inspecciones_tipo_preguntas, { as: 'inspeccion_pregunta', foreignKey: 'inspeccion_preguntaId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_INSPECCIONES_PREGUNTAS_TABLE,
      modelName: 'inspecciones_tipo_preguntas',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCION_INSPECCIONES_PREGUNTAS_TABLE,
  inspeccionInspeccionesSchema,
  inspeccionPregunta,
};
