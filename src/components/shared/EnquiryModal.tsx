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

    const emailBody = {
      to: "naimishdwivedi183@gmail.com",
      subject: "Jewel INTEGRA New Enquiry Received",
      message: `
        <h3>New Enquiry</h3>
        <p><b>Name:</b> ${form.name}</p>
        <p><b>Email:</b> ${form.email}</p>
        <p><b>Phone:</b> ${form.phone}</p>
        <p><b>Message:</b> ${form.message}</p>
      `,
    };

    try {
      const res = await fetch(
        "https://positivequadrant.in/emailapi/send_email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "pq_api_zyxcba@109256",
          },
          body: JSON.stringify(emailBody),
        }
      );

      if (!res.ok) throw new Error("Failed");

      toast.success("Enquiry sent successfully");
      setOpen(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error("Failed to send enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Enquiry</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enquiry Form</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <PhoneInput
              international
              defaultCountry="IN"
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value || "" })}
              className="border rounded-md px-3 py-2"
            />

            <Textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <Button
              className="w-full h-9 sm:h-10 lg:h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold text-sm sm:text-base shadow-lg shadow-primary/30 transition-all duration-300 group"
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
