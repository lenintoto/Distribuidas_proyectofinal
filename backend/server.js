const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({
  type: 'application/json',
  strict: false
}));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'db', // Nombre del servicio en docker-compose.yml
  user: 'root',
  password: 'password',
  database: 'restaurante'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Manejar errores de conexión
db.on('error', err => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // Reconectar si la conexión se pierde
    db.connect();
  } else {
    throw err;
  }
});

// Ruta para manejar el formulario
app.post('/api/pedido', (req, res) => {
  const { 
    nombres, 
    apellidos, 
    direccion, 
    telefono, 
    email, 
    plato_principal, 
    bebida, 
    postre, 
    instrucciones_especiales 
  } = req.body;
  
  const query = `
    INSERT INTO pedidos (
      nombres, apellidos, direccion, telefono, email, 
      plato_principal, bebida, postre, instrucciones_especiales
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(
    query, 
    [nombres, apellidos, direccion, telefono, email, 
     plato_principal, bebida, postre, instrucciones_especiales], 
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error al guardar el pedido');
        return;
      }
      res.status(200).json({
        message: 'Pedido guardado exitosamente',
        instance: process.env.INSTANCE_ID,
      });
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto: ${port}`);
});