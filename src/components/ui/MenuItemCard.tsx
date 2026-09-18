'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Leaf, Snowflake } from 'lucide-react';
import { MenuItem, LocaleKey } from '@/types/database'; // Ajustează calea

interface MenuItemCardProps {
    item: MenuItem;
    locale: LocaleKey;
}

export default function MenuItemCard({ item, locale }: MenuItemCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Extragerea traducerilor corecte pe baza limbii active
    const itemName = item.name[locale];
    const itemDesc = item.description ? item.description[locale] : null;
    const hasNutrition = item.nutritional_info !== null;

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            {/* Header: Titlu și Preț */}
            <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-semibold text-white leading-tight">
                    {itemName}
                </h3>
                <span className="text-amber-400 font-bold whitespace-nowrap">
          {item.price} LEI
        </span>
            </div>

            {/* Descrierea (Ingredientele) */}
            {itemDesc && (
                <p className="text-neutral-400 text-sm leading-relaxed">
                    {itemDesc}
                </p>
            )}

            {/* Progressive Disclosure: Butonul Info (Afișat doar dacă există date nutriționale) */}
            {hasNutrition && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-300 w-fit transition-colors mt-1"
                >
                    <Info size={14} />
                    {locale === 'ro' ? 'Informații nutriționale' : 'Nutritional info'}
                </button>
            )}

            {/* Extensia Acordeon animată cu Framer Motion */}
            <AnimatePresence>
                {isExpanded && hasNutrition && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 mt-2 border-t border-neutral-800 flex flex-col gap-3 text-xs text-neutral-400">

                            {/* Calorii și Macronutrienți */}
                            <div className="grid grid-cols-3 gap-2 bg-neutral-950 p-3 rounded-lg">
                                <div><span className="block text-neutral-500">Kcal</span> <span className="text-white">{item.nutritional_info!.kcal}</span></div>
                                <div><span className="block text-neutral-500">Proteine</span> <span className="text-white">{item.nutritional_info!.macros.proteins}g</span></div>
                                <div><span className="block text-neutral-500">Grăsimi</span> <span className="text-white">{item.nutritional_info!.macros.fats}g</span></div>
                                <div><span className="block text-neutral-500">Carbohidrați</span> <span className="text-white">{item.nutritional_info!.macros.carbs}g</span></div>
                                <div><span className="block text-neutral-500">Fibre</span> <span className="text-white">{item.nutritional_info!.macros.fiber}g</span></div>
                                <div><span className="block text-neutral-500">Sare</span> <span className="text-white">{item.nutritional_info!.macros.salt}g</span></div>
                            </div>

                            {/* Alergeni */}
                            {item.nutritional_info!.allergens.length > 0 && (
                                <div className="flex items-start gap-2">
                                    <Leaf size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                    <p>
                    <span className="font-semibold text-neutral-300">
                      {locale === 'ro' ? 'Alergeni: ' : 'Allergens: '}
                    </span>
                                        {item.nutritional_info!.allergens.join(', ')}
                                    </p>
                                </div>
                            )}

                            {/* Produse Decongelate */}
                            {item.nutritional_info!.frozen_ingredients.length > 0 && (
                                <div className="flex items-start gap-2">
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