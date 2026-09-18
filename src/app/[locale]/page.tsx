import StickyNavbar from '@/components/layout/StickyNavbar';
import MenuItemCard from '@/components/ui/MenuItemCard';
import { Category, MenuItem, LocaleKey } from '@/types/database';
import { supabase } from '@/lib/supabase';

export default async function MenuPage({
                                           params
                                       }: {
    params: Promise<{ locale: string }>;
}) {
    // Extragem params conform convenției Next.js și facem narrowing la LocaleKey
    const { locale: rawLocale } = await params;
    const locale = (['ro', 'en'].includes(rawLocale) ? rawLocale : 'ro') as LocaleKey;

    // 1. Fetch categorii ordonate după display_order
    const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

    // 2. Fetch toate produsele din meniu
    const { data: itemsData, error: itemsError } = await supabase
        .from('menu_items')
        .select('*');

    if (catError || itemsError) {
        console.error('Eroare la preluarea datelor din Supabase:', catError || itemsError);
    }

    const categories: Category[] = categoriesData || [];
    const items: MenuItem[] = itemsData || [];

    return (
        <main className="min-h-screen bg-neutral-950 text-white pb-24">
            {/* Navbar-ul fix cu Scroll Spy, Auto-Centrare și suport i18n */}
            <StickyNavbar categories={categories} locale={locale} />

            {/* Containerul principal al meniului structurat pe secțiuni și categorii */}
            <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-10">
                {categories.map((category) => {
                    // Filtrăm produsele aparținând categoriei curente
                    const categoryItems = items.filter((item) => item.category_id === category.id);

                    // Dacă o categorie nu are produse în baza de date, o omitem din randare
                    if (categoryItems.length === 0) return null;

                    const categoryName = category.name[locale] || category.name.ro;

                    return (
                        <section
                            key={category.id}
                            id={`category-${category.id}`}
                            className="scroll-mt-24 flex flex-col gap-4"
                        >
                            {/* Antetul categoriei (ancora fixă pentru Scroll Spy) */}
                            <div className="sticky top-[73px] z-40 bg-neutral-950/90 backdrop-blur-md py-3 border-b border-neutral-800/80">
                                <h2 className="text-xl font-bold text-white tracking-wide">
                                    {categoryName}
                                </h2>
                            </div>

                            {/* Listarea cardurilor de preparate */}
                            <div className="flex flex-col gap-3">
                                {categoryItems.map((item) => (
                                    <MenuItemCard key={item.id} item={item} locale={locale} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}