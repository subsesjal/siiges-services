const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLAN_MAESTRO_TABLE } = require('./planMaestro');

const RESPONSABLE_OBRA_TABLE = 'responsables_obras';

const ResponsableObraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  planMaestroId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'plan_maestro_id',
    references: {
      model: PLAN_MAESTRO_TABLE,
      key: 'id',
    },
  },
  nombre: {
    type: DataTypes.STRING,
  },
  cargo: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  extension: {
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

class ResponsableObra extends Model {
  static associate(models) {
    this.belongsTo(models.PlanMaestro, { as: 'planMaestro' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RESPONSABLE_OBRA_TABLE,
      modelName: 'ResponsableObra',
      timestamps: false,
    };
  }
}

module.exports = {
  RESPONSABLE_OBRA_TABLE,
  ResponsableObraSchema,
  ResponsableObra,
};
