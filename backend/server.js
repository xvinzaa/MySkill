const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://my-skill-one.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'My Skill API is running' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contents', require('./routes/contentRoutes'));

// Health check - placed AFTER routes to avoid being overridden
app.get('/api/health', async (req, res) => {
  try {
    const User = require('./models/User');
    const Content = require('./models/Content');
    const userCount = await User.countDocuments();
    const contentCount = await Content.countDocuments();

    res.json({
      status: 'healthy',
      database: 'connected',
      counts: { users: userCount, contents: contentCount }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Seed endpoint - at the end
app.post('/api/seed', async (req, res) => {
  try {
    const Content = require('./models/Content');

    const contents = [
      {
        title: 'How to Change Motorcycle Oil',
        category: 'Automotive Repair',
        type: 'Video',
        duration: '8 min',
        author: 'Ahmad - SMK Teknik Otomotif',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
        description: 'Learn the fundamentals of changing motorcycle oil with this comprehensive guide.',
        toolsNeeded: ['Socket wrench', 'Oil filter wrench', 'Drain pan', 'Funnel', 'New engine oil'],
        steps: [
          { stepNumber: 1, title: 'Prepare Your Motorcycle', description: 'Let the engine cool down.' },
          { stepNumber: 2, title: 'Locate and Remove Drain Plug', description: 'Place the drain pan and remove the plug.' },
          { stepNumber: 3, title: 'Replace the Oil Filter', description: 'Remove old filter and install new one.' },
          { stepNumber: 4, title: 'Reinstall Drain Plug', description: 'Tighten the drain plug securely.' },
          { stepNumber: 5, title: 'Add New Oil', description: 'Pour in the recommended amount of new oil.' },
          { stepNumber: 6, title: 'Check Oil Level', description: 'Verify the level with dipstick.' }
        ],
        safetyTips: ['Always wear gloves', 'Never work on a hot engine', 'Dispose of old oil properly']
      },
      {
        title: 'Basic Welding for Metal Frame',
        category: 'Welding',
        type: 'Article',
        duration: '6 min read',
        author: 'Budi - SMK Teknik Mesin',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=450&fit=crop',
        description: 'Master the basics of MIG welding for metal frame construction.',
        toolsNeeded: ['MIG welder', 'Welding helmet', 'Welding gloves', 'Wire brush', 'Clamps'],
        steps: [
          { stepNumber: 1, title: 'Set Up Your Workspace', description: 'Ensure proper ventilation.' },
          { stepNumber: 2, title: 'Prepare the Metal', description: 'Clean the metal surfaces.' },
          { stepNumber: 3, title: 'Adjust Welder Settings', description: 'Set wire feed speed and voltage.' },
          { stepNumber: 4, title: 'Practice Welding', description: 'Hold the torch at correct angle.' },
          { stepNumber: 5, title: 'Create the Weld Bead', description: 'Move the torch steadily.' },
          { stepNumber: 6, title: 'Inspect and Finish', description: 'Check the weld for defects.' }
        ],
        safetyTips: ['Wear proper PPE', 'Ensure ventilation', 'Keep fire extinguisher nearby']
      },
      {
        title: 'Installing a Simple Light Switch',
        category: 'Electrical Installation',
        type: 'Video',
        duration: '10 min',
        author: 'Sinta - SMK Teknik Listrik',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=450&fit=crop',
        description: 'A complete guide to safely installing a single-pole light switch.',
        toolsNeeded: ['Voltage tester', 'Screwdriver', 'Wire strippers', 'New light switch'],
        steps: [
          { stepNumber: 1, title: 'Turn Off Power', description: 'Switch off at the breaker.' },
          { stepNumber: 2, title: 'Remove Existing Switch', description: 'Remove cover and switch.' },
          { stepNumber: 3, title: 'Identify Wires', description: 'Note the wire connections.' },
          { stepNumber: 4, title: 'Connect New Switch', description: 'Connect wires to terminals.' },
          { stepNumber: 5, title: 'Install and Test', description: 'Mount switch and test.' }
        ],
        safetyTips: ['ALWAYS turn off power', 'Verify with tester', 'Use insulated tools']
      },
      {
        title: 'Repairing a Leaking Faucet',
        category: 'Home Repair',
        type: 'Article',
        duration: '5 min read',
        author: 'Riko - SMK Teknik Bangunan',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=450&fit=crop',
        description: 'Fix a dripping faucet with this step-by-step guide.',
        toolsNeeded: ['Adjustable wrench', 'Screwdriver', 'Replacement washers', 'Plumber tape'],
        steps: [
          { stepNumber: 1, title: 'Turn Off Water Supply', description: 'Locate shut-off valves.' },
          { stepNumber: 2, title: 'Remove Handle', description: 'Remove decorative cap and screw.' },
          { stepNumber: 3, title: 'Remove Stem', description: 'Unscrew and pull out stem.' },
          { stepNumber: 4, title: 'Replace Parts', description: 'Install new washers and O-rings.' },
          { stepNumber: 5, title: 'Reassemble', description: 'Put everything back together.' },
          { stepNumber: 6, title: 'Test', description: 'Turn on water and check for leaks.' }
        ],
        safetyTips: ['Turn off water first', 'Keep bucket nearby', 'Do not over-tighten']
      },
      {
        title: 'Making a Simple Tool Box',
        category: 'Woodworking',
        type: 'Video',
        duration: '12 min',
        author: 'Dimas - SMK Teknik Furnitur',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&h=450&fit=crop',
        description: 'Build a sturdy wooden tool box from scratch.',
        toolsNeeded: ['Plywood', 'Wood screws', 'Wood glue', 'Saw', 'Drill', 'Sandpaper'],
        steps: [
          { stepNumber: 1, title: 'Cut the Wood Pieces', description: 'Measure and cut according to plan.' },
          { stepNumber: 2, title: 'Sand All Surfaces', description: 'Start with 120 then 220 grit.' },
          { stepNumber: 3, title: 'Assemble the Box', description: 'Glue and screw pieces together.' },
          { stepNumber: 4, title: 'Add Handle', description: 'Mount the handle securely.' },
          { stepNumber: 5, title: 'Apply Finish', description: 'Stain and seal the wood.' }
        ],
        safetyTips: ['Wear safety glasses', 'Keep fingers away from blade', 'Work in ventilated area']
      },
      {
        title: 'Basic Engine Maintenance',
        category: 'Automotive Repair',
        type: 'Article',
        duration: '7 min read',
        author: 'Andi - SMK Teknik Otomotif',
        difficulty: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=450&fit=crop',
        description: 'Learn essential engine maintenance procedures.',
        toolsNeeded: ['Socket set', 'Oil filter wrench', 'Oil drain pan', 'New oil', 'Air filter'],
        steps: [
          { stepNumber: 1, title: 'Check Oil Level', description: 'Use the dipstick.' },
          { stepNumber: 2, title: 'Change Engine Oil', description: 'Drain old oil completely.' },
          { stepNumber: 3, title: 'Replace Oil Filter', description: 'Install new filter hand-tight.' },
          { stepNumber: 4, title: 'Check Air Filter', description: 'Inspect and replace if dirty.' },
          { stepNumber: 5, title: 'Inspect Belts', description: 'Check for cracks and wear.' },
          { stepNumber: 6, title: 'Top Off Fluids', description: 'Check coolant and brake fluid.' }
        ],
        safetyTips: ['Never work under car on jack only', 'Let engine cool', 'Dispose oil properly']
      },
      {
        title: 'Installing PVC Pipes for Plumbing',
        category: 'Home Repair',
        type: 'Video',
        duration: '15 min',
        author: 'Bayu - SMK Teknik Bangunan',
        difficulty: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=450&fit=crop',
        description: 'Master PVC plumbing installation for home projects.',
        toolsNeeded: ['PVC pipes', 'PVC cement', 'PVC cutter', 'Measuring tape', 'Deburring tool'],
        steps: [
          { stepNumber: 1, title: 'Plan and Measure', description: 'Sketch layout and measure.' },
          { stepNumber: 2, title: 'Cut the Pipes', description: 'Use PVC cutter for clean cuts.' },
          { stepNumber: 3, title: 'Deburr and Clean', description: 'Remove all burrs.' },
          { stepNumber: 4, title: 'Dry Fit', description: 'Assemble without glue first.' },
          { stepNumber: 5, title: 'Apply Cement', description: 'Glue and assemble quickly.' },
          { stepNumber: 6, title: 'Test', description: 'Run water to check for leaks.' }
        ],
        safetyTips: ['Work in ventilated area', 'Wear gloves', 'Follow cure times']
      },
      {
        title: 'Basic MIG Welding Techniques',
        category: 'Welding',
        type: 'Video',
        duration: '20 min',
        author: 'Heri - SMK Teknik Mesin',
        difficulty: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
        description: 'Advanced MIG welding techniques for professional fabrication.',
        toolsNeeded: ['MIG welder', 'Welding helmet', 'Welding gloves', 'Wire brush', 'Angle grinder'],
        steps: [
          { stepNumber: 1, title: 'Set Up Settings', description: 'Configure wire and voltage.' },
          { stepNumber: 2, title: 'Prepare Joints', description: 'V-groove thick materials.' },
          { stepNumber: 3, title: 'Master Technique', description: 'Practice push and drag.' },
          { stepNumber: 4, title: 'Control Weld Pool', description: 'Maintain arc length.' },
          { stepNumber: 5, title: 'Multi-Pass', description: 'Layer beads properly.' },
          { stepNumber: 6, title: 'Troubleshoot', description: 'Identify and fix defects.' }
        ],
        safetyTips: ['Never bypass safety interlocks', 'Use proper PPE', 'Maintain fire watch']
      }
    ];

    await Content.deleteMany({});
    await Content.insertMany(contents);

    res.json({ message: 'Database seeded successfully!', count: contents.length });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
