import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { ContentBlock, parseMarkdown, renderInline } from './lib/markdown';
import HeroVideo from './components/HeroVideo';
import ContactForm from './components/ContactForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DualWorks – kapacitní subdodávka pro průmyslové projekty',
  description: 'Kapacitní subdodávka pro průmyslové projekty. Zapojení týmů v projektovém režimu při tlaku na termíny i při plánovaném posílení kapacit.',
};

async function loadMarkdown(file: string) {
  const filePath = path.join(process.cwd(), 'texts', file);
  return fs.readFile(filePath, 'utf8');
}

function getSection(blocks: ContentBlock[], heading: string) {
  const idx = blocks.findIndex(
    (b) => b.type === 'h2' && b.content.toLowerCase().includes(heading.toLowerCase())
  );
  if (idx === -1) return [];
  const section: ContentBlock[] = [];
  for (let i = idx + 1; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'h2') break;
    section.push(b);
  }
  return section;
}

function extractHero(blocks: ContentBlock[]) {
  const hero: ContentBlock[] = [];
  if (blocks[0]?.type === 'h1') {
    hero.push(blocks[0]);
    let i = 1;
    while (i < blocks.length && blocks[i].type === 'paragraph') {
      hero.push(blocks[i]);
      i++;
    }
  }
  return hero;
}

function toText(block: ContentBlock) {
  if (block.type === 'paragraph') return block.content;
  if (block.type === 'h3' || block.type === 'h2' || block.type === 'h1') return block.content;
  return '';
}

export default async function Home() {
  const homepageMd = await loadMarkdown('HOMEPAGE.md');
  const krizovyMd = await loadMarkdown('krizovy-scenar.md');
  const planovanyMd = await loadMarkdown('dlouhodobe-kapacity.md');
  const jakMd = await loadMarkdown('jak-spolupracujeme.md');

  const homepageBlocks = parseMarkdown(homepageMd);
  const krizovyBlocks = parseMarkdown(krizovyMd);
  const planovanyBlocks = parseMarkdown(planovanyMd);
  const jakBlocks = parseMarkdown(jakMd);

  const heroBlocks = extractHero(homepageBlocks);
  const coDodavame = getSection(homepageBlocks, 'Co dod');
  const procDualworks = getSection(homepageBlocks, 'Pro');
  const konzultaceIntro = getSection(homepageBlocks, 'Nez');

  const krizovySummary = krizovyBlocks.find((b) => b.type === 'paragraph')?.content ?? '';
  const planovanySummary = planovanyBlocks.find((b) => b.type === 'paragraph')?.content ?? '';

  const jakIntro = jakBlocks.find((b) => b.type === 'paragraph')?.content ?? '';
  const jakBullets = jakBlocks
    .filter((b) => b.type === 'list')
    .flatMap((b) => b.type === 'list' ? b.items : [])
    .slice(0, 3);

  const coCards = [];
  for (let i = 0; i < coDodavame.length; i++) {
    const b = coDodavame[i];
    if (b.type === 'h3') {
      const body: string[] = [];
      let j = i + 1;
      while (j < coDodavame.length && coDodavame[j].type === 'paragraph') {
        body.push(coDodavame[j].content);
        j++;
      }
      coCards.push({ title: b.content, body });
    }
  }

  const procCards = [];
  for (let i = 0; i < procDualworks.length; i++) {
    const b = procDualworks[i];
    if (b.type === 'h3') {
      const body: string[] = [];
      let j = i + 1;
      while (j < procDualworks.length && procDualworks[j].type === 'paragraph') {
        body.push(procDualworks[j].content);
        j++;
      }
      procCards.push({ title: b.content, body });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-black">
        <div className="absolute inset-0 -z-20">
          <HeroVideo src="/hero-video.mp4" poster="/logo-full.png" className="absolute inset-0" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="container mx-auto px-4 max-w-5xl py-20 md:py-28 min-h-[70vh] flex flex-col items-center justify-center text-center gap-6 relative z-10">
          {heroBlocks.map((block, idx) => (
            <HeroBlock block={block} key={idx} />
          ))}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
            <a href="#kontakt" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-7 py-3 text-sm font-semibold shadow-lg shadow-primary/30 hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/80 dark:focus:ring-offset-black">
              Domluvit konzultaci
            </a>
            <Link href="/jak-spolupracujeme" className="inline-flex items-center justify-center rounded-md border border-white/70 px-7 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/80 dark:focus:ring-offset-black">
              Jak spolupracujeme
            </Link>
          </div>
        </div>
      </section>

      {/* Krátký vysvětlující blok */}
      {heroBlocks.length > 2 && (
        <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 text-white border-t border-zinc-800">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl text-center space-y-3">
            <p className="text-lg md:text-xl text-zinc-200 leading-8">{toText(heroBlocks[1])}</p>
            {heroBlocks[2]?.type === 'paragraph' && (
              <p className="text-base md:text-lg text-zinc-300 leading-7">{toText(heroBlocks[2])}</p>
            )}
          </div>
        </section>
      )}

      {/* Scénáře spolupráce */}
      <section className="bg-black border-t border-zinc-800">
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Scénáře spolupráce</h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">Dva základní způsoby zapojení kapacit: rychlá stabilizace nebo plánované posílení.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ScenarioCard
              title={krizovyBlocks[0]?.type === 'h1' ? krizovyBlocks[0].content : 'Krizový scénář'}
              description={krizovySummary}
              href="/krizovy-scenar"
            />
            <ScenarioCard
              title={planovanyBlocks[0]?.type === 'h1' ? planovanyBlocks[0].content : 'Plánovaný scénář'}
              description={planovanySummary}
              href="/planovany-scenar"
            />
          </div>
        </div>
      </section>

      {/* Co dodáváme */}
      <section id="co-dodavame" className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Co dodáváme</h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">Obsah vychází z popisu kapacitní subdodávky v rámci vašeho projektu.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coCards.slice(0, 5).map((card, idx) => (
              <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/70 shadow-lg p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                {card.body.map((p, i) => (
                  <p key={i} className="text-sm text-zinc-300 leading-6">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jak spolupracujeme teaser */}
      <section className="bg-black border-t border-zinc-800">
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl space-y-8">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Jak spolupracujeme</h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">{jakIntro}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {jakBullets.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-4 text-sm text-zinc-200 leading-6">
                {item}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/jak-spolupracujeme" className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/80 dark:focus:ring-offset-black">
              Detail spolupráce
            </Link>
          </div>
        </div>
      </section>

      {/* Proč DualWorks */}
      <section className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Proč DualWorks</h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">Klíčové důvody vycházejí přímo z vašeho obsahu – bez marketingových claimů.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {procCards.slice(0, 6).map((card, idx) => (
              <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/70 shadow-lg p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                {card.body.map((p, i) => (
                  <p key={i} className="text-sm text-zinc-300 leading-6">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="bg-black border-t border-zinc-800">
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
          <div className="space-y-4 text-zinc-200">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Nezávazná konzultace</h2>
            {konzultaceIntro.filter((b) => b.type === 'paragraph').slice(0, 2).map((p, idx) => (
              <p key={idx} className="text-base md:text-lg leading-7 text-zinc-300">{p.type === 'paragraph' && p.content}</p>
            ))}
            <div className="space-y-2 text-sm text-zinc-400">
              <div>Tel: <a href="tel:+420777000000" className="text-white hover:underline">+420 777 000 000</a></div>
              <div>Email: <a href="mailto:info@dualworks.cz" className="text-white hover:underline">info@dualworks.cz</a></div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6 md:p-8">
            <ContactForm variant="embedded" title="Nezávazná konzultace projektu" />
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroBlock({ block }: { block: ContentBlock }) {
  if (block.type === 'h1') {
    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-xl max-w-4xl">
        {renderInline(block.content)}
      </h1>
    );
  }
  if (block.type === 'paragraph') {
    return (
      <p className="text-lg md:text-xl text-zinc-100 leading-7 max-w-3xl">
        {renderInline(block.content)}
      </p>
    );
  }
  return null;
}

function ScenarioCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-lg p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-white leading-tight">{title}</h3>
        <p className="text-sm text-zinc-300 leading-6 line-clamp-4">{description}</p>
      </div>
      <div className="flex-1" />
      <Link href={href} className="inline-flex items-center justify-center self-start rounded-md bg-primary text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-zinc-900">
        Více o scénáři
      </Link>
    </div>
  );
}
