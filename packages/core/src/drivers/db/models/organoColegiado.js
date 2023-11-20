const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_TABLE } = require('./institucion');
const { SESION_TABLE } = require('./sesion');
const { PERIODO_TABLE } = require('./periodo');

const ORGANO_COLEGIADO_TABLE = 'organos_colegiados';

const OrganoColegiadoSchema = {
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
    defaultValue: 1,
  },
  sesionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'sesion_id',
    references: {
      model: SESION_TABLE,
      key: 'id',
    },
    defaultValue: 1,
  },
  periodoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'periodo_id',
    references: {
      model: PERIODO_TABLE,
      key: 'id',
    },
    defaultValue: 1,
  },
  fecha: {
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

class OrganoColegiado extends Model {
  static associate() {
    // this.belongsTo(models.Domicilio, { as: 'domicilio' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORGANO_COLEGIADO_TABLE,
      modelName: 'OrganoColegiado',
      timestamps: false,
    };
  }
}

module.exports = { ORGANO_COLEGIADO_TABLE, OrganoColegiadoSchema, OrganoColegiado };
