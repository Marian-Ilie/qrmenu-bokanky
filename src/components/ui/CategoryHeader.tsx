'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, X } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
import { MenuItem, LocaleKey } from '@/types/database';

interface CategoryHeaderProps {
    categoryName: string;
    iconName: string;
    locale: LocaleKey;
    extras?: MenuItem[];
}

export default function CategoryHeader({ categoryName, iconName, locale, extras = [] }: CategoryHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const hasExtras = extras.length > 0;

    const modalContent = (
        <AnimatePresence>
            {isModalOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-[100]"
                    />

                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 h-[65vh] bg-neutral-900 z-[110] rounded-t-3xl shadow-2xl flex flex-col border-t border-neutral-800"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                            <div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                    {locale === 'ro' ? 'Opțiuni ' : 'Options: '}<span className="text-amber-500">{categoryName}</span>
                                </h3>
                                <p className="text-sm text-neutral-400 mt-1">
                                    {locale === 'ro' ? 'Personalizează-ți preparatul' : 'Customize your meal'}
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 pb-12">
                            {extras.map((extraItem) => (
                                <div key={extraItem.id} className="flex justify-between items-center p-4 rounded-2xl bg-neutral-950/50 border border-neutral-800/50">
                                    <span className="text-neutral-200 font-medium text-[15px]">
                                        {extraItem.name[locale] || extraItem.name.ro}
                                    </span>
                                    <span className="text-amber-500 font-bold bg-neutral-950 px-3 py-1 rounded-lg text-sm border border-neutral-800">
                                        + {extraItem.price} LEI
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <div className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur-xl pt-4 pb-3 px-4 -mx-4 mb-4 border-b border-neutral-800/60 flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-900 rounded-xl text-amber-500 border border-neutral-800/50 shadow-inner">
                        <CategoryIcon name={iconName} className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-neutral-100 uppercase tracking-tight drop-shadow-md">
                        {categoryName}
                    </h2>
                </div>

                {/* Butonul de Extra integrat la nivel de categorie */}
                {hasExtras && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-amber-500 border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 rounded-lg hover:bg-amber-500/20 transition-all uppercase tracking-wide"
                    >
                        <PlusCircle size={14} strokeWidth={2.5} />
                        {locale === 'ro' ? 'Extra' : 'Extra'}
                    </button>
                )}
            </div>

            {mounted && createPortal(modalContent, document.body)}
        </>
    );
}