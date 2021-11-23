const Company = require("../models/company")


const add_company = async (req, res) => {
    if (req.body.name !== "" || req.body.email !== "" || req.body.address !== "" || req.body.user_id !== "" || req.body.department_id) {
        const exist = await Company.exists({ name: req.body.name })
        if (exist) {
            console.log(exist)
            return res.status(403).send("Already Exists")
        }
        const company = new Company(req.body);
        company.save((error, company) => {
            if (error) {
                console.log("error", error)
                console.log("error status", error.status)
                res.status(400).send("All fields are required")
            }
            else {
                res.json(company)
            }
        })

    }
    else {
        res.status(400).send("No field should be empty")
    }

}




const get_companies = async (req, res) => {
    try {
        const companies = await Company.find().populate("department_id user_id");
        res.status(200).json(companies)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const delete_company = async (req, res) => {
    try {
        const company = await Company.deleteOne({ _id: req.params.id });
        if (company.deletedCount <= 0) {
            res.status(404).send("No company To Delete")
        }
        else {
            res.status(204).send("Company Deleted Successfully")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

}

const update_company = async (req, res) => {
    try {
        const updated = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updated)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

module.exports = { add_company, get_companies, delete_company, update_company }