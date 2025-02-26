# `@siiges-services/core`
This package is related to db connections, Sequelize models and configurations queries.

### Documentación para Crear Modelos y Definir Relaciones en Sequelize

#### Introducción
Sequelize es un ORM (Object-Relational Mapping) para Node.js que soporta múltiples bases de datos SQL. Esta guía está diseñada para principiantes que desean aprender cómo crear modelos y definir relaciones entre ellos usando Sequelize.

---

#### Crear un Modelo en Sequelize

1. **Instalar Sequelize y los Drivers de Base de Datos**:
   ```sh
   npm install sequelize
   npm install pg pg-hstore # Para PostgreSQL
   ```

2. **Definir un Modelo**:
   Un modelo en Sequelize representa una tabla en la base de datos. Cada modelo se define como una clase que extiende `Model`.
  ```javascript
   const { Model, DataTypes, Sequelize } = require('sequelize');

   const AlumnoSchema = {
	  id: {
	    allowNull: false,
	    autoIncrement: true,
	    primaryKey: true,
	    type: DataTypes.INTEGER,
	  },
	  personaId: {
	    allowNull: false,
	    type: DataTypes.INTEGER,
	    field: 'persona_id',
	    unique: true,
	    references: {
	      model: PERSONA_TABLE,
	      key: 'id',
	    },
	  },
	  situacionId: {
	    allowNull: false,
	    type: DataTypes.INTEGER,
	    field: 'situacion_id',
	    references: {
	      model: SITUACION_TABLE,
	      key: 'id',
	    },
	  },
	  programaId: {
	    allowNull: false,
	    type: DataTypes.INTEGER,
	    field: 'programa_id',
	    references: {
	      model: PROGRAMA_TABLE,
	      key: 'id',
	    },
	  },
	  matricula: {
	    allowNull: false,
	    type: DataTypes.STRING,
	  },
	  estatus: {
	    allowNull: false,
	    type: DataTypes.INTEGER,
	  },
	  adeudoMaterias: {
	    allowNull: true,
	    type: DataTypes.INTEGER,
	    field: 'adeudo_materias',
	  },
	  descripcionEstatus: {
	    allowNull: true,
	    type: DataTypes.STRING,
	    field: 'descripcion_estatus',
	  },
	  archivoCertificado: {
	    allowNull: true,
	    type: DataTypes.STRING,
	    field: 'archivo_certificado',
	  },
	  archivoNacimiento: {
	    allowNull: true,
	    type: DataTypes.STRING,
	    field: 'archivo_nacimiento',
	  },
	  archivoCurp: {
	    allowNull: true,
	    type: DataTypes.STRING,
	    field: 'archivo_curp',
	  },
	  estatusCertificado: {
	    allowNull: true,
	    type: DataTypes.INTEGER,
	    field: 'estatus_certificado',
	  },
	  estatusNacimiento: {
	    allowNull: true,
	    type: DataTypes.INTEGER,
	    field: 'estatus_nacimiento',
	  },
	  estatusCurp: {
	    allowNull: true,
	    type: DataTypes.INTEGER,
	    field: 'estatus_curp',
	  },
	  observaciones1: {
	    allowNull: true,
	    type: DataTypes.STRING,
	  },
	  observaciones2: {
	    allowNull: true,
	    type: DataTypes.STRING,
	  },
	  fechaBaja: {
	    allowNull: true,
	    type: DataTypes.DATE,
	    field: 'fecha_baja',
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
   ```

---

#### Definir Relaciones entre Modelos

Sequelize soporta varios tipos de relaciones: `hasOne`, `belongsTo`, `hasMany`, y `belongsToMany`.

1. **Relación Uno a Uno (`hasOne` y `belongsTo`)**:
   ```javascript
   class Alumno extends Model {
      static associate(models) {
      this.belongsTo(models.Programa, { as: 'programa' });
      this.belongsTo(models.Persona, { as: 'persona' });
      this.belongsTo(models.Situacion, { as: 'situacion' });
      this.hasMany(models.AlumnoTipoTramite, { as: 'alumnoTipoTramites', foreignKey: 'alumnoId' });
      this.hasMany(models.Calificacion, { as: 'calificaciones', foreignKey: 'alumnoId' });
      this.hasOne(models.Validacion, { as: 'validacion', foreignKey: 'alumnoId' });
      }

      static config(sequelize) {
      return {
      sequelize,
      tableName: ALUMNO_TABLE,
      modelName: 'Alumno',
      timestamps: false,
      };
    }
  }
   ```

2. **Relación Uno a Muchos (`hasMany` y `belongsTo`)**:
   ```javascript
   const Post = sequelize.define('Post', {
     id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
     },
     content: {
       type: DataTypes.STRING
     },
     userId: {
       type: DataTypes.INTEGER,
       references: {
         model: User,
         key: 'id'
       }
     }
   });

   User.hasMany(Post, { foreignKey: 'userId' });
   Post.belongsTo(User, { foreignKey: 'userId' });
   ```

3. **Relación Muchos a Muchos (`belongsToMany`)**:
   ```javascript
   const Tag = sequelize.define('Tag', {
     id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
     },
     name: {
       type: DataTypes.STRING
     }
   });

   const PostTag = sequelize.define('PostTag', {
     postId: {
       type: DataTypes.INTEGER,
       references: {
         model: Post,
         key: 'id'
       }
     },
     tagId: {
       type: DataTypes.INTEGER,
       references: {
         model: Tag,
         key: 'id'
       }
     }
   });

   Post.belongsToMany(Tag, { through: PostTag, foreignKey: 'postId' });
   Tag.belongsToMany(Post, { through: PostTag, foreignKey: 'tagId' });
   ```

4. **Configuración static  config(sequelize)**:
Esta es una configuración del modelo `Alumno` en Sequelize. La función establece los siguientes parámetros:

- `sequelize`: El objeto de conexión a la base de datos.
- `tableName`: El nombre de la tabla en la base de datos, en este caso `ALUMNO_TABLE`.
- `modelName`: El nombre del modelo, en este caso `'Alumno'`.
- `timestamps`: Indica que no se deben añadir automáticamente las columnas `createdAt` y `updatedAt`.
```javascript
   static  config(sequelize)  {
	   return  {
		   sequelize,
		   tableName: ALUMNO_TABLE,
		   modelName:  'Alumno',
		   timestamps:  false,
		};
	}
   ```
---

#### Ejemplo de un Modelo Completo con Relaciones

```javascript
const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { SITUACION_TABLE } = require('./situacion');
const { PROGRAMA_TABLE } = require('./programa');

const ALUMNO_TABLE = 'alumnos';

const AlumnoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  personaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'persona_id',
    unique: true,
    references: {
      model: PERSONA_TABLE,
      key: 'id',
    },
  },
  situacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'situacion_id',
    references: {
      model: SITUACION_TABLE,
      key: 'id',
    },
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  matricula: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  estatus: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  adeudoMaterias: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'adeudo_materias',
  },
  descripcionEstatus: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'descripcion_estatus',
  },
  archivoCertificado: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_certificado',
  },
  archivoNacimiento: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_nacimiento',
  },
  archivoCurp: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_curp',
  },
  estatusCertificado: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'estatus_certificado',
  },
  estatusNacimiento: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'estatus_nacimiento',
  },
  estatusCurp: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'estatus_curp',
  },
  observaciones1: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  observaciones2: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  fechaBaja: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_baja',
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

class Alumno extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.Persona, { as: 'persona' });
    this.belongsTo(models.Situacion, { as: 'situacion' });
    this.hasMany(models.AlumnoTipoTramite, { as: 'alumnoTipoTramites', foreignKey: 'alumnoId' });
    this.hasMany(models.Calificacion, { as: 'calificaciones', foreignKey: 'alumnoId' });
    this.hasOne(models.Validacion, { as: 'validacion', foreignKey: 'alumnoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNO_TABLE,
      modelName: 'Alumno',
      timestamps: false,
    };
  }
}

module.exports = { ALUMNO_TABLE, AlumnoSchema, Alumno };
```

---

#### Agregar un Modelo en Sequelize
Para agregar el modelo `Alumno` al archivo `index.js` y definir sus inicializaciones y asociaciones, sigue estos pasos:

1. Asegúrate de que las importaciones del modelo `Alumno` ya estén presentes:
   ```javascript
   const { Alumno, AlumnoSchema } = require('./alumno');
   ```

2. Añade la inicialización del modelo `Alumno` en la función `setupModels`:
   ```javascript
   Alumno.init(AlumnoSchema, Alumno.config(sequelize));
   ```

3. Añade las asociaciones del modelo `Alumno` en la sección de asociaciones:
   ```javascript
   Alumno.associate(sequelize.models);
   ```

El archivo `index.js` debería verse así:

```javascript
const { Ciclo, CicloSchema } = require('./ciclo');
// ... otras importaciones
const { Alumno, AlumnoSchema } = require('./alumno');
// ... otras importaciones

function setupModels(sequelize) {
  // Initialize models
  Ciclo.init(CicloSchema, Ciclo.config(sequelize));
  // ... otras inicializaciones
  Alumno.init(AlumnoSchema, Alumno.config(sequelize));
  // ... otras inicializaciones

  // Associations
  Ciclo.associate(sequelize.models);
  // ... otras asociaciones
  Alumno.associate(sequelize.models);
  // ... otras asociaciones
}

module.exports = setupModels;
```

Esto asegura que el modelo `Alumno` esté correctamente configurado e inicializado en tu aplicación Sequelize.

---

#### Agregar una migración en Sequelize
Para agregar la migración de la tabla `usuarios`, asegúrate de que esté incluida en el archivo de migración `20220718180952-create-usuarios-table.js`. El archivo ya contiene la definición para crear la tabla `usuarios` (`USUARIO_TABLE`). Aquí está el código relevante:

```javascript
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    // Otras tablas
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USUARIO_TABLE);
    // Otras tablas
  },
};
```

Si esta tabla ya está incluida, no necesitas hacer más cambios. Si necesitas agregar más tablas, asegúrate de seguir el mismo formato para `up` y `down`.

---

### Vamos a crear un seed y un archivo CSV para la tabla `alumnos`.

#### Paso 1: Crear el archivo CSV

1. Navega a `packages/core/src/drivers/db/CSVFiles/`.
2. Crea un archivo llamado `alumnos.csv`.
3. Agrega el siguiente contenido al archivo `alumnos.csv`:

```csv
nombre,email,password,createdAt,updatedAt
alumno1,alumno1@example.com,hashedPassword1,2025-02-10 04:23:13,2025-02-10 04:23:13
alumno2,alumno2@example.com,hashedPassword2,2025-02-10 04:23:13,2025-02-10 04:23:13
```

#### Paso 2: Crear el seed

1. Navega a `packages/core/src/drivers/db/seeders/`.
2. Crea un archivo llamado `20250210042313-create-alumnos-seed.js` los primeros números es la fecha y hora.
3. Agrega el siguiente contenido al archivo:

```javascript
const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { ALUMNO_TABLE } = require('../models/alumno');

const alumnosCSV = path.join(__dirname, '../../CSVFiles/alumnos.csv');

module.exports = {
  async up(queryInterface) {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    const alumnosJson = await csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv(alumnosCSV);

    return queryInterface.bulkInsert(ALUMNO_TABLE, alumnosJson, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ALUMNO_TABLE, null, {});
  },
};
```

Este script crea un seed que inserta los datos del archivo `alumnos.csv` en la tabla `alumnos`.

---
#### Recursos Adicionales

- [Documentación Oficial de Sequelize](https://sequelize.org/master/manual/model-basics.html)
- [Ejemplos de Modelos en el Repositorio](https://github.com/Calamateo/siiges-services/tree/master/packages/core/src/drivers/db/models)

Para más ejemplos, puedes revisar otros modelos en tu repositorio [aquí](https://github.com/Calamateo/siiges-services/tree/master/packages/core/src/drivers/db/models).

---

# Models
Here you will find all your db models made it with Sequelize.
By this moment.
This are the models made by the moment
- Ciclo
- Diligencia
- Domicilio
- Estado
- EstatusSolicitud
- File
- Institucion
- Modalidad
- Municipio
- Nivel
- Pais
- Persona
- Plantel
- Programa
- RatificacionNombre
- Representante
- Solicitud
- TipoInmueble
- Tiposolicitud
- Usuario
- UsuarioUsuario

# Queries
Here we have our function to make consults to our DB
This functions receive a model as parameter and return a query function
```
const { queries, model } = require('@siiges-services/core');

const { queryFunctionWithoutModel } = queries;
const { dbModel } = model;


const queryFunctionWithModel = queryFunctionWithoutModel(dbModel);

const response = queryFunctionWithModel(params);
```

## createQuery
This is a function to create new entries in a table from the injected model
```
const { queries, model } = require('@siiges-services/core');

const { createQuery } = queries;
const { Usuario } = models; // In this example I use Usuario model, but you can use any other model

const create = createQuery(Usuario);
const newUser = create(data)
```
Additionaly you can pass a second argument to create new entries related. The second argument should be an array with strings of tables names. For example Usuario and Persona are related models.

```
const { queries, model } = require('@siiges-services/core');

const { createQuery } = queries;
const { Usuario } = models; // In this example I use Usuario model, but you can use any other model

const include = ['persona'];
const create = createQuery(Usuario);
const newUser = create(data, include);
```


## findoneQuery
This function will find a specific entry. you can add an object as a second argument to change its behavior.

- attributes: an  array of attributes string. This will reduce the result to the given list.
- include: an string array of table names. This will make a search with inner join
- strict: is boolean by default is true. If it's set true the search will be a inner join, if it's set to false it will be a left join
- isDeleting: by default is set to false. When it's true the search will be made even in deleted entries.

```
const { queries, model } = require('@siiges-services/core');

const { findOneQuery } = queries;
const { Usuario } = models; // In this example I use Usuario model, but you can use any other model

const findOne = findOneQuery(Usuario);
const user = findOne(data)
const use = findOne(data, { ...options })
```
## findAllQuery
This function will find all the entries in one model. You can add a second argument ass a parameter.

- attributes: an  array of attributes string. This will reduce the result to the given list.
- include: an string array of table names. This will make a search with inner join
- strict: is boolean by default is true. If it's set true the search will be a inner join, if it's set to false it will be a left join
- isDeleting: by default is set to false. When it's true the search will be made even in deleted entries.
- query: is an object, this will add conditions to where.

```
const { queries, model } = require('@siiges-services/core');

const { findAllQuery } = queries;
const { Usuario } = models; // In this example I use Usuario model, but you can use any other model

const findAll = findAllQuery(Usuario);
const user = findAll(data)
const use = findAll(data, { ...options })
```


## deleteQuery
This query will make a soft delete given a identifier.
```
const { queries, model } = require('@siiges-services/core');

const { deleteQuery } = queries;
const { Usuario } = models; // In this example I use Usuario model, but you can use any other model

const deleteOne = deleteQuery(Usuario);
const user = deleteOne(data)
```

## deleteAndFindQuery
This will delete and find the entry deleted. This receive two objects as parameters one to identify de entry to delete and the second to modify the find. Read find One modifiers.
```
const { queries, model } = require('@siiges-services/core');

const { deleteAndFindQuery } = queries;
const { Usuario } = models; // In this example I use Usuario model, but you can use any other model

const deleteAndFind = deleteAndFindQuery(Usuario);
const user = deleteAndFind(data)
```
## updateQuery
This function update and entry. Receive 3 paramenters.
The first one an object with the identifiers.
The secon one an object with the canges
And a thir one db parameters is an object where you can use isDeleting parameter.


## updateAndFindQuery
This function update and entry. Receive 3 paramenters.
The first one an object with the identifiers.
The second one an object with the canges
And a third one db parameters is an object where you give indication to find query.

# Mock data
In this package we can create our db tables with help of our models and fill it with mock data.
To create the table in yur db you have to create development.env or production.env file (depending on node environment) where you will store your credentials to connect in our db
- DB_HOST_MYSQL=
- DB_NAME_MYSQL=
- DB_PASSWORD_MYSQL=
- DB_PORT_MYSQL=
- DB_USER_MYSQL=
## Create table in our db
In order to create your tables in the db. You have to run `yarn migartions:run`
*Note* you should be in this folder packages/core, if you are not here this command will fail

## Add mock data
In order to add mock data to our db, you should have run `yarn migrations:run` and then you have to run `yarn seeds:run` command

```

```
