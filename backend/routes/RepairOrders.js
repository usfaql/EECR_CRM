const express = require('express');
const {createRepairOrder, getAllRepairOrders, getRepairOrderByVin, updateRepairOrderStatus,updateRepairOrder,updateApprovalStatus, deleteRepairOrder} = require('../controllers/RepairOrders');
const repairRouters = express.Router();

repairRouters.post('/create', createRepairOrder);
repairRouters.get('/', getAllRepairOrders);
repairRouters.get('/vin/:vin', getRepairOrderByVin);
repairRouters.put('/diagnosis/:repairOrderId', updateRepairOrder);
repairRouters.put('/:id/status', updateRepairOrderStatus);
repairRouters.put('/:id/ApprovalStatus', updateApprovalStatus);
repairRouters.delete('/:id', deleteRepairOrder);

module.exports = repairRouters;