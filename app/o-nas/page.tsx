import { promises as fs } from 'fs';
import path from 'path';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ContactForm from '../components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'O nás – zázemí a zkušenosti | DualWorks',
    description: 'Zázemí pro průmyslové projekty: řízení týmů, kvalifikace, smluvní rámec, pojištění odpovědnosti a zkušenosti z regulovaných provozů a odstávek.',
};

async function getData() {
    const filePath = path.join(process.cwd(), 'texts', 'o-nas.md');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
}

export default async function ONas() {
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
