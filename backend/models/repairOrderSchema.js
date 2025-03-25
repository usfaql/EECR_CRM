const mongoose = require('mongoose');

const repairOrderSchema = new mongoose.Schema({
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    vin: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    issueDescription: { type: String, required: true },
    assignedTechnicians: [
      {
        _id : false,
        technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
      }
  ],
    estimatedCompletion: { type: Date, required: false, default: null },
    diagnosis: [{ type: String, default: '' }],  
    partsRequired: [
        {
          partName: { type: String, required: true },
          quantity: { type: Number, required: true },
          unitPrice: { type: Number, required: true },  
          totalCost: { type: Number, required: true } 
        }
      ],
    costEstimate: { type: Number, default: 0 }, 
    approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    profit: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RepairOrder', repairOrderSchema);