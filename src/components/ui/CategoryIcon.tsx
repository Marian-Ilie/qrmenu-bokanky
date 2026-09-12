import {
    Pizza,
    CupSoda,
    Beef,
    Utensils,
    ChefHat,
    Salad,
    Soup,
    IceCream,
    Sandwich,
    Droplet
} from "lucide-react";

interface CategoryIconProps {
    name: string;
    className?: string;
}

export default function CategoryIcon({ name, className = "w-4 h-4" }: CategoryIconProps) {
    const normalizedName = name.toUpperCase();

    if (normalizedName.includes("BĂUTURI")) return <CupSoda className={className} />;
    if (normalizedName.includes("PIZZA")) return <Pizza className={className} />;
    if (normalizedName.includes("BRUSCHETE")) return <Sandwich className={className} />;
    if (normalizedName.includes("GRILL")) return <Beef className={className} />;
    if (normalizedName.includes("PASTE")) return <Utensils className={className} />;
    if (normalizedName.includes("MENIURI")) return <ChefHat className={className} />;
    if (normalizedName.includes("MINUTURI")) return <Utensils className={className} />;
    if (normalizedName.includes("SOSURI")) return <Droplet className={className} />;
    if (normalizedName.includes("SALATE")) return <Salad className={className} />;
    if (normalizedName.includes("SUPE")) return <Soup className={className} />;
    if (normalizedName.includes("DESERT")) return <IceCream className={className} />;

    // Fallback generic pentru categorii neprevăzute
    return <Utensils className={className} />;
}