import { fireEvent, render, screen } from '@testing-library/react';
import ContactForm from '../app/components/ContactForm';

describe('ContactForm', () => {
  it('submits and shows success state', async () => {
    render(<ContactForm variant="embedded" title="Nezávazná konzultace projektu" />);

    fireEvent.change(screen.getByLabelText(/Firma/i), { target: { value: 'Acme' } });
    fireEvent.change(screen.getByLabelText(/Jm/i), { target: { value: 'Jan' } });
    fireEvent.change(screen.getByLabelText(/E-?mail/i), { target: { value: 'jan@example.com' } });
    fireEvent.change(screen.getByLabelText(/Telefon/i), { target: { value: '+420123123' } });
    fireEvent.change(screen.getByLabelText(/Popis situace/i), { target: { value: 'Potřebujeme kapacity.' } });
    fireEvent.click(screen.getByLabelText(/Souhlas/i));

    fireEvent.click(screen.getByRole('button', { name: /Odeslat/i }));

    expect(await screen.findByText(/Ozveme se/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
