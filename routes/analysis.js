const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient"); // Asegúrate de que la ruta es correcta

// Middleware de autenticación
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/auth/login"); // Redirige al login si no está autenticado
    }
    next();
}

// Ruta para renderizar la página de análisis
router.get("/", isAuthenticated, async (req, res) => {
    try {
        const patients = await Patient.find(); // Obtener pacientes de la BD
        const userName = req.session.user ? req.session.user.name : 'Invitado'; // Obtener el nombre del usuario autenticado
        res.render("analysis", { patients, userName }); // Pasar `patients` y `userName` a la vista
    } catch (error) {
        console.error("Error al obtener pacientes:", error);
        res.status(500).send("Error en el servidor");
    }
});

module.exports = router;
