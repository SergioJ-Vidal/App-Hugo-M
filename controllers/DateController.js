const Date = require("../models/Date");

const DateController = {

    async create(req, res) {

        try {

            const date = await Date.create({ ...req.body, userId: req.user._id })

            const userRelated = await User.findByIdAndUpdate(req.user._id);

            userRelated.Citas.push(date);

            await userRelated.save()

            res.status(201).send(date)

        } catch (error) {

            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear la cita' })

        }

    }
}

module.exports = DateController;