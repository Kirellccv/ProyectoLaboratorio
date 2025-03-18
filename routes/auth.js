const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta de registro (GET para mostrar el formulario)
router.get('/register', (req, res) => {
    res.render('register');
});

// Ruta de registro (POST para guardar el usuario)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Guardar el usuario en la base de datos sin cifrar la contraseña
        const user = new User({
            username,
            password
        });

        // Guardar el usuario en la base de datos
        await user.save();
        res.redirect('/auth/login');  // Redirigir al login después del registro
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el registro');
    }
});

// Ruta de login (GET para mostrar el formulario)
router.get('/login', (req, res) => {
    res.render('login');
});

// Ruta de login (POST para autenticar usuario)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && user.password === password) {
            // Guardar sesión
            req.session.user = user;
            res.redirect('/');  // Redirigir al inicio después del login
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el login');
    }
});

// Ruta de logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');  // Redirigir al login después de cerrar sesión
    });
});

module.exports = router;
