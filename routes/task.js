const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// POST /tasks - Create a new task

router.post('/', async (req, res) => {
    try {
        const { title, description, dueDate,user } = req.body;
        const task = new Task({ title, description, dueDate,user });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.log("heloo")
        res.status(500).json({ error: error.message });
    }
});

// GET /tasks - Get all tasks
router.get('/', async (req, res) => {
    try {
        // Retrieve all tasks from the database
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /tasks/:id - Get a single task by ID
router.get('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /tasks/:id - Update a task
router.put('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, dueDate, completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, dueDate, completed }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
