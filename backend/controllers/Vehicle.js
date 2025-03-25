const Vehicle = require('../models/Vehicle'); 

const createVehicle = async (req, res) => {
    try {
        const { carMake, carModel, year, color, plateNumber, vin, owner } = req.body;

        const newVehicle = new Vehicle({
            carMake,
            carModel,
            year,
            color,
            plateNumber,
            vin,
            owner
        });

        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء إنشاء السيارة', error });
    }
};

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('owner');
        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء استرجاع السيارات', error });
    }
};

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('owner');
        
        if (!vehicle) {
            return res.status(404).json({ message: 'السيارة غير موجودة' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء استرجاع السيارة', error });
    }
};

const updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'السيارة غير موجودة لتحديثها' });
        }

        res.status(200).json(updatedVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء تحديث السيارة', error });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!deletedVehicle) {
            return res.status(404).json({ message: 'السيارة غير موجودة لحذفها' });
        }

        res.status(200).json({ message: 'تم حذف السيارة بنجاح' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء حذف السيارة', error });
    }

};

module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
}