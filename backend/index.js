const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
require("dotenv").config()
require("./models/db");

const employeesRouter = require("./routes/Employees");
const repairRouters = require("./routes/RepairOrders");
const customersRouters = require("./routes/Customers");
const vehiclesRouter = require("./routes/Vehicles");
app.use(cors());
app.use(express.json());
app.use("/employees", employeesRouter);
app.use('/repair-orders', repairRouters)
app.use('/customers', customersRouters);
app.use('/vehicles', vehiclesRouter);
app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT} is live `)
})