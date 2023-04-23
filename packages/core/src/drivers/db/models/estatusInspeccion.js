const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_INSPECCIONES_TABLE = 'estatus_inspecciones';

const EstatusInspeccionSchema = {
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

class estatusInspeccion extends Model {
  static associate(models) {
    this.hasMany(models.estatusInspeccion, { as: 'estatusInspeccion', foreignKey: 'estatusInspeccionId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_INSPECCIONES_TABLE,
      modelName: 'estatusInspeccionSchema',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_INSPECCIONES_TABLE, EstatusInspeccionSchema, estatusInspeccion };
