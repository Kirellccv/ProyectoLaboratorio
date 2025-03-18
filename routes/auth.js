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

        // Crear un nuevo usuario con los datos enviados
        const user = new User({ username, password });

        // Guardar el usuario en la base de datos
        await user.save();

        // Redirigir al login después del registro
        res.redirect('/auth/login');
    } catch (err) {
        console.error('Error durante el registro:', err);
        res.status(500).send('Error al registrar el usuario');
    }
});

// Ruta de login (GET para mostrar el formulario)
router.get('/login', (req, res) => {
    const error = req.query.error || ''; // Mostrar errores si los hay
    res.render('login', { error });
});

// Ruta de login (POST para autenticar usuario)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar el usuario en la base de datos
        const user = await User.findOne({ username });

        if (!user) {
            // Usuario no encontrado
            return res.redirect('/auth/login?error=Usuario no encontrado');
        }

        if (user.password !== password) {
            // Contraseña incorrecta
            return res.redirect('/auth/login?error=Credenciales incorrectas');
        }

        // Guardar información mínima del usuario en la sesión
        req.session.user = { name: user.username };

        // Redirigir al inicio después del login
        res.redirect('/');
    } catch (err) {
        console.error('Error durante el login:', err);
        res.status(500).send('Error al iniciar sesión');
    }
});

// Ruta de logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login'); // Redirigir al login después de cerrar sesión
    });
});

module.exports = router;
