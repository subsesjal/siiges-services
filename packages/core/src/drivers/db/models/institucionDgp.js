const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_TABLE } = require('./institucion');

const INSTITUCIONDGP_TABLE = 'instituciones_dgp';

const InstitucionDgpSchema = {
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
  claveDgp: {
    type: DataTypes.STRING,
    field: 'clave_dgp',
  },
  nombreInstitucionDgp: {
    type: DataTypes.STRING,
    field: 'nombre_institucion_dgp',
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

class InstitucionDgp extends Model {
  static associate(models) {
    this.belongsTo(models.Institucion, { as: 'institucion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSTITUCIONDGP_TABLE,
      modelName: 'InstitucionDgp',
      timestamps: false,
    };
  }
}

module.exports = { INSTITUCIONDGP_TABLE, InstitucionDgpSchema, InstitucionDgp };
