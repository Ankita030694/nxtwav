// Course data types and real course offerings
import skoposPhoto from "@/assets/faculty/skopos_1.jpg";
import beatcrushPhoto from "@/assets/founders/beatcrush-siddharth-sethi.png";
import slctPhoto from "@/assets/founders/slct-kanav-kumar.png";
import sureal1 from "@/assets/faculty/su_real_1.jpg";
import kamazakiImage from "@/assets/faculty/kamazaki_1.png";
import garryBedi from "@/assets/faculty/garry_bedi_1.png";
import aryamann from "@/assets/faculty/aryaman_1.jpg";
import skipsterPhoto1 from "@/assets/faculty/skipster_1.jpg";

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
  originalPrice?: number;
  level: CourseLevel;
  instructorId?: string;
  instructorIds?: string[];
  sessions: CourseSession[];
  sessionsPerWeek: number;
  totalSessions: number;
  totalHours: number;
  learningOutcomes: string[];
  prerequisites: string;
  whatsIncluded: string[];
  postCourseBenefits?: {
    category: string;
    items: string[];
  }[];
  featured?: boolean;
}

// Founders/Instructors data
export const instructors: Instructor[] = [
  {
    id: "siddharth",
    name: "Siddharth Sethi",
    stageName: "BEATCRUSH",
    photo: beatcrushPhoto,
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
    photo: skoposPhoto,
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
    photo: slctPhoto,
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
    photo: sureal1,
    bio: "Su Real is an internationally acclaimed producer and DJ known for pioneering bass music in India. With releases on major labels and performances at international festivals, he brings world-class expertise to the NXTwav ACADEMY ~ REMIX PRODUCTION MASTERCLASS as a guest mentor.",
    specialty: "Remix Production & Bass Music",
    socialLinks: {
      instagram: "https://www.instagram.com/realsureal/",
    },
  },
  {
    id: "kamazaki",
    name: "Kamazaki",
    stageName: "KAMAZAKI",
    photo: kamazakiImage,
    bio: "Kamazaki is a veteran in the DJing world with over 17+ years of professional experience. Having performed at major venues across the country, he brings a wealth of knowledge in performance-ready artistry and industry awareness.",
    specialty: "DJ Performance & Industry Mastery",
    socialLinks: {
      instagram: "https://www.instagram.com/dishant_kamazaki",
    },
  },
  {
    id: "garry",
    name: "Garry Bedi",
    stageName: "GARRY BEDI",
    photo: garryBedi,
    bio: "Garry Bedi is an industry veteran in the DJing scene with years of experience performing at elite venues. His technical precision and deep understanding of crowd dynamics make him a leading mentor in DJ artistry.",
    specialty: "DJ Performance & Industry Mastery",
    socialLinks: {
      instagram: "https://www.instagram.com/garry_bedii/?hl=en",
    },
  },
  {
    id: "aryaman",
    name: "Aryaman Aggarwal",
    stageName: "ARYAMAN AGGARWAL",
    photo: aryamann,
    bio: "Aryaman Aggarwal is a graduate in Digital Sound Producer (Advanced) from Pyramind @ San Francisco, California. He is a Certified Avid Pro Tools Operator, Apple Logic Pro X Certified, and an Ableton Certified Trainer with 13+ years of teaching experience and has mentored 450+ students.",
    specialty: "Music Production & Sound Design",
    socialLinks: {
      instagram: "https://www.instagram.com/yarkiman/",
    },
  },
  {
    id: "skipster",
    name: "Skipster",
    stageName: "SKIPSTER",
    photo: skipsterPhoto1,
    bio: "Skipster is a world-renowned DJ and turntablist, recognized for his historic victory as the 2025 IDA World DJ Champion. With over 17 years of experience, a DMC National title, and a Red Bull 3Style National championship, he is a true master of performance concepts and creative scratching techniques.",
    specialty: "DJ Performance & Turntablism",
    socialLinks: {
      instagram: "https://www.instagram.com/skipstermusic/?hl=en",
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
    title: "Introduction to DAW",
    tagline: "Master your Digital Audio Workstation from the ground up",
    category: "production",
    description: "Learn the fundamentals of Digital Audio Workstations (DAW). Perfect for absolute beginners looking to start their production journey.",
    longDescription: "This intensive 1-month program takes you from zero to confident DAW user. You'll learn interface navigation, basic recording, MIDI programming, and essential editing techniques. By the end, you'll have a solid foundation to build upon in more advanced courses.",
    duration: { months: 1 },
    price: 39999,
    level: "beginner",
    instructorId: "aryaman",
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
      "Train with Ableton Certified Trainer Aryaman Agarwal (13+ years experience)",
      "Get hands-on experience with Ableton Live Suite 12",
      "Learn sound design and creative production techniques",
      "Access exclusive templates, project files, and sample packs",
      "Receive a professional certificate",
      "Join a growing creative alumni network",
    ],
    postCourseBenefits: [
      {
        category: "Learning Resources",
        items: [
          "Ableton Live Suite 12 Experience",
          "Exclusive Project Templates",
          "Production Sample Packs",
        ],
      },
      {
        category: "Expert Guidance",
        items: [
          "Ableton Certified Instruction",
          "Sound Design Foundations",
          "Workflow Optimization",
        ],
      },
      {
        category: "Growth & Community",
        items: [
          "Professional Certificate",
          "Creative Alumni Network",
          "Continuing Education Path",
        ],
      },
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
    title: "Intermediate Music Production",
    tagline: "Your comprehensive guide to creating professional music",
    category: "production",
    description: "Comprehensive introduction to music production covering composition, sound design, arrangement, and production workflow. Students complete production-ready tracks.",
    longDescription: "This 3-month intensive program transforms you from a beginner into a capable music producer. You'll master composition, sound design, arrangement, and mixing fundamentals while creating your own original tracks. By the end, you'll have a portfolio of production-ready music.",
    duration: { months: 3 },
    price: 99999,
    level: "intermediate",
    instructorId: "aryaman",
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
    prerequisites: "Introduction to DAW or basic DAW knowledge",
    whatsIncluded: [
      "Train with Ableton Certified Trainer Aryaman Agarwal (13+ years experience)",
      "Splice membership included for access to professional sample libraries",
      "Hands-on training in beat making, sampling, and production workflows",
      "Access to industry partners and discounted music software & gear",
      "Free templates, project files, and sample packs",
      "Professional certification and alumni network",
    ],
    postCourseBenefits: [
      {
        category: "Professional Tools",
        items: [
          "Splice Premium Membership",
          "Industry Partner Discounts",
          "Professional Sample Libraries",
        ],
      },
      {
        category: "Mentorship & Mastery",
        items: [
          "Direct Mentorship (Aryaman Agarwal)",
          "Advanced Workflow Systems",
          "Beat Making & Sampling Mastery",
        ],
      },
      {
        category: "Career Launch",
        items: [
          "Professional Certification",
          "Alumni Network Access",
          "Portfolio Review & Feedback",
        ],
      },
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
    tagline: "Achieve professional-grade production excellence with an Ableton Certified Trainer",
    category: "production",
    description: "Go beyond presets - understand synthesis, sound shaping, and instrument architecture to craft your own signature sound. Master full-spectrum production from core fundamentals to advanced performance techniques.",
    longDescription: "This intensive 5-month program is designed for producers ready to reach professional levels. Train with Aryaman Aggarwal, a Pyramind graduate and Ableton Certified Trainer. Get Ableton Live Suite 12 along with the course and master sampling, groove design, sound shaping, and industry-ready workflow systems.",
    duration: { months: 5 },
    price: 179999,
    level: "advanced",
    instructorId: "aryaman",
    sessionsPerWeek: 3,
    totalSessions: 72,
    totalHours: 144,
    learningOutcomes: [
      "Master Ableton Live Suite 12 from core fundamentals to advanced performance",
      "Develop deep instrument & sound design knowledge beyond presets",
      "Understand synthesis, sound shaping, and instrument architecture",
      "Execute full-spectrum production from sampling to polished tracks",
      "Navigate industry workflows, mixing, and professional-level releases",
    ],
    prerequisites: "Previous music knowledge recommended",
    whatsIncluded: [
      "Train with Ableton Certified Trainer Aryaman Agarwal (13+ years experience)",
      "Ableton Live Suite 12 software included with the course",
      "Splice membership included for access to world-class sounds and samples",
      "Deep instrument, synthesis, and sound design knowledge",
      "Professional production, arrangement, and mixing techniques",
      "Free templates, sample packs, and project resources",
      "Access to academy partners with exclusive discounts on music production tools and products",
      "Industry exposure, mentorship, and career guidance",
      "Career roadmap support (Producer, Beatmaker, Mix Engineer, etc.)",
      "Professional certification and alumni network",
    ],
    postCourseBenefits: [
      {
        category: "Learning & Gear",
        items: [
          "Ableton Certified Instruction",
          "Ableton Live Suite 12 included",
          "Free templates & sample packs",
        ],
      },
      {
        category: "Skills & Mastery",
        items: [
          "Deep Instrument Knowledge",
          "Sound Design & Synthesis",
          "Industry-Ready Workflow",
        ],
      },
      {
        category: "Industry & Mentorship",
        items: [
          "Real Industry Access",
          "Post-Course Mentorship",
          "Alumni Networking",
        ],
      },
      {
        category: "Career Pathways",
        items: [
          "Music Producer / Beatmaker",
          "Mix Engineer",
          "Live Performer (Ableton-based)",
          "Studio Assistant",
          "Independent Artist",
          "Freelance Production & Sound Design",
        ],
      },
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Module 1: INTRODUCTION TO DAW (12 sessions)",
        duration: 24,
        objectives: ["Introduction to the DAW and its interface", "Setting up for production", "Core fundamental tools"],
        topics: ["Interface overview", "Session vs Arrangement", "Signal flow", "Setting up your studio"],
        exercise: "Configure your setup and explore the DAW interface",
      },
      {
        sessionNumber: 13,
        title: "Module 2: Sampling, Groove & Beat Design (12 sessions)",
        duration: 24,
        objectives: ["Master sampling techniques", "Develop unique groove and rhythm", "Advanced beat design"],
        topics: ["Sampling methods", "Groove manipulation", "Beat structuring", "Layering drums"],
        exercise: "Create a unique beat using custom samples and grooves",
      },
      {
        sessionNumber: 25,
        title: "Module 3: Core Music & Production Tools (12 sessions)",
        duration: 24,
        objectives: ["Understand essential production tools", "Master core effects and processors", "Musicality in production"],
        topics: ["Compressors", "EQ", "Reverb & Delay", "Saturation", "Dynamics"],
        exercise: "Apply core processors to shape a sound palette",
      },
      {
        sessionNumber: 37,
        title: "Module 4: Ableton Instruments Deep Dive (12 sessions)",
        duration: 24,
        objectives: ["Comprehensive study of Ableton instruments", "In-depth instrument architecture", "Sound shaping"],
        topics: ["Serum", "Operator", "Wavetable", "Analog", "Simpler/Sampler"],
        exercise: "Build a signature synth patch from scratch using any Ableton instrument",
      },
      {
        sessionNumber: 49,
        title: "Module 5: Arrangement, Workflow & Creativity (8 sessions)",
        duration: 16,
        objectives: ["Master fast and creative workflows", "Structure tracks professionally", "Overcoming creative blocks"],
        topics: ["Arrangement tricks", "Workflow optimization", "Creativity hacks", "Song structure"],
        exercise: "Arrange a loop into a full 3-minute track structure",
      },
      {
        sessionNumber: 57,
        title: "Module 6: Mixing & Production Techniques (8 sessions)",
        duration: 16,
        objectives: ["Achieve professional mix quality", "Master production techniques", "Polishing tracks"],
        topics: ["Mixing balance", "Space and depth", "Production tricks", "Polishing"],
        exercise: "Complete a professional-level mix of your track",
      },
      {
        sessionNumber: 65,
        title: "Module 7: Advanced Ableton Techniques (8 sessions)",
        duration: 16,
        objectives: ["Perform live with Ableton", "Advanced Max for Live", "Advanced automation and routing"],
        topics: ["Live performance", "Max for Live", "Advanced routing", "Automation mastery"],
        exercise: "Set up a live performance set for your original production",
      },
    ],
  },

  // ===== DJING ESSENTIALS =====
  {
    id: "dj-beginner",
    slug: "dj-beginner",
    title: "DJ Beginner",
    tagline: "Perfect For: Complete beginners & hobby DJs",
    category: "djing",
    description: "In just one month, you’ll build strong technical foundations and learn how to mix clean, structured DJ sets with confidence.",
    longDescription: "Whether you're starting from scratch or want to level up your skills, our academy is built to take you from basic understanding to confident live performance - and beyond. Train with Industry Expert Kamazaki (17+ Years Experience).",
    duration: { months: 1 },
    price: 34999,
    originalPrice: 49999,
    level: "beginner",
    instructorIds: ["kamazaki", "garry"],
    sessionsPerWeek: 2,
    totalSessions: 8,
    totalHours: 16,
    learningOutcomes: [
      "Perform a clean, well-structured DJ set without relying on shortcuts",
      "Master manual beatmatching skills consistently without sync",
      "Gain confidence in handling industry-standard CDJs and mixers",
      "Understand and apply harmonic mixing and transition techniques",
      "Build and organize a professional music library for performance",
    ],
    prerequisites: "None - perfect for complete beginners",
    whatsIncluded: [
      "Beginner DJ Certification upon course completion",
      "Hands-on training with industry-standard CDJs & Pioneer mixers",
      "Pre-booked practice slots in a professional DJ environment",
      "Manual beatmatching & clean mixing skills for confident performances",
      "Recorded 30 Min Set for your DJ portfolio",
    ],
    postCourseBenefits: [
      {
        category: "Practice & Performance",
        items: [
          "Pre-booked Practice Slots",
          "Hands-on CDJ Experience",
          "Pioneer Mixer Mastery",
          "Access to industry-standard DJ equipment",
          "Performance recordings",
        ],
      },
      {
        category: "Portfolio & Recording",
        items: [
          "Recorded 30-Min DJ Set",
          "Performance Evaluation",
          "Technical Drill Sheet",
          "Performance video content",
        ],
      },
      {
        category: "Core Skills & Certification",
        items: [
          "Beginner DJ Certification",
          "Confident Equipment Control",
          "Manual Beatmatching Skills",
          "Clean Mixing Ability",
          "Harmonic Mixing Knowledge",
          "Basic Looping & FX Control",
          "Alumni Community Access",
          "Artist positioning support",
        ],
      },
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Music & DJ Foundations",
        duration: 2,
        objectives: ["Understanding BPM, phrasing & song structure", "DJ culture, genres & professional standards", "Developing musical timing"],
        topics: ["BPM and phrasing", "DJ History", "Musical timing"],
        exercise: "Count beats and identify phrasing in 10 different tracks",
      },
      {
        sessionNumber: 2,
        title: "Equipment Confidence",
        duration: 2,
        objectives: ["CDJs & Pioneer mixer workflow", "Signal flow & gain staging", "Live setup basics"],
        topics: ["CDJ navigation", "Mixer signal path", "Booting up the booth"],
        exercise: "Set up the mixer and CDJs and perform a basic signal test",
      },
      {
        sessionNumber: 3,
        title: "Manual Beatmatching",
        duration: 2,
        objectives: ["Tempo matching without sync", "Pitch control accuracy", "Tight mix control"],
        topics: ["Ear training", "Pitch fader usage", "Continuous alignment"],
        exercise: "Manual beatmatch 5 pairs of tracks by ear only",
      },
      {
        sessionNumber: 4,
        title: "Clean Mixing Techniques",
        duration: 2,
        objectives: ["EQ blending", "Smooth transitions", "Filter usage", "Avoiding beginner mistakes"],
        topics: ["EQ frequencies", "Filter sweeps", "Smooth fades"],
        exercise: "Record 3 smooth transitions focusing on EQ balance",
      },
      {
        sessionNumber: 5,
        title: "Harmonic Mixing",
        duration: 2,
        objectives: ["Camelot Wheel system", "Mixing in key", "Structuring smoother sets"],
        topics: ["Circle of Fifths/Camelot", "Key detection", "Set building"],
        exercise: "Plan a 5-track set that follows the Camelot Wheel",
      },
      {
        sessionNumber: 6,
        title: "Looping & Effects",
        duration: 2,
        objectives: ["Creative loop usage", "Beat FX & Color FX basics", "Musical timing of effects"],
        topics: ["Loop roll", "Delay/Reverb timing", "Creative builds"],
        exercise: "Create a build-up using loops and 2 different effects",
      },
      {
        sessionNumber: 7,
        title: "Track Organization",
        duration: 2,
        objectives: ["Professional music library setup", "Rekordbox preparation", "USB performance prep"],
        topics: ["Music sourcing", "Crate management", "USB export settings"],
        exercise: "Prepare a Rekordbox-ready USB for performance",
      },
      {
        sessionNumber: 8,
        title: "Final Live Assessment",
        duration: 2,
        objectives: ["20-30 minute evaluated DJ set", "Personalized technical feedback"],
        topics: ["Performance", "Evaluation"],
        exercise: "Deliver your final 30-minute graduation showcase",
      },
    ],
  },
  {
    id: "dj-artistry-program",
    slug: "dj-artistry-program",
    title: "DJ Advanced Performance Program",
    tagline: "Perfect For: Aspiring professional DJs",
    category: "djing",
    description: "Month 2 transforms you from a technically good DJ into a performance-ready artist with industry awareness. Led by Faculty Kamazaki.",
    longDescription: "This program is designed to first build rock-solid DJ foundations and then elevate students into technically advanced, performance-ready artists with strong industry awareness. Includes the full 1-Month Fundamentals Program.",
    duration: { months: 2 },
    price: 59999,
    originalPrice: 79999,
    level: "advanced",
    instructorIds: ["kamazaki", "garry"],
    sessionsPerWeek: 2,
    totalSessions: 16,
    totalHours: 32,
    learningOutcomes: [
      "Master advanced performance techniques on industry-standard equipment",
      "Develop technically advanced and performance-ready DJ skills",
      "Understand crowd psychology and energy flow management",
      "Build a professional brand identity and career strategy",
      "Execute high-level creative mixing using advanced FX and looping",
    ],
    prerequisites: "None - Includes the full 1-Month Fundamentals Program",
    whatsIncluded: [
      "Access to industry-standard DJ equipment & pre-booked practice slots",
      "Professionally recorded mixtape and performance video for your portfolio",
      "Guaranteed DJ performance slots through academy showcases",
      "Guaranteed placement opportunities within the event industry",
      "Real performance opportunities at academy events and showcases",
      "Industry networking, promoter introductions & alumni DJ community",
      "Career guidance, branding support, and long-term mentoring",
    ],
    postCourseBenefits: [
      {
        category: "Professional Practice Environment",
        items: [
          "Access to industry-standard DJ equipment",
          "Pre Booked Practice Slots",
          "Performance recordings",
        ],
      },
      {
        category: "Real Performance Opportunities",
        items: [
          "Graduation showcase event",
          "Opening set opportunities (performance-based)",
          "Academy showcase nights",
          "Club & festival exposure (merit-based)",
        ],
      },
      {
        category: "Portfolio Development",
        items: [
          "Professionally recorded mixtape",
          "Performance video content",
          "Artist positioning support",
        ],
      },
      {
        category: "Industry Access",
        items: [
          "Networking opportunities",
          "Promoter introductions (selected students)",
          "Alumni DJ community",
        ],
      },
      {
        category: "Career Guidance",
        items: [
          "Booking strategy support",
          "Branding consultation",
          "Long-term growth mentoring",
        ],
      },
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Introduction to DJing & Musical Structure",
        duration: 2,
        objectives: ["Understanding BPM, bars, phrasing & song arrangement", "DJ culture, genres & professional standards", "Developing timing and critical listening"],
        topics: ["Musical structure", "DJ culture", "Timing"],
        exercise: "Analyze musical structure of different genres",
      },
      {
        sessionNumber: 2,
        title: "Equipment Mastery & Setup",
        duration: 2,
        objectives: ["CDJs, controllers & Pioneer mixer overview", "Signal flow & gain staging", "Equipment handling & troubleshooting basics"],
        topics: ["Equipment setup", "Signal flow", "Troubleshooting"],
        exercise: "Set up a professional DJ booth from scratch",
      },
      {
        sessionNumber: 3,
        title: "Manual Beatmatching",
        duration: 2,
        objectives: ["Tempo alignment without sync", "Pitch control techniques", "Tight beatmatching practice drills"],
        topics: ["Beatmatching", "Tempo control"],
        exercise: "Beatmatch two tracks using only ears",
      },
      {
        sessionNumber: 4,
        title: "Core Mixing Techniques",
        duration: 2,
        objectives: ["EQ blending", "Smooth transitions using filters", "Volume control & clean mix structure"],
        topics: ["Mixing basics", "EQing", "Transitions"],
        exercise: "Record a 15-minute mix with clean transitions",
      },
      {
        sessionNumber: 5,
        title: "Harmonic Mixing & Camelot Wheel",
        duration: 2,
        objectives: ["Understanding the Camelot system", "Mixing in key for smoother transitions", "Structuring harmonically balanced DJ sets"],
        topics: ["Harmonic mixing", "Camelot wheel"],
        exercise: "Create a 5-track harmonic set journey",
      },
      {
        sessionNumber: 6,
        title: "Intro to Looping & Basic FX",
        duration: 2,
        objectives: ["Using loops on CDJs", "Basic Beat FX & Color FX application", "Timing effects correctly"],
        topics: ["Looping", "Effects basics"],
        exercise: "Incorporate loops and basic FX into a transition",
      },
      {
        sessionNumber: 7,
        title: "Track Selection & Library Management",
        duration: 2,
        objectives: ["Organizing music professionally", "Preparing USBs in Rekordbox", "Creating structured practice sets"],
        topics: ["Library management", "Rekordbox"],
        exercise: "Organize a performance-ready library in Rekordbox",
      },
      {
        sessionNumber: 8,
        title: "Fundamental Performance Assessment",
        duration: 2,
        objectives: ["20 - 30 minute live mix", "Technical corrections", "Feedback & readiness evaluation"],
        topics: ["Performance assessment", "Feedback"],
        exercise: "Perform a fundamental showcase set",
      },
      {
        sessionNumber: 9,
        title: "Memory Cues, Hot Cues & Grid Control",
        duration: 2,
        objectives: ["Setting memory cues strategically", "Advanced hot cue combinations", "Grid alignment & warp marker corrections"],
        topics: ["Advanced cues", "Grid control"],
        exercise: "Perform a set using advanced cue point triggering",
      },
      {
        sessionNumber: 10,
        title: "Advanced Looping & Creative Sampling",
        duration: 2,
        objectives: ["Loop manipulation for build-ups", "Loop roll transitions", "Layering acapellas & textures creatively"],
        topics: ["Creative looping", "Sampling"],
        exercise: "Perform a mix layering acapellas over tracks",
      },
      {
        sessionNumber: 11,
        title: "Phrasing & Set Structure",
        duration: 2,
        objectives: ["Mixing in phrase", "Understanding drops, breakdowns & energy flow", "Intro to crowd psychology"],
        topics: ["Phrasing", "Set structure", "Crowd psychology"],
        exercise: "Plan an energy-mapped set journey",
      },
      {
        sessionNumber: 12,
        title: "Beat FX & Color FX Mastery",
        duration: 2,
        objectives: ["Deep dive into Echo, Reverb, Phaser, Flanger, Roll", "Advanced use of Filter, Dub Echo & Noise", "Musical timing of effects"],
        topics: ["FX mastery", "Technical application"],
        exercise: "Perform a transition using 3 different FX in combination",
      },
      {
        sessionNumber: 13,
        title: "Advanced Mixing Techniques",
        duration: 2,
        objectives: ["Basic scratching (vinyl mode)", "Genre & BPM jump transitions", "DJing in emergency situations"],
        topics: ["Technical skills", "Genre hopping"],
        exercise: "Perform a transition between two different genres/BPMs",
      },
      {
        sessionNumber: 14,
        title: "Recording Your Mixtape",
        duration: 2,
        objectives: ["Recording clean, professional DJ mixes", "Structuring a showcase mix", "Audio optimization"],
        topics: ["Mixtape recording", "Professional standards"],
        exercise: "Record your final professional showcase mixtape",
      },
      {
        sessionNumber: 15,
        title: "Branding, Identity & Career Strategy",
        duration: 2,
        objectives: ["Building your DJ identity", "Social positioning & visibility", "Approaching promoters professionally", "Pricing, bookings & growth strategy"],
        topics: ["Music business", "Branding"],
        exercise: "Draft a professional DJ bio and press kit",
      },
      {
        sessionNumber: 16,
        title: "Industry AMA + Final Showcase",
        duration: 2,
        objectives: ["Live Q&A with experienced touring artists & industry experts", "45-60 minute graduation performance", "Professional evaluation & certification"],
        topics: ["Industry talk", "AMA", "Graduation"],
        exercise: "Perform your 60-minute graduation set",
      },
    ],
  },

  // ===== ARTIST DEVELOPMENT PROGRAMME =====
  {
    id: "pro-remix-alchemy",
    slug: "pro-remix-alchemy",
    title: "Remix Production Masterclass w/ Su Real",
    tagline: "Master the art of remixing with a world-class producer",
    category: "artist-dev",
    description: "This unique 1-month program pairs you with internationally acclaimed DJ/producer Su Real for an intensive Remix masterclass. Learn professional remixing, edits, mash ups & more.",
    longDescription: "This unique 1-month program pairs you with internationally acclaimed DJ/producer Su Real for an intensive Remix masterclass. You’ll learn how to create professional-quality Remixes, edits, mash ups & more. How to creatively re-interpret songs to your own signature style to light up the dancefloor.\n\nThe course begins with the origins of Remix culture and culminates in a compilation album featuring Remixes from all students. Students will learn all the basics of Remixing music plus numerous advanced techniques, tips & tricks to make their productions stand out from the clutter.\n\nThis course will be taught primarily using Logic Pro X on a Mac system. However, the skills and techniques taught can be applied to any DAW/system.\n\nSchedule:\nEight Modules, 2 sessions per week.\nTwo hours per session.\nEach session consists of:\n- 30 mins. Theory/Lecture\n- 30 mins. Practical Demonstration\n- 60 mins. Student Projects with Instructor Guidance",
    duration: { months: 1 },
    price: 49999,
    level: "advanced",
    instructorId: "sureal",
    sessionsPerWeek: 2,
    totalSessions: 8,
    totalHours: 16,
    featured: true,
    learningOutcomes: [
      "Create professional-quality Remixes, edits, and mash ups",
      "Creatively re-interpret songs to your own signature style",
      "Master basics of Remixing plus numerous advanced techniques",
      "Learn tips & tricks to make your productions stand out",
      "Contribute to a compilation album featuring student remixes",
    ],
    prerequisites: "Some music production experience recommended",
    whatsIncluded: [
      "Intensive Remix masterclass with Su Real",
      "Training on Logic Pro X (applicable to any DAW)",
      "Compilation album feature with fellow students",
      "Advanced production tips, tricks, and techniques",
      "Guidance on distribution, copyright, and promotion",
    ],
    postCourseBenefits: [
      {
        category: "Direct Mentorship",
        items: [
          "Artist Mentorship (Su Real)",
          "Creative Breakdown Sessions",
          "Industry Workflow Insights",
        ],
      },
      {
        category: "Professional Release",
        items: [
          "Release-Ready Remix",
          "Album Feature Potential",
          "Marketing Content Support",
        ],
      },
      {
        category: "Career Strategy",
        items: [
          "Distribution Guidance",
          "Copyright & IP Support",
          "Promotion Walkthrough",
        ],
      },
    ],
    sessions: [
      {
        sessionNumber: 1,
        title: "Module 1: Introduction - The Art & History of Remixing",
        duration: 2,
        objectives: ["Understand the origins of Remix culture", "Analyze the evolution of Remixing", "Philosophy of creative interpretation"],
        topics: ["Remix history", "Cultural impact", "Finding your signature style"],
        exercise: "Analyze the evolution of a classic remix",
      },
      {
        sessionNumber: 2,
        title: "Module 2: Deconstructing Originals, Looping, Beat Matching, Edits, Mash Ups",
        duration: 2,
        objectives: ["Master deconstruction of tracks", "Learn looping and beat matching", "Create quick edits and mash ups"],
        topics: ["Deconstruction", "Looping techniques", "Beat matching", "Mash up workflow"],
        exercise: "Create a simple mash up using two tracks",
      },
      {
        sessionNumber: 3,
        title: "Module 3: Arrangement, Stem Separation, Module Set Up",
        duration: 2,
        objectives: ["Understand stems and separation", "Set up your project module", "Arrangement strategies"],
        topics: ["Stem separation", "Project organization", "Arrangement blueprints"],
        exercise: "Set up a remix project with separated stems",
      },
      {
        sessionNumber: 4,
        title: "Module 4: Building a Club Remix - Adding Drums & Drops",
        duration: 2,
        objectives: ["Build energy with drums", "Create impactful drops", "Club-focused production"],
        topics: ["Drum programming", "Drop design", "Energy management"],
        exercise: "Produce a drum section and drop for your remix",
      },
      {
        sessionNumber: 5,
        title: "Module 5: Advanced Creative Techniques: Chopping, Pitch-Shifting, Effects",
        duration: 2,
        objectives: ["Master advanced chopping", "Use pitch-shifting creatively", "Advanced FX processing"],
        topics: ["Audio chopping", "Pitch manipulation", "Creative effects"],
        exercise: "Apply advanced chopping to a vocal or instrumental hook",
      },
      {
        sessionNumber: 6,
        title: "Module 6: Advanced Technical Tips - Improving the Quality of your Remix",
        duration: 2,
        objectives: ["Improve production quality", "Technical troubleshooting", "Sonic enhancement"],
        topics: ["Quality control", "Production tips", "Sonic clarity"],
        exercise: "Implement technical improvements to your production",
      },
      {
        sessionNumber: 7,
        title: "Module 7: Finishing Your Remix - Mixdown & Mastering",
        duration: 2,
        objectives: ["Achieve a professional mixdown", "Essential mastering for remixes", "Finalizing the sound"],
        topics: ["Mixdown workflow", "Mastering basics", "Final polish"],
        exercise: "Complete the mixdown and mastering of your remix",
      },
      {
        sessionNumber: 8,
        title: "Module 8: Getting Your Remix Out There - Distribution, Copyright & Promotion",
        duration: 2,
        objectives: ["Understand distribution channels", "Navigate copyright issues", "Effective promotion strategies"],
        topics: ["Distribution", "Copyright law", "Self-promotion"],
        exercise: "Develop a basic release and promotion plan for your remix",
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

export function getInstructorsForCourse(course: Course): Instructor[] {
  if (course.instructorIds) {
    return course.instructorIds
      .map(id => getInstructorById(id))
      .filter((instructor): instructor is Instructor => instructor !== undefined);
  }
  if (course.instructorId) {
    const instructor = getInstructorById(course.instructorId);
    return instructor ? [instructor] : [];
  }
  return [];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
