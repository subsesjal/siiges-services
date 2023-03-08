const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { DOCENTE_TABLE } = require('./docente');
const { INFRAESTRUCTURA_TABLE } = require('./infraestructura');

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
  docenteId: {
    type: DataTypes.INTEGER,
    field: 'docente_id',
    references: {
      model: DOCENTE_TABLE,
      key: 'id',
    },
  },
  infraestructuraId: {
    type: DataTypes.INTEGER,
    field: 'infraestructura_id',
    references: {
      model: INFRAESTRUCTURA_TABLE,
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
  area: {
    type: DataTypes.INTEGER,
  },
  clave: {
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
  modelo_instrccional: {
    type: DataTypes.STRING,
  },
  horas_docente: {
    type: DataTypes.INTEGER,
  },
  horas_independiente: {
    type: DataTypes.INTEGER,
  },
  minimo_horas: {
    type: DataTypes.INTEGER,
  },
  minimo_creditos: {
    type: DataTypes.INTEGER,
  },
  tipo: {
    type: DataTypes.INTEGER,
  },
  grado: {
    type: DataTypes.INTEGER,
  },
  fecha_autorizacion: {
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
