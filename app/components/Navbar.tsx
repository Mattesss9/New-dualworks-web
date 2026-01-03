'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    const linkClass = (path: string) => `transition-colors ${isActive(path) ? 'text-foreground font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-foreground'}`;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-md supports-backdrop-filter:bg-white/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight text-foreground">
                    DualWorks
                </Link>

                <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
                    <Link href="/" className={linkClass('/')}>
                        Domů
                    </Link>
                    <Link href="/jak-spolupracujeme" className={linkClass('/jak-spolupracujeme')}>
                        Jak spolupracujeme
                    </Link>
                    <Link href="/krizovy-scenar" className={linkClass('/krizovy-scenar')}>
                        Krizový scénář
                    </Link>
                    <Link href="/planovany-scenar" className={linkClass('/planovany-scenar')}>
                        Plánovaný scénář
                    </Link>
                    <Link href="/o-nas" className={linkClass('/o-nas')}>
                        O nás / Zázemí
                    </Link>
                    <Link href="/#kontakt" className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors">
                        Kontakt
                    </Link>
                    <Link href="/#kontakt" className="ml-2 px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity">
                        Domluvit konzultaci
                    </Link>
                </nav>

                {/* Mobile menu link - minimal implementation */}
                <div className="md:hidden">
                    <Link href="/jak-spolupracujeme" className="text-sm font-medium text-foreground">
                        Menu
                    </Link>
                </div>
            </div>
        </header>
    );
}
