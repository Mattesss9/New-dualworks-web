# Finální MENU a navigace – DualWorks

Cíl navigace:
- jasně vést B2B zákazníka k nezávazné konzultaci
- vysvětlit model kapacitní subdodávky (ne personální agentura)
- udržet jednoduchou a čitelnou strukturu
- fungovat konzistentně na desktopu i mobilu

---

## 1) Primární navigace (header)

Pořadí položek (zleva doprava):

1. Domů  
   - URL: `/`

2. Jak spolupracujeme  
   - URL: `/jak-spolupracujeme`  
   - účel: vysvětlení modelu kapacitní subdodávky, procesu a principů spolupráce

3. Krizový scénář  
   - URL: `/krizovy-scenar`  
   - účel: řešení situací, kdy je tlak na termíny a je nutná rychlá stabilizace

4. Plánovaný scénář  
   - URL: `/planovany-scenar`  
   - účel: dlouhodobé kapacitní zajištění projektů bez náboru

5. O nás / Zázemí  
   - URL: `/o-nas`  
   - účel: důvěryhodnost, zkušenosti, zázemí, pojištění, kvalifikace

6. Kontakt  
   - URL: `/kontakt`  
   - alternativně: scroll na `/#kontakt` (pokud je formulář inline)

---

## 2) Hlavní CTA v headeru

Samostatné tlačítko vpravo v navigaci:

- Text: **Domluvit konzultaci**
- Chování:
  - na homepage: scroll na sekci `#kontakt` + fokus formuláře
  - na ostatních stránkách: přechod na `/kontakt#konzultace`
- CTA je viditelné:
  - na desktopu vždy
  - na mobilu v menu + ideálně sticky po scrollu

---

## 3) Top info bar (doporučeno)

Tenký informační pruh nad hlavním menu.

Obsah:
- Telefon (klikatelné `tel:`)
- E-mail (klikatelné `mailto:`)
- Pracovní doba (např. Po–Pá 8:00–17:00)

Chování:
- na desktopu plný obsah
- na mobilu zkráceno (ikony / skryto po scrollu)

---

## 4) Dropdown / vnitřní navigace (Jak spolupracujeme)

Na desktopu může být dropdown, na mobilu accordion.

Položky (anchor odkazy):

- Model spolupráce  
  - `/jak-spolupracujeme#model-spoluprace`

- Kdy nás firmy zapojují  
  - `/jak-spolupracujeme#kdy-nas-zapojuji`

- Krátkodobé a dlouhodobé zapojení  
  - `/jak-spolupracujeme#kratkodobe-a-dlouhodobe`

- Jak spolupráce funguje v praxi  
  - `/jak-spolupracujeme#proces`

- Nezávazná konzultace  
  - `/jak-spolupracujeme#konzultace`

---

## 5) Mobilní navigace

Chování:
- hamburger menu
- slide-over panel (z pravé strany)
- žádný full-page overlay

Struktura mobilního menu:

- Domů
- Jak spolupracujeme
  - Model spolupráce
  - Kdy nás firmy zapojují
  - Krátkodobé a dlouhodobé zapojení
  - Proces v praxi
- Krizový scénář
- Plánovaný scénář
- O nás / Zázemí
- Kontakt

CTA:
- výrazné tlačítko **Domluvit konzultaci** (nahoře nebo dole menu)

---

## 6) Aktivní stavy a UX

- aktivní stránka v menu vizuálně zvýrazněná
- CTA má jednotný styl na celém webu
- žádná položka nesmí vést na prázdnou stránku

---

## 7) Footer navigace (zkrácená)

- Domů
- Jak spolupracujeme
- Krizový scénář
- Plánovaný scénář
- O nás / Zázemí
- Kontakt

Právní odkazy:
- Ochrana osobních údajů
- Podmínky užití
