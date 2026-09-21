'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LocaleKey } from '@/types/database';

const bestsellers = [
    { id: 7, name: { ro: 'Pizza Fluffy', en: 'New Edition Pizza' }, price: 46, image: '/pizzafl.jpg', tag: 'Nou' },
    { id: 1, name: { ro: 'Pizza Canibale', en: 'Canibale Pizza' }, price: 45, image: '/pizza.jpg', tag: 'Popular' },
    { id: 2, name: { ro: 'Bruschete cu Roșii', en: 'Tomato Bruschetta' }, price: 21, image: '/bruscheta.jpg', tag: 'Fresh' },
    { id: 3, name: { ro: 'Burger', en: 'Burger' }, price: 41, image: '/burger.png', tag: 'Combo' },
    { id: 4, name: { ro: 'Quesadilla', en: 'Quesadilla' }, price: 39, image: '/quesadilla.jpg', tag: 'Combo' },
    { id: 5, name: { ro: 'Papanași', en: 'Traditional Papanași' }, price: 34, image: '/papanasi.jpg', tag: 'Desert' },
    { id: 6, name: { ro: 'Clatite', en: 'Traditional Pancakes' }, price: 28, image: '/clatite.jpg', tag: 'Desert' },
];

export default function BestsellersCarousel({ locale }: { locale: LocaleKey }) {
    return (
        <section className="w-full flex flex-col gap-4">
            <div className="px-6 flex items-center justify-between">
                <h2 className="text-xl font-black text-white tracking-tight uppercase drop-shadow-sm">
                    {locale === 'ro' ? 'Recomandări' : "Chef's Specials"}
                </h2>
            </div>

            <div className="w-full overflow-x-auto pb-6 px-6 flex gap-4 snap-x snap-mandatory hide-scrollbar">
                {bestsellers.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                        className="snap-start shrink-0 w-64 flex flex-col gap-3 group cursor-pointer"
                    >
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/80 bg-white">

                            <motion.div
                                animate={{ scale: [1, 1.07, 1] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name[locale] || item.name.ro}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 256px, 256px"
                                    priority={item.id === 7}
                                />
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />

                            <div className="absolute top-3 left-3 z-10">
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg ${item.tag === 'Nou' ? 'bg-red-500 text-white' : 'bg-amber-500 text-neutral-950'}`}>
                                    {item.tag}
                                </span>
                            </div>

                            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
                                <h3 className="text-[15px] font-bold text-white leading-tight drop-shadow-lg max-w-[65%]">
                                    {item.name[locale] || item.name.ro}
                                </h3>
                                <span className="text-amber-400 font-bold drop-shadow-lg bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-md">
                                    {item.price} LEI
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}