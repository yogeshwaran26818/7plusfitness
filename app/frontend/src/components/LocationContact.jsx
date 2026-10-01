import { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { STUDIO, GOALS, API } from "@/data";

export default function LocationContact() {
  const whatsappBookingUrl = `https://wa.me/${STUDIO.phoneInternational.replace(/\D/g, "")}?text=Hi!%20I%20just%20submitted%20a%20booking%20request%20on%20your%20website.`;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    goal: GOALS[2],
    date: "",
    preferred_time: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/booking`, form, { timeout: 10000 });
      toast.success(
        "Inquiry sent — our team will call you within a few hours!",
        {
          description: "Prefer WhatsApp? Tap the button on the left.",
          action: {
            label: "Chat directly on WhatsApp",
            onClick: () =>
              window.open(whatsappBookingUrl, "_blank", "noopener,noreferrer"),
          },
        },
      );
      setSent(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        goal: GOALS[2],
        date: "",
        preferred_time: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err.code === "ECONNABORTED" || err.response?.status === 503
          ? "We could not reach the booking service. Please try again or chat directly on WhatsApp."
          : err.response?.data?.detail ||
              "Could not send your inquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-8 lg:py-12 px-4 sm:px-8 lg:px-16"
      data-testid="contact-section"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
            Location & Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95]">
            Come See The <span className="text-volt">Floor</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="bg-panel border border-edge rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex gap-4" data-testid="contact-address">
                <MapPin className="text-volt shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                    Find Us
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                    {STUDIO.addressFull}
                  </p>
                  <a
                    href={STUDIO.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-directions-link"
                    className="inline-block mt-2 text-xs font-semibold uppercase tracking-widest text-neon hover:text-volt transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
              <div
                className="flex gap-4 border-t border-edge pt-4"
                data-testid="contact-hours"
              >
                <Clock className="text-volt shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                    Open Hours
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {STUDIO.hoursLabel}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col sm:flex-row gap-3 border-t border-edge pt-4"
                data-testid="contact-actions"
              >
                <a
                  href={`tel:${STUDIO.phone.replace(/\s/g, "")}`}
                  data-testid="contact-call-link"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-edgehi rounded-full py-3 text-sm font-bold uppercase tracking-wider hover:border-volt hover:text-volt transition-colors"
                >
                  <Phone size={16} /> {STUDIO.phone}
                </a>
                <a
                  href={STUDIO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-link"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-volt text-ink rounded-full py-3 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>
              <p className="flex items-center gap-2 text-xs text-slate-500 border-t border-edge pt-4">
                <Mail size={13} /> {STUDIO.email}
              </p>
            </div>

            <div
              className="mt-6 rounded-2xl overflow-hidden border border-edge"
              data-testid="contact-map"
            >
              <a
                href={STUDIO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open directions to 7 Plus Fitness Gym in Google Maps"
                className="block"
              >
                <iframe
                  title="7 Plus Fitness Gym — Sithalapakkam, Chennai"
                  src={STUDIO.mapEmbed}
                  className="pointer-events-none w-full h-[280px] sm:h-[340px] map-dark"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </a>
            </div>
          </div>

          <div
            className="bg-panel border border-edge rounded-2xl p-7 sm:p-8 self-start"
            data-testid="trial-form-card"
          >
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-neon mb-2">
              Free Trial Class
            </p>
            <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight">
              Your First Session Is On Us
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Tell us where you are and we will pair you with the right class
              and coach.
            </p>

            {sent ? (
              <div
                className="mt-8 border border-volt/40 bg-volt/10 rounded-xl p-6 text-center"
                data-testid="trial-form-success"
              >
                <p className="font-display text-2xl font-extrabold uppercase text-volt">
                  Request Received
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Our team will reach out within a few hours to lock in your
                  free trial.
                </p>
                <a
                  href={whatsappBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="trial-form-whatsapp"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-volt px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:bg-white transition-colors"
                >
                  <MessageCircle size={16} /> Chat directly on WhatsApp
                </a>
                <button
                  data-testid="trial-form-reset"
                  onClick={() => setSent(false)}
                  className="mt-4 block mx-auto text-xs font-semibold uppercase tracking-widest text-neon hover:text-volt transition-colors underline underline-offset-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="mt-7 space-y-4"
                data-testid="trial-form"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                      Name
                    </label>
                    <input
                      data-testid="trial-input-name"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your name"
                      className="w-full bg-elevated border border-edgehi rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                      Phone
                    </label>
                    <input
                      data-testid="trial-input-phone"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 98xxx xxxxx"
                      className="w-full bg-elevated border border-edgehi rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                    Email
                  </label>
                  <input
                    data-testid="trial-input-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@email.com"
                    className="w-full bg-elevated border border-edgehi rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-volt transition-colors"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                      Goal
                    </label>
                    <select
                      data-testid="trial-input-goal"
                      value={form.goal}
                      onChange={set("goal")}
                      className="w-full bg-elevated border border-edgehi rounded-xl px-4 py-3 text-white focus:outline-none focus:border-volt transition-colors"
                    >
                      {GOALS.map((g) => (
                        <option key={g} value={g} className="bg-panel">
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                      Preferred Date
                    </label>
                    <input
                      data-testid="trial-input-date"
                      type="date"
                      value={form.date}
                      onChange={set("date")}
                      className="w-full bg-elevated border border-edgehi rounded-xl px-4 py-3 text-white focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                      Preferred Time
                    </label>
                    <select
                      data-testid="trial-input-time"
                      value={form.preferred_time}
                      onChange={set("preferred_time")}
                      className="w-full bg-elevated border border-edgehi rounded-xl px-4 py-3 text-white focus:outline-none focus:border-volt transition-colors"
                    >
                      <option value="" className="bg-panel">
                        Any time
                      </option>
                      <option value="Morning 6–9 AM" className="bg-panel">
                        Morning 6–9 AM
                      </option>
                      <option value="Midday 12–4 PM" className="bg-panel">
                        Midday 12–4 PM
                      </option>
                      <option value="Evening 5–9 PM" className="bg-panel">
                        Evening 5–9 PM
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                    Message (optional)
                  </label>
                  <textarea
                    data-testid="trial-input-message"
                    rows={3}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Injuries, experience, questions…"
                    className="w-full bg-elevated border border-edgehi rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-volt transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="trial-form-submit"
                  className="w-full bg-volt text-ink font-bold uppercase tracking-wider py-4 rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Claim Free Trial
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
