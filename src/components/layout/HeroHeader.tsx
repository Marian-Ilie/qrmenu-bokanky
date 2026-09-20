'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { MapPin, Clock, Wifi, Globe } from 'lucide-react';
import { LocaleKey } from '@/types/database';

interface HeroHeaderProps {
    locale: LocaleKey;
}

export default function HeroHeader({ locale }: HeroHeaderProps) {
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const newLocale = locale === 'ro' ? 'en' : 'ro';
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <header className="relative w-full h-[50vh] min-h-[420px] flex flex-col justify-end pb-8">
            {/* Imaginea de Cover & Gradient */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/cover.jpg"
                    alt="Bokanky Cover"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/70 to-neutral-950" />
            </div>

            {/* Buton Comutare Limbă (Top Right) */}
            <div className="absolute top-6 right-6 z-20">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-700/50 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg active:scale-95 transition-transform"
                >
                    <Globe size={16} className="text-amber-500" />
                    {locale === 'ro' ? 'EN' : 'RO'}
                </button>
            </div>

            {/* Conținutul Principal */}
            <div className="relative z-10 px-6 max-w-2xl mx-auto w-full flex flex-col items-center text-center gap-7">

                {/* Integrare Logo Real */}
                <div className="flex flex-col items-center gap-3 mt-4">
                    <div className="relative w-36 h-36 md:w-44 md:h-44 drop-shadow-2xl">
                        <Image
                            src="/bokanky_logo.png"
                            alt="Bokanky Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <p className="text-amber-500 text-xs md:text-sm tracking-[0.25em] font-bold uppercase">
                        {locale === 'ro' ? 'Restaurant • Pizzerie' : 'Restaurant • Pizzeria'}
                    </p>
                </div>

                {/* Informații Utile (Glassmorphism Card) */}
                <div className="w-full flex flex-col gap-3 bg-neutral-900/50 backdrop-blur-md p-4 rounded-2xl border border-neutral-800/60 shadow-2xl">
                    <div className="flex justify-center gap-6 text-sm text-neutral-200">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-amber-500" />
                            <span className="font-medium">L-V: 09-01 | S-D: 12-01</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-amber-500" />
                            <span className="font-medium">Str. Horea 52</span>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-50" />

                    <div className="flex justify-center items-center gap-2 text-sm">
                        <Wifi size={16} className="text-neutral-400" />
                        <span className="font-medium text-white">bokanky pizzerie</span>
                        <span className="text-neutral-600">|</span>
                        <span className="font-mono font-bold text-amber-500">arieseni2017</span>
                    </div>
                </div>
            </div>
        </header>
    );
}