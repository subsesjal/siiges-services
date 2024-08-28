const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_REV_EQUIV_TABLE } = require('./solicitudesRevEquiv');

const ASIGNATURA_ANTECEDENTE_TABLE = 'asignaturas_antecedentes';

const AsignaturaAntecedenteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudRevEquivId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_rev_equiv_id',
    references: {
      model: SOLICITUD_REV_EQUIV_TABLE,
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
    this.belongsTo(models.SolicitudRevEquiv, { as: 'solicitudRevEquiv' });
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
