import aryaman1 from "@/assets/faculty/aryaman_1.jpg";
import aryaman2 from "@/assets/faculty/aryaman_2.jpg";
import aryaman3 from "@/assets/faculty/aryaman_3.jpg";
import kamazaki1 from "@/assets/faculty/kamazaki_1.png";
import kamazaki2 from "@/assets/faculty/kamazaki_2.png";
import kamazaki3 from "@/assets/faculty/kamazaki_3.png";
import sureal1 from "@/assets/faculty/su_real_1.jpg";
import sureal2 from "@/assets/faculty/su_real_2.jpg";
import sureal3 from "@/assets/faculty/su_real_3.jpg";
import skipster1 from "@/assets/faculty/skipster_1.jpg";
import skipster2 from "@/assets/faculty/skipster_2.jpg";
import skipster3 from "@/assets/faculty/skipster_3.jpg";
import garryBedi1 from "@/assets/faculty/garry_bedi_1.png";
import garryBedi2 from "@/assets/faculty/garry_bedi_2.png";
import garryBedi3 from "@/assets/faculty/garry_bedi_3.png";

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
    specialty: "Artist Development Programme",
    socialLinks: {
      instagram: "https://www.instagram.com/realsureal/",
    },
  },

  {
    id: "aryaman",
    name: "Aryaman Aggarwal",
    stageName: "ARYAMAN AGGARWAL",
    role: "Faculty",
    photo: aryaman1,
    photos: [aryaman1, aryaman2, aryaman3],
    bio: "Aryaman Aggarwal is a graduate in Digital Sound Producer (Advanced) from Pyramind @ San Francisco. He is a Certified Avid Pro Tools Operator, Apple Logic Pro X certified, and an Ableton Certified Trainer with 13+ years of teaching experience and has mentored 450+ students.",
    specialty: "Music Production & Sound Design",
    socialLinks: {
      instagram: "https://www.instagram.com/yarkiman/",
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
      instagram: "https://www.instagram.com/dishant_kamazaki",
    },
  },
  {
    id: "garry",
    name: "Garry Bedi",
    stageName: "GARRY BEDI",
    role: "Faculty",
    photo: garryBedi1,
    photos: [garryBedi1, garryBedi2, garryBedi3],
    bio: "Garry Bedi is an industry veteran in the DJing scene with years of experience performing at elite venues. His technical precision and deep understanding of crowd dynamics make him a leading mentor in DJ artistry.",
    specialty: "DJ Performance & Industry Mastery",
    socialLinks: {
      instagram: "https://www.instagram.com/garry_bedii/?hl=en",
    },
  },
  {
    id: "skipster",
    name: "Skipster",
    stageName: "SKIPSTER",
    role: "Faculty",
    photo: skipster1,
    photos: [skipster1, skipster2, skipster3],
    bio: "Skipster is a world-renowned DJ and turntablist, recognized for his historic victory as the 2025 IDA World DJ Champion. With over 17 years of experience, a DMC National title, and a Red Bull 3Style National championship, he is a true master of performance concepts and creative scratching techniques.",
    specialty: "Artist Development Programme",
    socialLinks: {
      instagram: "https://www.instagram.com/skipstermusic/?hl=en",
    },
  },
];

