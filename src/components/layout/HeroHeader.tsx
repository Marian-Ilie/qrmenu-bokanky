'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { MapPin, Clock, Wifi, Globe, Phone } from 'lucide-react';
import { LocaleKey } from '@/types/database';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroHeaderProps {
    locale: LocaleKey;
}

export default function HeroHeader({ locale }: HeroHeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 500], [0, 150]);

    const toggleLanguage = () => {
        const newLocale = locale === 'ro' ? 'en' : 'ro';
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <header className="relative w-full h-[50vh] min-h-[420px] flex flex-col justify-end pb-8 overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0 scale-110 origin-top">
                <Image src="/cover.jpg" alt="Bokanky Cover" fill priority className="object-cover" />
            </motion.div>

            <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/70 to-neutral-950" />

            <div className="absolute top-6 right-6 z-20">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-700/50 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg active:scale-95 transition-transform"
                >
                    <Globe size={16} className="text-amber-500" />
                    {locale === 'ro' ? 'EN' : 'RO'}
                </button>
            </div>

            <div className="relative z-10 px-6 max-w-2xl mx-auto w-full flex flex-col items-center text-center gap-7">
                <div className="flex flex-col items-center gap-3 mt-4">
                    <div className="relative w-36 h-36 md:w-44 md:h-44 drop-shadow-2xl">
                        <Image src="/bokanky_logo.png" alt="Bokanky Logo" fill sizes="(max-width: 768px) 144px, 176px" className="object-contain" priority />
                    </div>
                    <p className="text-amber-500 text-xs md:text-sm tracking-[0.25em] font-bold uppercase drop-shadow-md">
                        {locale === 'ro' ? 'Restaurant • Pizzerie' : 'Restaurant • Pizzeria'}
                    </p>
                </div>

                <div className="w-full flex flex-col gap-4 bg-neutral-900/40 backdrop-blur-md p-5 rounded-2xl border border-neutral-800/50 shadow-2xl">
                    <div className="flex justify-center gap-8 text-sm text-neutral-200">
                        {/* Program */}
                        <div className="flex items-center gap-2.5">
                            <Clock size={18} className="text-amber-500 shrink-0" />
                            <div className="flex flex-col text-left font-medium tracking-wide leading-tight">
                                <span>L-V: 09-01</span>
                                <span>S-D: 12-01</span>
                            </div>
                        </div>
                        {/* Locație */}
                        <div className="flex items-center gap-2.5">
                            <MapPin size={18} className="text-amber-500 shrink-0" />
                            <div className="flex flex-col text-left font-medium tracking-wide leading-tight">
                                <span>Str. Horea</span>
                                <span>Nr. 52</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />

                    {/* Telefon & Wi-Fi */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 text-sm">
                        <a href="tel:0770785504" className="flex items-center gap-2 group">
                            <Phone size={16} className="text-amber-500 group-hover:text-amber-400 transition-colors" />
                            <span className="font-medium text-neutral-200 group-hover:text-white transition-colors tracking-wide">0770 785 504</span>
                        </a>
                        <span className="hidden sm:block text-neutral-700">|</span>
                        <div className="flex items-center gap-2">
                            <Wifi size={16} className="text-neutral-500" />
                            <span className="font-medium text-neutral-300">bokanky pizzerie</span>
                            <span className="text-neutral-700">-</span>
                            <span className="font-mono font-bold text-amber-500">arieseni2017</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}