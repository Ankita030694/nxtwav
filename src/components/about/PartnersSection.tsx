import { motion } from "framer-motion";
import abletonLogo from "@/assets/partners/ableton.png";
import slctExpLogo from "@/assets/partners/slct_experiences.png";
import slctTalentLogo from "@/assets/partners/slct_talents.png";
import spliceLogo from "@/assets/partners/splice.png";
import arturiaLogo from "@/assets/partners/arturia.png";
import udgLogo from "@/assets/partners/udg.jpeg";
import uagLogo from "@/assets/partners/uag.jpg";
import focusriteLogo from "@/assets/partners/focusrite.jpeg";
import novationLogo from "@/assets/partners/novation.png";
import denonDjLogo from "@/assets/partners/denon-dj.png";
import proDjStudioLogo from "@/assets/partners/pro-dj-studio.jpg";

const partners = [
  { name: "Ableton", logo: abletonLogo },
  { name: "Arturia", logo: arturiaLogo },
  { name: "Focusrite", logo: focusriteLogo },
  { name: "Novation", logo: novationLogo },
  { name: "Denon DJ", logo: denonDjLogo },
  { name: "UDG Gear", logo: udgLogo },
  { name: "UAG", logo: uagLogo },
  { name: "Pro DJ Studio", logo: proDjStudioLogo },
  { name: "Splice", logo: spliceLogo },
  { name: "SLCT Experiences", logo: slctExpLogo },
  { name: "SLCT Talents", logo: slctTalentLogo },
];

// Duplicate the array for a seamless loop
const duplicatedPartners = [...partners, ...partners];

export function PartnersSection() {
  return (
    <section id="partners" className="py-24 bg-background relative overflow-hidden">
      {/* Background flair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Our Ecosystem
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="text-gradient">Partners</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Collaborating with industry leaders to providing world-class opportunities and resources for our students.
          </motion.p>
        </div>

        {/* Carousel Container - same style as CollaboratorsSection */}
        <div className="relative group max-w-full overflow-hidden">
          {/* Glassmorphism background bar */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border-y border-white/5 pointer-events-none" />
          
          <div className="flex items-center overflow-hidden py-12">
            <motion.div 
              className="flex gap-12 items-center"
              animate={{ 
                x: [0, -((partners.length * 200) + (partners.length * 48))] 
              }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ width: "fit-content" }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="w-[200px] flex-shrink-0 flex items-center justify-center transition-all duration-300"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
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
