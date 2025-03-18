//require('dotenv').config({ path: '../.env' }); // Cargar variables de entorno
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../.env' });
}

const express = require('express');
const cors = require('cors'); 
const app = express();

// Importar conexión a MongoDB
require('../utils/db'); // Asegúrate de que la conexión se realiza aquí correctamente

// Importar archivo de rutas y el modelo 
const rutausuario = require('../models/usuario');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuario', rutausuario);

// Definir una ruta GET en la raíz '/'
app.get('/', (req, res) => {
    res.send('Bienvenidos al servidor backend');
});

// Exportar la app en lugar de usar app.listen()
module.exports = app;