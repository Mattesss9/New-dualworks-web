# DualWorks – routing.md (URL / navigace / SEO metadata)

Cíl: jednoduchá, čitelná struktura webu.
Primárně CZ verze. EN/DE lze doplnit později.

---

## 1) Primární navigace (menu)
1. Domů
2. Jak spolupracujeme
3. Krizový scénář
4. Plánovaný scénář
5. O nás / zázemí
6. Kontakt

Pozn.: „Kontakt“ vede na sekci s inline formulářem (na homepage) a/nebo samostatnou stránku dle implementace.

---

## 2) Routing – stránky a URL

### A) Homepage
- URL: `/`
- Menu label: `Domů`
- H1: `Kapacitní subdodávka pro průmyslové projekty`
- Title: `DualWorks – kapacitní subdodávka pro průmyslové projekty`
- Meta description:
  `Kapacitní subdodávka pro průmyslové projekty. Zapojení týmů v projektovém režimu při tlaku na termíny i při plánovaném posílení kapacit.`

Sekce (kotvy na homepage):
- `#scenare` (Scénáře spolupráce)
- `#jak-spolupracujeme` (shrnutí principů)
- `#proc-dualworks`
- `#kontakt` (inline formulář)

---

### B) Jak spolupracujeme
- URL: `/jak-spolupracujeme`
- Menu label: `Jak spolupracujeme`
- H1: `Jak spolupracujeme na průmyslových projektech`
- Title: `Jak spolupracujeme – DualWorks`
- Meta description:
  `Vysvětlení projektového režimu spolupráce: kapacitní subdodávka, ucelené týmy, svěřený rozsah prací, smluvní rámec a řízení zapojení kapacit.`

Sekce (kotvy):
- `#kdy-nas-zapojuji` (Kdy nás firmy zapojují)
- `#kratkodobe-a-dlouhodobe` (Krátkodobé a dlouhodobé zapojení)
- `#subdodavka-vs-nabor` (Kapacitní subdodávka místo náboru)
- `#jak-to-probiha` (Jak spolupráce funguje v praxi)
- `#proc-dualworks` (zkráceně)
- `#konzultace` (CTA + formulář/odkaz)

---

### C) Krizový scénář
- URL: `/krizovy-scenar`
- Menu label: `Krizový scénář`
- H1: `Kapacitní podpora při tlaku na termíny`
- Title: `Krizový scénář – kapacitní podpora při tlaku na termíny | DualWorks`
- Meta description:
  `Když harmonogram neodpovídá kapacitám a vzniká tlak na termíny. Zapojení kapacit jako subdodávka se svěřeným rozsahem prací a jasným projektovým rámcem.`

Sekce (kotvy):
- `#situace` (typické situace)
- `#stabilizace` (stabilizace kritických fází)
- `#bez-personalky` (nejsme personální agentura)
- `#proces` (jak probíhá zapojení)
- `#cta` (nezávazná konzultace)

---

### D) Plánovaný scénář
- URL: `/planovany-scenar`
- Menu label: `Plánovaný scénář`
- H1: `Dlouhodobé kapacitní zajištění průmyslových projektů`
- Title: `Plánovaný scénář – dlouhodobé kapacitní zajištění | DualWorks`
- Meta description:
  `Dlouhodobé kapacitní zajištění bez interního náboru. Plánované zapojení týmů podle harmonogramu, milníků a vývoje projektu.`

Sekce (kotvy):
- `#kdy-to-dava-smysl` (typické scénáře)
- `#misto-naboru` (kapacitní subdodávka místo náboru)
- `#planovani` (plánování kapacit)
- `#proces` (jak spolupráce funguje dlouhodobě)
- `#cta` (nezávazná konzultace)

---

### E) O nás / zázemí
- URL: `/o-nas`
- Menu label: `O nás / zázemí`
- H1: `Zázemí pro průmyslové projekty`
- Title: `O nás – zázemí a zkušenosti | DualWorks`
- Meta description:
  `Zázemí pro průmyslové projekty: řízení týmů, kvalifikace, smluvní rámec, pojištění odpovědnosti a zkušenosti z regulovaných provozů a odstávek.`

Sekce (kotvy):
- `#zazemi` (zázemí)
- `#rizeni-tymu` (odborné kapacity a řízení)
- `#regulovane-provozy` (regulované provozy a odstávky)
- `#smluvni-ramec` (smluvní rámec a odpovědnost)
- `#pojisteni` (pojištění odpovědnosti)
- `#cta` (konzultace)

---

### F) Kontakt
Varianta 1 (doporučená): pouze kotva na homepage
- URL: `/#kontakt`

Varianta 2 (pokud chceš samostatnou stránku):
- URL: `/kontakt`
- Title: `Kontakt | DualWorks`
- Meta description:
  `Nezávazná konzultace projektu. Stručně popište situaci, rozsah a lokalitu. Ozveme se zpět k domluvě dalšího postupu.`

---

## 3) Footer routing (právní)
- `/privacy-policy` (pokud existuje text)
- `/terms-of-use` (pokud existuje text)

Pokud jsou jen soubory v _assets:
- zatím linkovat jako statické soubory (např. `/assets/privacy-policy.txt`)
- nebo převést na HTML stránky.

---

## 4) Poznámky k SEO (praktické)
- Title max ~60 znaků (orientačně)
- Meta description 140–160 znaků
- 1 H1 na stránku
- Kotvy držet bez diakritiky a s pomlčkami
