const { DataTypes, Model, Sequelize } = require('sequelize');
const { DIRECTOR_TABLE } = require('./director');
const { FORMACION_TABLE } = require('./formacion');

const FORMACION_DIRECTOR_TABLE = 'formaciones_directores';
const FormacionDirectorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  directorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'director_id',
    references: {
      model: DIRECTOR_TABLE,
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

class FormacionDirector extends Model {
  static associate(models) {
    this.belongsTo(models.Formacion, { as: 'formacion' });
    this.belongsTo(models.Director, { as: 'director' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORMACION_DIRECTOR_TABLE,
      modelName: 'FormacionDirector',
      timestamps: false,
    };
  }
}

module.exports = { FORMACION_DIRECTOR_TABLE, FormacionDirectorSchema, FormacionDirector };
