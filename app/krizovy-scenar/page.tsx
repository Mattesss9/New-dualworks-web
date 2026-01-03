import { promises as fs } from 'fs';
import path from 'path';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ContactForm from '../components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Krizový scénář – kapacitní podpora při tlaku na termíny | DualWorks',
    description: 'Když harmonogram neodpovídá kapacitám a vzniká tlak na termíny. Zapojení kapacit jako subdodávka se svěřeným rozsahem prací a jasným projektovým rámcem.',
};

async function getData() {
    const filePath = path.join(process.cwd(), 'texts', 'krizovy-scenar.md');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
}

export default async function KrizovyScenar() {
    const content = await getData();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <MarkdownRenderer content={content} />
            </div>
            <ContactForm />
        </div>
    );
}
