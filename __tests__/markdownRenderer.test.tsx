import { render, screen } from '@testing-library/react';
import MarkdownRenderer from '../app/components/MarkdownRenderer';

const sampleContent = `H1
Hero Title

Lead line that explains things.

H2
Co dodáváme
Odborná práce popis.

H2
Nezávazná konzultace projektu
Text úvodu konzultace.
`;

describe('MarkdownRenderer', () => {
  it('renders hero, sections, and injects contact form into consultation section', () => {
    render(<MarkdownRenderer content={sampleContent} contactForm={<div data-testid="contact-form" />} />);

    expect(screen.getByRole('heading', { level: 1, name: /Hero Title/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Co dodáváme/i })).toBeInTheDocument();

    const consultationHeading = screen.getByRole('heading', { level: 2, name: /Nezávazná konzultace projektu/i });
    expect(consultationHeading).toHaveAttribute('id', 'nezavazna-konzultace-projektu');

    const consultationSection = consultationHeading.closest('section');
    expect(consultationSection?.querySelector('[data-testid="contact-form"]')).toBeInTheDocument();
  });
});
