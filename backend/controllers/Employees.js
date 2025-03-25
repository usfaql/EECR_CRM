const EmployeesModel = require("../models/EmployeesSchema");
const WorkLog = require("../models/WorkLogSchema");
const PerformanceEvaluation = require("../models/PerformanceEvaluationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const JoinEmployee = async (req, res) => {
    try {
        const {
            username,
            FirstName,
            LastName,
            image,
            role,
            startWork,
            gender,
            phoneNumber,
            password,
            salary
        } = req.body;

        const existingEmployee = await EmployeesModel.findOne({ username });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const employee = new EmployeesModel({
            username,
            FirstName,
            LastName,
            image,
            role,
            startWork,
            gender,
            phoneNumber,
            password: hashedPassword,
            salary
        });

        const savedEmployee = await employee.save();


        const workLog = new WorkLog({
            employee: savedEmployee._id,
            date: new Date(),
            hoursWorked: 0,
            tasksCompleted: [],
            notes: "New Employee - No tasks yet"
        });

        await workLog.save();

      
        const performanceEvaluation = new PerformanceEvaluation({
            employee: savedEmployee._id,
            date: new Date(),
            rating: 3,
            feedback: "New Employee - Awaiting evaluation",
            achievements: []
        });

        await performanceEvaluation.save();

        res.status(201).json({
            success: true,
            message: "Employee Joined Successfully",
            employee: savedEmployee
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            err: err.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const employee = await EmployeesModel.findOne({ username });
        if (!employee) {
            return res.status(403).json({ success: false, message: "Invalid username or password" });
        }

        const valid = await bcrypt.compare(password, employee.password);
        if (!valid) {
            return res.status(403).json({ success: false, message: "Invalid username or password" });
        }


        const token = jwt.sign({ id: employee._id, role: employee.role }, "YOUR_SECRET_KEY", { expiresIn: "1h" });

        res.status(200).json({
            success: true,
            message: "Valid login credentials",
            token,
            employee: { id: employee._id, username: employee.username, role: employee.role }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", err: err.message });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await EmployeesModel.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { JoinEmployee, login, getEmployees };
