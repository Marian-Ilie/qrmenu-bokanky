'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Leaf, Snowflake, Flame } from 'lucide-react';
import { MenuItem, LocaleKey } from '@/types/database';

interface MenuItemCardProps {
    item: MenuItem;
    locale: LocaleKey;
}

export default function MenuItemCard({ item, locale }: MenuItemCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const itemName = item.name[locale] || item.name.ro;
    const itemDesc = item.description ? (item.description[locale] || item.description.ro) : null;
    const hasNutrition = item.nutritional_info !== null;

    // Logica de Tag-uri dinamice
    const isSpicy = itemName.toLowerCase().includes('diavola') || itemName.toLowerCase().includes('picant') || itemName.toLowerCase().includes('chilly');
    const isVegan = itemName.toLowerCase().includes('post') || itemName.toLowerCase().includes('vegan');

    return (
        <div className="bg-neutral-900/50 border border-neutral-800/60 rounded-2xl p-4 shadow-sm flex flex-col gap-2 transition-colors hover:bg-neutral-900">

            {/* Tag-uri superioare */}
            {(isSpicy || isVegan) && (
                <div className="flex gap-2 mb-1">
                    {isSpicy && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-md w-fit">
                            <Flame size={12} /> Picant
                        </span>
                    )}
                    {isVegan && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md w-fit">
                            <Leaf size={12} /> De Post
                        </span>
                    )}
                </div>
            )}

            {/* Header: Titlu și Preț */}
            <div className="flex justify-between items-start gap-4">
                <h3 className="text-[17px] font-bold text-neutral-100 leading-tight">
                    {itemName}
                </h3>
                <span className="text-amber-500 font-black whitespace-nowrap bg-neutral-950 px-2 py-1 rounded-lg text-sm border border-neutral-800">
                    {item.price} LEI
                </span>
            </div>

            {/* Descrierea */}
            {itemDesc && (
                <p className="text-neutral-400 text-sm leading-relaxed pr-8">
                    {itemDesc}
                </p>
            )}

            {/* Butonul Info */}
            {hasNutrition && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-amber-500 w-fit transition-colors mt-2"
                >
                    <Info size={14} />
                    {locale === 'ro' ? 'Valori nutriționale' : 'Nutritional info'}
                </button>
            )}

            {/* Extensia Acordeon */}
            <AnimatePresence>
                {isExpanded && hasNutrition && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-2 border-t border-neutral-800/60 flex flex-col gap-3 text-xs text-neutral-400">

                            <div className="grid grid-cols-3 gap-2 bg-neutral-950/50 p-3 rounded-xl border border-neutral-800/30">
                                <div><span className="block text-neutral-500 mb-0.5">Kcal</span> <span className="text-neutral-200 font-medium">{item.nutritional_info!.kcal}</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">Proteine</span> <span className="text-neutral-200 font-medium">{item.nutritional_info!.macros.proteins}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">Grăsimi</span> <span className="text-neutral-200 font-medium">{item.nutritional_info!.macros.fats}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">Carbohidrați</span> <span className="text-neutral-200 font-medium">{item.nutritional_info!.macros.carbs}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">Fibre</span> <span className="text-neutral-200 font-medium">{item.nutritional_info!.macros.fiber}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">Sare</span> <span className="text-neutral-200 font-medium">{item.nutritional_info!.macros.salt}g</span></div>
                            </div>

                            {item.nutritional_info!.allergens.length > 0 && (
                                <div className="flex items-start gap-2 bg-neutral-900/30 p-2 rounded-lg">
                                    <Leaf size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                    <p>
                                        <span className="font-semibold text-neutral-300">
                                            {locale === 'ro' ? 'Alergeni: ' : 'Allergens: '}
                                        </span>
                                        {item.nutritional_info!.allergens.join(', ')}
                                    </p>
                                </div>
                            )}

                            {item.nutritional_info!.frozen_ingredients.length > 0 && (
                                <div className="flex items-start gap-2 bg-neutral-900/30 p-2 rounded-lg">
                                    <Snowflake size={14} className="text-blue-400 shrink-0 mt-0.5" />
                                    <p>
                                        <span className="font-semibold text-neutral-300">
                                            {locale === 'ro' ? 'Din produs decongelat: ' : 'From thawed product: '}
                                        </span>
                                        {item.nutritional_info!.frozen_ingredients.join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}