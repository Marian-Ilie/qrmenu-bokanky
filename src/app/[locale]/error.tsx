'use client';

import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Database/Network Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center gap-4">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2 border border-red-500/20">
                <RotateCcw size={32} />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Eroare de conexiune</h2>
            <p className="text-neutral-400 text-sm max-w-sm">
                Nu am putut încărca meniul în acest moment. Vă rugăm să încercați din nou.
            </p>
            <button
                onClick={() => reset()}
                className="mt-4 bg-amber-500 text-neutral-950 px-6 py-3 rounded-xl font-bold uppercase tracking-wide shadow-lg active:scale-95 transition-transform"
            >
                Reîncărcare
            </button>
        </div>
    );
}