const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  room:          { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  staffAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issueType:     { type: String, enum: ['Cleaning', 'Repair', 'Inspection', 'Laundry Pick-up'], required: true },
  priority:      { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status:        { type: String, enum: ['Pending', 'In-Progress', 'Resolved'], default: 'Pending' },
  notes:         { type: String },
  completedAt:   { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);