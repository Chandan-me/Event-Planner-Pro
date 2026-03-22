import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Camera, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/lib/user-context";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast({ title: "Profile updated!" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account settings.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full gradient-primary-bg flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {user?.initials || "??"}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user?.name || "Guest User"}</h3>
            <p className="text-sm text-muted-foreground">Premium Plan Member</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label className="flex items-center gap-2"><User className="h-3.5 w-3.5" /> Full Name</Label><Input defaultValue={user?.name || ""} /></div>
            <div><Label className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> Email</Label><Input defaultValue={user?.email || ""} type="email" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> Phone</Label><Input placeholder="+91 98765 43210" /></div>
          </div>
          <Button className="gradient-primary-bg text-primary-foreground border-0" onClick={handleSave} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</h3>
        <div className="space-y-4">
          <div><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>New Password</Label><Input type="password" placeholder="••••••••" /></div>
            <div><Label>Confirm Password</Label><Input type="password" placeholder="••••••••" /></div>
          </div>
          <Button variant="outline">Update Password</Button>
        </div>
      </motion.div>
    </div>
  );
}
