import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Lock, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { events, bookings, formatINR } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";
import { useToast } from "@/hooks/use-toast";

export default function AdminPanel() {
  const { isAdmin, adminLogin, adminLogout } = useUser();
  const [tab, setTab] = useState<"events" | "bookings">("events");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      toast({ title: "Admin access granted!", description: "Welcome to the admin panel." });
      setPassword("");
      setError("");
    } else {
      setError("Invalid admin password. Access denied.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <div className="glass-strong rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full gradient-primary-bg mx-auto flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Admin Access Required</h2>
            <p className="text-sm text-muted-foreground mb-6">Enter the admin password to access the management panel.</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="text-left">
                <Label>Admin Password</Label>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className={error ? "border-destructive" : ""}
                />
                {error && <p className="text-xs text-destructive mt-1">{error}</p>}
              </div>
              <Button type="submit" className="w-full gradient-primary-bg text-primary-foreground border-0">
                <ShieldCheck className="h-4 w-4 mr-2" /> Unlock Admin Panel
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Hint: Contact your system administrator for access credentials.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage events and bookings.</p>
        </div>
        <div className="flex gap-2">
          <Button className="gradient-primary-bg text-primary-foreground border-0 gap-2">
            <Plus className="h-4 w-4" /> Add Event
          </Button>
          <Button variant="outline" onClick={adminLogout} className="gap-2 text-destructive">
            <LogOut className="h-4 w-4" /> Exit Admin
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {(["events", "bookings"] as const).map((t) => (
          <Button key={t} variant={tab === t ? "default" : "outline"} size="sm" onClick={() => setTab(t)} className={tab === t ? "gradient-primary-bg text-primary-foreground border-0" : ""}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>

      {tab === "events" && (
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Event</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">Category</th>
                  <th className="text-left p-4 font-semibold">Price</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">Rating</th>
                  <th className="text-right p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium">{e.title}</td>
                    <td className="p-4 hidden sm:table-cell"><Badge variant="outline">{e.category}</Badge></td>
                    <td className="p-4">{formatINR(e.price)}</td>
                    <td className="p-4 hidden md:table-cell">{e.rating}⭐</td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "bookings" && (
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">ID</th>
                  <th className="text-left p-4 font-semibold">Event</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">Date</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-right p-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{b.id}</td>
                    <td className="p-4 font-medium">{b.eventTitle}</td>
                    <td className="p-4 hidden sm:table-cell text-muted-foreground">{b.date}</td>
                    <td className="p-4"><Badge variant="outline" className={
                      b.status === "confirmed" ? "bg-success/10 text-success border-success/20" :
                      b.status === "pending" ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-destructive/10 text-destructive border-destructive/20"
                    }>{b.status}</Badge></td>
                    <td className="p-4 text-right font-semibold">{formatINR(b.amount)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
