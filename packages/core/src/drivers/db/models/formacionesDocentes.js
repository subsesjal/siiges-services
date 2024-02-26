const { DataTypes, Model, Sequelize } = require('sequelize');
const { DOCENTE_TABLE } = require('./docente');
const { FORMACION_TABLE } = require('./formacion');

const FORMACION_DOCENTE_TABLE = 'formaciones_docentes';
const FormacionDocenteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  docenteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'docente_id',
    references: {
      model: DOCENTE_TABLE,
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

class FormacionDocente extends Model {
  static associate(models) {
    this.belongsTo(models.Formacion, { as: 'formacion' });
    this.belongsTo(models.Docente, { as: 'docente' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORMACION_DOCENTE_TABLE,
      modelName: 'FormacionDocente',
      timestamps: false,
    };
  }
}

module.exports = { FORMACION_DOCENTE_TABLE, FormacionDocenteSchema, FormacionDocente };
