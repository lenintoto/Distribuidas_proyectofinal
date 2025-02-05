---

# Proyecto: Aplicación Web distribuida con contenedores

Este proyecto es una aplicación web que consta de un frontend en React, un backend en Node.js con Express, una base de datos MySQL gestionada a través de phpMyAdmin, y un balanceador de carga configurado con NGINX. Todo el proyecto está dockerizado para facilitar su despliegue y ejecución.

## Estructura del Proyecto

- **Frontend**: Aplicación React que permite a los usuarios ingresar información sobre cómo cuidan a sus mascotas.
- **Backend**: Servidor Node.js con Express que maneja las solicitudes HTTP y se conecta a la base de datos.
- **Base de Datos**: MySQL para almacenar la información de los formularios.
- **phpMyAdmin**: Interfaz web para gestionar la base de datos MySQL.
- **NGINX**: Balanceador de carga que distribuye el tráfico entre múltiples instancias del frontend y backend.

## Requisitos Previos

- Docker
- Docker Compose

## Construcción y Ejecución del Proyecto

### 1. Clonar el Repositorio

Primero, clona el repositorio del proyecto:

```bash
git clone https://github.com/AlexisFarinango/Proyecto-AppDistribuidas.git

```

### 2. Configuración del Entorno

Asegúrate de tener Docker y Docker Compose instalados en tu sistema. Luego, construye y levanta los contenedores con el siguiente comando:

```bash
docker-compose up --build
```

Este comando construirá las imágenes de Docker y levantará los contenedores para el frontend, backend, base de datos, phpMyAdmin y NGINX.

**2.1** Posterior al haber creado las imagenes y los contenedores se visualizara un error en cuanto a al ejecución de los backends y de NGINX,esto se debe a que todavia no se ha  creado la tabla en la cual se almacenarán los datos en el formulario.
Para acceder phpMyAdmin se lo puede hacer de la siguiente forma:

 **phpMyAdmin**: [http://localhost:8080](http://localhost:8080)

En donde se debera ejecutar el sguinete comando para la creación de la tabla en phpMyAdmin:

```SQL
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
**2.2 Configuración de la replicación de las tablas** 
Ingresamos al gestor y posteriormente a la base de datos "db" ,la cual es la MASTER,y ejecutamos el siguiente comando en la base "cuidado_mascotas":
```SQL
SHOW MASTER STATUS // permite visualizar la información de la BD "db"

```
Por otra parte para el esclavo "db_replica" ejecutamos los siguientes comandos de igual forma en la base "cuidado_mascotas" en orden.
```SQL
CHANGE MASTER to MASTER_HOST = 'db', MASTER_USER = 'root', MASTER_PASSWORD = 'password';
CHANGE MASTER TO MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 491;
START SLAVE;
SHOW SLAVE STATUS;
```
Una vez realizadas las repectivas configuraciones se debera inicializar los contenedores ,los mismos que podrán ejecutarse de forma correcta gracias a lo realizado. 

### 3. Acceso a la Aplicación

Una vez que los contenedores estén en ejecución, puedes acceder a la aplicación a través de los siguientes enlaces:

- **Frontend**: [http://localhost](http://localhost)


### 4. Comandos Útiles

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

## Configuración de NGINX

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
**nota** Para el proyecto se realizaron pruebas de rendimiento con JApacheMeter
![image](https://github.com/user-attachments/assets/d77f18b1-a4cd-45e9-857f-4c6fd37374eb)

![image](https://github.com/user-attachments/assets/87c283f2-f1e5-4d7c-b0e7-24575db2d9e6)

![image](https://github.com/user-attachments/assets/35af40d7-b3b1-4b61-bea2-f4ac802eeb64)


## Integrantes

- Alex Cardenas.
- Alexis Farinango.
---

Este `README.md` proporciona una visión general del proyecto, instrucciones claras para su construcción y ejecución. 
