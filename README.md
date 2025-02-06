# Proyecto: Aplicación Web Distribuida con Contenedores

Este proyecto es una aplicación web distribuida que utiliza contenedores para facilitar su despliegue y ejecución. La aplicación consta de los siguientes componentes:

- **Frontend**: Aplicación en React que permite a los usuarios ingresar información sobre cómo cuidan a sus mascotas.
- **Backend**: Servidor en Node.js con Express, que maneja las solicitudes HTTP y se conecta a la base de datos.
- **Base de Datos**: MySQL, donde se almacena la información ingresada en los formularios.
- **phpMyAdmin**: Interfaz web para gestionar la base de datos MySQL.
- **NGINX**: Balanceador de carga que distribuye el tráfico entre múltiples instancias del frontend y backend.

## 📌 Requisitos Previos

Para ejecutar este proyecto, necesitas tener instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Configuración y Ejecución

### 1️⃣ Clonar el Repositorio

Clona el repositorio en tu máquina local con el siguiente comando:

```bash
git clone https://github.com/AlexisFarinango/Proyecto-AppDistribuidas.git
cd Proyecto-AppDistribuidas
```

### 2️⃣ Construcción y Ejecución de Contenedores

Ejecuta el siguiente comando para construir y levantar los contenedores:

```bash
docker-compose up --build
```

Este comando generará las imágenes de Docker y levantará los servicios necesarios.

> ⚠ **Nota**: Es posible que los contenedores del backend y NGINX muestren errores inicialmente, ya que la base de datos aún no tiene la tabla requerida.

### 3️⃣ Configuración de la Base de Datos

Para solucionar el error anterior, accede a phpMyAdmin en [http://localhost:8080](http://localhost:8080) y ejecuta la siguiente consulta para crear la tabla en la base de datos `cuidado_mascotas`:

```sql
CREATE TABLE formulario (
  id INT NOT NULL AUTO_INCREMENT,
  nombres VARCHAR(30) NOT NULL,
  apellidos VARCHAR(30) NOT NULL,
  direccion VARCHAR(30) NOT NULL,
  edad INT NOT NULL,
  genero VARCHAR(10) NOT NULL,
  celular VARCHAR(10) NOT NULL,
  comentarios TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;
```

### 4️⃣ Configuración de la Replicación de la Base de Datos

#### 📍 Configuración en el Servidor Maestro (`db`)

Ejecuta el siguiente comando en la base de datos `cuidado_mascotas`:

```sql
SHOW MASTER STATUS;
```

#### 📍 Configuración en el Servidor Esclavo (`db_replica`)

Ejecuta los siguientes comandos en la base de datos `cuidado_mascotas`:

```sql
CHANGE MASTER TO MASTER_HOST = 'db', MASTER_USER = 'root', MASTER_PASSWORD = 'password';
CHANGE MASTER TO MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 491;
START SLAVE;
SHOW SLAVE STATUS;
```

Después de esta configuración, los contenedores podrán ejecutarse sin problemas.

### 5️⃣ Acceso a la Aplicación

Una vez que los contenedores estén en ejecución, accede a la aplicación desde el navegador:

- **Frontend**: [http://localhost](http://localhost)
- **phpMyAdmin**: [http://localhost:8080](http://localhost:8080)

## 🔧 Comandos Útiles

- **Detener y eliminar los contenedores**:
  ```bash
  docker-compose down
  ```

- **Ver logs de un contenedor**:
  ```bash
  docker logs <nombre_del_contenedor_o_id>
  ```

- **Acceder a la terminal de un contenedor**:
  ```bash
  docker exec -it <nombre_del_contenedor_o_id> bash
  ```

## ⚙️ Configuración de NGINX

El archivo `nginx.conf` balancea el tráfico entre múltiples instancias del frontend y backend:

```nginx
events {}

http {
  upstream backend {
    server backend1:5000 weight=2;
    server backend2:5000 weight=1;
    server backend3:5000 weight=1;
  }

  upstream frontend {
    server frontend1:3000 weight=2;
    server frontend2:3000 weight=1;
    server frontend3:3000 weight=1;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://frontend;
    }

    location /api {
      proxy_pass http://backend;
    }
  }
}
```

## 📊 Pruebas de Rendimiento

Se realizaron pruebas de rendimiento utilizando **Apache JMeter** para evaluar la eficiencia del sistema:

![Prueba 1](https://github.com/user-attachments/assets/d77f18b1-a4cd-45e9-857f-4c6fd37374eb)
![Prueba 2](https://github.com/user-attachments/assets/87c283f2-f1e5-4d7c-b0e7-24575db2d9e6)
![Prueba 3](https://github.com/user-attachments/assets/35af40d7-b3b1-4b61-bea2-f4ac802eeb64)

## 👥 Integrantes

- **Lenin Gómez**
- **Freddy Villavicencio**
- **Alex Cárdenas**
- **Alexis Farinango**
