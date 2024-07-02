const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_DOCUMENTO_TABLE } = require('./tipoDocumento');
const { TIPO_SOLICITUD_FOLIO_TABLE } = require('./tipoSolicitudFolio');
const { PROGRAMA_TABLE } = require('./programa');
const { ESTATUS_SOLICITUD_FOLIO_TABLE } = require('./estatusSolicitudFolio');

const SOLICITUD_FOLIO_TABLE = 'solicitudes_folios';

const SolicitudFolioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoDocumentoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_documento_id',
    references: {
      model: TIPO_DOCUMENTO_TABLE,
      key: 'id',
    },
  },
  tipoSolicitudFolioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_solicitud_folio_id',
    references: {
      model: TIPO_SOLICITUD_FOLIO_TABLE,
      key: 'id',
    },
  },
  estatusSolicitudFolioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_solicitud_folio_id',
    references: {
      model: ESTATUS_SOLICITUD_FOLIO_TABLE,
      key: 'id',
    },
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  folioSolicitud: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_solicitud',
  },
  folioPago: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_pago',
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

class SolicitudFolio extends Model {
  static associate(models) {
    this.belongsTo(models.TipoSolicitud, { as: 'tipoSolicitud' });
    this.belongsTo(models.EstatusSolicitud, { as: 'estatusSolicitud' });
    this.hasOne(models.Programa, { as: 'programa', foreignKey: 'solicitudId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_FOLIO_TABLE,
      modelName: 'SolicitudFolio',
      timestamps: false,
    };
  }
}
module.exports = { SOLICITUD_FOLIO_TABLE, SolicitudFolioSchema, SolicitudFolio };
