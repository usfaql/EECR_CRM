const express = require('express');
const vehiclesRouter = express.Router();
const vehicleController = require('../controllers/Vehicle'); 

vehiclesRouter.post('/add', vehicleController.createVehicle);
vehiclesRouter.get('/', vehicleController.getAllVehicles); 
vehiclesRouter.get('/vehicles/:id', vehicleController.getVehicleById); 
vehiclesRouter.put('/vehicles/:id', vehicleController.updateVehicle); 
vehiclesRouter.delete('/vehicles/:id', vehicleController.deleteVehicle);

module.exports = vehiclesRouter;