import Image from 'next/image';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 min-h-screen bg-neutral-950 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 md:w-44 md:h-44 animate-pulse">
                < Image
                    src="/bokanky_logo.png"
                    alt="Meniul Bokanky..."
                    fill
                    sizes="(max-width: 768px) 144px, 176px"
                    className="object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    priority
                />
            </div>

            <div className="mt-8 flex gap-2">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
}