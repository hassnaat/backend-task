const mongoose = require('mongoose');
const Schema = mongoose.Schema

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref: "Department"
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const companyModel = mongoose.model('Company', companySchema);
module.exports = companyModel;