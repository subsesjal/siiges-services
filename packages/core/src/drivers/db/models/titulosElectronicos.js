const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_TABLE } = require('./institucion');
const { ESTADO_TABLE } = require('./estado');
const { CARGO_TABLE } = require('./cargo');
const { FUNDAMENTO_SERVICIO_SOCIAL_TABLE } = require('./fundamentoServicioSocial');
const { NIVEL_TABLE } = require('./nivel');
const { AUTORIZACION_RECONOCIMIENTO_TABLE } = require('./autorizacionReconocimiento');
const { MODALIDAD_TITULACION_TABLE } = require('./modalidadTitulacion');

const TITULO_ELECTRONICO_TABLE = 'titulos_electronicos';

const TituloElectronicoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  institucionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'institucion_id',
    references: {
      model: INSTITUCION_TABLE,
      key: 'id',
    },
  },
  estadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estado_id',
    references: {
      model: ESTADO_TABLE,
      key: 'id',
    },
  },
  cargoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cargo_id',
    references: {
      model: CARGO_TABLE,
      key: 'id',
    },
  },
  autorizacionReconocimientoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'autorizacion_reconocimiento_id',
    references: {
      model: AUTORIZACION_RECONOCIMIENTO_TABLE,
      key: 'id',
    },
  },
  modalidadTitulacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'modalidad_titulacion_id',
    references: {
      model: MODALIDAD_TITULACION_TABLE,
      key: 'id',
    },
  },
  estadoAntecedenteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estado_antecedente_id',
    references: {
      model: ESTADO_TABLE,
      key: 'id',
    },
  },
  fundamentoLegalServicioSocialId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'fundamento_legal_servicio_social_id',
    references: {
      model: FUNDAMENTO_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  tipoEstudioAntecedenteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_estudio_antecedente_id',
    references: {
      model: NIVEL_TABLE,
      key: 'id',
    },
  },
  version: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  folioControl: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_control',
  },
  nombreResponsable: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_responsable',
  },
  primerApellidoResponsable: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'primer_apellido_responsable',
  },
  segundoApellidoResponsable: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'segundo_apellido_responsable',
  },
  curpResponsable: {
    allowNull: false,
    type: DataTypes.STRING(18),
    field: 'curp_responsable',
  },
  sello: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  certificadoResponsable: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'certificado_responsable',
  },
  noCertificadoResponsable: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'no_certificado_responsable',
  },
  nombreInstitucion: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_institucion',
  },
  cveInstitucion: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'cve_institucion',
  },
  cveCarrera: {
    allowNull: false,
    type: DataTypes.STRING(7),
    field: 'cve_carrera',
  },
  nombreCarrera: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_carrera',
  },
  fechaInicio: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'fecha_inicio',
  },
  fechaTerminacion: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'fecha_terminacion',
  },
  numeroRvoe: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'numero_rvoe',
  },
  curp: {
    allowNull: false,
    type: DataTypes.STRING(18),
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  primerApellido: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'primer_apellido',
  },
  segundoApellido: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'segundo_apellido',
  },
  correoElectronico: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'correo_electronico',
  },
  fechaExpedicion: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'fecha_expedicion',
  },
  fechaExamenProfesional: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'fecha_examen_profesional',
  },
  fechaExencionExamenProfesional: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'fecha_exencion_examen_profesional',
  },
  cumplioServicioSocial: {
    allowNull: false,
    type: DataTypes.TINYINT,
    field: 'cumplio_servicio_social',
  },
  institucionProcedencia: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'institucion_procedencia',
  },
  fechaInicioAntecedente: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'fecha_inicio_antecedente',
  },
  fechaTerminacionAntecedente: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'fecha_terminacion_antecedente',
  },
  noCedula: {
    allowNull: true,
    type: DataTypes.STRING(8),
    field: 'no_cedula',
  },
  folioDigital: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'folio_digital',
  },
  fechaAutenticacion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_autenticacion',
  },
  selloTitulo: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'sello_titulo',
  },
  noCertificadoAutoridad: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'no_certificado_autoridad',
  },
  selloAutenticacion: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'sello_autenticacion',
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

class TituloElectronico extends Model {
  static associate(models) {
    this.belongsTo(models.Institucion, { as: 'institucion' });
    this.belongsTo(models.Estado, { as: 'estado' });
    this.belongsTo(models.ModalidadTitulacion, { as: 'modalidadTitulacion' });
    this.belongsTo(models.AutorizacionReconocimiento, { as: 'autorizacionReconocimiento' });
    this.belongsTo(models.Cargo, { as: 'cargo' });
    this.belongsTo(models.Nivel, { as: 'nivel', foreignKey: 'tipoEstudioAntecedenteId' });
    this.belongsTo(models.FundamentoServicioSocial, { as: 'fundamentoServicioSocial', foreignKey: 'fundamentoLegalServicioSocialId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TITULO_ELECTRONICO_TABLE,
      modelName: 'TituloElectronico',
      timestamps: false,
    };
  }
}

module.exports = { TITULO_ELECTRONICO_TABLE, TituloElectronicoSchema, TituloElectronico };
