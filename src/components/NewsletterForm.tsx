import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to the subscription page with proper URL format
    window.location.href = "https://sunrisemanna.kit.com/903a02796b";

    setEmail("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 rounded-full">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 border-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0 rounded-full"
        />
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-[#00FF00] hover:bg-[#00FF00]/90 text-black font-semibold rounded-full"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
};