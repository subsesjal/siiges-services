const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_PRESUPUESTO_TABLE = 'tipo_presupuestos';

const TipoPresupuestoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
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

class TipoPresupuesto extends Model {
  static associate(models) {
    this.hasMany(models.Presupuesto, { as: 'presupuesto', foreignKey: 'tipoPresupuestoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_PRESUPUESTO_TABLE,
      modelName: 'TipoPresupuesto',
      timespamps: false,
    };
  }
}

module.exports = {
  TIPO_PRESUPUESTO_TABLE,
  TipoPresupuestoSchema,
  TipoPresupuesto,
};
