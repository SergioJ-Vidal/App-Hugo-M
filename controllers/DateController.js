const Date = require("../models/Date");

const DateController = {

    async create(req, res) {

        try {

            const date = await Date.create({ ...req.body, });

            res.status(201).send(date)

        } catch (error) {

            console.error(error)

            res.status(500).send({ message: 'Ha habido un problema al crear el producto' })

        }

    }
}

module.exports = DateController;