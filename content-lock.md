# CONTENT LOCK – DualWorks Web Project

Tento dokument definuje **závazná pravidla práce s obsahem** pro celý webový projekt DualWorks.

Obsah webu je považován za **FINÁLNÍ**.  
Jakákoli změna obsahu bez výslovného pokynu vlastníka projektu je **NEPOVOLENÁ**.

---

## 1. Co je považováno za „obsah“

Za obsah se považuje:
- veškerý text v souborech `.md` a `.odt`
- nadpisy (H1, H2, H3)
- pořadí odstavců
- odrážky
- formulace vět
- použitá terminologie (např. „kapacitní subdodávka“, „projektový přístup“)

Obsah **není**:
- layout
- barvy
- typografie
- velikosti fontů
- rozestupy
- komponenty

---

## 2. Zdroje obsahu (AUTHORITATIVE SOURCES)

Autoritativní zdroj obsahu jsou **Markdown soubory (`.md`)** ve složce:

/texts

Konkrétně:
- `HOMEPAGE.md`
- `jak-spolupracujeme.md`
- `krizovy-scenar.md`
- `dlouhodobe-kapacitni-zajisteni.md`
- `o-nas.md`

⚠️ `.odt` soubory slouží pouze jako **archiv / historický zdroj**  
⚠️ **Implementace se řídí výhradně `.md` verzemi**

---

## 3. Zákazy (ABSOLUTNÍ)

Je zakázáno:
- ❌ zkracovat text
- ❌ parafrázovat věty
- ❌ slučovat sekce kvůli designu
- ❌ měnit význam vět
- ❌ přepisovat text do „marketingovější“ formy
- ❌ nahrazovat terminologii synonyma
- ❌ odstraňovat „opakování“, pokud jsou významově odůvodněná
- ❌ přesouvat text mezi stránkami

Pokud se text **nevejde do designu**:
👉 **DESIGN SE MUSÍ PŘIZPŮSOBIT TEXTU**

---

## 4. Povolené úpravy (OMEZENÉ)

Je povoleno:
- rozdělit dlouhý text do více řádků (line breaks)
- vizuálně zvýraznit část textu (např. bold)
- zalomit text do více bloků
- upravit pořadí **vizuálních** sekcí, pokud zůstane zachována logika stránky

❗ Nesmí se změnit:
- slovosled
- význam
- struktura nadpisů (H1–H3)

---

## 5. Hierarchie rozhodování (ZÁVAZNÁ)

Platí následující hierarchie:

1. **Obsah (text)**
2. **Struktura obsahu (sekce, H1–H3)**
3. **Routing (URL, menu)**
4. **Design**
5. **Efekty / animace**

V případě konfliktu:
👉 **VŽDY VYHRÁVÁ OBSAH**

---

## 6. Nejasnosti a konflikty

Pokud nastane situace, kdy:
- text není jednoznačný
- struktura není jasná
- není možné text implementovat bez změny významu

Platí pravidlo:

> **NEIMPROVIZOVAT.  
> NEUPRAVOVAT.  
> POŽÁDAT O UPŘESNĚNÍ.**

---

## 7. Kontrolní kritérium (QA)

Obsah je považován za správně implementovaný, pokud:
- odpovídá `.md` souborům **slovo od slova**
- zachovává význam, tón a terminologii
- respektuje strukturu jednotlivých stránek

Jakákoli odchylka = **chyba**.

---

## 8. Shrnutí (jednou větou)

**Tento projekt se řídí pravidlem:  
TEXT JE ZÁKON. DESIGN SE MU PODŘIZUJE.**