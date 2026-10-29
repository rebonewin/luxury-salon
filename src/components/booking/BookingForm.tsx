"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown, MessageCircle } from "lucide-react";
import { serviceCategories, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  phone: string;
  service: string;
  date: string;
  notes: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  service: "",
  date: "",
  notes: "",
};

function localToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BookingForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [lastUrl, setLastUrl] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setToday(localToday()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const update =
    (field: keyof FormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setStatus("idle");
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    const phoneDigits = values.phone.replace(/\D/g, "");
    const national =
      phoneDigits.length === 12 && phoneDigits.startsWith("91")
        ? phoneDigits.slice(2)
        : phoneDigits.replace(/^0+/, "");

    if (values.name.trim().length < 2) {
      nextErrors.name = "Please tell us your name.";
    }

    if (!/^[6-9]\d{9}$/.test(national)) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!values.service) {
      nextErrors.service = "Please choose a service.";
    }

    if (!values.date) {
      nextErrors.date = "Choose a preferred date.";
    } else if (values.date < localToday()) {
      nextErrors.date = "Please choose today or a future date.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => {
        document.getElementById(`booking-${first}`)?.focus();
      });
      return;
    }

    const lines = [
      "Hello Luxury Salon, I would like to request an appointment.",
      "",
      `Name: ${values.name.trim()}`,
      `Phone: +91 ${national}`,
      `Service: ${values.service}`,
      `Preferred date: ${formatDate(values.date)}`,
    ];

    if (values.notes.trim()) {
      lines.push(`Notes: ${values.notes.trim()}`);
    }

    lines.push("", "Please confirm availability. Thank you.");

    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    setLastUrl(url);
    setStatus("sent");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass = (field: keyof FormValues) =>
    cn(
      "w-full border-0 border-b bg-transparent px-0 py-3 text-[0.9rem] placeholder:text-ink/25 transition-colors focus:border-gold focus:outline-none",
      errors[field] ? "border-[#9a3a2c]" : "border-ink/20",
    );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-ink/10 bg-cream p-6 md:p-8 lg:p-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/10 pb-5">
        <p className="eyebrow text-gold-deep">Appointment request</p>
        <p className="text-[0.52rem] font-medium uppercase tracking-[0.16em] text-stone">
          Takes about a minute
        </p>
      </div>

      {status === "sent" ? (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 border border-gold-deep/35 bg-gold/10 p-4"
        >
          <Check
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-gold-deep"
            strokeWidth={1.8}
          />
          <div>
            <p className="text-sm font-medium text-ink">
              Your request is ready in WhatsApp.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink/55">
              Press send there and our team will confirm your appointment
              personally. If WhatsApp did not open,{" "}
              <a
                href={lastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-deep underline decoration-gold-deep/40 underline-offset-2"
              >
                open it here
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-7 grid gap-x-7 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="booking-name"
            className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone"
          >
            Name <span className="text-gold-deep">*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            className={inputClass("name")}
          />
          {errors.name ? (
            <p
              id="booking-name-error"
              role="alert"
              className="mt-2 text-[0.64rem] text-[#9a3a2c]"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="booking-phone"
            className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone"
          >
            Phone <span className="text-gold-deep">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[0.9rem] text-ink/40">
              +91
            </span>
            <input
              id="booking-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={values.phone}
              onChange={update("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "booking-phone-error" : undefined
              }
              className={cn(inputClass("phone"), "pl-9")}
            />
          </div>
          {errors.phone ? (
            <p
              id="booking-phone-error"
              role="alert"
              className="mt-2 text-[0.64rem] text-[#9a3a2c]"
            >
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="booking-service"
            className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone"
          >
            Service required <span className="text-gold-deep">*</span>
          </label>
          <div className="relative">
            <select
              id="booking-service"
              name="service"
              value={values.service}
              onChange={update("service")}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={
                errors.service ? "booking-service-error" : undefined
              }
              className={cn(
                inputClass("service"),
                "appearance-none pr-8",
                values.service ? "text-ink" : "text-ink/35",
              )}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceCategories.map((category) => (
                <optgroup key={category.slug} label={category.name}>
                  {category.services.map((service) => (
                    <option
                      key={`${category.slug}-${service.name}`}
                      value={`${category.name} — ${service.name}`}
                    >
                      {service.name} · {service.price}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-ink/35"
              strokeWidth={1.4}
            />
          </div>
          {errors.service ? (
            <p
              id="booking-service-error"
              role="alert"
              className="mt-2 text-[0.64rem] text-[#9a3a2c]"
            >
              {errors.service}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="booking-date"
            className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone"
          >
            Preferred date <span className="text-gold-deep">*</span>
          </label>
          <input
            id="booking-date"
            name="date"
            type="date"
            min={today || undefined}
            value={values.date}
            onChange={update("date")}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "booking-date-error" : undefined}
            className={cn(inputClass("date"), "[color-scheme:light]")}
          />
          {errors.date ? (
            <p
              id="booking-date-error"
              role="alert"
              className="mt-2 text-[0.64rem] text-[#9a3a2c]"
            >
              {errors.date}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="booking-notes"
            className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone"
          >
            Notes{" "}
            <span className="normal-case tracking-normal text-ink/35">
              (optional)
            </span>
          </label>
          <textarea
            id="booking-notes"
            name="notes"
            rows={3}
            placeholder="Inspiration, occasion, allergies — anything we should know."
            value={values.notes}
            onChange={update("notes")}
            className={cn(inputClass("notes"), "resize-none")}
          />
        </div>
      </div>

      <button
        type="submit"
        className="group mt-8 flex w-full items-center justify-center gap-3 bg-ink px-7 py-4 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:bg-gold hover:text-ink"
      >
        <MessageCircle
          aria-hidden="true"
          className="size-3.5"
          strokeWidth={1.5}
        />
        Send request via WhatsApp
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </button>

      <p className="mt-4 text-[0.62rem] leading-relaxed text-ink/40">
        This form opens WhatsApp with your details filled in. No payment is
        taken online — your appointment is confirmed only when our team replies.
      </p>
    </form>
  );
}
