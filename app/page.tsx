import { promises as fs } from 'fs';
import path from 'path';
import MarkdownRenderer from './components/MarkdownRenderer';
import ContactForm from './components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DualWorks – kapacitní subdodávka pro průmyslové projekty',
  description: 'Kapacitní subdodávka pro průmyslové projekty. Zapojení týmů v projektovém režimu při tlaku na termíny i při plánovaném posílení kapacit.',
};

async function getData() {
  const filePath = path.join(process.cwd(), 'texts', 'HOMEPAGE.md');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return fileContent;
}

export default async function Home() {
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
