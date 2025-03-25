const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    firstName : {type: String},
    lastName : {type : String },
    phoneNumber : {type: Number},
    email: { type: String, required: false },
    createdAt : { type: Date, default: Date.now }

})

module.exports = mongoose.model("Customers", customersSchema);