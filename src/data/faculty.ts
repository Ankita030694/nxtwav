import aryaman1 from "@/assets/faculty/aryaman1.jpg";
import aryaman2 from "@/assets/faculty/aryaman2.jpg";
import aryaman3 from "@/assets/faculty/aryaman3.jpg";
import aryamann from "@/assets/faculty/aryamann.png";
import kamazaki1 from "@/assets/faculty/kamazaki1.png";
import kamazaki2 from "@/assets/faculty/kamazaki2.png";
import kamazaki3 from "@/assets/faculty/kamazaki3.png";
import sureal1 from "@/assets/faculty/sureal1.jpg";
import sureal2 from "@/assets/faculty/sureal2.jpg";
import sureal3 from "@/assets/faculty/sureal3.jpg";
import garryBedi from "@/assets/faculty/garry_bedi.jpeg";

export interface Faculty {
  id: string;
  name: string;
  stageName: string;
  role: string;
  photo: string;
  photos: string[];
  bio: string;
  specialty: string;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
  };
}

export const faculty: Faculty[] = [
  {
    id: "sureal",
    name: "Su Real",
    stageName: "Su Real",
    role: "Faculty",
    photo: sureal1,
    photos: [sureal1, sureal2, sureal3],
    bio: "Su Real is a pioneering bass music producer and DJ who has been at the forefront of India's electronic music scene. Known for blending Indian sounds with heavy bass and hip-hop influences, he brings a unique perspective to music production education.",
    specialty: "Bass Music & Production",
    socialLinks: {
      instagram: "https://www.instagram.com/su_real/",
      spotify: "https://open.spotify.com/artist/su-real",
    },
  },
  {
    id: "vylom",
    name: "Kamazaki",
    stageName: "Kamazaki",
    role: "Faculty",
    photo: kamazaki1,
    photos: [kamazaki1, kamazaki2, kamazaki3],
    bio: "Kamazaki is an acclaimed electronic music producer known for his intricate sound design and innovative production techniques. His expertise in creating atmospheric and melodic electronic music makes him an invaluable mentor for aspiring producers.",
    specialty: "Electronic Production & Sound Design",
    socialLinks: {
      instagram: "https://www.instagram.com/vylom/",
      spotify: "https://open.spotify.com/artist/vylom",
    },
  },
  {
    id: "aryaman",
    name: "Aryaman Aggarwal",
    stageName: "ARYAMAN AGGARWAL",
    role: "Faculty",
    photo: aryamann,
    photos: [aryamann, aryaman1, aryaman2, aryaman3],
    bio: "Aryaman Aggarwal is a graduate in Digital Sound Producer (Advanced) from Pyramind @ San Francisco. He is a Certified Avid Pro Tools Operator, Apple Logic Pro X certified, and an Ableton Certified Trainer with 13+ years of teaching experience and has mentored 450+ students.",
    specialty: "Music Production & Sound Design",
    socialLinks: {
      instagram: "https://www.instagram.com/aryamanaggarwal/",
    },
  },
  {
    id: "kamazaki",
    name: "Kamazaki",
    stageName: "KAMAZAKI",
    role: "Faculty",
    photo: kamazaki1,
    photos: [kamazaki1, kamazaki2, kamazaki3],
    bio: "Kamazaki is a veteran in the DJing world with over 17+ years of professional experience. Having performed at major venues across the country, he brings a wealth of knowledge in performance-ready artistry and industry awareness.",
    specialty: "DJ Performance & Industry Mastery",
    socialLinks: {
      instagram: "https://www.instagram.com/nxtwav/",
    },
  },
  {
    id: "garry",
    name: "Garry Bedi",
    stageName: "GARRY BEDI",
    role: "Faculty",
    photo: garryBedi,
    photos: [garryBedi],
    bio: "Garry Bedi is an industry veteran in the DJing scene with years of experience performing at elite venues. His technical precision and deep understanding of crowd dynamics make him a leading mentor in DJ artistry.",
    specialty: "DJ Performance & Industry Mastery",
    socialLinks: {
      instagram: "https://www.instagram.com/nxtwav/",
    },
  },
];

