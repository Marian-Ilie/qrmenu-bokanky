export interface Category {
    id: string;
    name: string;
    sort_order: number;
}

export interface MenuItem {
    id: string;
    category_id: string;
    title: string;
    price: number;
    ingredients?: string;
    energy_kcal?: number;
    protein_g?: number;
    lipids_g?: number;
    carbs_g?: number;
    fiber_g?: number;
    salt_g?: number;
    allergens?: string;
    frozen_ingredients?: string;
}

export interface MenuSection extends Category {
    menu_items: MenuItem[];
}