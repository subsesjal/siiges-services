const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_TRAMITE_TABLE } = require('./tipoTramite');
const { INTERESADO_TABLE } = require('./interesado');
const { ESTATUS_SOLICITUD_REV_EQUIV_TABLE } = require('./estatusSolicitudRevEquiv');

const SOLICITUD_REV_EQUIV_TABLE = 'solicitudes_rev_equiv';

const SolicitudRevEquivSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  interesadoId: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    field: 'interesado_id',
    references: {
      model: INTERESADO_TABLE,
      key: 'id',
    },
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
  estatusSolicitudRevEquivId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_solicitud_rev_equiv_id',
    references: {
      model: ESTATUS_SOLICITUD_REV_EQUIV_TABLE,
      key: 'id',
    },
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
    this.belongsTo(models.EstatusSolicitudRevEquiv, { as: 'estatusSolicitudRevEquiv' });
    this.belongsTo(models.Interesado, { as: 'interesado', foreignKey: 'interesadoId' });
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
