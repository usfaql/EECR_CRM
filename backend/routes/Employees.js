const express = require("express");
const {JoinEmployee, login, getEmployees} = require("../controllers/Employees");

const authentication = require("../middleware/auth");
const Authorization = require("../middleware/authorize");

const employeesRoute = express.Router();

employeesRoute.post("/register", JoinEmployee);
employeesRoute.post("/login", login);
employeesRoute.get('/', getEmployees);
module.exports = employeesRoute;