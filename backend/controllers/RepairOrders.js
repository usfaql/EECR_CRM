const RepairOrder = require('../models/repairOrderSchema');

const createRepairOrder = async (req, res) => {
    try {
        const newOrder = new RepairOrder(req.body);
        await newOrder.save();
        res.status(201).json({
            success : true,
            message : `Create Order Repair Successfully`,
            newOrder
        });
    } catch (error) {
        res.status(400).json({ 
            success : false,
            message : `Error Create Order Repair`,
            error: error.message 
        });
    }
};


const getAllRepairOrders = async (req, res) => {
    try {
        const orders = await RepairOrder.find();
        res.status(200).json({
            success : true,
            message : `All Repair Orders`,
            orders
        }
            
        );
    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Error Get All Repair Orders`,
            error: error.message 
            });
    }
};

const getRepairOrderByVin = async (req, res) => {
    try {
        const { vin } = req.params; 
        const repairOrder = await RepairOrder.findOne({ vin });

        if (!repairOrder) {
            return res.status(404).json({ message: 'Repair Order not found for this VIN' });
        }

        res.status(200).json({
            success : true,
            message : `this Repair Order For ${vin}`,
            repairOrder
        });
    } catch (error) {
        res.status(500).json({success: false, message : "Error Update order Status", error: error.message });
    }
};


const updateRepairOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await RepairOrder.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ 
                success : false,
                message: 'Repair Order not found' 
            });
        }
        res.status(200).json({
            success : true,
            message : `Update order Status Successfully`,
            updatedOrder

        });
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message : `Error Update order Status`,
            error: error.message 
        });
    }
};

const updateApprovalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { approvalStatus } = req.body;
        const validStatuses = ['Pending', 'Approved', 'Rejected'];
        if (!validStatuses.includes(approvalStatus)) {
            return res.status(400).json({ 
                success : false,
                message: 'Invalid status value' 
            });
        }
        const updateApprovalStatus = await RepairOrder.findByIdAndUpdate(id, { approvalStatus }, { new: true });
        if (!updateApprovalStatus) {
            return res.status(404).json({
                success : false,
                message: 'Repair Order not found' });
        }
        res.status(200).json({
            success : true,
            message : "Update Approval Status Successfully",
            updateApprovalStatus 
        });
    } catch (error) {
        res.status(500).json({ 
            success : false,
            message : `Error Update Approval Status`,
            error: error.message 
        });
    }
};


const deleteRepairOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await RepairOrder.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ 
                success : false,
                message: 'Repair Order not found' 
            });
        }
        res.status(200).json({
            success : true,
            message: 'Repair Order deleted successfully' 
            });
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message : `Error Repair Order deleted`,
            error: error.message 
        });
    }
};

const updateRepairOrder = async (req, res) => {
    const { repairOrderId } = req.params; 
    const { diagnosis, partsRequired } = req.body;
  
    try {
      const repairOrder = await RepairOrder.findById(repairOrderId);
  
      if (!repairOrder) {
        return res.status(404).json({success:false, message: 'Repair order not found' });
      }
  
      if (diagnosis && diagnosis.length > 0) {
        repairOrder.diagnosis = diagnosis;
      }
  
      if (partsRequired && partsRequired.length > 0) {
        let totalCost = 0;
        repairOrder.partsRequired = partsRequired.map(part => {
          part.totalCost = part.quantity * part.unitPrice; 
          totalCost += part.totalCost; 
          return part;
        });
  
        repairOrder.costEstimate = totalCost;
      }

      repairOrder.status = 'In Progress';
    
      await repairOrder.save();
  
      return res.status(200).json({success:true, message: 'Repair order updated successfully', repairOrder });
    } catch (error) {
      console.error(error);
      return res.status(500).json({success:false, message: 'Error updating repair order' ,error});
    }
  };

module.exports = {
 createRepairOrder,
 getAllRepairOrders,
 getRepairOrderByVin,
 updateRepairOrder,
 updateRepairOrderStatus,
 updateApprovalStatus,
 deleteRepairOrder
}