const Content = require('../models/Content');

const getAllContents = async (req, res) => {
  try {
    const { category, search, difficulty, type } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const contents = await Content.find(query).sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    console.error('Get contents error:', error);
    res.status(500).json({ message: 'Server error fetching contents' });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    console.error('Get content by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid content ID' });
    }
    res.status(500).json({ message: 'Server error fetching content' });
  }
};

const getRelatedContents = async (req, res) => {
  try {
    const { id, category } = req.params;
    const contents = await Content.find({
      category: category,
      _id: { $ne: id }
    })
    .limit(3)
    .select('title thumbnail category type difficulty duration author');

    res.json(contents);
  } catch (error) {
    console.error('Get related contents error:', error);
    res.status(500).json({ message: 'Server error fetching related contents' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = [
      { name: 'Automotive Repair', icon: 'car', color: '#EF4444' },
      { name: 'Welding', icon: 'flame', color: '#F97316' },
      { name: 'Electrical Installation', icon: 'zap', color: '#EAB308' },
      { name: 'Home Repair', icon: 'wrench', color: '#22C55E' },
      { name: 'Mechanical Tools', icon: 'settings', color: '#3B82F6' },
      { name: 'Woodworking', icon: 'tree', color: '#8B5CF6' }
    ];
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

module.exports = {
  getAllContents,
  getContentById,
  getRelatedContents,
  getCategories
};
