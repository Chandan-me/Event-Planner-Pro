import { motion } from "framer-motion";
import { CalendarCheck, Shield, Award, Zap, Users, BarChart3 } from "lucide-react";

const features = [
  { icon: CalendarCheck, title: "Easy Booking", desc: "Book events in minutes with our intuitive interface and smart recommendations." },
  { icon: Shield, title: "Secure Payments", desc: "Enterprise-grade encryption protects every transaction you make." },
  { icon: Award, title: "Professional Management", desc: "Dedicated event managers ensure your event is flawless from start to finish." },
  { icon: Zap, title: "Instant Confirmation", desc: "Get real-time booking confirmations and updates directly to your inbox." },
  { icon: Users, title: "Team Collaboration", desc: "Invite your team to plan together with shared dashboards and notes." },
  { icon: BarChart3, title: "Smart Analytics", desc: "Track RSVPs, budgets, and engagement with powerful analytics tools." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Everything you need to
            <span className="gradient-text"> plan perfectly</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful tools designed to make event planning simple, secure, and stunning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass rounded-xl p-6 hover-lift cursor-default"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
