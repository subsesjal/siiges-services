const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCION_CATEGORIAS_TABLE = 'categorias';

const categoriasSchema = {
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
  instrucccion: {
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

class categorias extends Model {
  static associate(models) {
    this.hasMany(models.inspeccion_categorias, { as: 'categorias', foreignKey: 'categoriasId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_CATEGORIAS_TABLE,
      modelName: 'inspeccion_categorias',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_CATEGORIAS_TABLE, categoriasSchema, categorias };
