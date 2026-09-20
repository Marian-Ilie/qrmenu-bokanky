'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Category, LocaleKey } from '@/types/database';

interface FloatingMenuProps {
    categories: Category[];
    locale: LocaleKey;
}

export default function FloatingMenu({ categories, locale }: FloatingMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleScrollTo = (id: string) => {
        setIsOpen(false);
        const targetElement = document.getElementById(`category-${id}`);
        if (targetElement) {
            const offset = 24;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Butonul fix din josul ecranului */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-amber-500 text-neutral-950 px-7 py-3.5 rounded-full font-black shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-center gap-2 active:scale-95 transition-transform uppercase tracking-wider text-sm border border-amber-400"
                >
                    <Menu size={18} strokeWidth={3} />
                    {locale === 'ro' ? 'Meniu' : 'Menu'}
                </button>
            </div>

            {/* Pop-up-ul (Bottom Sheet) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-[100]"
                        />

                        <motion.div
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 max-h-[85vh] h-auto bg-neutral-900 z-[110] rounded-t-3xl shadow-2xl flex flex-col border-t border-neutral-800"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                    {locale === 'ro' ? 'Categorii' : 'Categories'}
                                </h3>
                                <button onClick={() => setIsOpen(false)} className="p-2 bg-neutral-800 rounded-full text-neutral-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 pb-12">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleScrollTo(cat.id)}
                                        className="flex justify-between items-center p-4 rounded-2xl bg-neutral-950/50 hover:bg-neutral-800 active:bg-neutral-800 transition-colors text-left"
                                    >
                    <span className="text-neutral-200 font-bold text-lg">
                      {cat.name[locale] || cat.name.ro}
                    </span>
                                        <ChevronRight size={18} className="text-neutral-500" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}