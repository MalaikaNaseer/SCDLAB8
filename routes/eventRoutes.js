const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Event
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, date, category, reminderTime } = req.body;
    try {
        const event = new Event({ userId: req.userId, name, description, date, category, reminderTime });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    const events = await Event.find({ userId: req.userId }).sort({ date: 1 });
    res.json(events);
});

module.exports = router;
