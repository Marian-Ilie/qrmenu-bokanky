import MenuItemCard from '@/components/ui/MenuItemCard';
import { MenuItem, LocaleKey } from '@/types/database';

export default async function MenuPage({
                                           params
                                       }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const locale = (['ro', 'en'].includes(rawLocale) ? rawLocale : 'ro') as LocaleKey;

    // Un obiect mock temporar strict pentru a valida UI-ul în Preview
    const mockItem: MenuItem = {
        id: 'test-1',
        category_id: 'cat-1',
        name: { ro: 'Pizza Margherita', en: 'Margherita Pizza' },
        description: { ro: 'Aluat, sos roșii, mozzarella', en: 'Dough, tomato sauce, mozzarella' },
        price: 35.00,
        image_url: null,
        is_bestseller: false,
        nutritional_info: {
            kcal: 740,
            macros: { proteins: 26, fats: 23, carbs: 104, fiber: 6, salt: 2.2 },
            allergens: ['gluten', 'lactoză'],
            frozen_ingredients: []
        }
    };

    return (
        <main className="p-4 bg-black min-h-screen text-white flex flex-col gap-4">
            {/* Aici va veni StickyNavbar */}

            <div className="pt-20 max-w-2xl mx-auto w-full">
                {/* Validăm exact problema cu parametrul locale lipsă */}
                <MenuItemCard item={mockItem} locale={locale} />
            </div>
        </main>
    );
}