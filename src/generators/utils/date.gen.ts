import { FileOutput } from "../../types/index.js";

export function generateDate(): FileOutput[] {
  return [
    {
      path: "src/utils/date.util.ts",
      content: `export const formatDate = (
  date: Date | string,
  locale = "tr-TR",
  options?: Intl.DateTimeFormatOptions
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, options ?? {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (
  date: Date | string,
  locale = "tr-TR"
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const timeAgo = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "yıl"],
    [2592000, "ay"],
    [604800, "hafta"],
    [86400, "gün"],
    [3600, "saat"],
    [60, "dakika"],
    [1, "saniye"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return \`\${count} \${label} önce\`;
  }

  return "az önce";
};

export const isExpired = (date: Date | string): boolean => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.getTime() < Date.now();
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const diffInDays = (a: Date, b: Date): number => {
  const ms = Math.abs(a.getTime() - b.getTime());
  return Math.floor(ms / 86400000);
};
`,
    },
  ];
}
