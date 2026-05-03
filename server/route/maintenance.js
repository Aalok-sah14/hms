const express      = require('express');
const router       = express.Router();
const Maintenance  = require('../models/maintenance');

// Create a maintenance task
router.post('/add', async (req, res) => {
  try {
    const task       = new Maintenance(req.body);
    const savedTask  = await task.save();
    res.status(201).json({ message: 'Maintenance task created', task: savedTask });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all maintenance tasks
router.get('/all', async (req, res) => {
  try {
    const tasks = await Maintenance.find().populate('room').populate('staffAssigned');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update maintenance status (Pending → In-Progress → Resolved)
router.patch('/update/:id', async (req, res) => {
  try {
    const task = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task updated', task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;