//results.js
const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Patient = require('../models/Patient');

// Middleware para verificar si el usuario está logueado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Si está logueado, sigue con la solicitud
    }
    res.redirect('/auth/login'); // Si no está logueado, redirigir al login
}

// Mostrar página de resultados con lista de pacientes
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const results = await Result.find().populate('patientId');
        const patients = await Patient.find();
        const userName = req.session.user ? req.session.user.name : 'Invitado'; // Obtener nombre del usuario logueado
        res.render('results', { results, patients, editing: false, resultData: null, userName }); // Pasar userName a la vista
    } catch (error) {
        console.error('Error al obtener los resultados:', error.message);
        res.status(500).send('Error al obtener los resultados');
    }
});

// Guardar un nuevo resultado
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const newResult = new Result({
            patientId: req.body.patientId,
            date: new Date(req.body.date) // Convertir string a objeto Date
        });
        await newResult.save();
        res.redirect('/results');
    } catch (error) {
        console.error('Error al agregar el resultado:', error.message);
        res.status(500).send('Error al agregar el resultado');
    }
});

// Editar un resultado existente
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const resultData = await Result.findById(req.params.id);
        const results = await Result.find().populate('patientId');
        const patients = await Patient.find();
        const userName = req.session.user ? req.session.user.name : 'Invitado'; // Obtener nombre del usuario logueado
        res.render('results', { results, patients, editing: true, resultData, userName }); // Pasar userName a la vista
    } catch (error) {
        console.error('Error al obtener el resultado para editar:', error.message);
        res.status(500).send('Error al obtener el resultado');
    }
});

// Actualizar un resultado
router.post('/:id/update', isAuthenticated, async (req, res) => {
    try {
        await Result.findByIdAndUpdate(req.params.id, {
            patientId: req.body.patientId,
            date: new Date(req.body.date) // Asegúrate de convertir la fecha
        });
        res.redirect('/results');
    } catch (error) {
        console.error('Error al actualizar el resultado:', error.message);
        res.status(500).send('Error al actualizar el resultado');
    }
});

// Eliminar un resultado
router.post('/:id/delete', isAuthenticated, async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.redirect('/results');
    } catch (error) {
        console.error('Error al eliminar el resultado:', error.message);
        res.status(500).send('Error al eliminar el resultado');
    }
});

// Ruta para mostrar los detalles del resultado
router.get('/:id/details', isAuthenticated, async (req, res) => {
    try {
        const result = await Result.findById(req.params.id).populate('patientId');
        if (!result) {
            console.error('Resultado no encontrado:', req.params.id);
            return res.status(404).send('Resultado no encontrado');
        }
        const userName = req.session.user ? req.session.user.name : 'Invitado'; // Obtener nombre del usuario logueado
        res.render('resultDetails', { result, userName }); // Pasar userName a la vista
    } catch (error) {
        console.error('Error al obtener los detalles:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
