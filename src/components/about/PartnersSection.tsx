import { motion } from "framer-motion";
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
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Network
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Partners</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collaborating with leading brands and organizations to bring you the best opportunities in the music industry.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group p-6 rounded-2xl bg-white border border-border hover:border-primary/50 transition-all duration-300 flex items-center justify-center w-full sm:w-48 sm:h-48 aspect-square sm:aspect-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-[70%] max-h-[70%] object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 relative z-10"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
