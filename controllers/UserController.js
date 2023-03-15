const User = require("../models/User");
const bcrypt = require("bcryptjs");

const UserController = {

    async create(req, res) {

        try {

            const password = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({ ...req.body, password: password, role: "user" });

            res.status(201).send(user)

        } catch (error) {

            console.error(error)

            res.status(500).send({ message: 'Ha habido un problema al crear el producto' })

        }

    },

}

module.exports = UserController;