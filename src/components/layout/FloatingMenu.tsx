'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronUp, Star } from 'lucide-react';
import { Category, LocaleKey } from '@/types/database';
import CategoryIcon from '@/components/ui/CategoryIcon';

interface FloatingMenuProps {
    categories: Category[];
    locale: LocaleKey;
}

export default function FloatingMenu({ categories, locale }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const scrollToCategory = (id: string) => {
        setIsOpen(false);
        setTimeout(() => {
            const element = document.getElementById(`category-${id}`);
            if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 300);
    };

    const scrollToTop = () => {
        setIsOpen(false);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    };

    const getCategoryTheme = (nameRo: string) => {
        const name = nameRo.toLowerCase();

        if (name.includes('băuturi') || name.includes('bere') || name.includes('vin')) {
            return { border: 'border-blue-500/20', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' };
        }
        if (name.includes('desert')) {
            return { border: 'border-rose-500/20', iconBg: 'bg-rose-500/10', iconColor: 'text-rose-400' };
        }
        if (name.includes('pizza')) {
            return { border: 'border-amber-500/20', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-500' };
        }
        if (name.includes('post') || name.includes('vegan')) {
            return { border: 'border-emerald-500/20', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' };
        }

        return { border: 'border-neutral-700/50', iconBg: 'bg-neutral-800', iconColor: 'text-neutral-300' };
    };

    return (
        <>
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 bg-amber-500 text-neutral-950 px-6 py-3 rounded-full font-black tracking-wide shadow-[0_4px_20px_rgba(245,158,11,0.4)] active:scale-95 transition-transform"
                >
                    <Menu size={20} strokeWidth={2.5} />
                    {locale === 'ro' ? 'MENIU' : 'MENU'}
                </button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-[100]"
                        />

                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 h-[75vh] bg-neutral-950 z-[110] rounded-t-3xl shadow-2xl flex flex-col border-t border-neutral-800"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-neutral-800/60 bg-neutral-900/50 rounded-t-3xl">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                    {locale === 'ro' ? 'Categorii' : 'Categories'}
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 pb-12 hide-scrollbar">

                                {/* Buton static pentru navigare la top (Acasă/Recomandări) */}
                                <button
                                    onClick={scrollToTop}
                                    className="flex items-center justify-between p-3 mb-2 rounded-2xl bg-neutral-900/40 border border-amber-500/30 hover:bg-neutral-800 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shadow-inner">
                                            <Star className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-amber-500 group-hover:text-amber-400 transition-colors text-left text-[15px]">
                                            {locale === 'ro' ? 'Acasă / Recomandări' : 'Home / Specials'}
                                        </span>
                                    </div>
                                    <ChevronUp size={18} className="text-amber-500 group-hover:text-amber-400 transition-colors mr-1" />
                                </button>

                                {/* Lista dinamică de categorii */}
                                {categories.map((category) => {
                                    const theme = getCategoryTheme(category.name.ro);

                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => scrollToCategory(category.id)}
                                            className={`flex items-center justify-between p-3 rounded-2xl bg-neutral-900/40 border ${theme.border} hover:bg-neutral-800 transition-colors group`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-xl ${theme.iconBg} ${theme.iconColor} shadow-inner`}>
                                                    <CategoryIcon name={category.name.ro} className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-neutral-200 group-hover:text-white transition-colors text-left text-[15px]">
                                                    {category.name[locale] || category.name.ro}
                                                </span>
                                            </div>
                                            <ChevronRight size={18} className="text-neutral-600 group-hover:text-amber-500 transition-colors mr-1" />
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}