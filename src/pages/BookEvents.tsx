import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { events, formatINR } from "@/lib/mock-data";
import { countries } from "@/lib/locations";
import { Link } from "react-router-dom";

const categories = ["All", "Wedding", "Birthday", "Corporate", "Party"];

export default function BookEvents() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const states = countries.find((c) => c.name === selectedCountry)?.states || [];

  const filtered = events.filter((e) => {
    const matchCat = activeCategory === "All" || e.category === activeCategory.toLowerCase();
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFav = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Book Events</h1>
        <p className="text-muted-foreground text-sm mt-1">Discover and book unforgettable experiences.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-3">Select Location</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <select
              value={selectedCountry}
              onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(""); }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select Country</option>
              {countries.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!selectedCountry}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              <option value="">Select State</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {selectedCountry && selectedState && (
            <p className="text-xs text-muted-foreground mt-2">📍 Showing events in {selectedState}, {selectedCountry}</p>
          )}
        </motion.div>
      )}

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? "gradient-primary-bg text-primary-foreground border-0" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl overflow-hidden hover-lift group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <button onClick={() => toggleFav(event.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
                <Heart className={`h-4 w-4 ${favorites.includes(event.id) ? "fill-destructive text-destructive" : "text-foreground"}`} />
              </button>
              {event.originalPrice && (
                <Badge className="absolute top-3 left-3 gradient-warm-bg text-primary-foreground border-0 text-xs">
                  {Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                <span className="text-sm font-medium">{event.rating}</span>
                <span className="text-xs text-muted-foreground">({event.reviews})</span>
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-1">{event.title}</h3>
              {selectedCountry && selectedState && (
                <p className="text-xs text-muted-foreground mb-2">📍 {selectedState}, {selectedCountry}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold">{formatINR(event.price)}</span>
                  {event.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">{formatINR(event.originalPrice)}</span>
                  )}
                </div>
                <Link to="/dashboard/payment">
                  <Button size="sm" className="gradient-primary-bg text-primary-foreground border-0 text-xs h-8">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
