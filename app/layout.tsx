import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { getSiteSettings } from '@/lib/site-settings'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'FMart Россия — Роботы-мойщики окон',
  description: 'Инновационные роботы-стеклоочистители FMart. Моют окна, пока вы отдыхаете. Премиальное качество и современные технологии.',
}

import { CartProvider } from '@/contexts/CartProvider'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background`} data-site-background={settings.backgroundMode}>
        <CartProvider>
        <ThemeProvider
          attribute="class"
          storageKey="fmart-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster position="bottom-right" richColors closeButton />
          </ThemeProvider>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
