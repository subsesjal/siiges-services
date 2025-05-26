# siiges-services

**Backend del proyecto SIIGES**
Este proyecto está estructurado como un *monorepo*. Utilizamos **Lerna** y **Yarn** para la gestión de paquetes y dependencias.

---

Perfecto, aquí tienes la sección actualizada en español con la instrucción para ejecutar `yarn bootstrap` después de crear o enlazar paquetes:

---

## 📦 Crear un nuevo paquete

Para crear un nuevo paquete dentro del monorepo, ejecuta:

```bash
npx lerna create @siiges-services/nombre-del-paquete
```

---

## 🔗 Enlazar paquetes

Para enlazar un paquete como dependencia de otro, ejecuta:

```bash
npx lerna add @siiges-services/paqueteOrigen --scope=@siiges-services/paqueteDestino
```

Después de enlazar paquetes, también es recomendable ejecutar:

```bash
yarn bootstrap
```

> Esto asegura que todos los paquetes estén correctamente vinculados e instalados.

---

## ⚙️ Configuración del Backend

### 1. Hacer Fork del proyecto

Haz un fork del repositorio original desde:

🔗 [Repositorio Backend](https://github.com/subsesjal/siiges-services)

---

### 2. Clonar el repositorio

> 💡 Asegúrate de clonar **tu fork**, no el repositorio original.

```bash
git clone https://github.com/tuUsuario/siiges-services
```

---

### 3. Agregar archivos necesarios

Debes colocar los siguientes archivos en el directorio raíz (`siiges-services/`):

* `Dockerfile`
* `docker-compose.yml`
* `development.env`

> ⚠️ **Importante:** Verifica que el puerto y el nombre de la base de datos en `development.env` coincidan con los utilizados en Docker.

---

### 4. Configurar repositorio remoto

Antes de instalar las dependencias, enlaza el repositorio original como remoto:

```bash
git remote add upstream https://github.com/subsesjal/siiges-services.git
```

Verifica que los remotos se hayan configurado correctamente:

```bash
git remote -v
```

Deberías ver algo como:

```
origin  https://github.com/tuUsuario/siiges-services.git (fetch)
origin  https://github.com/tuUsuario/siiges-services.git (push)
upstream  https://github.com/subsesjal/siiges-services.git (fetch)
upstream  https://github.com/subsesjal/siiges-services.git (push)
```

Actualiza tu rama con los últimos cambios del repositorio original:

```bash
git fetch upstream && git rebase upstream/master
```

---

### 5. Instalar dependencias

Desde la raíz del proyecto, instala las dependencias:

```bash
yarn install
# o simplemente
yarn
```

---

### 6. Levantar Docker

> 💡 Desde la raíz del proyecto (`siiges-services/`), ejecuta:

```bash
docker-compose up
```

Puedes verificar y controlar los contenedores desde Docker Desktop si lo prefieres.

---

### 7. Ejecutar migraciones y cargar datos

> 💡 Navega a `packages/core/` antes de ejecutar los comandos:

```bash
cd packages/core
NODE_ENV=development npm run migrations:run
NODE_ENV=development npm run seeds:run
```

---

### 8. Levantar el Backend

> 💡 Navega a `packages/api-gateway/` y ejecuta:

```bash
cd packages/api-gateway
NODE_ENV=development npm run start:dev
```

---

## 📝 Notas finales

* Asegúrate de tener Docker y Docker Compose instalados correctamente.
* Usa `NODE_ENV=development` para evitar errores relacionados con entornos.
* Si tienes problemas al iniciar los servicios, revisa los logs de Docker y la configuración de los `.env`.
