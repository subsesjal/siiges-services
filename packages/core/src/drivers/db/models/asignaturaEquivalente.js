const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_REV_EQUIV_TABLE } = require('./solicitudesRevEquiv');
const { ASIGNATURA_TABLE } = require('./asignatura');

const ASIGNATURA_EQUIVALENTE_TABLE = 'asignaturas_equivalentes';

const AsignaturaEquivalenteSchema = {
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
  asignaturaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
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

class AsignaturaEquivalente extends Model {
  static associate(models) {
    this.belongsTo(models.SolicitudRevEquiv, { as: 'solicitudRevEquiv' });
    this.belongsTo(models.Asignatura, { as: 'asignatura' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_EQUIVALENTE_TABLE,
      modelName: 'AsignaturaEquivalente',
      timestamps: false,
    };
  }
}

module.exports = {
  ASIGNATURA_EQUIVALENTE_TABLE,
  AsignaturaEquivalenteSchema,
  AsignaturaEquivalente,
};
