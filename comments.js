// Create web server

// Load modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Load Comment model
const Comment = require('../../models/Comment');

// @route   GET api/comments
// @desc    Get all comments
// @access  Public
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/comments/:id
// @desc    Get a comment by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/comments
// @desc    Add a comment
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('comment', 'Comment is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Check for errors in request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return error message
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure request body
    const { name, email, comment } = req.body;

    try {
      // Create new comment object
      const newComment = new Comment({
        name,
        email,
        comment,
      });

      // Save to db
      const comment = await newComment.save();

      // Return comment
      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

// @route   PUT api/comments/: