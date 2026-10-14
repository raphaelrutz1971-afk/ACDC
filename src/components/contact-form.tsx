"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Check, CheckCircle2, Loader2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import {
  clientTypes,
  contactSchema,
  fieldErrors,
  type ContactErrorKey,
  type ContactField,
  type ContactResponse,
} from "@/lib/contact-schema";
import type { Locale } from "@/lib/i18n";
import { buttonClasses } from "./button";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  clientType: string;
  services: string[];
  message: string;
  consent: boolean;
  website: string;
};

type Status = "idle" | "sending" | "success";
type FormError = "notConfigured" | "rateLimited" | "network" | "server" | "summary";

const fieldOrder: ContactField[] = [
  "name",
  "email",
  "phone",
  "clientType",
  "services",
  "message",
  "consent",
];

export function ContactForm({
  lang,
  t,
  services,
  initialService,
}: {
  lang: Locale;
  t: Dictionary["contact"];
  services: { slug: string; title: string }[];
  initialService?: string;
}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const empty: Values = {
    name: "",
    company: "",
    email: "",
    phone: "",
    clientType: "",
    services: initialService && services.some((s) => s.slug === initialService) ? [initialService] : [],
    message: "",
    consent: false,
    website: "",
  };
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactErrorKey>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<FormError | null>(null);

  const validate = (v: Values) => {
    const result = contactSchema.safeParse({ ...v, locale: lang });
    return result.success ? {} : fieldErrors(result.error);
  };

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first submit attempt, re-validate live so errors clear as soon as they're fixed.
    if (submitted) setErrors(validate(next));
  };

  const focusFirstError = (errs: typeof errors) => {
    const first = fieldOrder.find((f) => errs[f]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    el?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormError(null);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).some((k) => k !== "website")) {
      setFormError("summary");
      focusFirstError(errs);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale: lang }),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (data?.ok) {
        setStatus("success");
        return;
      }
      setStatus("idle");
      if (data && data.error === "validation" && data.fields) {
        setErrors(data.fields);
        setFormError("summary");
        focusFirstError(data.fields);
      } else if (data && data.error !== "validation") {
        setFormError(data.error);
      } else {
        setFormError("server");
      }
    } catch {
      setStatus("idle");
      setFormError("network");
    }
  };

  const reset = () => {
    setValues({ ...empty, services: [] });
    setErrors({});
    setSubmitted(false);
    setFormError(null);
    setStatus("idle");
  };

  const err = (f: ContactField) => (errors[f] ? t.errors[errors[f]!] : null);
  const describedBy = (f: ContactField, hint?: boolean) =>
    [errors[f] ? `${id}-${f}-error` : null, hint ? `${id}-${f}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const inputClass = (f: ContactField) =>
    `mt-2 block w-full rounded-[4px] border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] outline-none focus:border-ink focus:shadow-[0_0_0_4px_var(--marker)] ${
      errors[f] ? "border-danger" : "border-rule-strong"
    }`;

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="rounded-[6px] border border-rule-strong bg-surface p-8 sm:p-10"
          >
            <CheckCircle2 aria-hidden className="size-10 text-success" strokeWidth={1.75} />
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink">{t.form.successTitle}</h3>
            <p className="mt-2 max-w-md font-serif text-lg leading-relaxed text-muted">
              {t.form.successText}
            </p>
            <button type="button" onClick={reset} className={buttonClasses("secondary", "mt-8")}>
              {t.form.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-busy={status === "sending"}
            className="space-y-7"
          >
            <AnimatePresence>
              {formError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    role="alert"
                    className="flex gap-3 rounded-[4px] border border-danger/50 bg-danger/8 p-4 text-ink"
                  >
                    <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
                    <p>{t.errors[formError]}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${id}-name`} label={t.form.name} error={err("name")} errorId={`${id}-name-error`}>
                <input
                  id={`${id}-name`}
                  data-field="name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  aria-required
                  className={inputClass("name")}
                />
              </Field>
              <Field id={`${id}-company`} label={t.form.company} optional={t.form.optional}>
                <input
                  id={`${id}-company`}
                  name="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputClass("company")}
                />
              </Field>
              <Field id={`${id}-email`} label={t.form.email} error={err("email")} errorId={`${id}-email-error`}>
                <input
                  id={`${id}-email`}
                  data-field="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  aria-required
                  className={inputClass("email")}
                />
              </Field>
              <Field
                id={`${id}-phone`}
                label={t.form.phone}
                optional={t.form.optional}
                error={err("phone")}
                errorId={`${id}-phone-error`}
              >
                <input
                  id={`${id}-phone`}
                  data-field="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy("phone")}
                  className={inputClass("phone")}
                />
              </Field>
            </div>

            <fieldset aria-describedby={describedBy("clientType")}>
              <legend className="text-[0.95rem] font-semibold text-ink">{t.form.clientType}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {clientTypes.map((ct, i) => (
                  <label key={ct} className="cursor-pointer">
                    <input
                      type="radio"
                      name="clientType"
                      value={ct}
                      data-field={i === 0 ? "clientType" : undefined}
                      checked={values.clientType === ct}
                      onChange={() => update("clientType", ct)}
                      className="peer sr-only"
                    />
                    <span
                      className={`inline-flex items-center rounded-full border px-4 py-2 text-[0.95rem] transition-colors peer-checked:border-fir peer-checked:bg-fir peer-checked:text-on-fir peer-focus-visible:shadow-[0_0_0_3px_var(--paper),0_0_0_6px_var(--marker)] hover:border-ink ${
                        errors.clientType ? "border-danger" : "border-rule-strong"
                      } text-ink`}
                    >
                      {t.form.clientTypes[ct]}
                    </span>
                  </label>
                ))}
              </div>
              <ErrorText id={`${id}-clientType-error`} text={err("clientType")} />
            </fieldset>

            <fieldset aria-describedby={describedBy("services")}>
              <legend className="text-[0.95rem] font-semibold text-ink">{t.form.services}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {services.map((s, i) => {
                  const checked = values.services.includes(s.slug);
                  return (
                    <label key={s.slug} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={s.slug}
                        data-field={i === 0 ? "services" : undefined}
                        checked={checked}
                        onChange={() =>
                          update(
                            "services",
                            checked
                              ? values.services.filter((x) => x !== s.slug)
                              : [...values.services, s.slug],
                          )
                        }
                        className="peer sr-only"
                      />
                      <span
                        className={`flex items-center gap-3 rounded-[4px] border bg-surface px-4 py-3 text-ink transition-colors peer-checked:border-fir peer-focus-visible:shadow-[0_0_0_4px_var(--marker)] hover:border-ink ${
                          errors.services ? "border-danger" : "border-rule-strong"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`grid size-5 shrink-0 place-items-center rounded-[3px] border transition-colors ${
                            checked ? "border-fir bg-fir text-on-fir" : "border-rule-strong"
                          }`}
                        >
                          {checked && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        {s.title}
                      </span>
                    </label>
                  );
                })}
              </div>
              <ErrorText id={`${id}-services-error`} text={err("services")} />
            </fieldset>

            <Field id={`${id}-message`} label={t.form.message} error={err("message")} errorId={`${id}-message-error`}>
              <p id={`${id}-message-hint`} className="mt-1 text-sm text-muted">
                {t.form.messageHint}
              </p>
              <textarea
                id={`${id}-message`}
                data-field="message"
                name="message"
                rows={6}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={describedBy("message", true)}
                aria-required
                className={`${inputClass("message")} resize-y`}
              />
            </Field>

            {/* Honeypot, hidden from people and assistive tech. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="website"
                  value={values.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </label>
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-ink">
                <input
                  type="checkbox"
                  data-field="consent"
                  name="consent"
                  checked={values.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={describedBy("consent")}
                  className="mt-1 size-5 shrink-0 accent-[var(--fir)]"
                />
                <span className="leading-relaxed">
                  {t.form.consent}{" "}
                  <Link
                    href={`/${lang}/datenschutz`}
                    className="font-semibold text-fir underline underline-offset-4"
                  >
                    {t.form.privacyLink}
                  </Link>
                </span>
              </label>
              <ErrorText id={`${id}-consent-error`} text={err("consent")} />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={buttonClasses("primary", "w-full px-8 py-4 sm:w-auto")}
            >
              {status === "sending" && <Loader2 aria-hidden className="size-4 animate-spin" />}
              {status === "sending" ? t.form.sending : t.form.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string | null;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.95rem] font-semibold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">({optional})</span>}
      </label>
      {children}
      {errorId && <ErrorText id={errorId} text={error ?? null} />}
    </div>
  );
}

function ErrorText({ id, text }: { id: string; text: string | null }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger">
      <AlertCircle aria-hidden className="size-4 shrink-0" />
      {text}
    </p>
  );
}
