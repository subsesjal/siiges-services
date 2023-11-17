const { Model, DataTypes, Sequelize } = require('sequelize');

const VIGILANCIA_CATEGORIA_TABLE = 'vigilancia_categorias';

const VigilanciaCategoriaSchema = {
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

class VigilanciaCategoria extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANCIA_CATEGORIA_TABLE,
      modelName: 'VigilanciaCategoria',
      timestamps: false,
    };
  }
}

module.exports = { VIGILANCIA_CATEGORIA_TABLE, VigilanciaCategoriaSchema, VigilanciaCategoria };
