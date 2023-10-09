const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { GRUPO_TABLE } = require('./grupo');

const ALUMNO_GRUPO_TABLE = 'alumnos_grupos';

const AlumnoGrupoSchema = {
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
  grupoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'grupo_id',
    references: {
      model: GRUPO_TABLE,
      key: 'id',
    },
  },
  periodoFechaInicio: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'periodo_fecha_inicio',
    defaultValue: '2023-10-08',
  },
  periodoFechaFin: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'periodo_fecha_fin',
    defaultValue: '2023-10-08',
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

class AlumnoGrupo extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNO_GRUPO_TABLE,
      modelName: 'AlumnoGrupo',
      timestamps: false,
    };
  }
}

module.exports = { ALUMNO_GRUPO_TABLE, AlumnoGrupoSchema, AlumnoGrupo };
