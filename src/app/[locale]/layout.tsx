import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from 'react';
import { LocaleKey } from '@/types/database';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bokanky | Restaurant & Pizzerie",
    description: "Meniu digital Bokanky. Preparate proaspete, pizza la cuptor, grill și băuturi. Câmpeni, Alba.",
    applicationName: "Bokanky Menu",
    appleWebApp: {
        capable: true,
        title: "Bokanky",
        statusBarStyle: "black-translucent",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#0a0a0a",
};

export default async function RootLayout({
                                             children,
                                             params
                                         }: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const locale = (['ro', 'en'].includes(rawLocale) ? rawLocale : 'ro') as LocaleKey;

    return (
        <html lang={locale}>
        <body className="min-h-full flex flex-col antialiased bg-black text-white">
        {children}
        </body>
        </html>
    );
}