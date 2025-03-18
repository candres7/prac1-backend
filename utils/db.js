require('dotenv').config(); // Carga las variables de entorno
const mongoose = require('mongoose');

// Obtener la URL de MongoDB desde el archivo .env
const MONGO_URI = process.env.MONGO_URI;

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("Conexión a MongoDB establecida"))
    .catch(err => console.error("Error al conectar a MongoDB", err));

//mongoose.connect('mongodb://127.0.0.1:27017/Usuario2', {
    /*useNewUrlParser: true,  // Opciones recomendadas para evitar advertencias
    useUnifiedTopology: true */
//});

// Objeto de conexión
const objetodb = mongoose.connection;

// Manejo de eventos
objetodb.on('connected', () => {console.log('Conexión correcta a MongoDB');});
objetodb.on('error', (error) => {console.log('Error en la conexión a MongoDB:', error);});
objetodb.on('disconnected', () => {console.log('Desconectado de MongoDB');});

module.exports = mongoose;