'use client';

import { motion } from "framer-motion";
import {
    Pizza, Coffee, Beer, CupSoda, Wine, Martini,
    Sandwich, Beef, Utensils, ChefHat, UtensilsCrossed,
    Droplet, Salad, Soup, IceCream, Leaf
} from "lucide-react";

interface CategoryIconProps {
    name: string;
    className?: string;
}

export default function CategoryIcon({ name, className = "w-5 h-5" }: CategoryIconProps) {
    const normalizedName = name.toUpperCase();

    const getIcon = () => {
        if (normalizedName.includes("CALDE")) return <Coffee className={className} />;
        if (normalizedName.includes("BERE")) return <Beer className={className} />;
        if (normalizedName.includes("RECI")) return <CupSoda className={className} />;
        if (normalizedName.includes("VIN")) return <Wine className={className} />;
        if (normalizedName.includes("SPIRTOASE")) return <Martini className={className} />;
        if (normalizedName.includes("PIZZA")) return <Pizza className={className} />;
        if (normalizedName.includes("BRUSCHETE")) return <Sandwich className={className} />;
        if (normalizedName.includes("GRILL")) return <Beef className={className} />;
        if (normalizedName.includes("PASTE")) return <Utensils className={className} />;
        if (normalizedName.includes("MENIURI")) return <ChefHat className={className} />;
        if (normalizedName.includes("MINUTURI") || normalizedName.includes("GARNITURI")) return <UtensilsCrossed className={className} />;
        if (normalizedName.includes("SOSURI")) return <Droplet className={className} />;
        if (normalizedName.includes("SALATE")) return <Salad className={className} />;
        if (normalizedName.includes("SUPE")) return <Soup className={className} />;
        if (normalizedName.includes("DESERT")) return <IceCream className={className} />;
        if (normalizedName.includes("POST") || normalizedName.includes("VEGAN")) return <Leaf className={className} />;

        return <Utensils className={className} />;
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
            {getIcon()}
        </motion.div>
    );
}