# DualWorks – Struktura webu (pro Antigravity)

## Cíl webu
B2B prezentace DualWorks jako kapacitní subdodávky pro průmyslové projekty.
Nejsme personální agentura. Neprodáváme „lidi“, ale projektové zapojení a převzetí odpovědnosti za vymezený rozsah prací.

---

## Navigace (menu)
1) Úvod (Homepage) – /
2) Krizový scénář (Tlak na termíny) – /krizovy-scenar
3) Plánovaný scénář (Dlouhodobé kapacity) – /dlouhodobe-kapacity
4) Jak spolupracujeme – /jak-spolupracujeme
5) O nás / Zázemí – /o-nas

Primární CTA v menu: **Domluvit konzultaci** (scroll na formulář na dané stránce / nebo otevřít modal)
Sekundární CTA (volitelné): **Kontakt** (scroll na formulář / kontaktní blok)

---

## Globální prvky (na všech stránkách)
### Header
- Logo
- Menu (viz výše)
- CTA tlačítko „Domluvit konzultaci“

### Footer
- Zkrácené shrnutí (1 věta)
- Odkazy: Ochrana osobních údajů, Podmínky užití, Cookies (pokud budou)
- Kontaktní údaje (email/telefon) + IČO/DIČ (pokud chceš)
- (Volitelné) odkazy na dokumenty: „specifications.pdf“ / „terms-of-use“

---

## Stránky a sekce

### 1) Homepage ( / )
Účel: rychlé pochopení „co jsme“ + rozcestník na 2 scénáře.

Sekce:
1. HERO (H1 + úvod + CTA)
2. Kontext problému (krátké vysvětlení tlaku kapacit vs harmonogram)
3. Scénáře spolupráce (2 karty)
   - Krizový scénář → link /tlak-na-terminy
   - Plánovaný scénář → link /dlouhodobe-kapacity
4. Jak spolupracujeme (krátký výtah) → link /jak-spolupracujeme
5. Proč DualWorks (4 body)
   - Zkušenosti z průmyslových projektů
   - Regulované provozy a odstávky (včetně energetiky/jaderných provozů)
   - Odborné kapacity / projektový režim
   - Pojištění odpovědnosti
6. Nezávazná konzultace + inline formulář (konec stránky)

---

### 2) Krizový scénář – Kapacitní podpora při tlaku na termíny ( /tlak-na-terminy )
Účel: vysvětlit, kdy a jak vstupujeme při tlaku na termíny. Bez opakování, jasná definice.

Sekce:
1. HERO (H1 + úvodní odstavec – jediná definice)
2. Typické situace (bullet list)
3. Kapacitní subdodávka jako stabilizační prvek
   - Nejsme personální agentura
   - Dodáváme ucelený tým + jasně vymezený rozsah
4. Krátkodobá reakce při tlaku na termíny
   - Stabilizace kritických fází (přínosy / výsledky)
5. Plánování v návaznosti na harmonogram (krátce, aby bylo jasné, že umíme i plánovaně)
6. Jak spolupráce funguje v praxi (proces v 3–5 krocích)
7. Proč DualWorks (zkráceně, 3–4 body)
8. Nezávazná konzultace + inline formulář

---

### 3) Plánovaný scénář – Dlouhodobé kapacity ( /dlouhodobe-kapacity )
Účel: ukázat, že umíme být stabilní kapacitní subdodávka po dobu projektu.

Sekce:
1. HERO (H1 + úvod)
2. Kdy dává dlouhodobá spolupráce smysl (scénáře)
3. Kapacitní subdodávka místo náboru
   - Stabilní tým bez personální zátěže
4. Plánování kapacit v návaznosti na harmonogram
   - Předvídatelnost, kontinuita, minimalizace prostojů
5. Jak spolupráce funguje v dlouhodobých projektech (proces + řízení změn)
6. Proč DualWorks (zkráceně, 3–4 body)
7. Nezávazná konzultace + inline formulář

---

### 4) Jak spolupracujeme ( /jak-spolupracujeme )
Účel: sjednotit „model spolupráce“ – pravidla, proces, odpovědnost, co dodáváme.

Sekce:
1. HERO (H1 + krátký úvod: projektový režim, ne personální výpomoc)
2. Kdy nás firmy zapojují (krizově vs plánovaně, stručně)
3. Krátkodobé vs dlouhodobé zapojení (2 bloky / karty)
4. Kapacitní subdodávka místo náboru
   - Projektový přístup, ne personální služba
   - Odpovědnost za svěřený rozsah prací (v rámci smluvního vztahu)
5. Jak spolupráce funguje v praxi (kroky)
6. Proč DualWorks (krátce)
7. Nezávazná konzultace + inline formulář

---

### 5) O nás / Zázemí ( /o-nas )
Účel: důvěryhodnost, regulované provozy, zkušenosti, pojištění, procesní kultura.

Sekce:
1. HERO (H1 + úvod)
2. Zázemí pro průmyslové projekty (jak fungujeme v provozech, BOZP, návaznosti)
3. Odborné kapacity a řízení týmů (kompetence + projektový režim)
4. Regulované provozy a odstávky (energetika, jaderné provozy, odstávky)
5. Smluvní rámec a odpovědnost (jasné vymezení, projektová spolupráce)
6. Pojištění odpovědnosti (stručně + „na vyžádání doložíme“)
7. Nezávazná konzultace + inline formulář

---

## Formulář (inline na stránce)
- Umístění: vždy poslední sekce („Nezávazná konzultace“)
- Bez redirectu po odeslání (success message inline)
- Bez captcha (max honeypot)
- Pole (minimum):
  - Firma
  - Jméno
  - Email
  - Telefon (volitelně)
  - Text / Popis situace
  - (Volitelné) typ scénáře (dropdown: krizový / plánovaný / nevím)
- Souhlas se zpracováním (checkbox + odkaz na privacy policy)

---

## Poznámky pro implementaci
- Texty jsou dodané zvlášť a mají se použít beze změny významu.
- Stitch kód je referenční design/layout; výsledná implementace může být čistší, ale musí vizuálně odpovídat.
- Design: technický, klidný, B2B, důvěryhodný. Bez „agenturní“ terminologie.
