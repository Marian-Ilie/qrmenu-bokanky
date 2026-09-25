import HeroHeader from '@/components/layout/HeroHeader';
import FloatingMenu from '@/components/layout/FloatingMenu';
import BestsellersCarousel from '@/components/ui/BestsellersCarousel';
import MenuItemCard from '@/components/ui/MenuItemCard';
import CategoryHeader from '@/components/ui/CategoryHeader';
import { Category, MenuItem, LocaleKey } from '@/types/database';
import { supabase } from '@/lib/supabase';

export default async function MenuPage({
                                           params
                                       }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const locale = (['ro', 'en'].includes(rawLocale) ? rawLocale : 'ro') as LocaleKey;

    const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

    const { data: itemsData, error: itemsError } = await supabase
        .from('menu_items')
        .select('*')
        .order('display_order', { ascending: true });

    if (catError || itemsError) console.error('Eroare Supabase:', catError || itemsError);

    const categories: Category[] = categoriesData || [];
    const allItems: MenuItem[] = itemsData || [];

    const hiddenKeywords = ['margini', 'extra topping', 'cutie transport', 'pizza personalizată'];
    const visibleItems = allItems.filter(item => {
        const nameRo = item.name.ro.toLowerCase();
        return !hiddenKeywords.some(keyword => nameRo.includes(keyword));
    });

    const modalKeywords = ['margini', 'extra topping', 'cutie transport'];
    const extraItems = allItems.filter(item => {
        const nameRo = item.name.ro.toLowerCase();
        return modalKeywords.some(keyword => nameRo.includes(keyword));
    });

    const activeCategories = categories.filter((category) =>
        visibleItems.some((item) => item.category_id === category.id)
    );

    return (
        <main className="min-h-screen bg-neutral-950 text-white pb-32 font-sans selection:bg-amber-500/30">
            <HeroHeader locale={locale} />

            <div className="max-w-3xl mx-auto flex flex-col gap-10 mt-6">
                <BestsellersCarousel locale={locale} />

                <div className="px-4 flex flex-col gap-12">
                    {activeCategories.map((category) => {
                        const categoryItems = visibleItems.filter((item) => item.category_id === category.id);
                        const categoryName = category.name[locale] || category.name.ro;
                        const isDrinkCategory = category.name.ro.toLowerCase().includes('băuturi') || category.name.ro.toLowerCase().includes('bere') || category.name.ro.toLowerCase().includes('vin');
                        const isPizzaCategory = category.name.ro.toLowerCase().includes('pizza');

                        return (
                            <section key={category.id} id={`category-${category.id}`} className="scroll-mt-10">

                                <CategoryHeader
                                    categoryName={categoryName}
                                    iconName={category.name.ro}
                                    locale={locale}
                                    extras={isPizzaCategory ? extraItems : []}
                                />

                                <div className={isDrinkCategory ? "grid grid-cols-2 gap-3" : "flex flex-col gap-4"}>
                                    {categoryItems.map((item) => (
                                        <MenuItemCard
                                            key={item.id}
                                            item={item}
                                            locale={locale}
                                            categoryName={category.name.ro}
                                            isCompact={isDrinkCategory}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>

            <FloatingMenu categories={activeCategories} locale={locale} />
        </main>
    );
}