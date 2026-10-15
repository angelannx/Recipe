import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-slate-100 font-sans">
            <div>
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition transform">
                        🍳
                    </div>
                    <span className="font-extrabold text-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tight">
                        SavoryStudio
                    </span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-8 py-8 bg-white shadow-xl shadow-slate-200/60 overflow-hidden sm:rounded-3xl border border-slate-100">
                {children}
            </div>
        </div>
    );
}