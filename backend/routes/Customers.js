const express = require("express");
const customersRouter = express.Router();
const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require("../controllers/Customers");

customersRouter.post("/create", createCustomer);
customersRouter.get("/", getCustomers);
customersRouter.get("/:id", getCustomerById);
customersRouter.put("/:id", updateCustomer);
customersRouter.delete("/:id", deleteCustomer);

module.exports = customersRouter;