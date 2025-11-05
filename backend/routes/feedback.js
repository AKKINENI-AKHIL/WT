const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route   POST api/feedback
// @desc    Submit feedback form data
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newFeedback = new Feedback({
            name,
            email,
            message,
        });

        const feedback = await newFeedback.save();
        res.json(feedback);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
