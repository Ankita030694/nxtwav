import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who are the founders of NXTwav?",
    answer: "NXTwav was co-founded by three industry insiders: Siddharth Sethi (BeatCrush) - a touring DJ, music producer, and entrepreneur; Lakshay Nanda (Skopos) - with over 10 years of experience behind the decks including 500+ weddings and corporate events; and Kanav Kumar (SLCT) - an entrepreneur with extensive experience in artist management, event curation, and brand-led live experiences. Together, they bring real-world industry knowledge to every course.",
  },
  {
    question: "What makes NXTwav different from other music academies?",
    answer: "Three key differences: (1) Our founders are active working artists who still perform at clubs, festivals, and events, not just instructors teaching from textbooks. (2) We focus on career outcomes with structured 12-month roadmaps, mentorship, and industry connections, not just course certificates. (3) Monthly live founder sessions let you watch real production happen in real-time. We don't just teach skills, we launch careers.",
  },
  {
    question: "What kind of courses do you offer?",
    answer: "We offer comprehensive programs covering Music Production (DAWs, sound design, mixing, mastering), DJ Performance (beatmatching, scratching, crowd control, controller and CDJ workflows), Artist Development (branding, marketing, content strategy), and Music Business (label submissions, licensing, revenue streams, booking). Each course is designed with real-world application in mind.",
  },
  {
    question: "Do I need prior experience to join?",
    answer: "Not at all! We have programs for all skill levels. Our beginner courses assume no prior knowledge and build your foundation step-by-step. Advanced courses are available for those looking to take their existing skills to a professional level. The interactive puzzles on our Courses page can help you discover which program suits your current level.",
  },
  {
    question: "How are the 'Live in the Studio' sessions different from recorded courses?",
    answer: "They're 100% live, unscripted, and interactive! Our founders produce a track from scratch in real-time while you watch. You can ask questions in the chat, vote on creative decisions, and see the entire thought process - no cuts, no editing. It's like being in the studio with a professional producer. Replays are available within 24 hours for enrolled students.",
  },
  {
    question: "Do you help students get real gigs and opportunities?",
    answer: "Absolutely! Career guidance is central to our mission. BeatCrush's vision for NXTwav is to bridge the gap between learning and performing. We actively guide students into real-world gigs, showcases, and professional opportunities through our industry network. Our 95% career success rate reflects our commitment to launching careers, not just teaching skills.",
  },
  {
    question: "What software and equipment do I need?",
    answer: "For music production, we primarily teach on Ableton Live, but skills transfer to any DAW (FL Studio, Logic Pro, etc.). For DJing, we cover Pioneer CDJ workflows and controller-based DJing with Serato and Rekordbox. We've partnered with these companies for student discounts - you'll get details upon enrollment. A laptop and headphones are recommended to start.",
  },
  {
    question: "What's your refund policy?",
    answer: "We offer a 14-day no-questions-asked refund policy. If you're not satisfied with the course content or teaching quality within the first 2 weeks, we'll refund 100% of your payment. We're that confident in our program. You can view our complete refund policy in the footer.",
  },
  {
    question: "Do you offer payment plans or EMI options?",
    answer: "Yes! We offer flexible EMI options for Indian students through partner payment gateways including Razorpay. International students can pay in 2-3 installments. Contact our team for custom payment arrangements that work for your budget.",
  },
  {
    question: "Can I access courses offline?",
    answer: "All recorded course content can be downloaded for offline viewing through our mobile app. Live sessions must be watched in real-time, but replays are available within 24 hours for enrolled students. This way, you can learn at your own pace, anywhere.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Got Questions?{" "}
            <span className="text-gradient">We've Got Answers</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about starting your music career with us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-6 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
