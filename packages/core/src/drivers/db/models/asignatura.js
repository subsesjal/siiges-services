const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { GRADO_TABLE } = require('./grado');
const { AREA_TABLE } = require('./area');

const ASIGNATURA_TABLE = 'asignaturas';

const AsignaturaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  gradoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'grado_id',
    references: {
      model: GRADO_TABLE,
      key: 'id',
    },
  },
  areaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'area_id',
    references: {
      model: AREA_TABLE,
      key: 'id',
    },
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  academia: {
    type: DataTypes.STRING,
  },
  consecutivo: {
    type: DataTypes.INTEGER,
  },
  clave: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  seriacion: {
    type: DataTypes.STRING,
  },
  objetivo: {
    type: DataTypes.STRING,
  },
  temas: {
    type: DataTypes.STRING,
  },
  actividades: {
    type: DataTypes.STRING,
  },
  modeloInstruccional: {
    field: 'modelo_instruccional',
    type: DataTypes.STRING,
  },
  horasDocente: {
    field: 'horas_docente',
    type: DataTypes.INTEGER,
  },
  horasIndependiente: {
    field: 'horas_independiente',
    type: DataTypes.INTEGER,
  },
  creditos: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.INTEGER,
  },
  fechaAutorizacion: {
    field: 'fecha_autorizacion',
    type: DataTypes.DATE,
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

class Asignatura extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.Grado, { as: 'grado' });
    this.hasMany(models.AsignaturaDocente, { as: 'asignaturasDocentes', foreignKey: 'asignaturaId' });
    this.hasMany(models.AsignaturaInfraestructura, { as: 'asignaturasInfraestructura', foreignKey: 'asignaturaId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_TABLE,
      modelName: 'Asignatura',
      timestamps: false,
    };
  }
}

module.exports = { ASIGNATURA_TABLE, AsignaturaSchema, Asignatura };
