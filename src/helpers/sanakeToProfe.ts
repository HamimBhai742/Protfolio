import { Profession } from "@/types/Profile.data";

export function snakeToProfession(s: Profession) {
  if (!s) return '';
  return s
    .split('_')
    .map((word) => word.trim())
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
