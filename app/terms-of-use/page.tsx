import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Podmínky užití | DualWorks',
    description: 'Podmínky užití webové prezentace.',
};

async function getData() {
    const filePath = path.join(process.cwd(), '_assets', 'terms-of-use.txt');
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return fileContent;
    } catch (e) {
        return "Dokument není k dispozici.";
    }
}

export default async function TermsOfUse() {
    const content = await getData();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Podmínky užití</h1>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">
                    {content}
                </div>
            </div>
        </div>
    );
}
