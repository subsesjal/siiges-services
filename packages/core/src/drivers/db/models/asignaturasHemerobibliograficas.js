const { Model, DataTypes, Sequelize } = require('sequelize');
const { ASIGNATURA_TABLE } = require('./asignatura');
const { HEMEROBIBLIOGRAFICA_TABLE } = require('./hemerobibliograficas');

const ASIGNATURA_HEMEROBIBLIOGRAFICA_TABLE = 'asignaturas_hemerobibliograficas';

const AsignaturaHemerobibliograficaSchema = {
  asignaturaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
      key: 'id',
    },
    primaryKey: true,
  },
  hemerobibliograficaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'hemerobibliografica_id',
    references: {
      model: HEMEROBIBLIOGRAFICA_TABLE,
      key: 'id',
    },
    primaryKey: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class AsignaturaHemerobibliografica extends Model {
  static associate(models) {
    this.belongsTo(models.Asignatura, { as: 'asignatura' });
    this.belongsTo(models.Hemerobibliografica, { as: 'hemerobibliografica' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_HEMEROBIBLIOGRAFICA_TABLE,
      modelName: 'AsignaturaHemerobibliografica',
      timestamps: false,
    };
  }
}

module.exports = {
  ASIGNATURA_HEMEROBIBLIOGRAFICA_TABLE,
  AsignaturaHemerobibliograficaSchema,
  AsignaturaHemerobibliografica,
};
