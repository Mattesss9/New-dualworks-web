import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
                <div>
                    <span className="font-bold text-lg text-foreground block mb-4">DualWorks</span>
                    <p className="text-sm text-zinc-500 max-w-xs">
                        Kapacitní subdodávka pro průmyslové projekty.
                    </p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Link href="/privacy-policy" className="hover:text-foreground">Ochrana osobních údajů</Link>
                    <Link href="/terms-of-use" className="hover:text-foreground">Podmínky užití</Link>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 text-center md:text-left">
                &copy; {new Date().getFullYear()} DualWorks. All rights reserved.
            </div>
        </footer>
    );
}
