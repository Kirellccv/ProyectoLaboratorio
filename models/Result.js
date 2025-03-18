const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    hemoglobina: { type: Number, default: () => (12 + Math.random() * 4).toFixed(1) },
    hematocrito: { type: Number, default: () => (36 + Math.random() * 4).toFixed(1) },
    leucocitos: { type: Number, default: () => (4 + Math.random() * 6).toFixed(2) },
    plaquetas: { type: Number, default: () => (150 + Math.random() * 100).toFixed(0) }
});

module.exports = mongoose.model('Result', ResultSchema);
