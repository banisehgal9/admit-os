import "./globals.css";

export const metadata = {
  title: "Admit OS",
  description: "Your grad-application copilot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
