'use client';

import Image from 'next/image';
import { LocaleKey } from '@/types/database';

const bestsellers = [
    { id: 1, name: { ro: 'Pizza Canibale', en: 'Canibale Pizza' }, price: 48, image: '/pizza.jpg', tag: 'Popular' },
    { id: 2, name: { ro: 'Bruschete cu Roșii', en: 'Tomato Bruschetta' }, price: 21, image: '/bruscheta.jpg', tag: 'Fresh' },
    { id: 3, name: { ro: 'Burger', en: 'Burger' }, price: 41, image: '/burger.jpg', tag: 'Combo' },
    { id: 4, name: { ro: 'Quesadilla', en: 'Quesadilla' }, price: 41, image: '/quesadilla.jpg', tag: 'Combo' },
    { id: 5, name: { ro: 'Papanași', en: 'Traditional Papanași' }, price: 34, image: '/papanasi.jpg', tag: 'Desert' },
    { id: 6, name: { ro: 'Clatite', en: 'Traditional Pancakes' }, price: 34, image: '/clatite.jpg', tag: 'Desert' },
    { id: 7, name: { ro: 'Nou: Pizza Fluffy', en: 'New Edition Pizza' }, price: 45, image: '/pizzafl.jpg', tag: 'Nou' },
];

export default function BestsellersCarousel({ locale }: { locale: LocaleKey }) {
    return (
        <section className="w-full flex flex-col gap-4">
            <div className="px-6 flex items-center justify-between">
                <h2 className="text-xl font-black text-white tracking-tight uppercase">
                    {locale === 'ro' ? 'Recomandări' : "Chef's Specials"}
                </h2>
            </div>

            <div className="w-full overflow-x-auto pb-6 px-6 flex gap-4 snap-x snap-mandatory hide-scrollbar">
                {bestsellers.map((item) => (
                    <div key={item.id} className="snap-start shrink-0 w-64 flex flex-col gap-3 group">
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-xl border border-neutral-800">
                            <Image
                                src={item.image}
                                alt={item.name[locale] || item.name.ro}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 256px, 256px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${item.tag === 'Nou' ? 'bg-red-500 text-white' : 'bg-amber-500 text-neutral-950'}`}>
                  {item.tag}
                </span>
                            </div>

                            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                <h3 className="text-sm font-bold text-white leading-tight drop-shadow-md max-w-[65%]">
                                    {item.name[locale] || item.name.ro}
                                </h3>
                                <span className="text-amber-400 font-bold drop-shadow-md">
                  {item.price} LEI
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}