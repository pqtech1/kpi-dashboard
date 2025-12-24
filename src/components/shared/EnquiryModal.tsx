import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import { User, Mail, MessageCircle, Phone } from "lucide-react";

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      // Call YOUR Laravel API (no CORS issues since same domain)
      const res = await fetch("https://techupgrad.in/api/v1/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optional: Add CSRF token if needed
          // "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          source: "Jewel INTEGRA Website",
          send_confirmation: true, // Optional: send auto-reply to customer
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      toast.success("Enquiry sent successfully! We'll contact you soon.");
      setOpen(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Enquiry error:", err);
      toast.error(err.message || "Failed to send enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Enquiry</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-xl p-6 bg-white shadow-xl border border-gray-200">
          <DialogHeader className="text-center mb-4">
            <DialogTitle className="text-2xl font-bold">
              Enquiry Form
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <User
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <PhoneInput
                international
                defaultCountry="IN"
                value={form.phone}
                onChange={(value) => setForm({ ...form, phone: value || "" })}
                className="border rounded-md px-10 py-2 w-full focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="relative">
              <MessageCircle
                className="absolute top-2 left-3 text-gray-400"
                size={18}
              />
              <Textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="pl-10 resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
              />
            </div>

            <Button
              className="w-full h-10 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold text-sm sm:text-base shadow-md shadow-primary/30 transition-all duration-300 rounded-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Enquiry"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
