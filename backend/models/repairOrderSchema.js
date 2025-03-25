const mongoose = require('mongoose');

const repairOrderSchema = new mongoose.Schema({
    vehicle : {type: mongoose.Schema.Types.ObjectId, ref: "vehicle"},
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
        enum: ['received', 'In Diagnosis', 'Diagnosed', 'In Repair', 'Repaired', 'Need Attention', 'Finish'], 
        default: 'received' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RepairOrder', repairOrderSchema);