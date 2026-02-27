import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name?: string;
    email?: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface PaymentPlan {
  id: string;
  name: string;
  amount: number; // in INR
}

export function useRazorpay() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async (plan: PaymentPlan): Promise<boolean> => {
      if (!user) {
        toast({
          title: "Login required",
          description: "Please log in to make a purchase.",
          variant: "destructive",
        });
        return false;
      }

      setIsLoading(true);

      try {
        // Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Failed to load payment gateway");
        }

        // Get the session for authorization
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error("No active session");
        }

        // Create order via edge function
        const { data: orderData, error: orderError } = await supabase.functions.invoke(
          "create-razorpay-order",
          {
            body: {
              amount: plan.amount,
              planName: plan.name,
              planId: plan.id,
            },
          }
        );

        if (orderError || !orderData) {
          throw new Error(orderError?.message || "Failed to create order");
        }

        // Open Razorpay checkout
        return new Promise((resolve) => {
          const options: RazorpayOptions = {
            key: orderData.keyId,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "NXTwav Academy",
            description: plan.name,
            order_id: orderData.orderId,
            prefill: {
              email: user.email,
            },
            theme: {
              color: "#6366f1",
            },
            handler: async (response: RazorpayResponse) => {
              try {
                // Verify payment via edge function
                const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
                  "verify-razorpay-payment",
                  {
                    body: {
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                      planId: plan.id,
                      planName: plan.name,
                      amount: plan.amount,
                    },
                  }
                );

                if (verifyError || !verifyData?.success) {
                  throw new Error("Payment verification failed");
                }

                toast({
                  title: "Payment successful!",
                  description: `Welcome to ${plan.name}! Your subscription is now active.`,
                });
                setIsLoading(false);
                resolve(true);
              } catch (error) {
                console.error("Verification error:", error);
                toast({
                  title: "Payment verification failed",
                  description: "Please contact support if money was deducted.",
                  variant: "destructive",
                });
                setIsLoading(false);
                resolve(false);
              }
            },
            modal: {
              ondismiss: () => {
                toast({
                  title: "Payment cancelled",
                  description: "You can try again whenever you're ready.",
                });
                setIsLoading(false);
                resolve(false);
              },
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        });
      } catch (error) {
        console.error("Payment error:", error);
        toast({
          title: "Payment failed",
          description: error instanceof Error ? error.message : "Something went wrong",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }
    },
    [user, toast, loadRazorpayScript]
  );

  return {
    initiatePayment,
    isLoading,
  };
}
