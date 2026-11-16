"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import type { Dictionary } from "@/components/sections/types";

interface ContactFormProps {
  labels: Dictionary["contact"];
}

export function ContactForm({ labels }: ContactFormProps) {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setFeedback(null);
    const form = event.currentTarget;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (response.status === 503) {
        setFeedback({ type: "error", text: labels.form_unavailable });
        return;
      }
      if (!response.ok) throw new Error("contact_request_failed");
      setFeedback({ type: "success", text: labels.form_success });
      form.reset();
    } catch {
      setFeedback({ type: "error", text: labels.form_error });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          {labels.form_name}
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} className="min-h-11 rounded-sm border border-[var(--color-bdr)] bg-[var(--color-bg)] px-3 font-normal outline-none focus:border-[var(--color-accent)]" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {labels.form_email}
          <input name="email" type="email" autoComplete="email" required maxLength={254} className="min-h-11 rounded-sm border border-[var(--color-bdr)] bg-[var(--color-bg)] px-3 font-normal outline-none focus:border-[var(--color-accent)]" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        {labels.form_subject}
        <input name="subject" maxLength={160} className="min-h-11 rounded-sm border border-[var(--color-bdr)] bg-[var(--color-bg)] px-3 font-normal outline-none focus:border-[var(--color-accent)]" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        {labels.form_message}
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} className="resize-y rounded-sm border border-[var(--color-bdr)] bg-[var(--color-bg)] px-3 py-2 font-normal outline-none focus:border-[var(--color-accent)]" />
      </label>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={sending} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent-strong)] disabled:cursor-wait disabled:opacity-60">
          <Send size={16} aria-hidden="true" />
          {sending ? labels.form_sending : labels.form_submit}
        </button>
        {feedback ? (
          <p role={feedback.type === "error" ? "alert" : "status"} className={`text-sm ${feedback.type === "success" ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
            {feedback.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}