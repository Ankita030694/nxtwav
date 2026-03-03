import aryaman1 from "@/assets/faculty/aryaman1.jpg";
import aryaman2 from "@/assets/faculty/aryaman2.jpg";
import aryaman3 from "@/assets/faculty/aryaman3.jpg";
import kamazaki1 from "@/assets/faculty/kamazaki1.png";
import kamazaki2 from "@/assets/faculty/kamazaki2.png";
import kamazaki3 from "@/assets/faculty/kamazaki3.png";
import sureal1 from "@/assets/faculty/sureal1.jpg";
import sureal2 from "@/assets/faculty/sureal2.jpg";
import sureal3 from "@/assets/faculty/sureal3.jpg";

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
    bio: "Vylom is an acclaimed electronic music producer known for his intricate sound design and innovative production techniques. His expertise in creating atmospheric and melodic electronic music makes him an invaluable mentor for aspiring producers.",
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
    photo: aryaman1,
    photos: [aryaman1, aryaman2, aryaman3],
    bio: "Graduated in Digital Sound Producer (Advanced) from Pyramind @ San Francisco. Certified Avid Pro Tools Operator, Apple Logic Pro X certified, and an Ableton Certified Trainer with 13+ years of teaching experience (450+ students).",
    specialty: "Music Production & Sound Design",
    socialLinks: {
      instagram: "https://www.instagram.com/aryamanaggarwal/",
    },
  },
];

