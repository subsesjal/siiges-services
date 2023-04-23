const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCION_CATEGORIA_TABLE = 'inspeccion_categorias';

const InspeccionCategoriaSchema = {
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

class InspeccionCategoria extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_CATEGORIA_TABLE,
      modelName: 'InspeccionCategoria',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_CATEGORIA_TABLE, InspeccionCategoriaSchema, InspeccionCategoria };
