const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Content = require('./models/Content');

dotenv.config();

const contents = [
  {
    title: 'How to Change Motorcycle Oil',
    category: 'Automotive Repair',
    type: 'Video',
    duration: '8 min',
    author: 'Ahmad - SMK Teknik Otomotif',
    difficulty: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
    description: 'Learn the fundamentals of changing motorcycle oil with this comprehensive guide. Regular oil changes are essential for maintaining your motorcycle engine performance and longevity. This tutorial covers everything from selecting the right oil to proper disposal of old oil.',
    toolsNeeded: [
      'Socket wrench set',
      'Oil filter wrench',
      'Drain pan',
      'Funnel',
      'New engine oil (10W-40)',
      'New oil filter',
      'Gloves',
      'Rags'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prepare Your Motorcycle',
        description: 'Let the engine cool down for a few minutes. Place the motorcycle on a center stand or paddock stand to keep it stable. Remove any fairing panels if necessary.'
      },
      {
        stepNumber: 2,
        title: 'Locate and Remove Drain Plug',
        description: 'Place the drain pan under the engine. Use the appropriate socket wrench to loosen the drain plug. Remove the plug carefully and let the old oil drain completely.'
      },
      {
        stepNumber: 3,
        title: 'Replace the Oil Filter',
        description: 'Use the oil filter wrench to remove the old filter. Apply a thin layer of new oil to the rubber gasket of the new filter. Install the new filter by hand, tightening it until it seats.'
      },
      {
        stepNumber: 4,
        title: 'Reinstall Drain Plug',
        description: 'Clean the drain plug and replace the washer if needed. Reinstall the drain plug and tighten it to the manufacturer specification using a torque wrench.'
      },
      {
        stepNumber: 5,
        title: 'Add New Oil',
        description: 'Insert a funnel into the oil fill port. Add the recommended amount of new oil slowly, checking the level with the dipstick. Start the engine and let it idle for a minute.'
      },
      {
        stepNumber: 6,
        title: 'Check Oil Level',
        description: 'Turn off the engine and wait a minute. Check the oil level on the dipstick. Add more oil if necessary to reach the proper level. Dispose of old oil responsibly.'
      }
    ],
    safetyTips: [
      'Always wear gloves when handling hot oil',
      'Never work on a hot engine - let it cool first',
      'Ensure the motorcycle is properly supported',
      'Dispose of old oil at a recycling center',
      'Keep rags handy for spills',
      'Never mix different oil types'
    ]
  },
  {
    title: 'Basic Welding for Metal Frame',
    category: 'Welding',
    type: 'Article',
    duration: '6 min read',
    author: 'Budi - SMK Teknik Mesin',
    difficulty: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=450&fit=crop',
    description: 'Master the basics of MIG welding for metal frame construction. This guide covers essential welding techniques, safety precautions, and common applications in metal fabrication. Perfect for beginners looking to start their welding journey.',
    toolsNeeded: [
      'MIG welder',
      'Welding helmet (auto-darkening)',
      'Welding gloves',
      'Welding jacket',
      'Wire brush',
      'Clamps',
      'Metal filler rods',
      'Angle grinder'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Set Up Your Workspace',
        description: 'Ensure proper ventilation in your workspace. Clear any flammable materials. Set up the MIG welder according to manufacturer settings for the metal thickness you are working with.'
      },
      {
        stepNumber: 2,
        title: 'Prepare the Metal',
        description: 'Clean the metal surfaces to be welded using a wire brush. Remove any rust, paint, or debris. Clamp the pieces firmly in position ensuring proper alignment.'
      },
      {
        stepNumber: 3,
        title: 'Adjust Welder Settings',
        description: 'Set the wire feed speed and voltage according to the metal thickness. For mild steel 3mm, typically use 18-20V and wire speed around 5-6 m/min.'
      },
      {
        stepNumber: 4,
        title: 'Practice Welding Technique',
        description: 'Hold the torch at a 15-20 degree angle. Maintain a consistent distance from the workpiece. Move steadily along the joint, watching the weld pool.'
      },
      {
        stepNumber: 5,
        title: 'Create the Weld Bead',
        description: 'Start the arc and establish a weld pool. Move the torch in a smooth, consistent motion. Ensure proper penetration without excessive spatter.'
      },
      {
        stepNumber: 6,
        title: 'Inspect and Finish',
        description: 'Allow the weld to cool naturally. Inspect the bead for any defects. Use an angle grinder to clean up any spatter or uneven areas.'
      }
    ],
    safetyTips: [
      'Always wear proper PPE - helmet, gloves, jacket',
      'Ensure adequate ventilation or use fume extraction',
      'Keep a fire extinguisher nearby',
      'Never weld on containers that held flammable materials',
      'Allow welds to cool before handling',
      'Inspect equipment before each use'
    ]
  },
  {
    title: 'Installing a Simple Light Switch',
    category: 'Electrical Installation',
    type: 'Video',
    duration: '10 min',
    author: 'Sinta - SMK Teknik Listrik',
    difficulty: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=450&fit=crop',
    description: 'A complete guide to safely installing a single-pole light switch. Learn about electrical safety, wiring connections, and proper installation techniques. This fundamental skill is essential for any home electrical work.',
    toolsNeeded: [
      'Voltage tester',
      'Flathead screwdriver',
      'Phillips screwdriver',
      'Wire strippers',
      'Electrical tape',
      'New light switch',
      'Wire nuts',
      'Flashlight'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Turn Off Power',
        description: 'Locate the circuit breaker for the area. Turn OFF the power at the breaker box. Use a voltage tester to confirm power is off at the switch.'
      },
      {
        stepNumber: 2,
        title: 'Remove Existing Switch',
        description: 'Remove the switch cover plate. Unscrew the switch from the electrical box. Carefully pull the switch out without damaging wires.'
      },
      {
        stepNumber: 3,
        title: 'Identify Wires',
        description: 'Identify the hot (black) wire, neutral (white) wire, and ground (green/bare) wire. Note which wire connects to which terminal on the old switch.'
      },
      {
        stepNumber: 4,
        title: 'Disconnect Old Wires',
        description: 'Loosen the terminal screws on the old switch. Remove the wires from the old switch. Straighten any bent wires for the new connection.'
      },
      {
        stepNumber: 5,
        title: 'Connect New Switch',
        description: 'Connect the black (hot) wire to the brass/gold screw. Connect the white (neutral) wire to the silver screw. Connect the ground wire to the green screw.'
      },
      {
        stepNumber: 6,
        title: 'Install and Test',
        description: 'Carefully push the switch into the box. Secure with mounting screws. Install the cover plate. Turn on power and test the switch.'
      }
    ],
    safetyTips: [
      'ALWAYS turn off power at the breaker',
      'Always verify power is off with a tester',
      'Never work on live wires',
      'Use insulated tools',
      'Follow local electrical codes',
      'If unsure, consult a licensed electrician'
    ]
  },
  {
    title: 'Repairing a Leaking Faucet',
    category: 'Home Repair',
    type: 'Article',
    duration: '5 min read',
    author: 'Riko - SMK Teknik Bangunan',
    difficulty: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=450&fit=crop',
    description: 'Fix a dripping faucet with this step-by-step guide. Learn to identify different faucet types and replace worn washers and cartridges. Save water and avoid expensive plumber fees with this essential DIY skill.',
    toolsNeeded: [
      'Adjustable wrench',
      'Screwdriver set',
      'Replacement washers/O-rings',
      'Plumber tape',
      'Plumber grease',
      'Towels',
      'Bucket',
      'Pliers'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Turn Off Water Supply',
        description: 'Locate the shut-off valves under the sink. Turn both hot and cold valves clockwise to close. Open the faucet to release any remaining pressure.'
      },
      {
        stepNumber: 2,
        title: 'Remove Handle',
        description: 'Remove any decorative cap on the handle. Unscrew the handle screw. Gently pull the handle off the stem.'
      },
      {
        stepNumber: 3,
        title: 'Remove Stem or Cartridge',
        description: 'Use the wrench to unscrew the packing nut. Remove the stem by pulling straight up. For cartridge faucets, pull out the entire cartridge.'
      },
      {
        stepNumber: 4,
        title: 'Inspect and Replace Parts',
        description: 'Examine the washer, O-ring, and cartridge for wear. Bring old parts to the hardware store for exact replacements. Apply plumber grease to new parts before installation.'
      },
      {
        stepNumber: 5,
        title: 'Reassemble Faucet',
        description: 'Insert the new stem or cartridge into position. Reinstall the packing nut and tighten. Reattach the handle with the screw.'
      },
      {
        stepNumber: 6,
        title: 'Test the Repair',
        description: 'Turn the water supply back on. Check for leaks around the handle. Let the faucet run for a minute to clear any debris.'
      }
    ],
    safetyTips: [
      'Always turn off water before starting repair',
      'Keep a bucket nearby for water drainage',
      'Use towels to protect the sink surface',
      'Do not over-tighten nuts and screws',
      'Buy exact replacement parts for your faucet model',
      'Know where your main water shutoff is'
    ]
  },
  {
    title: 'Making a Simple Tool Box',
    category: 'Woodworking',
    type: 'Video',
    duration: '12 min',
    author: 'Dimas - SMK Teknik Furnitur',
    difficulty: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&h=450&fit=crop',
    description: 'Build a sturdy wooden tool box from scratch using basic woodworking techniques. This project teaches fundamental skills like measuring, cutting, joining, and finishing. Perfect for beginners ready to advance their woodworking abilities.',
    toolsNeeded: [
      'Plywood (12mm)',
      'Wood screws',
      'Wood glue',
      'Saw (hand saw or circular saw)',
      'Drill',
      'Measuring tape',
      'Square',
      'Sandpaper (120, 220 grit)',
      'Wood stain or paint',
      'Handles'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cut the Wood Pieces',
        description: 'Measure and mark all pieces according to the cut list. Cut the bottom (40x25cm), two sides (25x20cm), and two ends (40x20cm). Use a saw guide for straight cuts.'
      },
      {
        stepNumber: 2,
        title: 'Sand All Surfaces',
        description: 'Start with 120-grit sandpaper to remove rough spots. Progress to 220-grit for a smooth finish. Sand all edges and corners carefully.'
      },
      {
        stepNumber: 3,
        title: 'Assemble the Box Base',
        description: 'Apply wood glue to the edges of the bottom piece. Attach side panels using clamps. Secure with wood screws every 10cm.'
      },
      {
        stepNumber: 4,
        title: 'Install the Ends',
        description: 'Attach the front and back panels to the sides. Ensure all corners are square using a carpenter square. Drive screws from the bottom and sides.'
      },
      {
        stepNumber: 5,
        title: 'Add Reinforcement and Handle',
        description: 'Install a horizontal brace near the top for strength. Attach metal corners for durability. Mount the handle in the center of the top edge.'
      },
      {
        stepNumber: 6,
        title: 'Apply Finish',
        description: 'Apply wood stain in the direction of the grain. Let it dry completely. Apply a clear coat or paint for protection. Allow final cure time before use.'
      }
    ],
    safetyTips: [
      'Always wear safety glasses when cutting',
      'Keep fingers away from the blade path',
      'Use clamps to secure wood while cutting',
      'Work in a well-ventilated area',
      'Sand all sharp edges to prevent splinters',
      'Allow proper drying time for finishes'
    ]
  },
  {
    title: 'Basic Engine Maintenance',
    category: 'Automotive Repair',
    type: 'Article',
    duration: '7 min read',
    author: 'Andi - SMK Teknik Otomotif',
    difficulty: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=450&fit=crop',
    description: 'Learn essential engine maintenance procedures every car owner should know. This comprehensive guide covers oil changes, filter replacements, and basic inspections that keep your engine running smoothly and extend its lifespan.',
    toolsNeeded: [
      'Socket set',
      'Oil filter wrench',
      'Oil drain pan',
      'Funnel',
      'New engine oil',
      'Oil filter',
      'Air filter',
      'Cabin filter',
      'Torque wrench',
      'Jack and jack stands'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check Engine Oil Level',
        description: 'Park on level ground and let engine cool. Pull the dipstick, wipe clean, reinsert fully. Pull again and check level between MIN and MAX marks.'
      },
      {
        stepNumber: 2,
        title: 'Change Engine Oil',
        description: 'Warm engine for 2-3 minutes to thin oil. Raise vehicle safely with jack stands. Place drain pan under oil pan. Remove drain plug and let oil drain completely.'
      },
      {
        stepNumber: 3,
        title: 'Replace Oil Filter',
        description: 'Locate and remove the old oil filter. Apply thin oil coat to new filter gasket. Install new filter hand-tight only - do not over-tighten.'
      },
      {
        stepNumber: 4,
        title: 'Check and Replace Air Filter',
        description: 'Open the air filter housing clip. Remove old filter and inspect for dirt and damage. Clean inside of housing. Install new filter with proper orientation.'
      },
      {
        stepNumber: 5,
        title: 'Inspect Belts and Hoses',
        description: 'With engine off, visually inspect all belts for cracks. Check hose condition for hardening or soft spots. Squeeze hoses to check for firmness.'
      },
      {
        stepNumber: 6,
        title: 'Top Off Fluids',
        description: 'Check coolant level in overflow tank. Inspect brake fluid level. Check transmission fluid if accessible. Top off windshield washer fluid.'
      }
    ],
    safetyTips: [
      'Never work under a car supported only by a jack',
      'Let engine cool before checking oil',
      'Dispose of old oil and filters properly',
      'Keep work area clean and organized',
      'Use proper lifting techniques',
      'Consult owner manual for specifications'
    ]
  },
  {
    title: 'Installing PVC Pipes for Plumbing',
    category: 'Home Repair',
    type: 'Video',
    duration: '15 min',
    author: 'Bayu - SMK Teknik Bangunan',
    difficulty: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=450&fit=crop',
    description: 'Master PVC plumbing installation for home improvement projects. This guide covers measuring, cutting, gluing, and testing PVC pipe connections. Learn proper techniques for leak-free plumbing installations.',
    toolsNeeded: [
      'PVC pipes and fittings',
      'PVC primer and cement',
      'PVC cutter or hacksaw',
      'Measuring tape',
      'Marker',
      'Deburring tool',
      'Level',
      'Safety glasses',
      'Gloves'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Plan and Measure',
        description: 'Sketch the plumbing layout on paper. Measure all pipe runs carefully. Mark all cut points with a marker. Allow extra length for fittings.'
      },
      {
        stepNumber: 2,
        title: 'Cut the Pipes',
        description: 'Use a PVC cutter for clean cuts. If using a hacksaw, keep the cut perpendicular. Measure twice before cutting. Label each piece for its location.'
      },
      {
        stepNumber: 3,
        title: 'Deburr and Clean',
        description: 'Remove all burrs from pipe ends using a deburring tool. Clean pipe ends and fitting interiors with PVC cleaner. Ensure all surfaces are dry and clean.'
      },
      {
        stepNumber: 4,
        title: 'Dry Fit Assembly',
        description: 'Assemble all pieces without glue to check fit. Ensure all connections are tight. Mark alignment on pipes and fittings. Make any adjustments before gluing.'
      },
      {
        stepNumber: 5,
        title: 'Apply Primer and Cement',
        description: 'Apply PVC primer to both pipe and fitting surfaces. Apply cement while primer is still wet. Work quickly - cement sets in seconds.'
      },
      {
        stepNumber: 6,
        title: 'Assemble and Test',
        description: 'Insert pipe into fitting with a quarter turn. Hold in place for 30 seconds. Allow proper cure time before testing. Run water test to check for leaks.'
      }
    ],
    safetyTips: [
      'Work in well-ventilated areas - cement fumes are toxic',
      'Always wear safety glasses and gloves',
      'Never use PVC cement near open flames',
      'Follow cure times before pressure testing',
      'Check local codes for approved materials',
      'Use proper support and hangers for pipes'
    ]
  },
  {
    title: 'Basic MIG Welding Techniques',
    category: 'Welding',
    type: 'Video',
    duration: '20 min',
    author: 'Heri - SMK Teknik Mesin',
    difficulty: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
    description: 'Advanced MIG welding techniques for professional metal fabrication. This comprehensive tutorial covers advanced bead patterns, different joint types, and troubleshooting common welding defects. Take your welding skills to the next level.',
    toolsNeeded: [
      'MIG welder with correct settings',
      'Welding helmet (auto-darkening)',
      'Welding gloves',
      'Welding jacket',
      'Welding pliers',
      'Wire brush',
      'Angle grinder',
      'Clamps',
      'Anti-spatter spray',
      'Fire extinguisher'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Set Up Advanced Settings',
        description: 'Calculate wire feed speed based on material thickness. Adjust voltage for proper penetration. Set gas flow rate to 20-25 CFH.'
      },
      {
        stepNumber: 2,
        title: 'Prepare Complex Joints',
        description: 'V-groove thick materials for full penetration. Use backing bars for root passes. Properly fit up t-joints and lap joints.'
      },
      {
        stepNumber: 3,
        title: 'Master Push vs Drag Technique',
        description: 'Practice push technique for wider, flatter beads. Use drag technique for deeper penetration. Know when to use each for different applications.'
      },
      {
        stepNumber: 4,
        title: 'Control Weld Pool',
        description: 'Maintain consistent arc length. Watch the puddle for proper fusion. Adjust travel speed based on bead appearance. Keep consistent contact tip distance.'
      },
      {
        stepNumber: 5,
        title: 'Multi-Pass Welding',
        description: 'Clean each pass before the next. Use weaving pattern for wide fills. Maintain interpass temperature. Fill bevels completely.'
      },
      {
        stepNumber: 6,
        title: 'Troubleshoot Defects',
        description: 'Identify porosity and adjust gas coverage. Fix lack of fusion with proper angle. Correct undercut with reduced current. Repair cracks with proper preheat.'
      }
    ],
    safetyTips: [
      'Never bypass safety interlocks on equipment',
      'Use proper PPE at all times',
      'Maintain fire watch for 30 minutes after welding',
      'Ventilate confined spaces properly',
      'Inspect ground clamp connection',
      'Know emergency shutdown procedures'
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    await Content.deleteMany({ });
    console.log('Cleared existing contents...');

    await Content.insertMany(contents);
    console.log('Successfully seeded 8 content items!');

    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
