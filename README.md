# siiges-services
Backend de siiges

This proyect is a monerepo, we use lerna and yarn to manage dependencies.

## Create a new package
In order to create a new package you have to run `lerna create @siiges-services/package-name`

## Link packages
In order to link packages you have to run `lerna add sourcePackage --scope=destinationPackage`

# Configuración del Backend
Hacer Fork del proyecto:
- [Backend](https://github.com/subsesjal/siiges-services)

### Clonar el repositorio
>[!NOTE]
> Debes estar dentro del proyecto que hiciste **Fork**.

```git clone https://github.com/yourUsername/siiges-services```

### Agregar los 3 archivos en el directorio raíz de siiges-services (Backend)
- dockerfile
- docker-compose.yml
- development.env

> [!IMPORTANT]
> Verifica que el puerto y el nombre de la base de datos sean los mismos que los especificados en el archivo Docker ubicado en ***development.env***

### Instalaciones necesarias dentro del directorio raíz
```yarn install or yarn```

### Levantar Docker
```docker-compose up```

### Levantar Backend
> Posiciónate en la ruta siiges-services/packages/api-gateway/ y ejecuta el siguiente comando:

```NODE_ENV=development npm run start:dev```

### Migrar tablas y datos de MySQL
```NODE_ENV=development npm run migrations:run```
```NODE_ENV=development npm run seeds:run```
