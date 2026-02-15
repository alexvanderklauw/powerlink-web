# PROMPT: BOUW MULTI-STEP INTAKEFORMULIER FLOATWEB
## Voor: ChiefOperator (mijzelf)
## Doel: Autonoom formulier bouwen volgens specificatie

---

## CONTEXT
Je gaat een 5-staps intakeformulier bouwen voor Floatweb. Dit formulier vervangt het huidige simpele formulier op floatweb.nl. Het doel is om genoeg informatie te verzamelen om een conceptontwerp te maken waar klanten mee akkoord gaan.

Belangrijk: Bouw dit volledig autonoom. Vraag geen toestemming voor elke kleine wijziging. Maak beslissingen, voer uit, rapporteer resultaat.

---

## STAP 1: VOORBEREIDING (10 min)

### 1.1 Backup huidige index.html
```bash
copy powerlink/index.html powerlink/index-backup-[datum].html
```

### 1.2 Controleer documentatie
- Lees: `powerlink/form-design-document.md` (volledig)
- Noteer: 5 stappen, 20 vragen totaal
- Noteer: Template screenshots nodig (4 stuks)

### 1.3 Verzamel assets
- [ ] Maak screenshots van templates (of gebruik bestaande)
  - restaurant-template.html
  - salon-template.html
  - cafe-template.html
  - trade-template.html (of vakman variant)
- [ ] Optimaliseer afbeeldingen (< 100KB per stuk)
- [ ] Sla op in: `powerlink/images/form-templates/`

---

## STAP 2: HTML STRUCTUUR (30 min)

### 2.1 Vervang huidig formulier sectie
Zoek in index.html:
```html
<!-- Calculator / Quote Form -->
<section class="calculator" id="offerte">
```

Vervang COMPLEET door nieuwe multi-step form.

### 2.2 Bouw 5 stap-containers
```html
<form id="intakeForm" name="intake-form" netlify>
  
  <!-- Stap 1: Jouw bedrijf -->
  <div class="form-step" data-step="1">
    <h2>Stap 1: Jouw bedrijf</h2>
    <p class="step-description">Vertel ons wie je bent</p>
    <!-- Vragen 1.1 - 1.5 hier -->
    <button type="button" class="btn-next">Volgende</button>
  </div>
  
  <!-- Stap 2: Stijl & content -->
  <div class="form-step" data-step="2" style="display:none;">
    <h2>Stap 2: Jouw stijl & content</h2>
    <!-- Vragen 2.1 - 2.5 hier -->
    <button type="button" class="btn-prev">Terug</button>
    <button type="button" class="btn-next">Volgende</button>
  </div>
  
  <!-- Stap 3: Wat moet website doen -->
  <div class="form-step" data-step="3" style="display:none;">
    <h2>Stap 3: Wat moet je website doen?</h2>
    <!-- Vragen 3.1 - 3.4 hier -->
    <button type="button" class="btn-prev">Terug</button>
    <button type="button" class="btn-next">Volgende</button>
  </div>
  
  <!-- Stap 4: Contact -->
  <div class="form-step" data-step="4" style="display:none;">
    <h2>Stap 4: Contact & livegang</h2>
    <!-- Vragen 4.1 - 4.6 hier -->
    <button type="button" class="btn-prev">Terug</button>
    <button type="button" class="btn-next">Volgende</button>
  </div>
  
  <!-- Stap 5: Voorstel -->
  <div class="form-step" data-step="5" style="display:none;">
    <h2>Stap 5: Jouw voorstel</h2>
    <div id="proposal-preview">
      <!-- Dynamisch gevuld met JS -->
    </div>
    <button type="button" class="btn-prev">Terug</button>
    <button type="submit" class="btn-primary">Ontvang mijn gratis ontwerp</button>
  </div>
  
</form>
```

### 2.3 Progress indicator
Bouw boven het formulier:
```html
<div class="progress-bar">
  <div class="progress-step active" data-step="1">1</div>
  <div class="progress-line"></div>
  <div class="progress-step" data-step="2">2</div>
  <div class="progress-line"></div>
  <div class="progress-step" data-step="3">3</div>
  <div class="progress-line"></div>
  <div class="progress-step" data-step="4">4</div>
  <div class="progress-line"></div>
  <div class="progress-step" data-step="5">5</div>
</div>
<p class="progress-text">Stap 1 van 5 • Duurt ±3 minuten</p>
```

---

## STAP 3: CSS STYLING (30 min)

### 3.1 Form step styling
```css
.form-step {
  display: none;
  animation: fadeIn 0.3s ease-in;
}

.form-step.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### 3.2 Progress bar styling
- Horizontal line met 5 cirkels
- Active step: oranje (var(--accent))
- Completed step: groen checkmark
- Future step: grijs

### 3.3 Template selection cards
- 4 cards naast elkaar (grid)
- Afbeelding boven, radio button verborgen
- Selected state: border 3px solid var(--accent)
- Hover: scale(1.02)

### 3.4 Input styling
- Consistent met huidige formulier
- Focus states duidelijk
- Error states rood border

---

## STAP 4: JAVASCRIPT LOGICA (45 min)

### 4.1 Step navigation
```javascript
class MultiStepForm {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.formData = {};
    this.init();
  }
  
  init() {
    this.loadFromStorage();
    this.showStep(this.currentStep);
    this.bindEvents();
  }
  
  nextStep() {
    if (this.validateStep(this.currentStep)) {
      this.saveStepData(this.currentStep);
      this.currentStep++;
      this.showStep(this.currentStep);
      this.updateProgress();
      this.saveToStorage();
    }
  }
  
  prevStep() {
    this.currentStep--;
    this.showStep(this.currentStep);
    this.updateProgress();
  }
}
```

### 4.2 localStorage functionaliteit
- Sla formulier data op bij elke stap
- Herstel bij page refresh
- Clear na succesvolle submit

### 4.3 Validatie per stap
- Stap 1: Verplichte velden check
- Stap 2: Template selectie verplicht
- Stap 3: Alle vragen beantwoord
- Stap 4: Email validatie, telefoon validatie

### 4.4 Tier berekening
```javascript
calculateTier() {
  const data = this.formData;
  let tier = 'Start';
  
  // Check reserveren
  if (data.reserveren === 'Ja') {
    return 'Pro';
  }
  
  // Check uitgebreidheid
  switch(data.uitgebreidheid) {
    case 'Eén overzichtelijke pagina':
      tier = 'Start'; break;
    case 'Meerdere pagina\'s':
    case 'Laat jullie adviseren':
      tier = 'Groei'; break;
    case 'Best uitgebreid':
      tier = 'Pro'; break;
  }
  
  // Check meerdere regios
  if (data.meerdere_regios === 'Ja' && tier === 'Start') {
    tier = 'Groei';
  }
  
  return tier;
}
```

### 4.5 Prijsberekening
```javascript
calculatePrice() {
  const tier = this.calculateTier();
  const tierData = {
    'Start': { setup: 99, monthly: 9.99 },
    'Groei': { setup: 249, monthly: 14.99 },
    'Pro': { setup: 499, monthly: 19.99 }
  };
  
  let setup = tierData[tier].setup;
  let monthly = tierData[tier].monthly;
  
  // Extras
  if (this.formData.pro_email === 'Ja') monthly += 5;
  if (this.formData.logo_maken === 'Ja') setup += 25;
  if (this.formData.teksten_schrijven === 'Ja') setup += 79;
  
  return { setup, monthly, tier };
}
```

### 4.6 Voorstel generatie (Stap 5)
- Toon gekozen template preview
- Toon bedrijfsnaam in voorbeeld
- Toon tier + prijs
- Toon bullet list met "Waarom dit pakket"
- Checkbox pro email

---

## STAP 5: NETLIFY FORMS INTEGRATIE (15 min)

### 5.1 Form attributen
```html
<form id="intakeForm" name="floatweb-intake" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="floatweb-intake">
  <p style="display:none;">
    <label>Bot field: <input name="bot-field"></label>
  </p>
  <!-- rest van form -->
</form>
```

### 5.2 Hidden fields voor data
- Alle formData als hidden inputs in stap 5
- Of: serialize JSON naar één hidden field

### 5.3 Success redirect
```html
<input type="hidden" name="redirect" value="/bedankt.html">
```

---

## STAP 6: TESTEN (20 min)

### 6.1 Lokale test
- Open index.html in browser
- Test elke stap doorlopen
- Test terug-knop
- Test validatie
- Test localStorage (refresh page)

### 6.2 Test scenario's
- [ ] Compleet invullen → submit
- [ ] Halverwege stoppen → refresh → data behouden
- [ ] Verplichte velden leeg laten → error tonen
- [ ] Template selecteren → visuele feedback
- [ ] Prijsberekening checken

### 6.3 Mobile test
- [ ] Responsieve layout
- [ ] Touch vriendelijk
- [ ] Keyboard navigatie

---

## STAP 7: DEPLOYMENT (10 min)

### 7.1 Commit & push
```bash
cd C:\Users\power\clawd\powerlink
git add .
git commit -m "Add multi-step intake form v1.0"
git push origin main
```

### 7.2 Netlify check
- Wacht op deploy (30 sec)
- Test live formulier
- Check Netlify Forms dashboard

---

## DELIVERABLES

Na uitvoering moet je hebben:
1. ✅ Nieuw formulier in index.html (vervangt oude)
2. ✅ 5 werkende stappen met navigatie
3. ✅ Progress indicator
4. ✅ localStorage functionaliteit
5. ✅ Tier + prijsberekening
6. ✅ Template selectie met afbeeldingen
7. ✅ Netlify Forms integratie
8. ✅ Mobile responsive
9. ✅ Backup van oude versie
10. ✅ Git commit & push

---

## RAPPORTAGE NA AFRONDING

Stuur samenvatting:
```
✅ FORMULIER GEBOUW
- 5 stappen werkend
- LocalStorage: ja
- Validatie: ja
- Prijsberekening: ja
- Mobile: ja
- Live op: floatweb.nl

[Test het zelf: link naar formulier]

Eventuele issues:
- [lijst als er problemen zijn]
```

---

## BESLISSINGSMOMENTEN (autonoom handelen)

| Situatie | Actie |
|----------|-------|
| Template screenshots ontbreken | Gebruik placeholders, rapporteer |
| CSS conflicten met bestaande | Oplossen, consistent houden |
| JavaScript errors | Debuggen, console checken |
| Netlify Forms werkt niet | Fallback naar Formspree of email |
| Mobile layout breekt | Media queries aanpassen |
| Gebruiker wil tussentijds wijziging | Noteren voor volgende iteratie |

---

**START MET STAP 1**

Geen vragen stellen. Gewoon beginnen. Rapporteer als alles werkt.

---

*Prompt versie: 1.0*  
*Gemaakt door: ChiefOperator voor ChiefOperator*  
*Doel: Autonome executie*
