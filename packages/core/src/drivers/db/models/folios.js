const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { PROGRAMA_TABLE } = require('./programa');
const { INSTITUCION_TABLE } = require('./institucion');
const { ESTATUS_CERTIFICADO_TABLE } = require('./estatusCertificado');
const { TIPO_DOCUMENTO_TABLE } = require('./tipoDocumento');
const { TIPO_CERTIFICADO_TABLE } = require('./tipoCertificado');
const { GRADO_ACADEMICO_TABLE } = require('./gradoAcademico');

const FOLIOS_TABLE = 'folios';

const FoliosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  numero_pago: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  fecha: {
    type: DataTypes.DATE,
  },

  personaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'persona_id',
    references: {
      model: PERSONA_TABLE,
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

  institucionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'institucion_id',
    references: {
      model: INSTITUCION_TABLE,
      key: 'id',
    },
  },

  estatus_certificadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_certificado_id',
    references: {
      model: ESTATUS_CERTIFICADO_TABLE,
      key: 'id',
    },
  },

  tipo_documentoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_documento_id',
    references: {
      model: TIPO_DOCUMENTO_TABLE,
      key: 'id',
    },
  },

  tipo_certificadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_certificado_id',
    references: {
      model: TIPO_CERTIFICADO_TABLE,
      key: 'id',
    },
  },

  grado_academicoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'grado_academico_id',
    references: {
      model: GRADO_ACADEMICO_TABLE,
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

class Folios extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.Institucion, { as: 'institucion' });
    this.belongsTo(models.estatusCertificado, { as: 'estatusCertificado' });
    this.belongsTo(models.tipoDocumento, { as: 'tipoDocumento' });
    this.belongsTo(models.tipoCertificado, { as: 'tipoCertificado' });
    this.belongsTo(models.gradoAcademico, { as: 'gradoAcademico' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FOLIOS_TABLE,
      modelName: 'Folios',
      timestamps: false,
    };
  }
}

module.exports = {
  FOLIOS_TABLE, FoliosSchema, Folios };
