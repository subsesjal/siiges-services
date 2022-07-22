const { Model, DataTypes, Sequelize } = require('sequelize');

const PAIS_TABLE = 'paises';

const PaisSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  pais: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  codigo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
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

class Pais extends Model {
  static associate(models) {
    this.hasOne(models.Estado, {
      as: 'estado',
      foreignKey: 'paisId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAIS_TABLE,
      modelName: 'Pais',
      timestamps: false,
    };
  }
}

module.exports = { PAIS_TABLE, PaisSchema, Pais };
