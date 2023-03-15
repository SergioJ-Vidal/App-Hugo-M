const mongoose = require('mongoose');
const moment = require('moment');

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
    },
    Role: {
        type: String,
        required: true,
    },
    Tokens: []

}, { timestamps: true });

UserSchema.pre('save', function (next) {
    const fecha_nacimiento = this.Fecha_nacimiento;
    const edad = Math.floor((Date.now() - fecha_nacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365));
    this.Edad = edad;
    const fechaFormateada = moment(this.Fecha_nacimiento).format('MM-DD-YY');
    console.log(fechaFormateada)
    this.Fecha_nacimiento = fechaFormateada;
    next();
});

UserSchema.pre('save', function (next) {
    const fechaFormateada = moment(this.fecha).format('DD-MM-YY');
    this.fecha = fechaFormateada;
    next();
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;