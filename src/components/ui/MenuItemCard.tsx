"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Leaf, Snowflake } from "lucide-react";
import { MenuItem } from "@/types/database";

interface MenuItemCardProps {
    item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
    const [isNutritionOpen, setIsNutritionOpen] = useState(false);

    // Verificăm dacă preparatul are date nutriționale pentru a randa butonul
    const hasNutrition = item.energy_kcal != null;

    return (
        <div className="flex flex-col gap-2 pb-6 border-b border-neutral-800/50 last:border-0">
            <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-lg md:text-xl leading-tight text-neutral-50 tracking-wide">
                    {item.title}
                </h3>
                <span className="font-extrabold text-orange-500 whitespace-nowrap text-lg">
    {item.price} LEI
  </span>
            </div>
            {item.ingredients && (
                <p className="text-base text-neutral-300 leading-relaxed mt-1">
                    {item.ingredients}
                </p>
            )}

            {/* Rând pentru Alergeni și Tag-uri Speciale */}
            <div className="flex flex-wrap gap-2 mt-1">
                {item.allergens && (
                    <span className="inline-flex items-center gap-1.5 text-xs bg-red-950/30 text-red-400 px-2.5 py-1 rounded-md border border-red-900/30">
            Alergeni: {item.allergens}
          </span>
                )}
                {item.frozen_ingredients && (
                    <span className="inline-flex items-center gap-1.5 text-xs bg-blue-950/30 text-blue-400 px-2.5 py-1 rounded-md border border-blue-900/30">
            <Snowflake size={12} />
            Din produs congelat
          </span>
                )}
            </div>

            {/* Modulul Nutrițional (Progressive Disclosure) */}
            {hasNutrition && (
                <div className="mt-2">
                    <button
                        onClick={() => setIsNutritionOpen(!isNutritionOpen)}
                        className="inline-flex items-center gap-2 text-sm font-medium bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 px-4 py-2.5 rounded-xl transition-colors outline-none border border-neutral-800/50 mt-2"
                        aria-expanded={isNutritionOpen}
                    >
                        <Info size={14} className={isNutritionOpen ? "text-orange-500" : "text-neutral-400"} />
                        Info Nutrițional ({item.energy_kcal} kcal)
                    </button>

                    <AnimatePresence>
                        {isNutritionOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-neutral-900/50 rounded-lg border border-neutral-800/50 text-xs text-neutral-300">
                                    <div className="flex flex-col">
                                        <span className="text-neutral-500">Proteine</span>
                                        <span className="font-medium">{item.protein_g}g</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-neutral-500">Lipide</span>
                                        <span className="font-medium">{item.lipids_g}g</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-neutral-500">Carbohidrați</span>
                                        <span className="font-medium">{item.carbs_g}g</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-neutral-500">Sare</span>
                                        <span className="font-medium">{item.salt_g}g</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}