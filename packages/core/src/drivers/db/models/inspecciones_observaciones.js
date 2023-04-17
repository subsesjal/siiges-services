const { Model, DataTypes, Sequelize } = require('sequelize');

const { INSPECCIONES_TABLE } = require('./inspecciones');
const { INSPECCION_APARTADOS_TABLE } = require('./inspeccion_apartados');

const INSPECCION_OBSERVACIONES_TABLE = 'observaciones';

const observacionesSchema = {
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
  inspeccion_apartadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_apartadoid',
    references: {
      model: INSPECCION_APARTADOS_TABLE,
      key: 'id',
    },
  },
  comentario: {
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

class observaciones extends Model {
  static associate(models) {
    this.belongsTo(models.inspecciones, { as: 'inspecciones' });
    this.belongsTo(models.inspeccion_apartados, { as: 'inspeccion_apartados' });
    this.hasMany(models.inspeccion_observaciones, { as: 'observaciones', foreignKey: 'observacionesId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_OBSERVACIONES_TABLE,
      modelName: 'inspeccion_observaciones',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_OBSERVACIONES_TABLE, observacionesSchema, observaciones };
