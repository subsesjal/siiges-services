const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_TABLE } = require('./solicitud');

const PAGO_TABLE = 'pagos';

const PagoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_id',
    references: {
      model: SOLICITUD_TABLE,
      key: 'id',
    },
  },
  monto: {
    allowNull: true,
    type: DataTypes.DECIMAL(10, 2),
  },
  concepto: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  cobertura: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  fechaPago: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'fecha_pago',
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

class Pago extends Model {
  static associate(models) {
    this.belongsTo(models.Solicitud, { as: 'solicitud' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAGO_TABLE,
      modelName: 'Pago',
      timestamps: false,
    };
  }
}

module.exports = { PAGO_TABLE, PagoSchema, Pago };
