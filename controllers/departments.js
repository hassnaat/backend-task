const Department = require("../models/department")


const add_department = async (req, res) => {
    if (req.body.name !== "") {
        const exist = await Department.exists({ name: req.body.name })
        if (exist) {

            return res.status(403).send("Already Exists")
        }
        const department = new Department(req.body);
        department.save((error, department) => {
            if (error) {

                res.status(400).send("All fields are required")
            }
            else {
                res.json(department)
            }
        })

    }
    else {
        res.status(400).send("No field should be empty")
    }

}




const get_departments = async (req, res) => {
    try {
        const departments = await Department.find().populate("designation_id");
        res.status(200).json(departments)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const delete_department = async (req, res) => {
    try {
        const department = await Department.deleteOne({ _id: req.params.id });
        if (department.deletedCount <= 0) {
            res.status(404).send("No department To Delete")
        }
        else {
            res.status(204).send("department Deleted Successfully")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const update_department = async (req, res) => {
    try {
        const updated = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updated)
    } catch (error) {
        res.status(500).send(error.message)
    }




}

module.exports = { add_department, get_departments, delete_department, update_department }