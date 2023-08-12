const Transport = require('../models/transport.model')

module.exports = {
    createTransport: (req, res) => {
        Transport.create(req.body)
            .then(newTransport => {

                console.log(newTransport);
                res.json(newTransport)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getAll: (req, res) => {
        // Product is from model file
        // find is a mongoose command
        Transport.find()
            .then(alltransports => {
                console.log(alltransports);
                res.json(alltransports);
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({ msg: "Something went wrong", error: err })
            })
    },
    getOne: (req, res) => {
        // the param specified in req.params just has to match the one specified in its corresponding route, we name it however we want otherwise
        Transport.findById(req.params.id)
            .then((oneTransport) => {
                console.log(oneTransport);
                res.json(oneTransport)
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({ msg: "Something went wrong", error: err })
            })
    },
    updateOne: (req, res) => {
        Transport.findByIdAndUpdate((req.params.id), req.body, { new: true, runValidators: true })

            .then((updatedTransport) => {
                console.log(updatedTransport)
                res.json({ updatedTransport })
            })

            .catch((err) => {
                res.status(400).json({ msg: "Something went wrong", error: err })
            })
    },
    destroy: (req, res) => {
        Transport.findByIdAndDelete(req.params.id)
            .then((struckId) => {
                console.log(struckId);
                res.json(struckId);
            })

            .catch((err) => {
                console.log(err);
                res.status(400).json({ msg: "Something went wrong", error: err })
            })
    },

}