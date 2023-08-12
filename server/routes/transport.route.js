const TransportController = require('../controllers/transport.controller')
const { authenticate } = require('../config/jwt.config')

const routes = (app) => {
    // app.get('/api', (req, res) => {
    //     res.json({ msg: "hello world" })
    // })
    //create
    app.post('/api/transports', TransportController.createTransport);
    //read
    app.get("/api/transports", TransportController.getAll);
    app.get('/api/transports/:id', TransportController.getOne);
    ///delete
    app.delete("/api/transports/:id", TransportController.destroy);
    //update
    app.put("/api/transports/:id", TransportController.updateOne);
}

module.exports = routes