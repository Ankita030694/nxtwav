import { motion } from "framer-motion";
import missMaliniLogo from "@/assets/collaborators/Missmalini.png";
import pcoLogo from "@/assets/collaborators/PCO.png";
import redFMLogo from "@/assets/collaborators/RED FM.jpg";
import rollingStoneLogo from "@/assets/collaborators/Rolling_Stone-Logo.wine.png";
import simbaLogo from "@/assets/collaborators/Simba.png";
import warnerMusicLogo from "@/assets/collaborators/Warner_Music_Group_logo_(2021).svg.png";
import dirtyGoodLogo from "@/assets/collaborators/dirtygood.png";
import imagesLogo from "@/assets/collaborators/images.png";
import monkeyBarLogo from "@/assets/collaborators/monkey bar.png";
import nykaaLogo from "@/assets/collaborators/nykaa.png";
import timesOfIndiaLogo from "@/assets/collaborators/png-clipart-the-times-of-india-newspaper-hindustan-times-the-economic-times-india-text-logo.png";
import quakeArenaLogo from "@/assets/collaborators/quake-arena-kondapur-hyderabad-night-clubs-wk8tjjcl4m.avif";

const collaborators = [
  { name: "Miss Malini", logo: missMaliniLogo },
  { name: "PCO", logo: pcoLogo },
  { name: "RED FM", logo: redFMLogo },
  { name: "Rolling Stone", logo: rollingStoneLogo },
  { name: "Simba", logo: simbaLogo },
  { name: "Warner Music Group", logo: warnerMusicLogo },
  { name: "Dirty Good", logo: dirtyGoodLogo },
  { name: "Images", logo: imagesLogo },
  { name: "Monkey Bar", logo: monkeyBarLogo },
  { name: "Nykaa", logo: nykaaLogo },
  { name: "Times of India", logo: timesOfIndiaLogo },
  { name: "Quake Arena", logo: quakeArenaLogo },
];

// Duplicate the array for a seamless loop
const duplicatedCollaborators = [...collaborators, ...collaborators];

export function CollaboratorsSection() {
  return (
    <section id="collaborators" className="py-24 bg-background relative overflow-hidden">
      {/* Background flair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-64 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4"
          >
            Our Network
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="text-gradient">Collaborators</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-full overflow-hidden">
          {/* Glassmorphism background bar */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border-y border-white/5 pointer-events-none" />
          
          <div className="flex items-center overflow-hidden py-12">
            <motion.div 
              className="flex gap-12 items-center"
              animate={{ 
                x: [0, -((collaborators.length * 200) + (collaborators.length * 48))] 
              }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ width: "fit-content" }}
            >
              {duplicatedCollaborators.map((collaborator, index) => (
                <div
                  key={`${collaborator.name}-${index}`}
                  className="w-[200px] flex-shrink-0 flex items-center justify-center grayscale-0 transition-all duration-300"
                >
                  <img
                    src={collaborator.logo}
                    alt={collaborator.name}
                    className="max-h-[80px] w-auto object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Side Gradients for fading effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
