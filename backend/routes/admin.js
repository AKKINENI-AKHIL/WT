const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const User = require('../models/User');

// Middleware to check for admin role
const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/admin/events
// @desc    Fetch all pending events
// @access  Private (admin only)
router.get('/events', auth, adminAuth, async (req, res) => {
    try {
        const events = await Event.find({ status: 'pending' }).populate('organizer', 'name');
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/admin/events/:id/approve
// @desc    Approve event
// @access  Private (admin only)
router.put('/events/:id/approve', auth, adminAuth, async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        event.status = 'approved';
        await event.save();

        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/admin/events/:id/reject
// @desc    Reject event
// @access  Private (admin only)
router.put('/events/:id/reject', auth, adminAuth, async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        event.status = 'rejected';
        await event.save();

        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
