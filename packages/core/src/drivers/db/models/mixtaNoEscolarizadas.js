const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');

const MIXTA_NOESCOLARIZADA_TABLE = 'mixta_noescolarizadas';

const MixtaNoescolarizadaSchema = {
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
  licenciasSoftware: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'licencias_software',
  },
  serviciosHerramientasEducativas: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'servicios_herramientas_educativas',
  },
  sistemasSeguridad: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'sistemas_seguridad',
  },
  direccionamientoIpPublico: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'direccionamiento_ip_publico',
  },
  tecnologiasInformacionComunicacion: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'tecnologias_informacion_comunicacion',
  },
  mantenimientoPlataforma: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'mantenimiento_plataforma',
  },
  diagramaPlataforma: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'diagrama_plataforma',
  },
  accesoInternet: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'acceso_internet',
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

class MixtaNoescolarizada extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MIXTA_NOESCOLARIZADA_TABLE,
      modelName: 'MixtaNoescolarizada',
      timestamps: false,
    };
  }
}

module.exports = { MIXTA_NOESCOLARIZADA_TABLE, MixtaNoescolarizadaSchema, MixtaNoescolarizada };
