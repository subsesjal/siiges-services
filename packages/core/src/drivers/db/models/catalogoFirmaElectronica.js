const { Model, DataTypes, Sequelize } = require('sequelize');

const CATALOGO_FIRMA_ELECTRONICA_TABLE = 'catalogo_firma_electronica';

const CatalogoFirmaElectronicaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  claveDocumento: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    field: 'clave_documento',
  },
  nombreDocumento: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_documento',
  },
  tipoServicio: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'tipo_servicio',
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.TEXT,
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

class CatalogoFirmaElectronica extends Model {
  static associate(models) {
    this.hasMany(models.DocumentoFirmado, {
      as: 'documentosFirmados',
      foreignKey: 'catalogoFirmaElectronicaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATALOGO_FIRMA_ELECTRONICA_TABLE,
      modelName: 'CatalogoFirmaElectronica',
      timestamps: false,
    };
  }
}

module.exports = {
  CATALOGO_FIRMA_ELECTRONICA_TABLE,
  CatalogoFirmaElectronicaSchema,
  CatalogoFirmaElectronica,
};
