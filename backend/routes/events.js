const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const User = require('../models/User');

// @route   GET api/events
// @desc    Fetch all approved events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({ status: 'approved' }).populate('organizer', 'name');
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/events/:id
// @desc    Fetch single event details
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'name');
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/events
// @desc    Create a new event
// @access  Private (organizer only)
router.post('/', auth, async (req, res) => {
    const { title, description, date, location, image } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'organizer') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            image,
            organizer: req.user.id,
        });

        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/events/:id/register
// @desc    Register for event
// @access  Private (student only)
router.post('/:id/register', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        const user = await User.findById(req.user.id);
        if (user.role !== 'student') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Check if already registered
        if (event.attendees.includes(req.user.id) || user.registeredEvents.includes(req.params.id)) {
            return res.status(400).json({ msg: 'User already registered for this event' });
        }

        event.attendees.push(req.user.id);
        user.registeredEvents.push(req.params.id);

        await event.save();
        await user.save();

        res.json(event.attendees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/events/:id
// @desc    Update event details
// @access  Private (organizer only)
router.put('/:id', auth, async (req, res) => {
    const { title, description, date, location, image } = req.body;

    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, date, location, image } },
            { new: true }
        );

        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/events/:id
// @desc    Delete event
// @access  Private (organizer only)
router.delete('/:id', auth, async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Event.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
