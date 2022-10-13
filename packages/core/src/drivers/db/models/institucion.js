const { Model, DataTypes, Sequelize } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario');

const INSTITUCION_TABLE = 'instituciones';

const InstitucionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  nombre: {
    type: DataTypes.STRING,
  },
  razonSocial: {
    type: DataTypes.STRING,
    field: 'razon_social',
  },
  claveIes: {
    type: DataTypes.STRING,
    field: 'clave_ies',
  },
  historia: {
    type: DataTypes.TEXT,
  },
  vision: {
    type: DataTypes.TEXT,
  },
  mision: {
    type: DataTypes.TEXT,
  },
  valoresInstitucionales: {
    type: DataTypes.TEXT,
    field: 'valores_institucionales',
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

class Institucion extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { as: 'usuario' });
    this.hasMany(models.Plantel, { as: 'planteles', foreignKey: 'institucionId' });
    this.hasMany(models.RatificacionNombre, { as: 'ratificacionesNombre', foreignKey: 'institucionId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSTITUCION_TABLE,
      modelName: 'Institucion',
      timestamps: false,
    };
  }
}

module.exports = { INSTITUCION_TABLE, InstitucionSchema, Institucion };
