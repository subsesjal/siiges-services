const { Model, DataTypes } = require('sequelize');
const ESTATUS_SOLICITUD_BECA_TABLE = 'estatus_solicitudes_becas';

const EstatusSolicitudBecaSchema= {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre_id',
    },
    descripcion: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'descripcion_id',
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

class EstatusSolicitudesBecas extends Model {
    static associate() {
          }
        
          static config(sequelize) {
            return {
              sequelize,
              tableName:ESTATUS_SOLICITUD_BECA_TABLE ,
              modelName: 'EstatusSolicitudesBecas',
              timestamps: false,
            };
          }


}

module.exports = { ESTATUS_SOLICITUD_BECA_TABLE, EstatusSolicitudBecaSchema, EstatusSolicitudesBecas };

