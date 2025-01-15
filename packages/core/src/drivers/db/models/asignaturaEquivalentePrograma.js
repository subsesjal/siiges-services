const { Model, DataTypes, Sequelize } = require('sequelize');
const { ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE } = require('./asignaturaAntecedenteEquivalente');
const { ASIGNATURA_TABLE } = require('./asignatura');

const ASIGNATURA_EQUIVALENTE_PROGRAMA_TABLE = 'asignaturas_equivalentes_programa';

const AsignaturaEquivalenteProgramaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  asignaturaAntecedenteEquivalenteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_antecedente_equivalente_id',
    references: {
      model: ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE,
      key: 'id',
    },
  },
  asignaturaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
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

class AsignaturaEquivalentePrograma extends Model {
  static associate(models) {
    this.belongsTo(models.AsignaturaAntecedenteEquivalente, { as: 'asignaturaAntecedenteEquivalente' });
    this.belongsTo(models.Asignatura, { as: 'asignatura' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_EQUIVALENTE_PROGRAMA_TABLE,
      modelName: 'AsignaturaEquivalentePrograma',
      timestamps: false,
    };
  }
}

module.exports = {
  ASIGNATURA_EQUIVALENTE_PROGRAMA_TABLE,
  AsignaturaEquivalenteProgramaSchema,
  AsignaturaEquivalentePrograma,
};
