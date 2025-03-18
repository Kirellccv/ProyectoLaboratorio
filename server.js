const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

// Middleware para manejar sesiones
app.use(session({
    secret: 'secreto-laboratorio', // Clave básica para las sesiones
    resave: false,
    saveUninitialized: true
}));

// Configuración de EJS para vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware para archivos estáticos y procesamiento de formularios
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://kirellpay:mgX9BJWCh9Lulx1G@cluster0.osbpx.mongodb.net/database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error en conexión:', err));

// Rutas
app.use('/auth', require('./routes/auth'));      // Rutas de autenticación (login/register)
app.use('/patients', require('./routes/patients'));  // Rutas de pacientes
app.use('/results', require('./routes/results'));  // Rutas de resultados
app.use('/', require('./routes/home'));         // Ruta principal (home)

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
