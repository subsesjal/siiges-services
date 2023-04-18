const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCIONES_CATEGORIAS_TABLE = 'inspeccionesCategorias';

const inspeccionesCategoriasSchema = {
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
  instruccion: {
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

class inspeccionCategorias extends Model {
  static associate(models) {
    this.hasMany(models.inspeccionesCategorias, { as: 'inspeccionesCategorias', foreignKey: 'inspeccionesCategoriasId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_CATEGORIAS_TABLE,
      modelName: 'inspeccionesCategoriasSchema',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCIONES_CATEGORIAS_TABLE,
  inspeccionesCategoriasSchema,
  inspeccionCategorias,
};
