const { DataTypes, Model, Sequelize } = require('sequelize');
const { NIVEL_TABLE } = require('./nivel');

const FORMACION_TABLE = 'formaciones';
const FormacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nivelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'nivel_id',
    references: {
      model: NIVEL_TABLE,
      key: 'id',
    },
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institucion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  fechaGraduado: {
    type: DataTypes.DATE,
    allowNull: false,
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

class Formacion extends Model {
  static associate(models) {
    this.belongsTo(models.Nivel, { as: 'nivel' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORMACION_TABLE,
      modelName: 'Formacion',
      timestamps: false,
    };
  }
}

module.exports = { FORMACION_TABLE, FormacionSchema, Formacion };
