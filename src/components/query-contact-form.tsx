"use client";

import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import { ContactForm } from "./contact-form";

export function QueryContactForm(props: Omit<ComponentProps<typeof ContactForm>, "initialService">) {
  const service = useSearchParams().get("leistung") ?? undefined;
  return <ContactForm key={service} {...props} initialService={service} />;
}
