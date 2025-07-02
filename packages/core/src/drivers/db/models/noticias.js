const { Model, DataTypes, Sequelize } = require('sequelize');

const NOTICIA_TABLE = 'noticias';

const NoticiaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  titulo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  subtitulo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  urlImagen: {
    allowNull: true,
    field: 'url_imagen',
    type: DataTypes.STRING,
  },
  urlNoticia: {
    allowNull: true,
    field: 'url_noticia',
    type: DataTypes.STRING,
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

class Noticia extends Model {
  static associate() {
    // Define associations here if needed
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTICIA_TABLE,
      modelName: 'Noticia',
      timestamps: false,
    };
  }
}

module.exports = { NOTICIA_TABLE, NoticiaSchema, Noticia };
