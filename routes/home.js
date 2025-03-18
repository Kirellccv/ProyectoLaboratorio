// home.js
const express = require('express');
const router = express.Router();

// Middleware para verificar si el usuario está logueado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();  // Si está logueado, sigue con la solicitud
    }
    res.redirect('/auth/login');  // Si no está logueado, redirigir al login
}

// Ruta de inicio
router.get('/', isAuthenticated, (req, res) => {
    res.render('home');  // Mostrar la página de inicio si el usuario está autenticado
});

module.exports = router;
