const mongoose = require('mongoose');
const Schema = mongoose.Schema

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation_id: {
        type: Schema.Types.ObjectId,
        ref: "Designation"
    }
});

const departmentModel = mongoose.model('Department', departmentSchema);
module.exports = departmentModel;