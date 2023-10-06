const { Model, DataTypes, Sequelize } = require('sequelize');

const GRADO_TABLE = 'grados';

const GradoSchema = {
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
  numeroGrado: {
    type: DataTypes.INTEGER,
    field: 'numero_grado',
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

class Grado extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GRADO_TABLE,
      modelName: 'Grado',
      timestamps: false,
    };
  }
}

module.exports = { GRADO_TABLE, GradoSchema, Grado };
