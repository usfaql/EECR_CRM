const mongoose = require("mongoose");

const EmployeesModel = new mongoose.Schema({
    FirstName : {type: String},
    LastName : {type : String},
    image : {type : String},
    role : {type : String},
    startWork : {type : String},
    endWork : {type : String},
    gender : {type : String},
    phoneNumber : {type : Number},
    username : {type:String},
    password : {type : String},
    salary : {type : Number},
    workLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkLog" }],
    performanceEvaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: "PerformanceEvaluation" }],
})

module.exports = mongoose.model("Employee", EmployeesModel);