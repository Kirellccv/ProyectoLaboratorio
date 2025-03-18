const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Middleware de autenticación
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
}

// Página para añadir pacientes
router.get('/add', isAuthenticated, (req, res) => {
    res.render('addPatient');  // Asegúrate de que `views/addPatient.ejs` existe
});

// Mostrar lista de pacientes
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render('patients', { patients });
    } catch (err) {
        console.error('❌ Error al cargar los pacientes:', err);
        res.status(500).send('Error interno del servidor');
    }
});

// Agregar nuevo paciente
router.post('/add', isAuthenticated, async (req, res) => {
    try {
        const { name, age, dni, gender, phone, status } = req.body;

        // Validar que los datos sean correctos
        if (!name || !age || !dni || !gender || !phone) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }
        if (isNaN(age) || age < 0) {
            return res.status(400).send('La edad debe ser un número válido.');
        }

        // Validar el estado del paciente
        const validStatuses = ['No empezado', 'En proceso', 'Terminado'];
        const patientStatus = validStatuses.includes(status) ? status : 'No empezado';

        // Crear y guardar el paciente
        await Patient.create({ name, age, dni, gender, phone, status: patientStatus });

        // Redirigir a la lista de pacientes
        res.redirect('/patients');
    } catch (err) {
        console.error('❌ Error al agregar paciente:', err);
        res.status(500).send('Error interno del servidor');
    }
});
// Página para editar paciente
router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send('Paciente no encontrado');
        }
        res.render('editPatient', { patient });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar el paciente');
    }
});


// Actualizar paciente
router.post('/update/:id', isAuthenticated, async (req, res) => {
    try {
        const { name, age, dni, gender, phone, status } = req.body;

        // Validar datos
        if (!name || !age || !dni || !gender || !phone || !status || isNaN(age) || age < 0) {
            return res.status(400).send('Datos inválidos');
        }

        await Patient.findByIdAndUpdate(req.params.id, { name, age, dni, gender, phone, status });
        res.redirect('/patients');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar paciente');
    }
});

// Eliminar paciente
router.post('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.redirect('/patients');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar paciente');
    }
});


module.exports = router;
