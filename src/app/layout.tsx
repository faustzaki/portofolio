import type { Metadata } from "next";
import { display, body, mono } from "./fonts";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Faustzaki Ghathaf Rizqi — Creative Developer & UI/UX Designer",
  description: "Showcase portfolio: interactive experiences and recruiter-fast project index.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
