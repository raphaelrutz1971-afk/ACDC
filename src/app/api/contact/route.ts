import nodemailer from "nodemailer";
import { getDictionary } from "@/content/dictionaries";
import { displayName } from "@/content/site";
import {
  contactSchema,
  fieldErrors,
  type ContactResponse,
} from "@/lib/contact-schema";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort limit per server instance; enough to stop casual form spam.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status });
}

function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) return null;
  const port = Number(SMTP_PORT ?? 587);
  return {
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    to: CONTACT_TO,
    from: process.env.CONTACT_FROM ?? SMTP_USER,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "validation" }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields = fieldErrors(parsed.error);
    // A filled honeypot means a bot: pretend success, send nothing.
    if ("website" in fields) return json({ ok: true }, 200);
    return json({ ok: false, error: "validation", fields }, 422);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rateLimited" }, 429);

  const config = smtpConfig();
  if (!config) {
    console.error("[contact] SMTP is not configured. See README → Contact form.");
    return json({ ok: false, error: "notConfigured" }, 503);
  }

  const d = parsed.data;
  // Internal notification is always in German labels, the firm's working language.
  const t = getDictionary("de");
  const serviceNames = d.services
    .map((slug) => t.services.items.find((s) => s.slug === slug)?.title ?? slug)
    .join(", ");

  const text = [
    `Neue Anfrage über ${displayName} (Website, ${d.locale.toUpperCase()})`,
    "",
    `Name:      ${d.name}`,
    `Firma:     ${d.company || "–"}`,
    `E-Mail:    ${d.email}`,
    `Telefon:   ${d.phone || "–"}`,
    `Kunde:     ${t.contact.form.clientTypes[d.clientType]}`,
    `Themen:    ${serviceNames}`,
    "",
    "Nachricht:",
    d.message,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
    await transporter.sendMail({
      from: { name: `${displayName} Website`, address: config.from },
      to: config.to,
      replyTo: { name: d.name, address: d.email },
      subject: `Anfrage: ${serviceNames} – ${d.name}`,
      text,
    });
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] Sending failed:", error);
    return json({ ok: false, error: "server" }, 502);
  }
}
