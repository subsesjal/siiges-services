const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCIONES_TABLE } = require('./inspecciones');
const { INSPECCION_PREGUNTAS_TABLE } = require('./inspeccion_preguntas');

const INSPECCIONES_INSPECCION_PREGUNTA_TABLE = 'inspeccionesInspeccion';

const inspeccionespreSchema = {
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
      model: INSPECCIONES_TABLE,
      key: 'id',
    },
  },
  inspeccion_preguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_preguntaid',
    references: {
      model: INSPECCION_PREGUNTAS_TABLE,
      key: 'id',
    },
  },
  respuesta: {
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
class inspecciones extends Model {
  static associate(models) {
    this.belongsTo(models.inspecciones, { as: 'inspecciones' });
    this.belongsTo(models.inspeccion_preguntas, { as: 'inspeccion_preguntas' });
    this.hasMany(models.inspecciones_inspeccion_preguntas, { as: 'inspecciones', foreignKey: 'inspeccionesId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_INSPECCION_PREGUNTA_TABLE,
      modelName: 'inspecciones_inspeccion_preguntas',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCIONES_INSPECCION_PREGUNTA_TABLE, inspeccionespreSchema, inspecciones };
