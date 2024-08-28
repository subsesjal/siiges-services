const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_TRAMITE_TABLE } = require('./tipoTramite');

const SOLICITUD_REV_EQUIV_TABLE = 'solicitudes_rev_equiv';

const SolicitudRevEquivSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoTramiteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_tramite_id',
    references: {
      model: TIPO_TRAMITE_TABLE,
      key: 'id',
    },
  },
  estatusSolicitudRevEquiv: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'estatus_solicitud_rev_equiv',
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  folioSolicitud: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_solicitud',
  },
  observaciones: {
    allowNull: true,
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

class SolicitudRevEquiv extends Model {
  static associate(models) {
    this.belongsTo(models.TipoTramite, { as: 'tipoTramite' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_REV_EQUIV_TABLE,
      modelName: 'SolicitudRevEquiv',
      timestamps: false,
    };
  }
}

module.exports = { SOLICITUD_REV_EQUIV_TABLE, SolicitudRevEquivSchema, SolicitudRevEquiv };
