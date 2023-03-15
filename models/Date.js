const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const citaSchema = new mongoose.Schema({
    Fecha: {
        type: Date,
        required: true
    },
    Hora: {
        type: String,
        required: true
    },
    Cliente: {
        type: ObjectId,
        required: true
    },
    Servicio: {
        type: String,
        required: true
    }
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;