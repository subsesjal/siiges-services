const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { TIPO_TRAMITE_TABLE } = require('./tipoTramite');

const ALUMNO_TIPO_TRAMITE_TABLE = 'alumnos_tipo_tramites';

const AlumnoTipoTramiteSchema = {
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
    references: {
      model: ALUMNO_TABLE,
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

class AlumnoTipoTramite extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.TipoTramite, { as: 'tipoTramite' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNO_TIPO_TRAMITE_TABLE,
      modelName: 'AlumnoTipoTramite',
      timestamps: false,
    };
  }
}

module.exports = { ALUMNO_TIPO_TRAMITE_TABLE, AlumnoTipoTramiteSchema, AlumnoTipoTramite };
