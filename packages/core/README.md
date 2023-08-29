# `@siiges-ui/core`
This package is related to db connections, Sequelize models and configurations queries.

# Models
Here you will find all your db models made it with Sequelize.
By this moment.
This are the models made by the moment
- Ciclo Escolar
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
