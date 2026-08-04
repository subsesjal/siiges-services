const { Model, DataTypes, Sequelize } = require('sequelize');

const CATALOGO_CICLO_ESCOLAR_TABLE = 'catalogo_ciclos_escolares';

const CatalogoCicloEscolarSchema = {
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
    allowNull: true,
    type: DataTypes.STRING,
  },
  tipo: {
    allowNull: false,
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '1: Ciclos ordinarios/permanentes, 2: Ciclos extemporáneos/especiales',
  },
  ciclosActivos: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'ciclos_activos',
    defaultValue: true,
  },
  createdAt: {
    allowNull: true,
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

class CatalogoCicloEscolar extends Model {
  static associate() {
    // Agregar aquí las asociaciones si otros modelos referencian a catalogo_ciclos_escolares
    // Ejemplo: this.hasMany(models.Algo, { as: 'algos', foreignKey: 'cicloEscolarId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATALOGO_CICLO_ESCOLAR_TABLE,
      modelName: 'CatalogoCicloEscolar',
      timestamps: false,
    };
  }
}

module.exports = { CATALOGO_CICLO_ESCOLAR_TABLE, CatalogoCicloEscolarSchema, CatalogoCicloEscolar };
