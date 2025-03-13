const cron = require('node-cron');
const Event = require('../models/Event');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Check Events Every Minute
cron.schedule('* * * * *', async () => {
    const now = new Date();
    const events = await Event.find({ reminderTime: { $lte: now }, notified: false }).populate('userId');

    for (let event of events) {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: event.userId.email,
            subject: `Reminder: ${event.name}`,
            text: `Your event "${event.name}" is scheduled at ${event.date}.`
        });

        event.notified = true;
        await event.save();
    }
    console.log("Reminders sent!");
});
