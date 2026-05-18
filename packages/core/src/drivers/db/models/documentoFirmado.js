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
  },
  folioInterno: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_interno',
  },
  secuenciaDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'secuencia_documento',
  },
  objetoFirmado: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'objeto_firmado',
  },
  uriValidacion: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'uri_validacion',
  },
  tipoDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'tipo_documento',
  },
  identificadorDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'identificador_documento',
  },
  dependenciaDocumento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'dependencia_documento',
  },
  pkcs7Ies: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'pkcs7_ies',
  },
  curpFirmanteIes: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'curp_firmante_ies',
  },
  nombreFirmanteIes: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'nombre_firmante_ies',
  },
  datosFirmanteIes: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'datos_firmante_ies',
  },
  firmaResponseIes: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'firma_response_ies',
  },
  fechaFirmadoIes: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_firmado_ies',
  },
  identificadorUnicoIes: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'identificador_unico_ies',
  },
  hashObjetoFirmadoIes: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'hash_objeto_firmado_ies',
  },
  firmaDigitalIes: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'firma_digital_ies',
  },
  pkcs7Sicyt: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'pkcs7_sicyt',
  },
  curpFirmanteSicyt: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'curp_firmante_sicyt',
  },
  nombreFirmanteSicyt: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'nombre_firmante_sicyt',
  },
  datosFirmanteSicyt: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'datos_firmante_sicyt',
  },
  firmaResponseSicyt: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'firma_response_sicyt',
  },
  fechaFirmadoSicyt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_firmado_sicyt',
  },
  identificadorUnicoSicyt: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'identificador_unico_sicyt',
  },
  hashObjetoFirmadoSicyt: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'hash_objeto_firmado_sicyt',
  },
  firmaDigitalSicyt: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'firma_digital_sicyt',
  },
  fechaExpedicion: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_expedicion',
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
