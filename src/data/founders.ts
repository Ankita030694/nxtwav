// Founder data for the About page
import skoposPhoto from "@/assets/founders/lakshay_nanda.jpg";
import beatcrushPhoto from "@/assets/founders/beatcrush-siddharth-sethi.png";
import slctPhoto from "@/assets/founders/slct-kanav-kumar.png";

export interface Founder {
  id: string;
  name: string;
  stageName: string;
  role: string;
  photo: string;
  bio: string;
  shortBio: string;
  achievements: string[];
  specialty: string;
  yearsExperience: number;
  teachingPhilosophy: string;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
  };
}

export const founders: Founder[] = [
  {
    id: "siddharth",
    name: "Siddharth Sethi",
    stageName: "BeatCrush",
    role: "Co-Founder",
    photo: beatcrushPhoto,
    bio: "BeatCrush is a touring DJ, music producer, and entrepreneur known for high-energy sets and cutting-edge electronic sounds across India. With years of experience performing at clubs, weddings, festivals, and curated large-scale events, he brings real-world industry knowledge straight into the classroom.\n\nAs the founder of NXTwav, his mission is to bridge the gap between learning and performing supporting students not just with technical training, but by actively guiding them into real-world gigs, showcases, and professional opportunities.\n\nAt NXTwav, BeatCrush mentors students on production, DJ performance, branding, marketing, and building sustainable careers in the industry.\n\nFrom studio to stage, this is where the next wave begins.",
    shortBio: "Touring DJ & music producer bridging the gap between learning and performing through real-world mentorship.",
    achievements: [
      "8+ years in the music industry",
      "Touring DJ across India",
      "Performed at clubs, weddings, festivals",
      "Curated large-scale events",
      "Founder of NXTwav",
    ],
    specialty: "Production & DJ Performance",
    yearsExperience: 10,
    teachingPhilosophy: "From studio to stage, this is where the next wave begins. I bridge the gap between learning and performing, guiding students into real-world gigs and professional opportunities.",
    socialLinks: {
      instagram: "https://www.instagram.com/beatcrushmusic/",
      spotify: "https://open.spotify.com/artist/beatcrush",
    },
  },
  {
    id: "lakshay",
    name: "Lakshay Nanda",
    stageName: "Skopòs",
    role: "Co-Founder",
    photo: skoposPhoto,
    bio: "Skopòs is a Delhi-based genre-fluid music producer, DJ & event curator known for crafting immersive sonic experiences that transcend traditional boundaries. Blending electronic music with percussive rhythms, global fusion influences & open-format energy!\n\nOn the decks, Skopòs is celebrated for his impromptu, high-energy and versatile DJ sets that keep dance floors in constant motion.\n\nWith a vision to evolve as a globally relevant open-format artist, Skopòs aims to push his creative boundaries - curating experiences that blend music, culture & community into powerful moments on and off the stage!\n\nHe began his musical journey under the mentorship of the legendary Jazzy Joe, further refining his craft at the prestigious Lost Stories Academy in Delhi under the guidance of Aryaman Agarwal & Jay Pei.\n\nAs a music producer & curator Skopòs has featured in Rolling Stone India, Times of India, The Indian Music Diaries etc.\n\nAs a DJ Skopòs has shared the stage with renowned artists such as Black Coffee, Claptone, Pablo Fierro, King, Talwinder, Jay Sean, Seedhe Maut and Hanumankind, and has performed at major festivals including Sunburn, Zomaland, Royal Enfield Motoverse and India Cocktail Week.",
    shortBio: "Genre-fluid producer & DJ dedicated to crafting immersive sonic experiences at the intersection of music and culture.",
    achievements: [
      "Featured in Rolling Stone India, Times of India",
      "Shared stage with Black Coffee, Claptone, Hanumankind",
      "Performed at Sunburn, Zomaland, Royal Enfield Motoverse",
      "Trained at Lost Stories Academy",
      "Genre-fluid music producer & curator",
    ],
    specialty: "DJ Performance & Music Curation",
    yearsExperience: 10,
    teachingPhilosophy: "Curating experiences that blend music, culture & community into powerful moments on and off the stage.",
    socialLinks: {
      instagram: "https://www.instagram.com/skoposmusic/",
      spotify: "https://open.spotify.com/artist/2WVomrLR3V3nBVpiPsGjZz",
    },
  },
  {
    id: "kanav",
    name: "Kanav Kumar",
    stageName: "SLCT",
    role: "Co-Founder",
    photo: slctPhoto,
    bio: "Kanav Kumar is an entrepreneur and co-founder of NxtWav, built on years of real-world experience in India's live music and nightlife industry.\n\nAs the founder of SLCT, Kanav has worked extensively across artist management, event curation, and brand-led live experiences. His journey spans club residencies, festivals, weddings, tours, and large-scale events, giving him a clear, practical understanding of how the music industry functions beyond the stage.\n\nThrough working closely with DJs and artists at different stages of their careers, Kanav identified a recurring gap. While many aspiring DJs/Producers have talent and passion, they often lack structured guidance, industry awareness, and professional direction. Technical skill alone was not enough to build a sustainable career.\n\nNxtWav was created to bridge that gap.",
    shortBio: "Industry strategist and entrepreneur focused on provides structured guidance and professional direction for artists.",
    achievements: [
      "Founder of SLCT",
      "Extensive artist management experience",
      "Event curation and brand partnerships",
      "Club residencies and festival appearances",
      "Industry strategist and consultant",
    ],
    specialty: "Artist Development & Business",
    yearsExperience: 10,
    teachingPhilosophy: "Technical skill alone isn't enough to build a sustainable career. I help artists understand the business, gain industry awareness, and develop the professional direction needed to succeed.",
    socialLinks: {
      instagram: "https://www.instagram.com/kanav_kumar/",
    },
  },
];

// Why Join NXTwav - Trust builders
export const whyJoinPoints = [
  {
    icon: "users",
    title: "Founders Are Working Artists",
    description: "Learn from mentors who are actively performing and producing, not just teaching from textbooks.",
  },
  {
    icon: "stage",
    title: "Real-World Experience",
    description: "Our curriculum is built from years in clubs, festivals, weddings, and tours, not academic theory.",
  },
  {
    icon: "target",
    title: "Career-Focused Training",
    description: "We prepare you for the industry, not just teach you skills. From branding to bookings, we cover it all.",
  },
  {
    icon: "users-group",
    title: "Small Batch Cohorts",
    description: "Personalized attention in every session. No mass courses, just focused mentorship.",
  },
  {
    icon: "network",
    title: "Industry Connections",
    description: "Access to our network of venues, labels, and industry professionals for real opportunities.",
  },
  {
    icon: "community",
    title: "Community of Serious Students",
    description: "Join a network of like-minded artists committed to growth and supporting each other.",
  },
];

// What We Teach - Value cards
export const whatWeTeachCards = [
  {
    icon: "mixing-board",
    title: "Technical Skills",
    description: "Master the tools of the trade, from DAWs to DJ equipment, sound design to mixing.",
  },
  {
    icon: "briefcase",
    title: "Industry Knowledge",
    description: "Understand how the music business works, labels, booking, licensing, and more.",
  },
  {
    icon: "megaphone",
    title: "Artist Branding",
    description: "Build your identity, develop your image, and create a brand that stands out.",
  },
  {
    icon: "stage",
    title: "Real-World Experience",
    description: "Learn what actually matters when you step behind the console or walk into a studio.",
  },
];
