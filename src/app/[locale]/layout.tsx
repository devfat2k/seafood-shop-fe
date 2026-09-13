import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Be_Vietnam_Pro, Fraunces, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import Providers from '@/app/providers';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/libs/I18nRouting';
import '@/styles/global.css';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

const fraunces = Fraunces({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-heading',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Hải Sản Phan Thiết — Tươi Từ Biển, Sạch Đến Bàn Ăn',
    template: '%s | Hải Sản Phan Thiết',
  },
  description:
    'Sàn thương mại điện tử hải sản tươi sống chất lượng cao, thu mua trực tiếp tại cảng cá Phan Thiết, Bình Thuận. Giao nhanh 2h tại TP.HCM, cam kết bao ăn 1 đổi 1.',
  keywords: [
    'Hải Sản Phan Thiết',
    'Hải sản tươi sống',
    'Tôm cua ghẹ Phan Thiết',
    'Giao hải sản hỏa tốc 2h',
    'Hải sản sạch',
  ],
  authors: [{ name: 'Hải Sản Phan Thiết' }],
  creator: 'Hải Sản Phan Thiết',
  publisher: 'Hải Sản Phan Thiết',
  metadataBase: new URL('https://seafood-shop-fe.vercel.app'),
  openGraph: {
    title: 'Hải Sản Phan Thiết — Tươi Từ Biển, Sạch Đến Bàn Ăn',
    description:
      'Hải sản tươi sống thu mua trực tiếp tại cảng cá Phan Thiết. Chuỗi lạnh khép kín giao nhanh 2h.',
    siteName: 'Hải Sản Phan Thiết',
    locale: 'vi_VN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico?v=2'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${beVietnamPro.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png?v=2" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider>
          <Providers>
            {props.children}
            <Toaster richColors position="top-right" />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
