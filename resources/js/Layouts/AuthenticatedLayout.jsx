import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Custom Brand Logo */}
                            <Link href="/" className="flex items-center gap-2.5 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition transform">
                                    🍳
                                </div>
                                <span className="font-extrabold text-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent tracking-tight">
                                    SavoryStudio
                                </span>
                            </Link>

                            {/* Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="font-bold text-orange-600 border-orange-500">
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        {/* Right Side: User Profile Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-sm leading-4 font-semibold rounded-xl text-slate-700 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                {user.name}

                                                <svg
                                                    className="ml-1 -mr-0.5 h-4 w-4 text-slate-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Hamburger Menu for Mobile */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-orange-500 hover:bg-orange-50 focus:outline-none transition duration-150"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-slate-100'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-slate-200 bg-slate-50">
                        <div className="px-4">
                            <div className="font-bold text-base text-slate-800">{user.name}</div>
                            <div className="font-medium text-sm text-slate-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-white/60 backdrop-blur-md border-b border-slate-200/60 shadow-xs">
                    <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}