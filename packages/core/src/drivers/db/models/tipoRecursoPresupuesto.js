const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_RECURSO_PRESUPUESTO_TABLE = 'tipo_recurso_presupuestos';

const TipoRecursoPresupuestoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
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

class TipoRecursoPresupuesto extends Model {
  static associate(models) {
    this.hasMany(models.Presupuesto, { as: 'presupuesto', foreignKey: 'tipoRecursoPresupuestoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_RECURSO_PRESUPUESTO_TABLE,
      modelName: 'TipoRecursoPresupuesto',
      timespamps: false,
    };
  }
}

module.exports = {
  TIPO_RECURSO_PRESUPUESTO_TABLE,
  TipoRecursoPresupuestoSchema,
  TipoRecursoPresupuesto,
};
