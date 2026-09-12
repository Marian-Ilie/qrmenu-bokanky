import CategoryIcon from "@/components/ui/CategoryIcon";
import { supabase } from "@/lib/supabase";
import { MenuSection } from "@/types/database";
import StickyNavbar from "@/components/layout/StickyNavbar";
import MenuItemCard from "@/components/ui/MenuItemCard";

export const revalidate = 60; // ISR validation cache

export default async function Home() {
    const { data: categories, error } = await supabase
        .from('categories')
        .select(`
      *,
      menu_items (*)
    `)
        .eq('menu_items.is_active', true)
        .order('sort_order', { ascending: true })
        .order('sort_order', { referencedTable: 'menu_items', ascending: true });

    if (error) {
        return <div className="p-4 text-red-500">Eroare critică DB: {error.message}</div>;
    }

    const typedCategories = categories as MenuSection[];

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 max-w-3xl mx-auto relative pb-24">
            <header className="p-4 md:p-8 pb-4">
                <h1 className="text-3xl font-bold text-orange-500 tracking-tight">Bokanky</h1>
                <p className="text-neutral-400 font-medium mt-1">Restaurant Pizzerie</p>
            </header>

            {/* Montarea componentei Client de navigare */}
            <StickyNavbar categories={typedCategories} />

            <div className="p-4 md:p-8 pt-8 space-y-12">
                {typedCategories.map((category) => (
                    <section
                        key={category.id}
                        id={`category-${category.id}`}
                        className="scroll-mt-24"
                    >
                        {/* 2. Adăugarea iconiței lângă titlul H2 */}
                        <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-neutral-100 uppercase tracking-wider border-b border-neutral-800 pb-2">
              <span className="p-2 bg-neutral-900 rounded-lg text-orange-500">
                <CategoryIcon name={category.name} className="w-6 h-6" />
              </span>
                            {category.name}
                        </h2>

                        <div className="space-y-6">
                            {category.menu_items.map((item) => (
                                <MenuItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}