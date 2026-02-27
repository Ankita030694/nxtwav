// Course data types and real course offerings

export type CourseCategory = "production" | "djing" | "artist-dev";
export type CourseLevel = "beginner" | "intermediate" | "advanced" | "all-levels";

export interface CourseSession {
  sessionNumber: number;
  title: string;
  duration: number; // hours
  objectives: string[];
  topics: string[];
  exercise: string;
}

export interface Instructor {
  id: string;
  name: string;
  stageName: string;
  photo: string;
  bio: string;
  specialty: string;
  socialLinks?: {
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
  };
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: CourseCategory;
  description: string;
  longDescription: string;
  duration: {
    months?: number;
    weeks?: number;
  };
  price: number;
  level: CourseLevel;
  instructorId: string;
  sessions: CourseSession[];
  sessionsPerWeek: number;
  totalSessions: number;
  totalHours: number;
  learningOutcomes: string[];
  prerequisites: string;
  whatsIncluded: string[];
  featured?: boolean;
}

// Founders/Instructors data
export const instructors: Instructor[] = [
  {
    id: "siddharth",
    name: "Siddharth Sethi",
    stageName: "BEATCRUSH",
    photo: "/placeholder.svg", // Will be replaced with actual photo
    bio: "With over 8 years in the music industry, Siddharth has performed at major clubs and festivals across India. His productions have garnered millions of streams, and he specializes in electronic music production and sound design. As a co-founder of NXTwav, he brings hands-on industry experience to every session.",
    specialty: "Production & Sound Design",
    socialLinks: {
      instagram: "https://instagram.com/beatcrush",
      spotify: "https://open.spotify.com/artist/beatcrush",
    },
  },
  {
    id: "lakshay",
    name: "Lakshay",
    stageName: "SKOPOS",
    photo: "/placeholder.svg", // Will be replaced with actual photo
    bio: "Lakshay is a seasoned DJ with residencies at top venues and experience performing at weddings, corporate events, and festivals. Known for his technical prowess and ability to read any crowd, he has mentored dozens of aspiring DJs. At NXTwav, he leads the DJ training programs with a focus on real-world performance skills.",
    specialty: "DJ Performance & Turntablism",
    socialLinks: {
      instagram: "https://instagram.com/skopos",
      soundcloud: "https://soundcloud.com/skopos",
    },
  },
  {
    id: "kanav",
    name: "Kanav Kumar",
    stageName: "SLCT",
    photo: "/placeholder.svg", // Will be replaced with actual photo
    bio: "Kanav brings a unique blend of artistic vision and business acumen to NXTwav. With experience managing artist careers, coordinating releases, and building brands in the music industry, he focuses on the business side of music. His expertise helps students understand not just how to make music, but how to build sustainable careers.",
    specialty: "Artist Development & Business",
    socialLinks: {
      instagram: "https://instagram.com/slct",
    },
  },
  {
    id: "sureal",
    name: "Su Real",
    stageName: "SU REAL",
    photo: "/placeholder.svg", // Will be replaced with actual photo
    bio: "Su Real is an internationally acclaimed producer and DJ known for pioneering bass music in India. With releases on major labels and performances at international festivals, he brings world-class expertise to the Pro Remix Alchemy program as a guest mentor.",
    specialty: "Remix Production & Bass Music",
    socialLinks: {
      instagram: "https://instagram.com/sureal",
      spotify: "https://open.spotify.com/artist/sureal",
    },
  },
];

// Category metadata
export const categoryInfo: Record<CourseCategory, { label: string; color: string; description: string }> = {
  production: {
    label: "Music Production Launchpad",
    color: "primary", // Cyan
    description: "Master the art of music production from DAW basics to professional releases",
  },
  djing: {
    label: "DJing Essentials",
    color: "secondary", // Purple
    description: "Learn DJ techniques from beatmatching to commanding the crowd",
  },
  "artist-dev": {
    label: "Artist Development Programme",
    color: "accent", // Hot Pink/Green accent
    description: "Build your brand and career with industry-focused training",
  },
};

// All courses data
export const courses: Course[] = [
  // ===== MUSIC PRODUCTION LAUNCHPAD =====
  {
    id: "daw-fundamentals",
    slug: "daw-fundamentals",
    title: "DAW Fundamentals",
    tagline: "Master your Digital Audio Workstation from the ground up",
    category: "production",
    description: "Learn the fundamentals of Digital Audio Workstations (DAW). Perfect for absolute beginners looking to start their production journey.",
    longDescription: "This intensive 1-month program takes you from zero to confident DAW user. You'll learn interface navigation, basic recording, MIDI programming, and essential editing techniques. By the end, you'll have a solid foundation to build upon in more advanced courses.",
    duration: { months: 1 },
    price: 40000,
    level: "beginner",
    instructorId: "siddharth",
    sessionsPerWeek: 3,
    totalSessions: 12,
    totalHours: 24,
    learningOutcomes: [
      "Navigate your DAW interface with confidence",
      "Record and edit audio and MIDI",
      "Understand signal flow and routing",
      "Create your first complete project",
      "Export production-ready files",
    ],
    prerequisites: "None - perfect for absolute beginners",
    whatsIncluded: [
      "12 live sessions (2 hours each)",
      "Session recordings for revision",
      "Project files and templates",
      "Community Discord access",
      "Certificate of completion",
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Introduction to DAW",
        duration: 2,
        objectives: ["Understand the DAW interface", "Learn basic audio concepts", "Set up your first project"],
        topics: ["DAW overview and history", "Interface tour", "Audio I/O setup", "Creating projects"],
        exercise: "Set up your DAW and record a short audio snippet",
      },
      {
        sessionNumber: 2,
        title: "Audio Recording Basics",
        duration: 2,
        objectives: ["Master audio recording", "Understand levels and monitoring", "Learn basic editing"],
        topics: ["Microphone types and placement", "Recording levels", "Monitoring setup", "Basic audio editing"],
        exercise: "Record a vocal or instrument and perform basic edits",
      },
      {
        sessionNumber: 3,
        title: "MIDI Fundamentals",
        duration: 2,
        objectives: ["Understand MIDI concepts", "Program MIDI sequences", "Use virtual instruments"],
        topics: ["MIDI vs Audio", "MIDI recording", "Piano roll editing", "Virtual instruments intro"],
        exercise: "Create a simple MIDI melody using a virtual instrument",
      },
      {
        sessionNumber: 4,
        title: "Track Management",
        duration: 2,
        objectives: ["Organize complex projects", "Use groups and buses", "Manage large sessions"],
        topics: ["Track types", "Grouping and busing", "Color coding", "Session organization"],
        exercise: "Organize a multi-track project with proper routing",
      },
      {
        sessionNumber: 5,
        title: "Basic Mixing Concepts",
        duration: 2,
        objectives: ["Understand mixing fundamentals", "Use volume and panning", "Create balance"],
        topics: ["What is mixing?", "Volume automation", "Panning basics", "Creating space"],
        exercise: "Create a basic mix of a provided multi-track session",
      },
      {
        sessionNumber: 6,
        title: "Effects Introduction",
        duration: 2,
        objectives: ["Use common effects", "Understand insert vs send", "Apply EQ and compression"],
        topics: ["Effect types overview", "Insert effects", "Send effects", "Basic EQ and compression"],
        exercise: "Apply effects to enhance a mix",
      },
      {
        sessionNumber: 7,
        title: "Arrangement Basics",
        duration: 2,
        objectives: ["Understand song structure", "Create arrangements", "Use markers and regions"],
        topics: ["Song structure", "Arrangement view", "Markers and locators", "Loop vs linear"],
        exercise: "Arrange a song from intro to outro",
      },
      {
        sessionNumber: 8,
        title: "Sampling and Loops",
        duration: 2,
        objectives: ["Work with samples", "Time-stretch and warp", "Create loop-based music"],
        topics: ["Sample libraries", "Warping and stretching", "Loop creation", "Sample manipulation"],
        exercise: "Create a beat using samples and loops",
      },
      {
        sessionNumber: 9,
        title: "Automation Deep Dive",
        duration: 2,
        objectives: ["Master automation", "Create dynamic changes", "Automate any parameter"],
        topics: ["Automation modes", "Drawing automation", "Clip automation", "Creative uses"],
        exercise: "Create an automated mix with dynamic changes",
      },
      {
        sessionNumber: 10,
        title: "Exporting and Formats",
        duration: 2,
        objectives: ["Export in various formats", "Understand file types", "Prepare for distribution"],
        topics: ["Export settings", "File formats", "Stems export", "Mastering prep"],
        exercise: "Export a project in multiple formats",
      },
      {
        sessionNumber: 11,
        title: "Workflow Optimization",
        duration: 2,
        objectives: ["Speed up your workflow", "Use keyboard shortcuts", "Create templates"],
        topics: ["Keyboard shortcuts", "Templates creation", "Custom preferences", "Workflow tips"],
        exercise: "Create a personal template for future projects",
      },
      {
        sessionNumber: 12,
        title: "Final Project",
        duration: 2,
        objectives: ["Complete a full project", "Apply all learned skills", "Present your work"],
        topics: ["Project review", "Final mixing", "Export and presentation", "Next steps"],
        exercise: "Complete and present your final DAW project",
      },
    ],
  },
  {
    id: "intro-to-music-production",
    slug: "intro-to-music-production",
    title: "Introduction to Music Production",
    tagline: "Your comprehensive guide to creating professional music",
    category: "production",
    description: "Comprehensive introduction to music production covering composition, sound design, arrangement, and production workflow. Students complete production-ready tracks.",
    longDescription: "This 3-month intensive program transforms you from a beginner into a capable music producer. You'll master composition, sound design, arrangement, and mixing fundamentals while creating your own original tracks. By the end, you'll have a portfolio of production-ready music.",
    duration: { months: 3 },
    price: 100000,
    level: "intermediate",
    instructorId: "siddharth",
    sessionsPerWeek: 3,
    totalSessions: 36,
    totalHours: 72,
    featured: true,
    learningOutcomes: [
      "Compose original music in multiple genres",
      "Design unique sounds from scratch",
      "Arrange tracks with professional structure",
      "Mix your productions to release quality",
      "Develop your unique artistic voice",
    ],
    prerequisites: "DAW Fundamentals or basic DAW knowledge",
    whatsIncluded: [
      "36 live sessions (2 hours each)",
      "All session recordings",
      "Premium sample packs",
      "1-on-1 feedback sessions",
      "Community Discord access",
      "Certificate of completion",
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Production Mindset & Setup",
        duration: 2,
        objectives: ["Understand the producer's role", "Optimize your setup", "Set creative goals"],
        topics: ["What makes a great producer", "Studio ergonomics", "Listening environment", "Goal setting"],
        exercise: "Audit and optimize your production setup",
      },
      // Additional sessions would be added here...
      {
        sessionNumber: 36,
        title: "Final Showcase",
        duration: 2,
        objectives: ["Present your EP", "Receive feedback", "Plan next steps"],
        topics: ["Portfolio presentation", "Industry feedback", "Career planning", "Continuing education"],
        exercise: "Present your completed EP to the class",
      },
    ],
  },
  {
    id: "advanced-production-mastery",
    slug: "advanced-production-mastery",
    title: "Advanced Production Mastery",
    tagline: "Achieve professional-grade production excellence",
    category: "production",
    description: "Master professional-grade production techniques including advanced mixing, mastering, genre-specific production, and music business fundamentals.",
    longDescription: "This intensive 5-month program is designed for producers ready to reach professional levels. You'll master advanced mixing and mastering techniques, develop genre expertise, and learn the business side of music production. Graduate with release-ready productions and industry connections.",
    duration: { months: 5 },
    price: 175000,
    level: "advanced",
    instructorId: "siddharth",
    sessionsPerWeek: 3,
    totalSessions: 60,
    totalHours: 120,
    learningOutcomes: [
      "Mix and master at commercial quality",
      "Produce in multiple genres with expertise",
      "Collaborate professionally with artists",
      "Navigate the music business",
      "Build a sustainable production career",
    ],
    prerequisites: "Introduction to Music Production or equivalent experience",
    whatsIncluded: [
      "60 live sessions (2 hours each)",
      "All session recordings",
      "Premium plugin recommendations",
      "Industry guest lectures",
      "1-on-1 mentorship sessions",
      "Label submission preparation",
      "Community Discord access",
      "Certificate of completion",
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Advanced Production Philosophy",
        duration: 2,
        objectives: ["Define your production identity", "Understand professional workflows", "Set mastery goals"],
        topics: ["Professional mindset", "Workflow optimization", "Quality standards", "Goal setting"],
        exercise: "Analyze and document your current production process",
      },
      // Additional sessions would be added here...
      {
        sessionNumber: 60,
        title: "Graduation & Industry Launch",
        duration: 2,
        objectives: ["Graduate with portfolio", "Industry networking", "Career launch"],
        topics: ["Portfolio review", "Networking strategies", "Career paths", "Continuing growth"],
        exercise: "Present your professional portfolio",
      },
    ],
  },

  // ===== DJING ESSENTIALS =====
  {
    id: "dj-beginner",
    slug: "dj-beginner",
    title: "DJ Beginner",
    tagline: "Start your DJ journey with solid fundamentals",
    category: "djing",
    description: "Learn the fundamentals of DJing including beatmatching, mixing, equipment operation, and basic performance skills. Perfect for aspiring DJs.",
    longDescription: "This 1-month program gives you everything you need to start DJing. From understanding equipment to mastering beatmatching and basic mixing, you'll build the foundation for your DJ career. By the end, you'll be ready to practice confidently on your own.",
    duration: { months: 1 },
    price: 35000,
    level: "beginner",
    instructorId: "lakshay",
    sessionsPerWeek: 2,
    totalSessions: 8,
    totalHours: 16,
    learningOutcomes: [
      "Beatmatch tracks by ear",
      "Execute basic mixing techniques",
      "Operate DJ controllers and CDJs",
      "Build and organize a music library",
      "Understand basic crowd reading",
    ],
    prerequisites: "None - perfect for complete beginners",
    whatsIncluded: [
      "8 live sessions (2 hours each)",
      "Session recordings",
      "Music library starter pack",
      "Equipment buying guide",
      "Community Discord access",
      "Certificate of completion",
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Introduction to DJing",
        duration: 2,
        objectives: ["Understand DJ culture and history", "Learn equipment basics", "Set up for practice"],
        topics: ["DJ history and culture", "Equipment overview", "Software setup", "Headphone cueing"],
        exercise: "Set up DJ software and explore the interface",
      },
      {
        sessionNumber: 2,
        title: "Understanding Rhythm",
        duration: 2,
        objectives: ["Count beats and bars", "Identify song structure", "Understand BPM"],
        topics: ["Beats, bars, and phrases", "Song structure", "BPM and tempo", "Rhythm exercises"],
        exercise: "Analyze 10 tracks for structure and BPM",
      },
      {
        sessionNumber: 3,
        title: "Beatmatching Fundamentals",
        duration: 2,
        objectives: ["Match tempo by ear", "Align beats manually", "Maintain sync"],
        topics: ["Manual beatmatching", "Pitch control", "Nudging techniques", "Practice methods"],
        exercise: "Beatmatch 5 track pairs without sync",
      },
      {
        sessionNumber: 4,
        title: "Basic Mixing Techniques",
        duration: 2,
        objectives: ["Execute basic transitions", "Use EQ for mixing", "Create smooth blends"],
        topics: ["Crossfader techniques", "EQ mixing basics", "Blending tracks", "Transition timing"],
        exercise: "Create a 15-minute mix with smooth transitions",
      },
      {
        sessionNumber: 5,
        title: "Music Library Management",
        duration: 2,
        objectives: ["Organize your music", "Tag and categorize tracks", "Build crates"],
        topics: ["File organization", "Tagging systems", "Crate building", "Legal music sources"],
        exercise: "Organize and tag 50 tracks properly",
      },
      {
        sessionNumber: 6,
        title: "Effects and Creativity",
        duration: 2,
        objectives: ["Use basic effects", "Add creativity to mixes", "Understand effect types"],
        topics: ["Filter effects", "Echo and delay", "Creative transitions", "Effect control"],
        exercise: "Create a mix incorporating 3 different effects",
      },
      {
        sessionNumber: 7,
        title: "Reading the Room",
        duration: 2,
        objectives: ["Understand crowd psychology", "Read energy levels", "Adapt your set"],
        topics: ["Crowd psychology basics", "Energy management", "Track selection", "Adaptability"],
        exercise: "Plan 3 different energy journeys for a set",
      },
      {
        sessionNumber: 8,
        title: "Your First Set",
        duration: 2,
        objectives: ["Prepare a complete set", "Handle nerves", "Perform confidently"],
        topics: ["Set preparation", "Performance mindset", "Troubleshooting", "Next steps"],
        exercise: "Perform a 30-minute showcase set",
      },
    ],
  },
  {
    id: "dj-artistry-program",
    slug: "dj-artistry-program",
    title: "DJ Artistry Program",
    tagline: "Elevate your DJing to an art form",
    category: "djing",
    description: "Develop your DJ artistry with advanced mixing techniques, set construction, live performance skills, and crowd management. Graduate performance-ready.",
    longDescription: "This 2-month program transforms competent DJs into artists. You'll master advanced techniques, develop your signature style, and learn to command any room. With live performance practice and industry insights, you'll graduate ready for club and festival stages.",
    duration: { months: 2 },
    price: 60000,
    level: "advanced",
    instructorId: "lakshay",
    sessionsPerWeek: 2,
    totalSessions: 16,
    totalHours: 32,
    learningOutcomes: [
      "Execute advanced mixing techniques",
      "Develop your signature DJ style",
      "Construct compelling set journeys",
      "Command crowds with confidence",
      "Handle any live performance scenario",
    ],
    prerequisites: "DJ Beginner or equivalent experience",
    whatsIncluded: [
      "16 live sessions (2 hours each)",
      "All session recordings",
      "Advanced technique tutorials",
      "Live performance opportunities",
      "Industry networking events",
      "1-on-1 mentorship",
      "Community Discord access",
      "Certificate of completion",
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "The DJ as Artist",
        duration: 2,
        objectives: ["Define your artistic vision", "Analyze DJ legends", "Set creative goals"],
        topics: ["DJ artistry concepts", "Legendary DJs analysis", "Finding your voice", "Goal setting"],
        exercise: "Write your DJ artist statement",
      },
      // Additional sessions would be added here...
      {
        sessionNumber: 16,
        title: "Graduation Performance",
        duration: 2,
        objectives: ["Deliver a showcase set", "Demonstrate mastery", "Celebrate achievements"],
        topics: ["Final performance", "Peer feedback", "Industry next steps", "Career planning"],
        exercise: "Perform your 45-minute graduation set",
      },
    ],
  },

  // ===== ARTIST DEVELOPMENT PROGRAMME =====
  {
    id: "pro-remix-alchemy",
    slug: "pro-remix-alchemy",
    title: "Pro Remix Alchemy with Su Real",
    tagline: "Master the art of remixing with a world-class producer",
    category: "artist-dev",
    description: "Exclusive remix masterclass with renowned producer Su Real. Learn professional remixing techniques and contribute to a compilation album release.",
    longDescription: "This unique 1-month program pairs you with internationally acclaimed producer Su Real for an intensive remix masterclass. You'll learn professional remixing techniques, creative interpretation, and advanced sound design. The program culminates in a compilation album featuring remixes from all students, professionally released and marketed.",
    duration: { months: 1 },
    price: 50000,
    level: "advanced",
    instructorId: "sureal",
    sessionsPerWeek: 2,
    totalSessions: 9,
    totalHours: 18,
    featured: true,
    learningOutcomes: [
      "Create professional-quality remixes",
      "Develop creative interpretation skills",
      "Master advanced sound design for remixes",
      "Collaborate at a professional level",
      "Get a real release on a compilation album",
    ],
    prerequisites: "Some music production experience recommended",
    whatsIncluded: [
      "8 regular sessions + 1 album recording session",
      "Direct mentorship from Su Real",
      "Original stems for remixing",
      "Compilation album release credit",
      "Professional marketing materials",
      "Industry collaboration experience",
      "Community Discord access",
      "Certificate of completion",
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "The Remix Mindset",
        duration: 2,
        objectives: ["Understand remix philosophy", "Analyze successful remixes", "Plan your approach"],
        topics: ["What makes a great remix", "Creative interpretation", "Respecting originals", "Finding your angle"],
        exercise: "Analyze 5 successful remixes and their approaches",
      },
      {
        sessionNumber: 2,
        title: "Deconstructing Originals",
        duration: 2,
        objectives: ["Analyze original tracks", "Identify key elements", "Plan reconstruction"],
        topics: ["Stem analysis", "Key element identification", "Mood and energy mapping", "Creative planning"],
        exercise: "Deconstruct the provided original track",
      },
      {
        sessionNumber: 3,
        title: "Creative Reinterpretation",
        duration: 2,
        objectives: ["Transform original elements", "Add your signature", "Build new arrangements"],
        topics: ["Element transformation", "Adding personality", "New arrangement structures", "Genre bending"],
        exercise: "Create 3 different remix concepts for the same track",
      },
      {
        sessionNumber: 4,
        title: "Sound Design for Remixes",
        duration: 2,
        objectives: ["Design remix-specific sounds", "Create signature elements", "Build sonic identity"],
        topics: ["Sound design techniques", "Creating hooks", "Signature sounds", "Texture and layers"],
        exercise: "Design 5 unique sounds for your remix",
      },
      {
        sessionNumber: 5,
        title: "Production Techniques",
        duration: 2,
        objectives: ["Apply advanced production", "Polish your remix", "Achieve professional quality"],
        topics: ["Advanced processing", "Mixing for impact", "Energy management", "Professional polish"],
        exercise: "Complete 50% of your remix",
      },
      {
        sessionNumber: 6,
        title: "Mixing Your Remix",
        duration: 2,
        objectives: ["Mix your remix professionally", "Create balance and impact", "Prepare for mastering"],
        topics: ["Remix-specific mixing", "Balancing old and new", "Impact and clarity", "Pre-master prep"],
        exercise: "Complete your remix mix",
      },
      {
        sessionNumber: 7,
        title: "Final Touches & Feedback",
        duration: 2,
        objectives: ["Finalize your remix", "Receive mentor feedback", "Make final adjustments"],
        topics: ["Final review", "Su Real feedback", "Adjustments", "Polish"],
        exercise: "Finalize your remix based on feedback",
      },
      {
        sessionNumber: 8,
        title: "Mastering & Preparation",
        duration: 2,
        objectives: ["Prepare for album release", "Understand mastering", "Final submissions"],
        topics: ["Mastering basics", "Release preparation", "File formats", "Submission"],
        exercise: "Submit your final remix for the compilation",
      },
      {
        sessionNumber: 9,
        title: "Compilation Album Recording",
        duration: 2,
        objectives: ["Participate in album creation", "Experience professional release", "Celebrate achievements"],
        topics: ["Album sequencing", "Release strategy", "Marketing materials", "Launch planning"],
        exercise: "Contribute to album notes and materials",
      },
    ],
  },
];

// Helper functions
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return courses.filter((course) => course.category === category);
}

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
