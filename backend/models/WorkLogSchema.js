const mongoose = require("mongoose");

const WorkLogSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }, 
    date: { type: Date, required: true }, 
    hoursWorked: { type: Number, required: true },  
    tasksCompleted: { type: [String] },  
    notes: { type: String },  
});

module.exports = mongoose.model("WorkLog", WorkLogSchema);