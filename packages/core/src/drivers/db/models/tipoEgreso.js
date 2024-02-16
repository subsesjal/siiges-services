const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_EGRESO_TABLE = 'tipo_egresos';

const TipoEgresoSchema = {
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

class TipoEgreso extends Model {
  static associate(models) {
    this.hasMany(models.Presupuesto, { as: 'presupuesto', foreignKey: 'tipoEgresoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_EGRESO_TABLE,
      modelName: 'TipoEgreso',
      timespamps: false,
    };
  }
}

module.exports = {
  TIPO_EGRESO_TABLE,
  TipoEgresoSchema,
  TipoEgreso,
};
