import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Refund Policy
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg">
              At NXTwav, we strive to ensure your satisfaction with every course. If you are not completely satisfied, please review our refund policy below.
            </p>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Eligibility for Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refund requests can be made within 3 days of purchase.</li>
                <li>Courses must not have been accessed beyond the introductory modules.</li>
                <li>Refund eligibility may vary based on the type of course or program purchased.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. How to Request a Refund</h2>
              <p>To request a refund, contact our support team at <a href="mailto:support@nxtwav.com" className="text-primary hover:underline">support@nxtwav.com</a> with your order details and reason for the refund.</p>
              <p className="mt-3">Once your refund request is approved, we will provide you with confirmation and next steps.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Refund Process</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are initiated once your request is reviewed and approved.</li>
                <li>Refunds will be credited to your original payment account within 7-15 business days.</li>
                <li>For Cash on Delivery (COD) orders, refunds will be credited to your provided bank account within 7-15 business days.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Course Transfers</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Course transfers are subject to availability. If the desired course is unavailable, a refund will be issued.</li>
                <li>Transferred courses will be activated within 2-3 business days.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Technical Issues</h2>
              <p>If you experience technical issues that prevent you from accessing course content, please contact us immediately at <a href="mailto:support@nxtwav.com" className="text-primary hover:underline">support@nxtwav.com</a> with details of the issue. We will provide a resolution or refund at no additional cost.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Non-Refundable Items</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Live session recordings and downloaded materials.</li>
                <li>Courses that have been substantially accessed or completed.</li>
                <li>Special promotions or discounted courses (unless otherwise stated).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Contact Us</h2>
              <p>If you have any questions about our refund policy, please reach out to us at <a href="mailto:support@nxtwav.com" className="text-primary hover:underline">support@nxtwav.com</a>.</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default RefundPolicy;
