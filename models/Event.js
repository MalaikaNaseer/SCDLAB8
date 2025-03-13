const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    category: { type: String, enum: ['Meeting', 'Birthday', 'Appointment'], required: true },
    reminderTime: { type: Date },
    notified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Event', EventSchema);
