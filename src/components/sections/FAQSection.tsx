import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is this academy for?",
    answer: "Our programs are designed for students, working professionals, freelancers, and creators who want to build real-world skills and start earning in the digital economy. Whether you’re a beginner or already have some experience, the curriculum adapts to your level.",
  },
  {
    question: "Is NxtWav an online or offline academy?",
    answer: "Currently, NxtWav operates as an offline learning academy where students learn through hands-on sessions, practical workshops, and mentor guidance. We are also working on online learning programs that will launch soon, allowing students from anywhere to access our courses.",
  },
  {
    question: "What will I be able to do after completing the program?",
    answer: "By the end of the program, you will be able to:\n• Apply your skills to real-world projects\n• Build a professional portfolio\n• Work with industry tools and workflows\n• Start freelancing, internships, or entry-level opportunities in the field",
  },
  {
    question: "Is there an age requirement to join NxtWav Academy?",
    answer: "There is no strict age criteria to join NxtWav Academy. Our programs are open to students, aspiring creators, and working professionals who are passionate about learning creative skills. As long as you have the interest to learn and the commitment to practice, you’re welcome to be part of the academy.",
  },
  {
    question: "What kind of career opportunities can students expect after completing the program?",
    answer: "At NxtWav, our goal is to help students build real-world creative skills and connect with meaningful opportunities. Students receive career guidance, portfolio support, and access to our growing network of creators, professionals, and industry contacts. We actively assist learners in exploring opportunities such as freelance work, collaborations, internships, and entry-level roles where applicable.",
  },
  {
    question: "Do I need prior experience to join?",
    answer: "Not at all! We have programs for all skill levels. Our beginner courses assume no prior knowledge and build your foundation step-by-step. Advanced courses are available for those looking to take their existing skills to a professional level. The interactive puzzles on our Courses page can help you discover which program suits your current level.",
  },
  {
    question: "Are there any prerequisites to join this academy?",
    answer: "To get the most out of the program, students should have a laptop and a good pair of studio-quality headphones for practice and production work.\n\nHaving experience with a musical instrument can be helpful for understanding music theory, but it is not required. Our curriculum covers music theory and fundamentals from the ground up, so beginners are welcome.",
  },
  {
    question: "What payment options are available?",
    answer: "NxtWav offers flexible payment options to make enrollment easier for students. You can choose to:\n• Pay the full course fee upfront, or\n• Opt for a 2-installment payment plan directly through the academy\n\nWe also support flexible EMI or pay-later options through our online payment gateways (such as Razorpay and credit card providers), subject to the gateway’s terms and eligibility. To confirm your seat, an advance payment is required.",
  },
  {
    question: "Does NxtWav offer a refund policy?",
    answer: "All enrollments are final and non-refundable once access to the program or academy resources has been granted.",
  },
  {
    question: "What makes NxtWav different from other creative academies?",
    answer: "NxtWav is built around real-world creative practice and industry exposure, not just classroom learning. Three key things set us apart:\n\n1. Industry-led learning: Our programs are guided by active creators and professionals, so students learn workflows, tools, and approaches that are actually used in the industry today.\n\n2. Focus on real outcomes: We emphasize portfolio building, practical projects, mentorship, and industry exposure, helping students develop work that can open doors to freelance projects, collaborations, and entry-level opportunities.\n\n3. Direct access to creators and mentors: Students regularly interact with mentors and founders through sessions, feedback reviews, and live creative breakdowns.",
  },
  {
    question: "How do I enroll in NxtWav Academy?",
    answer: "The best way to get started is by speaking with our team. They’ll help you understand the programs, learning format, schedules, and payment options, and guide you in choosing the course that aligns with your creative goals. Once you’re ready, we’ll assist you with the enrollment process step-by-step. Simply reach out through our website or contact channels to connect with the team.",
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
