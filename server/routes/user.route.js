const UserController = require('../controllers/user.controller')

module.exports = (app) => {
    // app.get('/api', (req, res) => {
    //     res.json({ msg: "hello world" })
    // })
    //create
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    // app.get('app/users/')
    //read
    //     app.get("/api/transports", TransportController.getAll);
    //     app.get('/api/transports/:id', TransportController.getOne);
    //     ///delete
    //     app.delete("/api/transports/:id", TransportController.destroy);
    //     //update
    //     app.put("/api/transports/:id", TransportController.updateOne);
}

// module.exports = routes