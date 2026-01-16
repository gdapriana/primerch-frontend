import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/helpers/context/auth/auth.provider";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/helpers/context/cart/cart.provider";
import { ThemeProvider } from "@/helpers/context/theme/theme.provider";
import QueryProvider from "@/helpers/context/query/query.provider";

const font = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body className={cn("", font.className)}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <CartProvider>
                {children}
                <Toaster position="bottom-center" />
              </CartProvider>
            </QueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
