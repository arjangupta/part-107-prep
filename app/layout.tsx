import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FAA Part 107 Flight School",
  description: "Interactive FAA Part 107 lessons, quizzes, and progress tracking.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
