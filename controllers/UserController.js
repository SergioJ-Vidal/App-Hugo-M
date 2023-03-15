const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const UserController = {

    async create(req, res) {

        try {

            const password = await bcrypt.hash(req.body.Password, 10)
            const user = await User.create({ ...req.body, Password: password, Role: "user" });

            res.status(201).send(user)

        } catch (error) {

            console.error(error)

            res.status(500).send({ message: 'Ha habido un problema al crear el producto' })

        }

    },

    async login(req, res) {

        try {

            const user = await User.findOne({ Email: req.body.Email, })
                .populate({ path: "posts" })

            if (!user) {
                return res.status(400).send("Usuario o contraseña incorrectos")
            }

            const isMatch = bcrypt.compare(req.body.password, user.password)

            if (!isMatch) {
                return res.status(400).send("Usuario o contraseña incorrectos")
            }

            // if (!user.confirmed) {

            //     return res.status(400).send({ message: "Debes confirmar tu correo" })

            // }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            if (user.Tokens.length > 4) user.Tokens.shift();

            user.Tokens.push(token);

            await user.save();

            res.send({ message: 'Bienvenid@ ' + user.Nombre, token, user });

        } catch (error) {

            console.error(error);

            res.status(500).send({ message: 'Ha habido un problema al logearte' })

        }

    },

    async logout(req, res) {

        try {

            await User.findByIdAndUpdate(req.user._id, {

                $pull: { tokens: req.headers.authorization },

            });

            res.send({ message: "Desconectado con éxito" });

        } catch (error) {

            console.error(error);

            res.status(500).send({

                message: "Hubo un problema al intentar conectar al usuario",

            });

        }

    },

}

module.exports = UserController;