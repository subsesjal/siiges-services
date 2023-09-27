const { Model, DataTypes, Sequelize } = require('sequelize');
const { ASIGNATURA_TABLE } = require('./asignatura')

const ASIGNATURAS_HEMEROBIBLIOGRAFICAS_TABLE = 'asignaturas_hemerobibliograficas';

const AsignaturasHemerobibliograficasSchema = {
  asignaturaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
      key: 'id',
    },
  },
  HemerobibliograficaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'hemerobibliografica_id',
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

class AsignaturasHemerobibliograficas extends Model {
  static associate(models) {
    this.belongsTo(models.Asignatura, { as: 'asignatura' });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ASIGNATURAS_HEMEROBIBLIOGRAFICAS_TABLE,
      modelName: 'AsignaturasHemerobibliograficas',
      timestamps: false,
    };
  }
}

module.exports = { ASIGNATURAS_HEMEROBIBLIOGRAFICAS_TABLE, AsignaturasHemerobibliograficasSchema, AsignaturasHemerobibliograficas };
