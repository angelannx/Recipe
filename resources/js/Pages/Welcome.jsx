import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to SavoryStudio" />

            <div className="bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-slate-100 min-h-screen text-slate-800 antialiased font-sans">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
                    <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30">
                                🍳
                            </div>
                            <span className="font-extrabold text-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
                                SavoryStudio
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-md"
                                >
                                    Go to Recipe Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-orange-600 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-sm font-bold transition shadow-lg shadow-orange-500/25 transform hover:-translate-y-0.5"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero / Teaser Card */}
                <main className="max-w-4xl mx-auto px-4 py-12">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
                        <div className="relative h-80 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1200&auto=format&fit=crop"
                                alt="Chicken Adobo"
                                className="w-full h-full object-cover filter blur-[2px]"
                            />
                            <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-center p-6 text-white">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4 border border-white/30">
                                    🔒
                                </div>
                                <h1 className="text-3xl font-extrabold mb-2">Exclusive Recipe Locked</h1>
                                <p className="text-slate-200 max-w-md text-sm sm:text-base mb-6">
                                    Please log in or create an account to unlock the full ingredients, prep instructions, and secret cooking tips for <span className="text-amber-400 font-bold">Classic Chicken Adobo</span>.
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-3 rounded-full bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition shadow-lg"
                                    >
                                        Log In to View
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm hover:from-orange-600 hover:to-rose-600 transition shadow-lg"
                                    >
                                        Create Free Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}