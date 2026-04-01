import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { courses, categoryInfo } from "@/data/courses";

const indianStatesAndUTs = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export function LeadForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    course: "",
    instagram: "",
    linkedin: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    // Allow only alphabets and whitespaces for name
    if (id === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    
    // Allow only numerals for phone and restrict to 10 digits
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
    
    if (!formData.name || !formData.email || !formData.phone || !formData.state || !formData.course || !formData.instagram) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields, including your Instagram username and course of interest.",
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
        course: "",
        instagram: "",
        linkedin: "",
        message: ""
      });
      
      setTimeout(() => navigate("/thank-you", { state: { submitted: true } }), 500);
      
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

  return (
    <Card className={`w-full bg-card/95 backdrop-blur-xl border-border ${className}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-display">Get in touch</CardTitle>
        <CardDescription className="text-muted-foreground mt-2">
          Fill out the form below and we'll get back to you
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleTextChange}
              className="bg-background/50"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleTextChange}
              className="bg-background/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Select 
              value={formData.course} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))} 
              required
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Course of Interest" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((cat) => (
                  <SelectGroup key={cat}>
                    <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 px-2 py-1.5 mb-1 rounded-sm">
                      {categoryInfo[cat].label}
                    </SelectLabel>
                    {courses
                      .filter((c) => c.category === cat)
                      .map((course) => (
                        <SelectItem key={course.id} value={course.title}>
                          {course.title}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleTextChange}
              className="bg-background/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="instagram"
                type="text"
                placeholder="Instagram"
                value={formData.instagram}
                onChange={handleTextChange}
                className="bg-background/50"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Select value={formData.state} onValueChange={handleStateChange} required>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {indianStatesAndUTs.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              id="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleTextChange}
              className="bg-background/50 min-h-[80px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-cta hover:opacity-90 text-primary-foreground mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request for a callback"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
