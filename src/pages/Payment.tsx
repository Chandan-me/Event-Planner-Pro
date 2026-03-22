import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Wallet, Smartphone, Loader2, Check, PartyPopper, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatINR } from "@/lib/mock-data";

type Step = "payment" | "processing" | "success";

export default function Payment() {
  const [step, setStep] = useState<Step>("payment");
  const [method, setMethod] = useState("card");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const { toast } = useToast();

  const methods = [
    { id: "card", label: "Card", icon: CreditCard },
    { id: "upi", label: "UPI", icon: Smartphone },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];

  const handlePay = async () => {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 3000));
    setStep("success");
  };

  const applyPromo = () => {
    if (promo.toLowerCase() === "event20") {
      setPromoApplied(true);
      toast({ title: "Promo applied!", description: "20% discount added." });
    } else {
      toast({ title: "Invalid code", variant: "destructive" });
    }
  };

  const baseAmount = 399999;
  const amount = promoApplied ? 319999 : baseAmount;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Payment</h1>
        <p className="text-muted-foreground text-sm mt-1">Complete your booking securely.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === "payment" && (
          <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Royal Garden Wedding</span><span>{formatINR(baseAmount)}</span></div>
                {promoApplied && <div className="flex justify-between text-success"><span>Promo (EVENT20)</span><span>-{formatINR(baseAmount - amount)}</span></div>}
                <div className="border-t border-border pt-2 flex justify-between font-bold text-lg"><span>Total</span><span>{formatINR(amount)}</span></div>
              </div>
            </div>

            <div className="flex gap-2">
              <Input placeholder="Promo code (try EVENT20)" value={promo} onChange={(e) => setPromo(e.target.value)} />
              <Button variant="outline" onClick={applyPromo}>Apply</Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`glass rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 text-xs md:text-sm transition-all ${method === m.id ? "ring-2 ring-primary shadow-glow" : "hover:bg-secondary"}`}
                >
                  <m.icon className="h-5 w-5" />
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="space-y-4">
                <div><Label>Card Number</Label><Input placeholder="1234 5678 9012 3456" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
                  <div><Label>CVV</Label><Input placeholder="123" /></div>
                </div>
                <div><Label>Cardholder Name</Label><Input placeholder="Your name" /></div>
              </div>
            )}

            {method === "upi" && (
              <div className="space-y-4">
                <div><Label>UPI ID</Label><Input placeholder="yourname@upi" /></div>
              </div>
            )}

            <Button className="w-full gradient-primary-bg text-primary-foreground border-0 h-12 text-base" onClick={handlePay}>
              Pay {formatINR(amount)}
            </Button>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass rounded-xl p-12 text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <h3 className="font-display text-xl font-bold">Processing Payment</h3>
            <p className="text-sm text-muted-foreground">Please don't close this page...</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-xl p-8 md:p-12 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full gradient-accent-bg mx-auto flex items-center justify-center"
            >
              <Check className="h-10 w-10 text-accent-foreground" />
            </motion.div>
            <PartyPopper className="h-8 w-8 text-warning mx-auto" />
            <h3 className="font-display text-2xl font-bold">Payment Successful!</h3>
            <p className="text-muted-foreground">Your booking has been confirmed. A confirmation email has been sent.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download Invoice</Button>
              <Button className="gradient-primary-bg text-primary-foreground border-0" onClick={() => setStep("payment")}>Book Another</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
