const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_TABLE } = require('./institucion');
const { DOMICILIO_TABLE } = require('./domicilio');
const { TIPO_INMUEBLE_TABLE } = require('./tipoInmueble');

const PLANTEL_TABLE = 'planteles';

const PlantelSchema = {
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
  domicilioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'domicilio_id',
    references: {
      model: DOMICILIO_TABLE,
      key: 'id',
    },
  },
  tipoInmuebleId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_inmueble_id',
    references: {
      model: TIPO_INMUEBLE_TABLE,
      key: 'id',
    },
  },
  correo1: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  correo2: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  correo3: {
    type: DataTypes.STRING,
  },
  claveCentroTrabajo: {
    type: DataTypes.STRING,
    field: 'clave_centro_trabajo',
  },
  telefono1: {
    type: DataTypes.STRING,
  },
  telefono2: {
    type: DataTypes.STRING,
  },
  telefono3: {
    type: DataTypes.STRING,
  },
  paginaWeb: {
    type: DataTypes.STRING,
    field: 'pagina_web',
  },
  redesSociales: {
    type: DataTypes.STRING,
    field: 'redes_sociales',
  },
  especificaciones: {
    type: DataTypes.STRING,
  },
  dimensiones: {
    type: DataTypes.STRING,
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

class Plantel extends Model {
  static associate(models) {
    this.belongsTo(models.Institucion, { as: 'institucion' });
    this.belongsTo(models.Domicilio, { as: 'domicilio' });
    this.belongsTo(models.TipoInmueble, { as: 'tipoInmueble' });
    this.hasMany(models.Director, { as: 'directores', foreignKey: 'plantelId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANTEL_TABLE,
      modelName: 'Plantel',
      timestamps: false,
    };
  }
}
module.exports = { PLANTEL_TABLE, PlantelSchema, Plantel };
