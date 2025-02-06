# 🍽️ Proyecto: Aplicación Web Distribuida para Restaurante Peruano 🇵🇪

Este proyecto es una aplicación web diseñada para la gestión de un restaurante peruano. La aplicación consta de un frontend en React, un backend en Node.js con Express, una base de datos MySQL gestionada a través de phpMyAdmin y un balanceador de carga configurado con NGINX. Todo el proyecto está dockerizado para facilitar su despliegue y ejecución. 🚀

## 📌 Estructura del Proyecto

- **🎨 Frontend**: Aplicación React que permite a los usuarios realizar pedidos y gestionar información del restaurante.
- **🖥️ Backend**: Servidor Node.js con Express que maneja las solicitudes HTTP y se conecta a la base de datos.
- **🗄️ Base de Datos**: MySQL para almacenar la información de los pedidos y gestión del restaurante.
- **⚙️ phpMyAdmin**: Interfaz web para gestionar la base de datos MySQL.
- **🔀 NGINX**: Balanceador de carga que distribuye el tráfico entre múltiples instancias del frontend y backend.

## 🛠️ Requisitos Previos

- Docker 🐳
- Docker Compose ⚙️

## 🚀 Construcción y Ejecución del Proyecto

### 1️⃣ Clonar el Repositorio

Clona el repositorio del proyecto:

```bash
git clone https://github.com/lenintoto/Distribuidas_proyectofinal.git
```

### 2️⃣ Configuración del Entorno

Asegúrate de tener Docker y Docker Compose instalados en tu sistema. Luego, construye y levanta los contenedores con el siguiente comando:

```bash
docker-compose up --build
```

Este comando construirá las imágenes de Docker y levantará los contenedores para el frontend, backend, base de datos, phpMyAdmin y NGINX.

#### ⚡ 2.1 Creación de la Base de Datos

Para acceder a phpMyAdmin:

🔗 [http://localhost:8080](http://localhost:8080)

Ejecuta el siguiente comando en phpMyAdmin para crear la tabla necesaria:

```SQL
CREATE TABLE pedidos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_cliente VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  plato VARCHAR(50) NOT NULL,
  cantidad INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;
```

#### 🔄 2.2 Configuración de Replicación de la Base de Datos

Ingresamos al gestor y ejecutamos el siguiente comando en la base principal "restaurante_db":

```SQL
SHOW MASTER STATUS;
```

En la base de datos esclava "restaurante_db_replica":

```SQL
CHANGE MASTER TO MASTER_HOST = 'db', MASTER_USER = 'root', MASTER_PASSWORD = 'password';
CHANGE MASTER TO MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 491;
START SLAVE;
SHOW SLAVE STATUS;
```

Una vez configurado, se pueden reiniciar los contenedores para asegurar el correcto funcionamiento. ✅

### 3️⃣ Acceso a la Aplicación

Una vez que los contenedores estén en ejecución, puedes acceder a la aplicación en:

🔗 **Frontend**: [http://localhost](http://localhost)

### 4️⃣ Comandos Útiles 🛠️

- **🛑 Detener y eliminar los contenedores**:
  ```bash
  docker-compose down
  ```

- **📜 Ver logs de un contenedor**:
  ```bash
  docker logs <nombre_del_contenedor_o_id>
  ```

- **🔍 Acceder a la terminal de un contenedor**:
  ```bash
  docker exec -it <nombre_del_contenedor_o_id> bash
  ```

## ⚙️ Configuración de NGINX

El archivo `nginx.conf` está configurado para balancear el tráfico entre múltiples instancias del frontend y backend. Aquí está la configuración básica:

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

### 📊 Pruebas de Rendimiento 🚀

Se realizaron pruebas de rendimiento con Apache JMeter para evaluar la eficiencia del sistema bajo carga. 📈

## 👥 Integrantes

- 🧑‍💻 Lenin Gómez
- 🧑‍💻 Freddy Villavicencio
