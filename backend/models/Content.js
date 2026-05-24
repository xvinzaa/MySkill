const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Automotive Repair',
      'Welding',
      'Electrical Installation',
      'Home Repair',
      'Mechanical Tools',
      'Woodworking'
    ]
  },
  type: {
    type: String,
    enum: ['Video', 'Article'],
    required: [true, 'Content type is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  thumbnail: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  toolsNeeded: [{
    type: String
  }],
  steps: [{
    stepNumber: Number,
    title: String,
    description: String
  }],
  safetyTips: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

contentSchema.index({ title: 'text', description: 'text', author: 'text' });

module.exports = mongoose.model('Content', contentSchema);
