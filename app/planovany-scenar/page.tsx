import { promises as fs } from 'fs';
import path from 'path';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ContactForm from '../components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Plánovaný scénář – dlouhodobé kapacitní zajištění | DualWorks',
    description: 'Dlouhodobé kapacitní zajištění bez interního náboru. Plánované zapojení týmů podle harmonogramu, milníků a vývoje projektu.',
};

async function getData() {
    // Careful: Route is /planovany-scenar but file is dlouhodobe-kapacity.md
    const filePath = path.join(process.cwd(), 'texts', 'dlouhodobe-kapacity.md');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
}

export default async function PlanovanyScenar() {
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
