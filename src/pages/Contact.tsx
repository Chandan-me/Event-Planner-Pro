import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground text-sm mt-1">Get in touch or schedule a meeting.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg">Send a Message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input placeholder="Your name" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="you@email.com" /></div>
            </div>
            <div><Label>Subject</Label><Input placeholder="How can we help?" /></div>
            <div><Label>Message</Label><Textarea placeholder="Tell us about your event..." rows={4} /></div>
            <Button className="gradient-primary-bg text-primary-foreground border-0">Send Message</Button>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Business Info</h3>
            <div className="space-y-3 text-sm">
              {[
                { icon: MapPin, text: "123 Event Street, Los Angeles, CA 90001" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@Events-pro.com" },
                { icon: Clock, text: "Mon-Fri: 9AM - 6PM PST" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-muted-foreground">
                  <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* Cal.com embed placeholder */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Schedule a Meeting</h3>
            <div className="rounded-lg border border-border overflow-hidden">
              <iframe
                src="https://cal.com"
                className="w-full h-[500px] border-0"
                title="Schedule Meeting"
                loading="lazy"
              />
            </div>
          </div>

          {/* Map placeholder */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Find Us</h3>
            <div className="rounded-lg bg-secondary h-[200px] flex items-center justify-center text-muted-foreground text-sm">
              <MapPin className="h-5 w-5 mr-2" /> Google Maps Integration
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
