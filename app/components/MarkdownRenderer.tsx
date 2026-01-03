import React from 'react';
import Link from 'next/link';
import { parseMarkdown, renderInline, ContentBlock } from '../lib/markdown';

interface MarkdownRendererProps {
    content: string;
    className?: string;
    contactForm?: React.ReactNode;
}

type Section = {
    title?: ContentBlock;
    blocks: ContentBlock[];
};

export default function MarkdownRenderer({ content, className = '', contactForm }: MarkdownRendererProps) {
    const blocks = parseMarkdown(content);
    const { hero, sections } = buildSections(blocks);

    return (
        <article className={`flex flex-col ${className}`}>
            {hero.length > 0 && (
                <section className="bg-white dark:bg-zinc-950 text-foreground">
                    <div className="container mx-auto px-4 max-w-5xl py-16 md:py-24 space-y-8 border-b border-zinc-200 dark:border-zinc-800">
                        {hero.map((block, idx) => renderBlock(block, `hero-${idx}`, true))}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Link href="#kontakt" className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-5 py-3 text-sm font-semibold hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-zinc-950">
                                Domluvit konzultaci
                            </Link>
                            <Link href="#co-dodavame" className="inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-zinc-950">
                                Co dodáváme
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {sections.map((section, idx) => {
                const sectionId = section.title ? getHeadingId(section.title.content) : undefined;
                const isAltBackground = idx % 2 === 0;
                const isContactSection = sectionId === 'nezavazna-konzultace-projektu';
                const isDeliverySection = sectionId === 'co-dodavame';
                const background = isAltBackground ? 'bg-zinc-50 dark:bg-zinc-900' : 'bg-white dark:bg-zinc-950';

                return (
                    <section
                        key={`section-${idx}`}
                        className={`${background} border-t border-zinc-200 dark:border-zinc-800 text-foreground`}
                    >
                        <div className="container mx-auto px-4 max-w-6xl py-16 md:py-20 space-y-10">
                            {section.title && renderBlock(section.title, `section-${idx}-title`, false)}

                            {isContactSection ? (
                                <div className="grid gap-10 lg:grid-cols-[1.05fr,1fr] lg:items-start">
                                    <div className="space-y-6 max-w-3xl">
                                        {section.blocks.map((block, blockIdx) => renderBlock(block, `section-${idx}-block-${blockIdx}`, false))}
                                    </div>
                                    {contactForm && (
                                        <div className="max-w-xl lg:ml-auto">
                                            {contactForm}
                                        </div>
                                    )}
                                </div>
                            ) : isDeliverySection ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {buildCards(section.blocks).map((card, cardIdx) => (
                                        <div key={`card-${cardIdx}`} className="h-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm p-5 space-y-3">
                                            <h3 className="text-base font-semibold text-foreground leading-tight">{renderInline(card.title.content)}</h3>
                                            <div className="space-y-3">
                                                {card.body.map((bodyBlock, bodyIdx) => {
                                                    if (bodyBlock.type === 'paragraph') {
                                                        return (
                                                            <p key={`card-${cardIdx}-p-${bodyIdx}`} className="text-sm leading-6 text-zinc-700 dark:text-zinc-200">
                                                                {renderInline(bodyBlock.content)}
                                                            </p>
                                                        );
                                                    }
                                                    if (bodyBlock.type === 'list') {
                                                        return (
                                                            <ul key={`card-${cardIdx}-list-${bodyIdx}`} className="list-disc list-inside text-sm text-zinc-700 dark:text-zinc-200 space-y-1">
                                                                {bodyBlock.items.map((item, listIdx) => (
                                                                    <li key={listIdx}>{renderInline(item)}</li>
                                                                ))}
                                                            </ul>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6 max-w-3xl">
                                    {section.blocks.map((block, blockIdx) => renderBlock(block, `section-${idx}-block-${blockIdx}`, false))}
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}
        </article>
    );
}

function buildSections(blocks: ContentBlock[]): { hero: ContentBlock[]; sections: Section[] } {
    const hero: ContentBlock[] = [];
    const sections: Section[] = [];

    let i = 0;

    if (blocks.length > 0 && blocks[0].type === 'h1') {
        hero.push(blocks[0]);
        i = 1;
        while (i < blocks.length && !['h1', 'h2', 'hr'].includes(blocks[i].type)) {
            hero.push(blocks[i]);
            i++;
        }
    }

    let currentSection: Section | null = null;

    for (; i < blocks.length; i++) {
        const block = blocks[i];

        if (block.type === 'h2') {
            if (currentSection) {
                sections.push(currentSection);
            }
            currentSection = { title: block, blocks: [] };
            continue;
        }

        if (block.type === 'hr') {
            if (currentSection) {
                sections.push(currentSection);
                currentSection = null;
            }
            sections.push({ blocks: [block] });
            continue;
        }

        if (!currentSection) {
            currentSection = { blocks: [] };
        }

        currentSection.blocks.push(block);
    }

    if (currentSection) {
        sections.push(currentSection);
    }

    return { hero, sections };
}

function buildCards(blocks: ContentBlock[]) {
    const cards: { title: ContentBlock; body: ContentBlock[] }[] = [];
    let current: { title: ContentBlock; body: ContentBlock[] } | null = null;

    blocks.forEach((block) => {
        if (block.type === 'h3') {
            if (current) cards.push(current);
            current = { title: block, body: [] };
            return;
        }

        if (!current) return;

        if (block.type === 'paragraph' || block.type === 'list') {
            current.body.push(block);
        }
    });

    if (current) {
        cards.push(current);
    }

    return cards;
}

function getHeadingId(content: string) {
    return content
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function renderBlock(block: ContentBlock, key: string, isHero: boolean) {
    switch (block.type) {
        case 'h1':
            return (
                <h1 key={key} className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
                    {renderInline(block.content)}
                </h1>
            );
        case 'h2': {
            const id = getHeadingId(block.content);
            return (
                <h2 key={key} id={id} className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight max-w-4xl mb-4">
                    {renderInline(block.content)}
                </h2>
            );
        }
        case 'h3':
            return (
                <h3 key={key} className="text-xs md:text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400 mt-2 mb-1">
                    {renderInline(block.content)}
                </h3>
            );
        case 'paragraph':
            return (
                <p
                    key={key}
                    className={`${isHero ? 'text-lg md:text-xl leading-8 text-zinc-600 dark:text-zinc-300 max-w-4xl' : 'text-base md:text-lg leading-7 text-zinc-700 dark:text-zinc-300 max-w-3xl'}`}
                >
                    {renderInline(block.content)}
                </p>
            );
        case 'list':
            return (
                <ul key={key} className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 pl-2 my-2 max-w-3xl">
                    {block.items.map((item, idx) => (
                        <li key={idx} className="leading-7 pl-2 marker:text-zinc-400">{renderInline(item)}</li>
                    ))}
                </ul>
            );
        case 'hr':
            return <hr key={key} className="my-12 border-zinc-200 dark:border-zinc-800" />;
        default:
            return null;
    }
}
