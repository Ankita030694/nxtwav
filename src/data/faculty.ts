// Faculty data for the About page

export interface Faculty {
  id: string;
  name: string;
  stageName: string;
  role: string;
  photo: string;
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
    photo: "/placeholder.svg",
    bio: "Su Real is a pioneering bass music producer and DJ who has been at the forefront of India's electronic music scene. Known for blending Indian sounds with heavy bass and hip-hop influences, he brings a unique perspective to music production education.",
    specialty: "Bass Music & Production",
    socialLinks: {
      instagram: "https://www.instagram.com/su_real/",
      spotify: "https://open.spotify.com/artist/su-real",
    },
  },
  {
    id: "vylom",
    name: "Vylom",
    stageName: "Vylom",
    role: "Faculty",
    photo: "/placeholder.svg",
    bio: "Vylom is an acclaimed electronic music producer known for his intricate sound design and innovative production techniques. His expertise in creating atmospheric and melodic electronic music makes him an invaluable mentor for aspiring producers.",
    specialty: "Electronic Production & Sound Design",
    socialLinks: {
      instagram: "https://www.instagram.com/vylom/",
      spotify: "https://open.spotify.com/artist/vylom",
    },
  },
  {
    id: "aryaman",
    name: "Aryaman Agarwal",
    stageName: "Aryaman",
    role: "Faculty",
    photo: "/placeholder.svg",
    bio: "Aryaman Agarwal is a respected figure in the Indian electronic music scene, known for his work at Lost Stories Academy. His extensive experience in music production and artist development helps students understand both the creative and business sides of the industry.",
    specialty: "Music Production & Artist Development",
    socialLinks: {
      instagram: "https://www.instagram.com/aryamanagarwal/",
    },
  },
];
