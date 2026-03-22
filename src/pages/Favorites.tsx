import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { events, formatINR } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Favorites() {
  const favEvents = events.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Favorites</h1>
        <p className="text-muted-foreground text-sm mt-1">Events you've saved for later.</p>
      </div>

      {favEvents.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No favorites yet. Browse events to add some!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {favEvents.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl overflow-hidden hover-lift group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
                  <Heart className="h-4 w-4 fill-destructive text-destructive" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                  <span className="text-sm font-medium">{event.rating}</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{formatINR(event.price)}</span>
                  <Link to="/dashboard/payment"><Button size="sm" className="gradient-primary-bg text-primary-foreground border-0 text-xs h-8">Book</Button></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
