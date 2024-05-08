const { Model, DataTypes, Sequelize } = require('sequelize');

const GRADO_ACADEMICO_TABLE = 'grado_academico';

const GradoAcademicoSchema = {
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

class GradoAcademico extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GRADO_ACADEMICO_TABLE,
      modelName: 'GradoAcademico',
      timestamps: false,
    };
  }
}

module.exports = { GRADO_ACADEMICO_TABLE, GradoAcademicoSchema, GradoAcademico };
