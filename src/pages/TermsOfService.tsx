import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Terms of Service | NXTwav Academy"
        description="Read our terms of service to understand the rules and guidelines for using NXTwav Academy's platform and courses."
        keywords="terms of service, legal, NXTwav terms"
      />
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg">
              Welcome to NXTwav. By accessing or using our website, you agree to be bound by the terms and conditions outlined below. Please read them carefully before engaging with our services or making a purchase.
            </p>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. General Information</h2>
              <p>This website is operated by NXTwav. The terms "we," "us," and "our" refer to NXTwav throughout the site.</p>
              <p className="mt-3">By visiting our site or purchasing something from us, you agree to be bound by these Terms and Conditions, including any additional terms and policies referenced herein.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Eligibility</h2>
              <p>You must be at least 18 years of age or have the consent of a parent or guardian to use our website.</p>
              <p className="mt-3">By agreeing to these terms, you represent that the information provided during account creation or checkout is accurate and complete.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Product Information</h2>
              <p>We strive to ensure that all course descriptions, images, and prices on our website are accurate. However, errors may occur.</p>
              <p className="mt-3">Courses displayed on the website are subject to availability. We reserve the right to discontinue any course at any time without notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Pricing and Payments</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices listed on the website are inclusive of applicable taxes unless stated otherwise.</li>
                <li>We reserve the right to change pricing at any time without prior notice.</li>
                <li>Payment must be completed at the time of placing an order. Accepted payment methods include credit cards, debit cards, UPI, and wallet payments.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Order Acceptance and Cancellation</h2>
              <p>An order is confirmed only after receiving a confirmation email or message from NXTwav.</p>
              <p className="mt-3">We reserve the right to cancel or refuse any order due to inaccuracies, unavailability, or suspicion of fraudulent activity.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, images, and course materials, is the exclusive property of NXTwav and is protected under applicable intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. User Conduct</h2>
              <p>By using our website, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate any applicable laws or regulations.</li>
                <li>Transmit viruses, malware, or other harmful code.</li>
                <li>Use the website for unauthorized commercial purposes.</li>
                <li>Engage in fraudulent activity or impersonate another person.</li>
                <li>Share, redistribute, or resell course materials without authorization.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Limitation of Liability</h2>
              <p>NXTwav is not responsible for any direct, indirect, or consequential damages arising from your use of the website, courses, or services.</p>
              <p className="mt-3">We do not guarantee that the website will be error-free, secure, or uninterrupted.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Indemnification</h2>
              <p>You agree to indemnify, defend, and hold NXTwav harmless from any claims, liabilities, damages, or expenses arising out of your use of our website or breach of these Terms and Conditions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Governing Law</h2>
              <p>These Terms and Conditions are governed by and construed in accordance with the laws of India.</p>
              <p className="mt-3">Any disputes will be subject to the exclusive jurisdiction of courts in Delhi.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. Changes to Terms</h2>
              <p>NXTwav reserves the right to update or modify these Terms and Conditions at any time without prior notice.</p>
              <p className="mt-3">Changes will be effective immediately upon posting on the website. Your continued use of the website signifies your acceptance of the revised terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">12. Contact Us</h2>
              <p>If you have any questions regarding these Terms and Conditions, please contact us at <a href="mailto:support@nxtwav.com" className="text-primary hover:underline">support@nxtwav.com</a>.</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TermsOfService;
