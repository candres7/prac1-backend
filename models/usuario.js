const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const esquema = mongoose.Schema;

// Definir el esquema correctamente
const esquemaUsuario = new esquema({
    nombre: String,
    email: String,
    telefono: String,
    idusuario: String
});

// Crear el modelo de usuario
const ModeloUsuario = mongoose.model('usuario', esquemaUsuario);

// Ruta para agregar usuario
router.post('/agregarusuario', async (req, res) => {
    try {
        const nuevoUsuario = new ModeloUsuario({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            idusuario: req.body.idusuario
        });

        await nuevoUsuario.save();
        res.send('Usuario agregado correctamente');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Obtener todos los usuarios 
router.get('/obtenerusuarios', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find(); //  Obtener todos los usuarios
        res.json(usuarios);
    } catch (err) {
        res.status(500).send("Error al obtener los usuarios");
    }
});

// Obtener datos de un usuario específico
router.get('/obtenerdatausuarios/:idusuario', async (req, res) => {
    try {
        const usuario = await ModeloUsuario.findOne({ idusuario: req.params.idusuario });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).send("Error al obtener los datos del usuario");
    }
});

// Nueva ruta para actualizar usuario (PUT)
router.put('/editarusuario/:idusuario', async (req, res) => {
    try {
        const usuarioActualizado = await ModeloUsuario.findOneAndUpdate(
            { idusuario: req.params.idusuario },
            {
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono
            },
            { new: true } // Devuelve el usuario actualizado
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario actualizado correctamente", usuario: usuarioActualizado });
    } catch (err) {
        res.status(500).send("Error al actualizar el usuario");
    }
});


// Ruta para eliminar usuario
router.delete('/eliminarusuario/:idusuario', async (req, res) => {
    try {
        const usuarioEliminado = await ModeloUsuario.findOneAndDelete({ idusuario: req.params.idusuario });

        if (!usuarioEliminado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (err) {
        res.status(500).send("Error al eliminar el usuario");
    }
});

// Exportar el router
module.exports = router;
