import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy | NXTwav Academy"
        description="Our commitment to your privacy. Learn how NXTwav Academy collects, uses, and safeguards your personal information."
        keywords="privacy policy, data protection, NXTwav privacy"
      />
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg">
              At NXTwav, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the information you provide to us. By visiting our website or using our services, you agree to the terms outlined in this policy.
            </p>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p><strong className="text-foreground">Personal Information:</strong> We may collect personal information such as your name, email address, mailing address, phone number, payment information, and any other details you provide when making a purchase or registering on our site.</p>
              <p className="mt-3"><strong className="text-foreground">Usage Data:</strong> We collect information on how our site is accessed and used, which may include information like your IP address, browser type, pages visited, and time spent on those pages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">Order Fulfillment:</strong> To process and fulfill your orders, communicate about your purchases, and provide customer support.</li>
                <li><strong className="text-foreground">Improvement of Services:</strong> To analyze usage, improve our website, and enhance our services.</li>
                <li><strong className="text-foreground">Marketing and Promotions:</strong> To inform you about new products, services, promotions, and updates that may be of interest. You can opt out of these communications at any time.</li>
                <li><strong className="text-foreground">Legal Compliance:</strong> To comply with legal obligations, resolve disputes, and enforce our agreements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Sharing of Information</h2>
              <p><strong className="text-foreground">Third-Party Service Providers:</strong> We may share your information with trusted third-party service providers who assist us with services such as payment processing, shipping, analytics, and advertising.</p>
              <p className="mt-3"><strong className="text-foreground">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owners.</p>
              <p className="mt-3"><strong className="text-foreground">Legal Requirements:</strong> We may disclose your information if required to do so by law or to respond to valid legal processes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Security of Your Information</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. While we strive to protect your data, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Your Rights and Choices</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">Access and Correction:</strong> You have the right to request access to your personal information and to correct inaccuracies.</li>
                <li><strong className="text-foreground">Data Deletion:</strong> You may request that we delete your personal information, subject to legal obligations.</li>
                <li><strong className="text-foreground">Opt-Out:</strong> You can opt out of marketing communications by following the unsubscribe link in our emails or by contacting us directly.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Third-Party Links</h2>
              <p>Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Changes to This Privacy Policy</h2>
              <p>We may update this policy periodically. Any changes will be posted on this page with the updated revision date. Your continued use of our site after any changes indicates acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@nxtwavacademy.in" className="text-primary hover:underline">support@nxtwavacademy.in</a>.</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
