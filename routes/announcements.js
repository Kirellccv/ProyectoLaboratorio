// announcements.js
const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de crear anuncio
router.get('/create', (req, res) => {
    res.render('create-announcement');  // Vista donde se creará el anuncio
});

// Ruta para manejar la creación de un anuncio
router.post('/create', (req, res) => {
    const { title, content } = req.body;

    // Aquí podrías guardar el anuncio en la base de datos

    res.redirect('/');  // Redirigir al inicio después de crear el anuncio
});

module.exports = router;
