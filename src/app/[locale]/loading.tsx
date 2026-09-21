export default function Loading() {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-neutral-800 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-amber-500 text-sm font-bold tracking-widest uppercase animate-pulse">
                Se încarcă meniul...
            </p>
        </div>
    );
}