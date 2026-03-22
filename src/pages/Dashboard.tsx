import { motion } from "framer-motion";
import { CalendarDays, IndianRupee, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "@/lib/user-context";

const stats = [
  { label: "Total Events", value: "24", change: "+12%", icon: CalendarDays },
  { label: "Revenue", value: "₹40,25,000", change: "+8.2%", icon: IndianRupee },
  { label: "Bookings", value: "156", change: "+23%", icon: TrendingUp },
  { label: "Attendees", value: "1,420", change: "+15%", icon: Users },
];

const chartData = [
  { month: "Jan", events: 4 }, { month: "Feb", events: 7 }, { month: "Mar", events: 5 },
  { month: "Apr", events: 9 }, { month: "May", events: 12 }, { month: "Jun", events: 8 },
];

export default function Dashboard() {
  const { user } = useUser();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Welcome back, {firstName}! 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's what's happening with your events.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 hover-lift"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg gradient-primary-bg flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-success">{s.change}</span>
            </div>
            <p className="text-xl md:text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-4 md:p-6">
        <h3 className="font-display font-semibold mb-4">Events Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Bar dataKey="events" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
