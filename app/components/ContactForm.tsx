'use client';

import React, { useState } from 'react';

type ContactFormProps = {
    variant?: 'embedded' | 'standalone';
    title?: string;
};

type FormErrors = Partial<Record<'company' | 'name' | 'email' | 'message' | 'consent', string>>;

export default function ContactForm({ variant = 'standalone', title }: ContactFormProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [honeypot, setHoneypot] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const clearError = (field: keyof FormErrors) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (honeypot) {
            setStatus('success');
            return;
        }

        const nextErrors: FormErrors = {};
        if (!(formData.get('company') as string)?.trim()) nextErrors.company = 'Vyplňte název firmy.';
        if (!(formData.get('name') as string)?.trim()) nextErrors.name = 'Vyplňte jméno.';
        const email = (formData.get('email') as string) || '';
        if (!email.trim()) {
            nextErrors.email = 'Zadejte e-mail.';
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            nextErrors.email = 'Zadejte platný e-mail.';
        }
        if (!(formData.get('message') as string)?.trim()) nextErrors.message = 'Popište situaci nebo projekt.';
        const consentChecked = (formData.get('consent') as string) === 'on';
        if (!consentChecked) nextErrors.consent = 'Potvrďte souhlas se zpracováním údajů.';

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setStatus('idle');
            return;
        }

        setErrors({});
        setStatus('submitting');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('success');
    };

    const FormCard = ({ children }: { children: React.ReactNode }) => (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 md:p-8">
            {title && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground leading-tight">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );

    if (status === 'success') {
        const successContent = (
            <FormCard>
                <div className="text-center space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">Děkujeme za zprávu.</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">Ozveme se vám a domluvíme další postup v rámci projektu.</p>
                </div>
            </FormCard>
        );

        if (variant === 'embedded') {
            return successContent;
        }

        return (
            <section id="kontakt" className="py-16 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 max-w-4xl">
                    {successContent}
                </div>
            </section>
        );
    }

    const form = (
        <FormCard>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <input
                    type="text"
                    name="website_url_check"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    autoComplete="off"
                    tabIndex={-1}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">Firma <span className="text-primary">*</span></label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            aria-invalid={Boolean(errors.company)}
                            aria-describedby={errors.company ? 'company-error' : undefined}
                            required
                            onChange={() => clearError('company')}
                            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        {errors.company && <p id="company-error" className="mt-2 text-sm text-red-500" role="alert">{errors.company}</p>}
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Jméno <span className="text-primary">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            required
                            onChange={() => clearError('name')}
                            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        {errors.name && <p id="name-error" className="mt-2 text-sm text-red-500" role="alert">{errors.name}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">E-mail <span className="text-primary">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            required
                            onChange={() => clearError('email')}
                            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        {errors.email && <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Telefon (volitelné)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="scenario" className="block text-sm font-medium text-foreground mb-2">Typ scénáře</label>
                    <select
                        id="scenario"
                        name="scenario"
                        className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                    >
                        <option value="">Vyberte možnost...</option>
                        <option value="crisis">Krizový scénář (tlak na termíny)</option>
                        <option value="planned">Plánovaný scénář (dlouhodobé kapacity)</option>
                        <option value="unsure">Nejsem si jistý/jistá</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Popis situace / projektu <span className="text-primary">*</span></label>
                    <textarea
                        id="message"
                        name="message"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        required
                        rows={4}
                        placeholder="Stručně popište situaci, harmonogram nebo fázi projektu."
                        onChange={() => clearError('message')}
                        className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    ></textarea>
                    {errors.message && <p id="message-error" className="mt-2 text-sm text-red-500" role="alert">{errors.message}</p>}
                </div>

                <div className="flex items-start pt-2">
                    <div className="flex items-center h-5">
                        <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            aria-invalid={Boolean(errors.consent)}
                            aria-describedby={errors.consent ? 'consent-error' : undefined}
                            required
                            onChange={() => clearError('consent')}
                            className="w-4 h-4 text-primary border-zinc-300 rounded-sm focus:ring-primary"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="consent" className="text-zinc-600 dark:text-zinc-400">
                            Souhlasím se zpracováním osobních údajů za účelem kontaktování. <a href="/privacy-policy" className="text-foreground underline decoration-zinc-400 underline-offset-2 hover:decoration-foreground">Více info</a>
                        </label>
                        {errors.consent && <p id="consent-error" className="mt-2 text-sm text-red-500" role="alert">{errors.consent}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3 bg-foreground text-background font-semibold rounded-md transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-zinc-900"
                >
                    {status === 'submitting' ? 'Odesíláme...' : 'Odeslat nezávaznou poptávku'}
                </button>
            </form>
        </FormCard>
    );

    if (variant === 'embedded') {
        return form;
    }

    return (
        <section id="kontakt" className="py-16 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 max-w-4xl">
                {form}
            </div>
        </section>
    );
}
