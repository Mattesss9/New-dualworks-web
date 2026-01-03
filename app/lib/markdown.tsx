import React from 'react';
import Link from 'next/link';

export type ContentBlock =
    | { type: 'h1'; content: string }
    | { type: 'h2'; content: string }
    | { type: 'h3'; content: string }
    | { type: 'paragraph'; content: string }
    | { type: 'list'; items: string[] }
    | { type: 'hr' };

export function parseMarkdown(markdown: string): ContentBlock[] {
    const lines = markdown.split('\n');
    const blocks: ContentBlock[] = [];
    let currentList: string[] = [];

    // State for handling DualWorks specific format (H1 line followed by content)
    let nextBlockType: 'h1' | 'h2' | 'h3' | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // 1. Skip empty lines, but close list if open
        if (!line) {
            if (currentList.length > 0) {
                blocks.push({ type: 'list', items: [...currentList] });
                currentList = [];
            }
            continue;
        }

        // 2. Handle Markers and Instructions (Filter out)
        // Markers
        if (line === 'H1') {
            nextBlockType = 'h1';
            continue;
        }
        if (line === 'H2') {
            nextBlockType = 'h2';
            continue;
        }
        if (line === 'H3') {
            nextBlockType = 'h3';
            continue;
        }

        // Instructions / Metadata to ignore
        // Examples: "Podnadpis (lead / perex – není H2):", "Úvodní text (bez H2)", "(Lead text – bez H2)", "CTA (primární):", "Inline kontaktní formulář – chování"
        // We filter these out based on exact matches or strong patterns observed in content-lock.
        // However, being too aggressive might delete content. 
        // The instructions typically contain parentheses with "bez H2" or "lead" or "CTA".
        if (
            line.startsWith('Podnadpis') ||
            line.startsWith('Úvodní text') ||
            line.startsWith('(Lead text') ||
            line.startsWith('(Úvodní text') ||
            line.startsWith('CTA') ||
            line.startsWith('(Formulář') ||
            line.startsWith('Nadpis formuláře') ||
            line.startsWith('(Pozn.:') ||
            line.startsWith('➡ Inline') ||
            line.startsWith('(se stejnou strukturou')
        ) {
            continue;
        }

        // 3. Handle Content

        // Check if we are in a "Next block is Header" state
        if (nextBlockType) {
            blocks.push({ type: nextBlockType, content: line });
            nextBlockType = null;
            continue;
        }

        // Standard Markdown parsing (fallback/mixed support)
        if (line.startsWith('# ')) {
            if (currentList.length > 0) { blocks.push({ type: 'list', items: [...currentList] }); currentList = []; }
            blocks.push({ type: 'h1', content: line.substring(2).trim() });
        } else if (line.startsWith('## ')) {
            if (currentList.length > 0) { blocks.push({ type: 'list', items: [...currentList] }); currentList = []; }
            blocks.push({ type: 'h2', content: line.substring(3).trim() });
        } else if (line.startsWith('### ')) {
            if (currentList.length > 0) { blocks.push({ type: 'list', items: [...currentList] }); currentList = []; }
            blocks.push({ type: 'h3', content: line.substring(4).trim() });
        }
        // Horizontal Rule
        else if (line.startsWith('---') || line.startsWith('***')) {
            if (currentList.length > 0) { blocks.push({ type: 'list', items: [...currentList] }); currentList = []; }
            blocks.push({ type: 'hr' });
        }
        // Lists
        else if (line.startsWith('- ') || line.startsWith('* ')) {
            currentList.push(line.substring(2).trim());
        }
        // Paragraphs
        else {
            if (currentList.length > 0) { blocks.push({ type: 'list', items: [...currentList] }); currentList = []; }
            blocks.push({ type: 'paragraph', content: line });
        }
    }

    if (currentList.length > 0) {
        blocks.push({ type: 'list', items: [...currentList] });
    }

    return blocks;
}

export function renderInline(text: string): React.ReactNode {
    const parts = [];
    let lastIndex = 0;
    // Regex for **bold** or [link](url)
    const regex = /(\*\*(.*?)\*\*)|(\[(.*?)\]\((.*?)\))/g;

    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        if (match[1]) { // Bold
            parts.push(<strong key={match.index} className="font-semibold text-foreground">{match[2]}</strong>);
        } else if (match[3]) { // Link
            const label = match[4];
            const href = match[5];
            if (href.startsWith('/')) {
                parts.push(<Link href={href} key={match.index} className="text-primary hover:underline underline-offset-4">{label}</Link>);
            } else {
                parts.push(<a href={href} key={match.index} className="text-primary hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">{label}</a>);
            }
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return <>{parts}</>;
}
