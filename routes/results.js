const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Patient = require('../models/Patient');

// Mostrar página de resultados con lista de pacientes
router.get('/', async (req, res) => {
    try {
        const results = await Result.find().populate('patientId');
        const patients = await Patient.find();
        res.render('results', { results, patients, editing: false, resultData: null });
    } catch (error) {
        res.status(500).send('Error al obtener los resultados');
    }
});

// Guardar un nuevo resultado con valores aleatorios
router.post('/', async (req, res) => {
    try {
        const newResult = new Result({
            patientId: req.body.patientId,
            date: req.body.date // Fecha enviada desde el frontend
        });
        await newResult.save();
        res.redirect('/results');
    } catch (error) {
        res.status(500).send('Error al agregar el resultado');
    }
});

// Editar un resultado existente
router.get('/:id/edit', async (req, res) => {
    try {
        const resultData = await Result.findById(req.params.id);
        const results = await Result.find().populate('patientId');
        const patients = await Patient.find();
        res.render('results', { results, patients, editing: true, resultData });
    } catch (error) {
        res.status(500).send('Error al obtener el resultado');
    }
});

// Actualizar un resultado
router.post('/:id/update', async (req, res) => {
    try {
        await Result.findByIdAndUpdate(req.params.id, {
            patientId: req.body.patientId,
            date: req.body.date
        });
        res.redirect('/results');
    } catch (error) {
        res.status(500).send('Error al actualizar el resultado');
    }
});

// Eliminar un resultado
router.post('/:id/delete', async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.redirect('/results');
    } catch (error) {
        res.status(500).send('Error al eliminar el resultado');
    }
});

router.post('/', async (req, res) => {
    try {
        const newResult = new Result({
            patientId: req.body.patientId,
            date: new Date(req.body.date) // Convertir string a Date correctamente
        });
        await newResult.save();
        res.redirect('/results');
    } catch (error) {
        console.error('Error al guardar resultado:', error);
        res.status(500).send('Error al agregar el resultado');
    }
});

module.exports = router;
