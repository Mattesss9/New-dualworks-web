# FORM SPECIFICATION – DualWorks Web

Tento dokument definuje **jediný povolený kontaktní formulář** na webu DualWorks.
Formulář je součástí obsahové a procesní logiky webu, nikoli marketingový prvek.

---

## 1. Účel formuláře

- umožnit **nezávaznou konzultaci projektu**
- zachytit základní kontext situace (krizová / plánovaná)
- nevyvíjet tlak na konverzi
- nepůsobit jako poptávkový formulář agentury

Formulář **nenahrazuje obchodní nabídku**.

---

## 2. Umístění formuláře

- formulář je **INLINE** součást stránky
- vždy jako **poslední sekce** s názvem:
  
  **„Nezávazná konzultace projektu“**

- formulář se opakuje na těchto stránkách:
  - Homepage
  - /tlak-na-terminy
  - /dlouhodobe-kapacity
  - /jak-spolupracujeme
  - /o-nas

---

## 3. Chování formuláře (UX)

- ❌ žádný redirect po odeslání
- ✅ potvrzení úspěchu **inline** (success message)
- ❌ žádná captcha
- ✅ ochrana proti spamu pouze pomocí **honeypot field**
- formulář musí být:
  - rychlý
  - čitelný
  - technicky strohý

---

## 4. Povinná pole (MINIMUM)

1. **Firma**
   - type: text
   - required: YES

2. **Jméno**
   - type: text
   - required: YES

3. **Email**
   - type: email
   - required: YES

4. **Telefon**
   - type: tel
   - required: NO

5. **Popis situace / projektu**
   - type: textarea
   - required: YES
   - placeholder (významový, ne marketingový):
     „Stručně popište situaci, harmonogram nebo fázi projektu…“

6. **Typ scénáře**
   - type: select
   - required: NO
   - options:
     - Krizový scénář (tlak na termíny)
     - Plánovaný scénář (dlouhodobé kapacity)
     - Nejsem si jistý

7. **Souhlas se zpracováním osobních údajů**
   - type: checkbox
   - required: YES
   - text:
     „Souhlasím se zpracováním osobních údajů za účelem kontaktování.“
   - odkaz na `/privacy-policy`

---

## 5. Zakázané prvky

- ❌ žádné:
  - „Získat nabídku“
  - „Poptat služby“
  - „Spočítat cenu“
- ❌ žádné marketingové mikrocopy
- ❌ žádné hodnocení urgency („Ozveme se do 24h“ apod.)

---

## 6. Text tlačítka (SUBMIT)

Povolené varianty (použít jednu konzistentně):

- **Odeslat poptávku ke konzultaci**
- **Odeslat nezávaznou poptávku**
- **Odeslat**

Zakázáno:
- „Získat nabídku“
- „Chci spolupracovat“

---

## 7. Success message (po odeslání)

Zobrazit inline, bez redirectu.

Doporučený text:

> „Děkujeme za zprávu.  
> Ozveme se vám a domluvíme další postup v rámci projektu.“

---

## 8. Technické poznámky

- formulář může mít:
  - mock submission (pro QA)
  - pozdější napojení na backend / email / CRM
- struktura polí se **NESMÍ měnit** bez aktualizace tohoto dokumentu
- validace:
  - HTML5 + základní frontend kontrola

---

## 9. Shrnutí (závazné pravidlo)

Formulář:
- je **technický**
- je **klidný**
- je **projektový**
- nesmí působit jako nábor ani agenturní poptávka

👉 Pokud design nebo UX nutí ke změně formuláře,  
**mění se design, ne formulář**.
