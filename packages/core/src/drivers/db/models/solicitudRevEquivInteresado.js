const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_REV_EQUIV_TABLE } = require('./solicitudesRevEquiv');
const { INTERESADO_TABLE } = require('./interesados');

const SOLICITUD_REV_EQUIV_INTERESADO_TABLE = 'solicitudes_rev_equiv_interesados';

const SolicitudRevEquivInteresadoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudesRevEquivId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitudes_rev_equiv_id',
    references: {
      model: SOLICITUD_REV_EQUIV_TABLE,
      key: 'id',
    },
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

class SolicitudRevEquivInteresado extends Model {
  static associate(models) {
    this.belongsTo(models.SolicitudRevEquiv, { as: 'solicitudRevEquiv' });
    this.belongsTo(models.Interesado, { as: 'interesado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_REV_EQUIV_INTERESADO_TABLE,
      modelName: 'SolicitudRevEquivInteresado',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUD_REV_EQUIV_INTERESADO_TABLE,
  SolicitudRevEquivInteresadoSchema,
  SolicitudRevEquivInteresado,
};
