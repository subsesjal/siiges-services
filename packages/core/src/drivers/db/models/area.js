const { Model, DataTypes, Sequelize } = require('sequelize');

const AREA_TABLE = 'areas';

const AreaSchema = {
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

class Area extends Model {
  static associate(models) {
    this.hasOne(models.Asignatura, { as: 'area', foreignKey: 'areaId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AREA_TABLE,
      modelName: 'Area',
      timestamps: false,
    };
  }
}

module.exports = { AREA_TABLE, AreaSchema, Area };
