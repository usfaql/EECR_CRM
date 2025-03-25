const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    vin: { type: String, required: true, unique: true },
    owner : {type : mongoose.Schema.Types.ObjectId, ref : "Customers"},

})

module.exports = mongoose.model("vehicle", vehicleSchema);