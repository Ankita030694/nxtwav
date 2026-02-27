import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const indianStatesAndUTs = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export function ConsultationButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approx window innerHeight)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    
    if (id === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({ ...prev, state: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.state) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone.length !== 10) {
      toast({
        title: "Invalid phone number",
        description: "Phone number must be exactly 10 digits.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        source: "free_consultation_drawer",
        createdAt: serverTimestamp()
      });
      
      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        state: "",
        message: ""
      });
      
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Submission failed",
        description: "Something went wrong saving your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible && !isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-white text-black font-bold py-6 px-3 rounded-l-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-x-2 group border border-gray-100 flex items-center justify-center overflow-hidden"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          <div className="absolute inset-0 bg-black translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <span className="relative block transform rotate-180 uppercase tracking-[0.2em] text-[10px] sm:text-xs group-hover:text-white transition-colors duration-300">
            Get a Free Consultation
          </span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white text-black sm:max-w-md border-l border-gray-100 overflow-y-auto px-8">
        <SheetHeader className="space-y-4 pb-6 border-b border-gray-100 mb-6">
          <SheetTitle className="text-2xl font-display font-bold text-black">Get a Free Consultation</SheetTitle>
          <SheetDescription className="text-gray-600">
            Fill out the form below and our experts will get back to you shortly.
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-black font-semibold">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Rahul Sharma"
              value={formData.name}
              onChange={handleTextChange}
              className="bg-gray-50 border-gray-200 text-black focus:border-black focus:ring-black placeholder:text-gray-400"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={handleTextChange}
              className="bg-gray-50 border-gray-200 text-black focus:border-black focus:ring-black placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black font-semibold">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleTextChange}
              className="bg-gray-50 border-gray-200 text-black focus:border-black focus:ring-black placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-black font-semibold">State</Label>
            <Select value={formData.state} onValueChange={handleStateChange} required>
              <SelectTrigger className="bg-gray-50 border-gray-200 text-black focus:border-black focus:ring-black">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {indianStatesAndUTs.map((s) => (
                  <SelectItem key={s} value={s} className="text-black focus:bg-gray-100 focus:text-black">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-black font-semibold">Message</Label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleTextChange}
              className="bg-gray-50 border-gray-200 text-black focus:border-black focus:ring-black placeholder:text-gray-400 min-h-[120px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-6 rounded-md transition-all duration-300 mt-4 active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Get My Free Consultation"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
