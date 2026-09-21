import HeroHeader from '@/components/layout/HeroHeader';
import FloatingMenu from '@/components/layout/FloatingMenu';
import BestsellersCarousel from '@/components/ui/BestsellersCarousel';
import MenuItemCard from '@/components/ui/MenuItemCard';
import CategoryIcon from '@/components/ui/CategoryIcon';
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

    if (catError || itemsError) {
        console.error('Eroare Supabase:', catError || itemsError);
    }

    const categories: Category[] = categoriesData || [];
    const allItems: MenuItem[] = itemsData || [];

    // 1. Toate cuvintele pe care vrem să le ASCUNDEM din lista principală
    const hiddenKeywords = ['margini', 'extra topping', 'cutie transport', 'pizza personalizată'];

    const visibleItems = allItems.filter(item => {
        const nameRo = item.name.ro.toLowerCase();
        return !hiddenKeywords.some(keyword => nameRo.includes(keyword));
    });

    // 2. Doar elementele pe care vrem să le ARĂTĂM în Modal (Pop-up)
    // Am exclus 'pizza personalizată' de aici, deci va fi 100% invizibilă
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

                        const isDrinkCategory =
                            category.name.ro.toLowerCase().includes('băuturi') ||
                            category.name.ro.toLowerCase().includes('bere') ||
                            category.name.ro.toLowerCase().includes('vin');

                        const isPizzaCategory = category.name.ro.toLowerCase().includes('pizza');

                        return (
                            <section key={category.id} id={`category-${category.id}`} className="scroll-mt-10">

                                <div className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur-xl pt-4 pb-3 px-4 -mx-4 mb-4 border-b border-neutral-800/60 flex items-center gap-3 transition-all">
                                    <div className="p-2 bg-neutral-900 rounded-xl text-amber-500 border border-neutral-800/50 shadow-inner">
                                        <CategoryIcon name={category.name.ro} className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-neutral-100 uppercase tracking-tight drop-shadow-md">
                                        {categoryName}
                                    </h2>
                                </div>

                                <div className={isDrinkCategory ? "grid grid-cols-2 gap-3" : "flex flex-col gap-4"}>
                                    {categoryItems.map((item) => (
                                        <MenuItemCard
                                            key={item.id}
                                            item={item}
                                            locale={locale}
                                            categoryName={category.name.ro}
                                            isCompact={isDrinkCategory}
                                            extras={isPizzaCategory ? extraItems : []}
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