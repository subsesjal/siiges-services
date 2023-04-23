const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCION_TABLE } = require('./inspeccion');
const { INSPECCION_APARTADO_TABLE } = require('./inspeccionApartado');

const INSPECCION_OBSERVACION_TABLE = 'inspeccion_observaciones';

const InspeccionObservacionSchema = {
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
  inspeccionApartadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_apartado_id',
    references: {
      model: INSPECCION_APARTADO_TABLE,
      key: 'id',
    },
  },
  comentario: {
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

class InspeccionObservacion extends Model {
  static associate(models) {
    this.belongsTo(models.Inspeccion, { as: 'inspeccion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_OBSERVACION_TABLE,
      modelName: 'InspeccionObservacion',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCION_OBSERVACION_TABLE,
  InspeccionObservacionSchema,
  InspeccionObservacion,
};
