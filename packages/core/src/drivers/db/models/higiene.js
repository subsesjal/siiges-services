const { Model, DataTypes, Sequelize } = require('sequelize');

const HIGIENE_TABLE = 'Higiene';

const HigieneSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre',
    references: {
      model: HIGIENE_TABLE,
    },
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'descripcion',
    references: {
      model: HIGIENE_TABLE,
    },
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

class Higiene extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'higiene' });
    this.hasMany(models.Higiene, { as: 'higiene', foreignKey: 'higieneId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HIGIENE_TABLE,
      modelName: 'higiene',
      timestamps: false,
    };
  }
}

module.exports = { HIGIENE_TABLE, HigieneSchema, Higiene };
