'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Info, Leaf, Snowflake, Flame } from 'lucide-react';
import { MenuItem, LocaleKey } from '@/types/database';

interface MenuItemCardProps {
    item: MenuItem & { is_vegan?: boolean; is_spicy?: boolean };
    locale: LocaleKey;
    categoryName?: string;
    isCompact?: boolean;
}

export default function MenuItemCard({ item, locale, categoryName, isCompact }: MenuItemCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const itemName = item.name[locale] || item.name.ro;
    const itemDesc = item.description ? (item.description[locale] || item.description.ro) : null;
    const hasNutrition = item.nutritional_info !== null;

    const isSpicy = item.is_spicy === true;
    const isVeganItem = item.is_vegan === true;
    const isVeganCategory = categoryName?.toLowerCase().includes('post') || categoryName?.toLowerCase().includes('vegan');
    const showVeganTag = isVeganItem && !isVeganCategory;

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    // Funcție automată de traducere a alergenilor din baza de date
    const translateAllergens = (allergens: string[]) => {
        if (locale === 'ro') return allergens.join(', ');

        const dict: Record<string, string> = {
            'gluten': 'gluten',
            'lactoză': 'lactose',
            'ou': 'egg',
            'ouă': 'eggs',
            'pește': 'fish',
            'fructe de mare': 'seafood',
            'soia': 'soy',
            'nuci': 'nuts',
            'țelină': 'celery',
            'muștar': 'mustard'
        };

        return allergens.map(a => dict[a.toLowerCase()] || a).join(', ');
    };

    if (isCompact) {
        return (
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                whileTap={{ scale: 0.98 }}
                className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/40 rounded-2xl p-3 flex flex-col justify-between gap-3 h-full shadow-[0_4px_20px_rgb(0,0,0,0.2)]"
            >
                <h3 className="text-[15px] font-bold text-neutral-200 leading-snug tracking-tight">
                    {itemName}
                </h3>
                <span className="text-amber-500 font-black text-sm bg-neutral-950/80 px-2.5 py-1 rounded-lg w-fit border border-amber-500/10 shadow-sm">
                    {item.price} LEI
                </span>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/40 rounded-3xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.2)] flex flex-col gap-2 relative overflow-hidden"
        >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {(isSpicy || showVeganTag) && (
                <div className="flex gap-2 mb-1 relative z-10">
                    {isSpicy && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-md w-fit border border-red-400/20">
                            <Flame size={12} strokeWidth={2.5} /> {locale === 'ro' ? 'Picant' : 'Spicy'}
                        </span>
                    )}
                    {showVeganTag && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md w-fit border border-emerald-400/20">
                            <Leaf size={12} strokeWidth={2.5} /> {locale === 'ro' ? 'De Post' : 'Vegan'}
                        </span>
                    )}
                </div>
            )}

            <div className="flex justify-between items-start gap-4 relative z-10">
                <h3 className="text-lg font-bold text-neutral-100 leading-tight tracking-tight">
                    {itemName}
                </h3>
                <span className="text-amber-500 font-black whitespace-nowrap bg-neutral-950/80 px-3 py-1.5 rounded-xl text-sm border border-amber-500/10 shadow-sm">
                    {item.price} LEI
                </span>
            </div>

            {itemDesc && (
                <p className="text-neutral-400 text-[13px] leading-relaxed pr-6 relative z-10">
                    {itemDesc}
                </p>
            )}

            {hasNutrition && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-300 transition-colors py-1.5 relative z-10 mt-1"
                >
                    <Info size={14} />
                    {locale === 'ro' ? 'Valori nutriționale' : 'Nutritional info'}
                </button>
            )}

            <AnimatePresence>
                {isExpanded && hasNutrition && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden relative z-10"
                    >
                        <div className="pt-4 mt-3 border-t border-neutral-800/40 flex flex-col gap-3 text-xs text-neutral-300">
                            <div className="grid grid-cols-3 gap-2 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800/30">
                                <div><span className="block text-neutral-500 mb-0.5">Kcal</span> <span className="font-semibold">{item.nutritional_info!.kcal}</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">{locale === 'ro' ? 'Proteine' : 'Protein'}</span> <span className="font-semibold">{item.nutritional_info!.macros.proteins}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">{locale === 'ro' ? 'Grăsimi' : 'Fat'}</span> <span className="font-semibold">{item.nutritional_info!.macros.fats}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">Carbs</span> <span className="font-semibold">{item.nutritional_info!.macros.carbs}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">{locale === 'ro' ? 'Fibre' : 'Fiber'}</span> <span className="font-semibold">{item.nutritional_info!.macros.fiber}g</span></div>
                                <div><span className="block text-neutral-500 mb-0.5">{locale === 'ro' ? 'Sare' : 'Salt'}</span> <span className="font-semibold">{item.nutritional_info!.macros.salt}g</span></div>
                            </div>

                            {item.nutritional_info!.allergens.length > 0 && (
                                <div className="flex items-start gap-2 bg-neutral-900/30 p-2 rounded-lg">
                                    <Leaf size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                    <p><span className="font-semibold text-neutral-400">{locale === 'ro' ? 'Alergeni: ' : 'Allergens: '}</span>{translateAllergens(item.nutritional_info!.allergens)}</p>
                                </div>
                            )}

                            {item.nutritional_info!.frozen_ingredients.length > 0 && (
                                <div className="flex items-start gap-2 bg-neutral-900/30 p-2 rounded-lg">
                                    <Snowflake size={14} className="text-blue-400 shrink-0 mt-0.5" />
                                    <p><span className="font-semibold text-neutral-400">{locale === 'ro' ? 'Din produs decongelat: ' : 'From thawed product: '}</span>{item.nutritional_info!.frozen_ingredients.join(', ')}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}