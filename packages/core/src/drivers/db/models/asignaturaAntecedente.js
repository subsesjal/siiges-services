const { Model, DataTypes, Sequelize } = require('sequelize');
const { INTERESADO_TABLE } = require('./interesado');

const ASIGNATURA_ANTECEDENTE_TABLE = 'asignaturas_antecedentes';

const AsignaturaAntecedenteSchema = {
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
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  calificacion: {
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

class AsignaturaAntecedente extends Model {
  static associate(models) {
    this.belongsTo(models.Interesado, { as: 'interesado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_ANTECEDENTE_TABLE,
      modelName: 'AsignaturaAntecedente',
      timestamps: false,
    };
  }
}

module.exports = {
  ASIGNATURA_ANTECEDENTE_TABLE,
  AsignaturaAntecedenteSchema,
  AsignaturaAntecedente,
};
