"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Category } from "@/types/database";
import CategoryIcon from "@/components/ui/CategoryIcon";

interface StickyNavbarProps {
    categories: Category[];
}

export default function StickyNavbar({ categories }: StickyNavbarProps) {
    const [activeCategory, setActiveCategory] = useState<string>("");
    const navRef = useRef<HTMLUListElement>(null);
    const isClickScrolling = useRef<boolean>(false);

    // 1. Mecanismul de Scroll Spy
    useEffect(() => {
        const sectionElements = categories.map((cat) =>
            document.getElementById(`category-${cat.id}`)
        );

        const observer = new IntersectionObserver(
            (entries) => {
                // Ignorăm observer-ul dacă utilizatorul a inițiat scroll-ul prin click
                if (isClickScrolling.current) return;

                // Găsim secțiunea care intersectează cel mai mult viewport-ul
                const visibleSections = entries.filter((entry) => entry.isIntersecting);
                if (visibleSections.length > 0) {
                    // Sortăm pentru a o prinde pe cea cu vizibilitate maximă
                    visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                    const activeId = visibleSections[0].target.id.replace("category-", "");
                    setActiveCategory(activeId);
                }
            },
            {
                rootMargin: "-20% 0px -60% 0px", // Ajustare a zonei de declanșare
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sectionElements.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, [categories]);

    // 2. Mecanismul de Auto-Centrare Orizontală a Navbar-ului
    useEffect(() => {
        if (!activeCategory || !navRef.current) return;

        const activeBtn = navRef.current.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
        if (activeBtn) {
            const navContainer = navRef.current;
            const scrollLeft = activeBtn.offsetLeft - navContainer.offsetWidth / 2 + activeBtn.offsetWidth / 2;

            navContainer.scrollTo({
                left: scrollLeft,
                behavior: "smooth"
            });
        }
    }, [activeCategory]);

    // 3. Handler pentru click pe categorii
    const handleScrollTo = (id: string) => {
        const targetElement = document.getElementById(`category-${id}`);
        if (targetElement) {
            isClickScrolling.current = true;
            setActiveCategory(id);

            // Compensare pentru înălțimea Navbar-ului (cca. 70px)
            const offset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });

            // Debounce pentru a reactiva IntersectionObserver
            setTimeout(() => {
                isClickScrolling.current = false;
            }, 1000);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50 shadow-lg shadow-neutral-900/20 pt-4 pb-4 px-4 md:px-8">
            <ul
                ref={navRef}
                className="flex items-center gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;

                    return (
                        <li key={category.id} className="snap-start shrink-0 relative">
                            <button
                                data-category={category.id}
                                onClick={() => handleScrollTo(category.id)}
                                className={`relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 outline-none flex items-center gap-2 ${
                                    isActive ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-200"
                                }`}
                            >
                                {/* 2. Injectarea iconiței și a textului */}
                                <span className="relative z-10 flex items-center gap-2">
                  <CategoryIcon name={category.name} className="w-4 h-4" />
                                    {category.name}
                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategoryPill"
                                        className="absolute inset-0 bg-orange-500 rounded-full"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}