const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATALOGO_FIRMA_ELECTRONICA_TABLE } = require('./catalogoFirmaElectronica');

const DOCUMENTO_FIRMADO_TABLE = 'documentos_firmados';

const DocumentoFirmadoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  catalogoFirmaElectronicaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'catalogo_firma_electronica_id',
    references: {
      model: CATALOGO_FIRMA_ELECTRONICA_TABLE,
      key: 'id',
    },
  },
  objetoPorFirmar: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'objeto_por_firmar',
    comment: 'JSON del objeto que se va a firmar',
  },
  pkcs7: {
    allowNull: false,
    type: DataTypes.TEXT,
    comment: 'Firma electrónica en formato PKCS#7',
  },
  folioInterno: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_interno',
    comment: 'Folio interno del sistema SIIGES',
  },
  identificadorUnico: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'identificador_unico',
    comment: 'Identificador único del documento firmado',
  },
  hashObjetoFirmado: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'hash_objeto_firmado',
    comment: 'Hash MD5 del objeto firmado',
  },
  secuenciaDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'secuencia_documento',
    comment: 'Secuencia del documento generada por el servicio',
  },
  datosFirmante: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'datos_firmante',
    comment: 'Información del certificado del firmante',
  },
  objetoFirmado: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'objeto_firmado',
    comment: 'JSON del objeto que fue firmado',
  },
  firmaResponse: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'firma_response',
    comment: 'Respuesta completa del servidor de firma electrónica',
  },
  uriValidacion: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'uri_validacion',
    comment: 'URI para validación pública del documento',
  },
  tipoDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'tipo_documento',
    comment: 'Tipo de documento firmado',
  },
  identificadorDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'identificador_documento',
    comment: 'Identificador del documento en el servicio externo',
  },
  dependenciaDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'dependencia_documento',
    comment: 'Dependencia asociada al documento',
  },
  firmaDigital: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'firma_digital',
    comment: 'Firma digital del documento',
  },
  estatusFirmado: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'estatus_firmado',
    defaultValue: 'exitoso',
    comment: 'Estado del proceso de firmado',
  },
  fechaFirmado: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_firmado',
    comment: 'Fecha y hora del firmado',
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

class DocumentoFirmado extends Model {
  static associate(models) {
    this.belongsTo(models.CatalogoFirmaElectronica, {
      as: 'catalogoFirmaElectronica',
      foreignKey: 'catalogoFirmaElectronicaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCUMENTO_FIRMADO_TABLE,
      modelName: 'DocumentoFirmado',
      timestamps: false,
    };
  }
}

module.exports = { DOCUMENTO_FIRMADO_TABLE, DocumentoFirmadoSchema, DocumentoFirmado };
