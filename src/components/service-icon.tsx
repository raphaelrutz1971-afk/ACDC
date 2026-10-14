import { BookOpenCheck, Building2, Landmark, Users, type LucideProps } from "lucide-react";

const icons = {
  buchhaltung: BookOpenCheck,
  steuern: Landmark,
  lohn: Users,
  gruendung: Building2,
} as const;

export function ServiceIcon({ slug, ...props }: { slug: string } & LucideProps) {
  const Icon = icons[slug as keyof typeof icons] ?? BookOpenCheck;
  return <Icon aria-hidden strokeWidth={1.75} {...props} />;
}
