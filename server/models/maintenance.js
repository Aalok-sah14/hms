const maintenanceSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  staffAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issueType: { type: String, enum: ['Cleaning', 'Repair', 'Inspection', 'Laundry Pick-up'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In-Progress', 'Resolved'], default: 'Pending' },
  notes: String,
  completedAt: Date
}, { timestamps: true });