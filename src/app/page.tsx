import { supabase } from "@/lib/supabase";
import { MenuSection } from "@/types/database";
import StickyNavbar from "@/components/layout/StickyNavbar";

export const revalidate = 60; // Incremental Static Regeneration la 60 secunde

export default async function Home() {
    // Query relațional: Extrage categoriile și preparatele asociate unde is_active = true
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
        return <div className="p-4 text-red-500">Eroare la extragerea datelor: {error.message}</div>;
    }

    const typedCategories = categories as MenuSection[];

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 max-w-3xl mx-auto">
            <header className="p-4 md:p-8 pb-0">
                <h1 className="text-3xl font-bold text-orange-500">Bokanky</h1>
                <p className="text-neutral-400">Restaurant Pizzerie</p>
            </header>

            {/* Montarea componentei client */}
            <StickyNavbar categories={typedCategories} />

            <div className="space-y-12 p-4 md:p-8 pt-6">
                {typedCategories.map((category) => (
                    <section key={category.id} id={`category-${category.id}`}>
                        <h2 className="text-2xl font-bold mb-4 border-b border-neutral-800 pb-2">
                            {category.name}
                        </h2>

                        <ul className="space-y-6">
                            {category.menu_items.map((item) => (
                                <li key={item.id} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                                        <span className="font-bold whitespace-nowrap">{item.price} LEI</span>
                                    </div>

                                    {item.ingredients && (
                                        <p className="text-sm text-neutral-400">{item.ingredients}</p>
                                    )}

                                    {item.allergens && (
                                        <div className="text-xs text-orange-400/80">
                                            Alergeni: {item.allergens}
                                        </div>
                                    )}

                                    {/* Placeholder pentru componenta interactivă de macronutrienți (Client Component viitor) */}
                                    {item.energy_kcal && (
                                        <button className="text-xs bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded w-fit mt-1">
                                            Info Nutrițional ({item.energy_kcal} kcal)
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </main>
    );
}