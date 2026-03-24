import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import abletonLogo from "@/assets/partners/ableton.png";
import slctExpLogo from "@/assets/partners/slct_experiences.png";
import slctTalentLogo from "@/assets/partners/slct_talents.png";
import spliceLogo from "@/assets/partners/splice.png";

const partners = [
  { name: "Ableton", logo: abletonLogo },
  { name: "SLCT Experiences", logo: slctExpLogo },
  { name: "SLCT Talents", logo: slctTalentLogo },
  { name: "Splice", logo: spliceLogo },
];

export function PartnersSection() {
  return (
    <section id="partners" className="py-24 bg-background relative overflow-hidden">
      {/* Background flair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
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

        {/* Static Bar Container */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Neon Border Bar Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-md rounded-3xl" />
          
          <div className="relative bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 rounded-3xl py-12 px-6 flex justify-center items-center shadow-2xl">
            {/* Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center justify-center w-full max-w-4xl">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="aspect-square relative group/item bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-white/5 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-[90%] max-h-[90%] object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
