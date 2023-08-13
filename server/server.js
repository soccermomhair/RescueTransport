const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')




app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5173' }));
app.use(cookieParser());

//require Mongoose Config
require("./config/mongoose.config")
require('./config/jwt.config')
require('dotenv').config();
// IMAGE STUFF



//require routes
const TransportRoutes = require("./routes/transport.route");
TransportRoutes(app);
const UserRoutes = require("./routes/user.route");
UserRoutes(app);

app.listen(8000, () => console.log("Server up and running on port 8000"));