const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    Nombre: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    },
    Edad: {
        type: Number,
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Fecha_nacimiento: {
        type: Date,
        required: true
    }

}, { timestamps: true });

UserSchema.pre('save', function (next) {
    const fecha_nacimiento = this.Fecha_nacimiento;
    const edad = Math.floor((Date.now() - fecha_nacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365));
    console.log(edad)
    this.Edad = edad;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;