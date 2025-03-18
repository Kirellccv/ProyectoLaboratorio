const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Importar el modelo Patient

// Middleware para verificar si el usuario está logueado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Si está logueado, sigue con la solicitud
    }
    res.redirect('/auth/login'); // Si no está logueado, redirigir al login
}

// Ruta de inicio
router.get('/', isAuthenticated, (req, res) => {
    const userName = req.session.user ? req.session.user.name : 'Invitado'; // Verificar si hay un usuario logueado
    res.render('home', { userName }); // Pasar el nombre del usuario a la vista
});

// Nueva ruta: API para obtener el conteo de pacientes por estado
router.get('/api/patient-status', async (req, res) => {
    try {
        const estados = ['No empezado', 'En proceso', 'Terminado'];
        const conteoEstados = {};

        // Contar los pacientes según su estado
        for (let estado of estados) {
            const count = await Patient.countDocuments({ status: estado });
            conteoEstados[estado] = count;
        }

        res.json(conteoEstados); // Devolver el conteo en formato JSON
    } catch (error) {
        console.error('Error al obtener el estado de pacientes:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
