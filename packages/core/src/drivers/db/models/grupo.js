const { Model, DataTypes, Sequelize } = require('sequelize');
const { CICLO_ESCOLAR_TABLE } = require('./cicloEscolar');
const { TURNO_TABLE } = require('./turno');
const { GRADO_TABLE } = require('./grado');

const GRUPO_TABLE = 'grupos';

const GrupoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cicloEscolarId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'ciclo_escolar_id',
    references: {
      model: CICLO_ESCOLAR_TABLE,
      key: 'id',
    },
  },
  turnoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'turno_id',
    references: {
      model: TURNO_TABLE,
      key: 'id',
    },
  },
  gradoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'grado_id',
    references: {
      model: GRADO_TABLE,
      key: 'id',
    },
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  generacion: {
    type: DataTypes.STRING,
  },
  generacionFechaInicio: {
    type: DataTypes.DATE,
    field: 'generacion_fecha_inicio',
  },
  generacionFechaFin: {
    type: DataTypes.DATE,
    field: 'generacion_fecha_fin',
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

class Grupo extends Model {
  static associate(models) {
    this.belongsTo(models.CicloEscolar, { as: 'cicloEscolar' });
    this.belongsTo(models.Turno, { as: 'turno' });
    this.belongsTo(models.Grado, { as: 'grado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GRUPO_TABLE,
      modelName: 'Grupo',
      timestamps: false,
    };
  }
}

module.exports = { GRUPO_TABLE, GrupoSchema, Grupo };
