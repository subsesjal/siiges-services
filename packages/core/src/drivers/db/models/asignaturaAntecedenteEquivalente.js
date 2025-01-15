const { Model, DataTypes, Sequelize } = require('sequelize');
const { INTERESADO_TABLE } = require('./interesado');

const ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE = 'asignaturas_antecedentes_equivalentes';

const AsignaturaAntecedenteEquivalenteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  interesadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'interesado_id',
    references: {
      model: INTERESADO_TABLE,
      key: 'id',
    },
  },
  nombreAsignaturaEquivalente: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  calificacionEquivalente: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nombreAsignaturaAntecedente: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  calificacionAntecedente: {
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

class AsignaturaAntecedenteEquivalente extends Model {
  static associate(models) {
    this.belongsTo(models.Interesado, { as: 'interesado' });
    this.hasOne(models.AsignaturaEquivalentePrograma, { as: 'asignaturaEquivalentePrograma', foreignKey: 'asignaturaAntecedenteEquivalenteId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE,
      modelName: 'AsignaturaAntecedenteEquivalente',
      timestamps: false,
    };
  }
}

module.exports = {
  ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE,
  AsignaturaAntecedenteEquivalenteSchema,
  AsignaturaAntecedenteEquivalente,
};
