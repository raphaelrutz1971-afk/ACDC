import { z } from "zod";
import { serviceSlugs } from "@/content/dictionaries";

export const clientTypes = ["private", "sole", "company", "association"] as const;

/**
 * Shared by the form (client) and the API route (server).
 * Error messages are keys into `dictionary.contact.errors`.
 */
export const contactSchema = z.object({
  name: z.string("nameRequired").trim().min(2, "nameRequired").max(120, "nameRequired"),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string("emailInvalid").trim().max(200, "emailInvalid").pipe(z.email("emailInvalid")),
  phone: z
    .string()
    .trim()
    .max(40, "phoneInvalid")
    .refine((v) => v === "" || /^\+?[\d\s()./-]{7,}$/.test(v), "phoneInvalid")
    .optional()
    .default(""),
  clientType: z.enum(clientTypes, "clientTypeRequired"),
  services: z
    .array(z.enum(serviceSlugs as [string, ...string[]], "servicesRequired"), "servicesRequired")
    .min(1, "servicesRequired"),
  message: z.string("messageShort").trim().min(20, "messageShort").max(4000, "messageLong"),
  consent: z.literal(true, "consentRequired"),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional().default(""),
  locale: z.enum(["de", "en"]).optional().default("de"),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactErrorKey =
  | "nameRequired"
  | "emailInvalid"
  | "phoneInvalid"
  | "clientTypeRequired"
  | "servicesRequired"
  | "messageShort"
  | "messageLong"
  | "consentRequired";

export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      error: "validation" | "notConfigured" | "rateLimited" | "server";
      fields?: Partial<Record<ContactField, ContactErrorKey>>;
    };

const fallbackKey: Partial<Record<ContactField, ContactErrorKey>> = {
  name: "nameRequired",
  email: "emailInvalid",
  phone: "phoneInvalid",
  clientType: "clientTypeRequired",
  services: "servicesRequired",
  message: "messageShort",
  consent: "consentRequired",
};

const errorKeys = new Set<string>(Object.values(fallbackKey).concat("messageLong"));

export function fieldErrors(error: z.ZodError) {
  const out: Partial<Record<ContactField, ContactErrorKey>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (!field || out[field]) continue;
    // Always return a known dictionary key, even for unexpected input shapes.
    out[field] = errorKeys.has(issue.message)
      ? (issue.message as ContactErrorKey)
      : (fallbackKey[field] ?? ("server" as ContactErrorKey));
  }
  return out;
}
