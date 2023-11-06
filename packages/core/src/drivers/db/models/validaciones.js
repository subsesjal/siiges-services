const { Sequelize, Model, DataTypes } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { USUARIO_TABLE } = require('./usuario');
const { ESTADO_TABLE } = require('./estado');
const { NIVEL_TABLE } = require('./nivel');
const { SITUACIONES_VALIDACION_TABLE } = require('./situacionesValidacion');
const { TIPO_VALIDACIONES_TABLE } = require('./tipoValidaciones');

const VALIDACIONES_TABLE = 'validaciones';

const ValidacionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  alumnoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'alumno_id',
    unique: true,
    references: {
      model: ALUMNO_TABLE,
      key: 'id',
    },
  },
  usuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'usuario_id',
    references: {
      model: USUARIO_TABLE,
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
  nivelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'nivel_id',
    references: {
      model: NIVEL_TABLE,
      key: 'id',
    },
  },
  tipoValidacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_validacion_id',
    references: {
      model: TIPO_VALIDACIONES_TABLE,
      key: 'id',
    },
  },
  situacionValidacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'situacion_validacion_id',
    references: {
      model: SITUACIONES_VALIDACION_TABLE,
      key: 'id',
    },
  },
  folio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaExpedicion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_expedicion',
    defaultValue: Sequelize.NOW,
  },
  nombreInstitucionEmisora: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_institucion_emisora',
  },
  claveCentroTrabajoEmisor: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'clave_centro_trabajo_emisor',
  },
  fechaInicioAntecedente: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_inicio_antecedente',
    defaultValue: Sequelize.NOW,
  },
  fechaFinAntecedente: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_fin_antecedente',
    defaultValue: Sequelize.NOW,
  },
  cedulaProfesional: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'cedula_profesional',
  },
  archivoValidacion: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'archivo_validaciOn',
  },
  fechaValidacion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_validacion',
    defaultValue: Sequelize.NOW,
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

class Validaciones extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.Usuario, { as: 'usuario' });
    this.belongsTo(models.Estado, { as: 'estado' });
    this.belongsTo(models.Nivel, { as: 'nivel' });
    this.belongsTo(models.TipoValidaciones, { as: 'tipoValidaciones' });
    this.belongsTo(models.SituacionesValidacion, { as: 'situacionesValidaciones' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VALIDACIONES_TABLE,
      modelName: 'SituacionesValidaciones',
      timestamps: false,
    };
  }
}

module.exports = {
  VALIDACIONES_TABLE,
  ValidacionesSchema,
  Validaciones,
};
