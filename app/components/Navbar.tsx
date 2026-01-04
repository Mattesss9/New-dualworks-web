'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const CONTACT_PHONE = '+420 777 000 000';
const CONTACT_EMAIL = 'info@dualworks.cz';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scenariosOpen, setScenariosOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    const linkClass = (path: string) =>
        `transition-colors ${isActive(path) ? 'text-foreground font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-foreground'}`;

    const navLinks = [
        { href: '/', label: 'Domů' },
        { href: '/jak-spolupracujeme', label: 'Jak spolupracujeme' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3 text-foreground">
                        <img src="/logo-full.png" alt="DualWorks" className="h-8 w-auto" />
                        <span className="sr-only">DualWorks</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                        {navLinks.map((item) => (
                            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                                {item.label}
                            </Link>
                        ))}

                        <div
                            className="relative"
                            onMouseEnter={() => setScenariosOpen(true)}
                            onMouseLeave={() => setScenariosOpen(false)}
                        >
                            <button
                                type="button"
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${pathname.includes('scenar') ? 'text-foreground font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-foreground'}`}
                                onClick={() => setScenariosOpen((v) => !v)}
                                aria-expanded={scenariosOpen}
                                aria-controls="scenarios-menu"
                            >
                                Scénáře
                                <span aria-hidden>▾</span>
                            </button>
                            {scenariosOpen && (
                                <div
                                    id="scenarios-menu"
                                    className="absolute left-0 mt-2 w-48 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg py-2"
                                >
                                    <Link href="/krizovy-scenar" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                        Krizový scénář
                                    </Link>
                                    <Link href="/planovany-scenar" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                        Plánovaný scénář
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link href="/o-nas" className={linkClass('/o-nas')}>
                            O nás / Zázemí
                        </Link>
                        <Link href="/#kontakt" className={linkClass('/#kontakt')}>
                            Kontakt
                        </Link>
                    </nav>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 text-right leading-tight">
                        <a className="block hover:text-foreground transition-colors" href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}>{CONTACT_PHONE}</a>
                        <a className="block hover:text-foreground transition-colors" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    </div>
                    <Link
                        href="/#kontakt"
                        className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition-colors"
                    >
                        Domluvit konzultaci
                    </Link>
                </div>

                <div className="flex items-center gap-3 lg:hidden">
                    <Link
                        href="/#kontakt"
                        className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-3 py-2 text-sm font-semibold hover:opacity-90 transition-colors"
                    >
                        Konzultace
                    </Link>
                    <button
                        type="button"
                        className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-foreground"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                    >
                        <span aria-hidden>☰</span>
                        <span className="sr-only">Menu</span>
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div id="mobile-menu" className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <div className="container mx-auto px-4 py-4 space-y-4 text-sm">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block ${isActive(item.href) ? 'text-foreground font-semibold' : 'text-zinc-700 dark:text-zinc-300'}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="space-y-2">
                            <div className="text-xs uppercase text-zinc-500 dark:text-zinc-400 tracking-wide">Scénáře</div>
                            <div className="flex flex-col gap-2">
                                <Link href="/krizovy-scenar" className="text-zinc-700 dark:text-zinc-300" onClick={() => setMobileOpen(false)}>Krizový scénář</Link>
                                <Link href="/planovany-scenar" className="text-zinc-700 dark:text-zinc-300" onClick={() => setMobileOpen(false)}>Plánovaný scénář</Link>
                            </div>
                        </div>
                        <Link href="/o-nas" className="block text-zinc-700 dark:text-zinc-300" onClick={() => setMobileOpen(false)}>O nás / Zázemí</Link>
                        <Link href="/#kontakt" className="block text-zinc-700 dark:text-zinc-300" onClick={() => setMobileOpen(false)}>Kontakt</Link>
                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                            <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="block">{CONTACT_PHONE}</a>
                            <a href={`mailto:${CONTACT_EMAIL}`} className="block">{CONTACT_EMAIL}</a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
