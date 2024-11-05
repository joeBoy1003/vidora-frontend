import { SnackbarProvider } from "./_lib/context/SnackbarContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        <SnackbarProvider>{children}</SnackbarProvider>
      </body>
    </html>
  );
}
