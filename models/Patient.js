//Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dni: { type: String, required: true },
    gender: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], required: true },
    phone: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['No empezado', 'En proceso', 'Terminado'], 
        default: 'No empezado' 
    }
});

module.exports = mongoose.model('Patient', patientSchema);
