const User = require('../models/user.model')
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY;
const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        try {
            const potentialUser = await User.findOne({ email: req.body.email });
            if (potentialUser) {
                res.status(400).json({ message: "Email already exists" })
            } else {
                const newUser = await User.create(req.body);
                // User.create(req.body)
                //     .then(user => res.json({ msg: "success!", user: user }))
                //     .catch(err => res.json(err));
                // ***IS THERE AN UNDERSCORE OR NOT?***
                const userToken = jwt.sign({ _id: newUser._id, email: newUser.email }, secret, { expiresIn: "1d" });
                // console.log("userToken", userToken);
                res.cookie("userToken", userToken, {
                    httpOnly: true
                }).json({ message: "success", user: newUser });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                if (passwordMatch) {
                    const userToken = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: "1d" });
                    console.log(userToken, "user token")


                    res.status(201).cookie("userToken", userToken).json({ message: "success", user: userToken });
                    // }).json({ message: "success", user: user });
                    // httpOnly: true,
                    // secure: process.env.NODE_ENV === "production"
                    // res.status(201).cookie("usertoken", userToken,).json({ message: "success", user: user })
                }
                else {
                    res.status(400).json({ message: "Invalid login attempt" });
                }
            } else {
                res.status(400).json({ message: "Invalid login attempt" });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    logout: (req, res) => {
        res.clearCookie("userToken").json({ message: "success" });

    }
}

// const userToken = jwt.sign({ _id: user.id, email: user.email }, secret, { expiresIn: "1d" });
//                     res.cookie("usertoken", userToken, {
//                         httpOnly: true
//                     }).json({ message: "success", user: user });