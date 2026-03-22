import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookings, formatINR } from "@/lib/mock-data";

const statusStyles: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function MyBookings() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">Track and manage all your event bookings.</p>
        </div>
        <div className="flex gap-1 glass rounded-lg p-1">
          <Button variant={view === "grid" ? "default" : "ghost"} size="icon" className={view === "grid" ? "gradient-primary-bg text-primary-foreground border-0" : ""} onClick={() => setView("grid")}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant={view === "list" ? "default" : "ghost"} size="icon" className={view === "list" ? "gradient-primary-bg text-primary-foreground border-0" : ""} onClick={() => setView("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 hover-lift">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="outline" className={statusStyles[b.status]}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">{b.id}</span>
              </div>
              <h3 className="font-semibold mb-2">{b.eventTitle}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" /> {b.date}</div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-lg font-bold">{formatINR(b.amount)}</span>
                <span className="text-xs text-muted-foreground">{b.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{b.eventTitle}</h3>
                  <Badge variant="outline" className={statusStyles[b.status]}>{b.status}</Badge>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {b.date}</span>
                </div>
              </div>
              <span className="text-lg font-bold">{formatINR(b.amount)}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
