const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');

const ALUMNOS_GRUPOS_TABLE = 'alumnos_grupos';

const AlumnosGruposSchema = {
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
  grupoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'grupo_id',
  },
  periodoFechaInicio: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'periodo_fecha_inicio',
  },
  periodoFechaFin: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'periodo_fecha_fin',
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

class AlumnosGrupos extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNOS_GRUPOS_TABLE,
      modelName: 'AlumnosGrupos',
      timestamps: false,
    };
  }
}

module.exports = { ALUMNOS_GRUPOS_TABLE, AlumnosGruposSchema, AlumnosGrupos };
