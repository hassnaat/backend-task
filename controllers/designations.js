const Designation = require("../models/designation")


const add_designation = async (req, res) => {
    if (req.body.name !== "") {
        const exist = await Designation.exists({ name: req.body.name })
        if (exist) {

            return res.status(403).send("Already Exists")
        }
        const designation = new Designation(req.body);
        designation.save((error, designation) => {
            if (error) {

                res.status(400).send("All fields are required")
            }
            else {
                res.json(designation)
            }
        })

    }
    else {
        res.status(400).send("No field should be empty")
    }





}




const get_designations = async (req, res) => {
    try {
        const designations = await Designation.find();
        res.status(200).json(designations)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const delete_designation = async (req, res) => {
    try {
        const designation = await Designation.deleteOne({ _id: req.params.id });
        if (designation.deletedCount <= 0) {
            res.status(404).send("No Designation To Delete")
        }
        else {
            res.status(204).send("Designation Deleted Successfully")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const update_designation = async (req, res) => {
    try {
        const updated = await Designation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updated)
    } catch (error) {
        res.status(500).send(error.message)
    }




}

module.exports = { add_designation, get_designations, delete_designation, update_designation }