const { Model, DataTypes, Sequelize } = require('sequelize');
const { OFICIO_TABLE } = require('./oficios');

const OFICIO_DETALLE_TABLE = 'oficio_detalles';

const OficioDetalleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  oficioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'oficio_id',
    references: {
      model: OFICIO_TABLE,
      key: 'id',
    },
  },
  propiedad: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  detalle: {
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

class OficioDetalle extends Model {
  static associate(models) {
    this.belongsTo(models.Oficio, { as: 'oficio' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OFICIO_DETALLE_TABLE,
      modelName: 'OficioDetalle',
      timestamps: false,
    };
  }
}

module.exports = { OFICIO_DETALLE_TABLE, OficioDetalleSchema, OficioDetalle };
