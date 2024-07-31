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
> [!NOTE]
> Debes estar dentro del proyecto que hiciste **Fork**.

```git clone https://github.com/yourUsername/siiges-services```

### Agregar los 3 archivos en el directorio raíz de siiges-services (Backend)
- dockerfile
- docker-compose.yml
- development.env

> [!IMPORTANT]
> Verifica que el puerto y el nombre de la base de datos sean los mismos que los especificados en el archivo Docker ubicado en ***development.env***

> [!IMPORTANT]
> Antes de hacer las instalaciones de las independencias, deberás acceder al repositorio remoto con el siguiente comando.

```git remote add upstream https://github.com/subsesjal/siiges-services.git```

> [!NOTE]
> Verificar que tu repo esté conectada remotamente con este comando.

```git remote -v```

> [!NOTE]
> Debe dar un mensaje como este.

> origin  https://github.com/yourUsername/siiges-services.git (fetch)
> origin  https://github.com/yourUsername/siiges-services.git (push)
> upstream        https://github.com/subsesjal/siiges-services.git (fetch)
> upstream        https://github.com/subsesjal/siiges-services.git (push)

> [!IMPORTANT]
> Actualizar para traer los cambios más recientes con este comando.

```git fetch upstream && git rebase upstream/master```

### Instalaciones los módulos
```yarn install or yarn```

### Levantar Docker
> [!NOTE]
> Posicionarse en la ruta raíz siiges-services/ y ejecutar el comando.
> Cuando finalice puedes levantarlo otra vez desde la terminal o desde Docker Desktop.

```docker-compose up```

### Migrar tablas y datos de MySQL
> [!NOTE]
> Posicionarse en la ruta raíz siiges-services/packages/core y ejecutar el comando.

```NODE_ENV=development npm run migrations:run```
```NODE_ENV=development npm run seeds:run```

### Levantar Backend
> [!NOTE]
> Posicionarse en la ruta siiges-services/packages/api-gateway/ y ejecutar el comando.

```NODE_ENV=development npm run start:dev```
