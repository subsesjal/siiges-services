const { DataTypes, Model, Sequelize } = require('sequelize');
const { RECTOR_TABLE } = require('./rector');
const { FORMACION_TABLE } = require('./formacion');

const FORMACION_RECTOR_TABLE = 'formaciones_rectores';
const FormacionRectorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  rectorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'rector_id',
    references: {
      model: RECTOR_TABLE,
      key: 'id',
    },
  },
  formacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'formacion_id',
    references: {
      model: FORMACION_TABLE,
      key: 'id',
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

class FormacionRector extends Model {
  static associate(models) {
    this.belongsTo(models.Formacion, { as: 'formacion' });
    this.belongsTo(models.Rector, { as: 'rector' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORMACION_RECTOR_TABLE,
      modelName: 'FormacionRector',
      timestamps: false,
    };
  }
}

module.exports = { FORMACION_RECTOR_TABLE, FormacionRectorSchema, FormacionRector };
