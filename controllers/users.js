const User = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//  Register New User 

const register_user = async (req, res) => {
    let data = req.body;
    if (data.name !== "" && data.email !== "" && data.password !== "") {
        const exist = await User.exists({ email: req.body.email })
        if (exist) {

            return res.status(403).send("User Already Exists")
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const user = new User(data)
        user.save((error, user) => {
            if (error) {

                res.status(400).send("All fields are required")
            }
            else {
                const token = "Bearer " + jwt.sign(user._id.toString(), process.env.TOKEN_SECRET);
                res.send(token)
            }
        })

    }
    else {
        res.status(400).send("No fields should be empty")
    }





}

//  Get All Users 


const get_users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const delete_user = async (req, res) => {

    try {
        const user = await User.deleteOne({ _id: req.params.id });
        if (user.deletedCount <= 0) {
            res.status(404).send("No User To Delete")
        }
        else {
            res.status(204).send("User Deleted Successfully")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const update_user = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updated)
    } catch (error) {
        res.status(500).send(error.message)
    }




}

module.exports = { register_user, get_users, delete_user, update_user }