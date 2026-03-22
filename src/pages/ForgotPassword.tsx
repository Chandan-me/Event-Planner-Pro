import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "Invalid email", variant: "destructive" });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast({ title: "Reset link sent!", description: "Check your email inbox." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-hero-bg">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="glass-strong rounded-2xl p-8 shadow-glow">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 font-display text-2xl font-bold mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="gradient-text">Events-pro</span>
            </Link>
            <p className="text-sm text-muted-foreground">{sent ? "Check your email for reset instructions." : "Enter your email to reset your password."}</p>
          </div>
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button type="submit" className="w-full gradient-primary-bg text-primary-foreground border-0" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-accent-bg mx-auto flex items-center justify-center">
                <span className="text-2xl">✉️</span>
              </div>
              <p className="text-sm text-muted-foreground">We sent a reset link to <span className="font-medium text-foreground">{email}</span></p>
            </div>
          )}
          <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-primary hover:underline mt-6">
            <ArrowLeft className="h-3 w-3" /> Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
