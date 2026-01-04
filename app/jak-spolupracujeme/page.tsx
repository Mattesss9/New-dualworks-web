import { promises as fs } from 'fs';
import path from 'path';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ContactForm from '../components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jak spolupracujeme | DualWorks',
    description: 'Projektový režim spolupráce: kapacitní subdodávka, ucelené týmy, svěřený rozsah prací, smluvní rámec a řízení zapojení kapacit.',
};

async function getData() {
    const filePath = path.join(process.cwd(), 'texts', 'jak-spolupracujeme.md');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
}

export default async function JakSpolupracujeme() {
    const content = await getData();

    return (
        <div className="flex flex-col min-h-screen">
            <MarkdownRenderer
                content={content}
                contactForm={<ContactForm variant="embedded" title="Nezávazná konzultace projektu" />}
            />
        </div>
    );
}
