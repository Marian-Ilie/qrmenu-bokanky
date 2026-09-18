export type LocaleKey = 'ro' | 'en';

export interface LocalizedText {
    ro: string;
    en: string;
}

export interface NutritionalInfo {
    kcal: number;
    macros: {
        proteins: number;
        fats: number;
        carbs: number;
        fiber: number;
        salt: number;
    };
    allergens: string[];
    frozen_ingredients: string[];
}

export interface MenuItem {
    id: string;
    category_id: string;
    name: LocalizedText;
    description: LocalizedText | null;
    price: number;
    image_url: string | null;
    is_bestseller: boolean;
    nutritional_info: NutritionalInfo | null;
}