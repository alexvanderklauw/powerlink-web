# TOOLS.md - Local Notes

## Web Dev Service

### Templates
- `/templates/onepager/restaurant-template.html` - Restaurants/Cafes
- `/templates/onepager/salon-template.html` - Salons/Barbers
- More coming: shop-template, trade-template, bb-template

### Pricing
- Base: €250
- Premium (+booking): €350
- Domain setup: +€50
- SEO basics: +€30

### Hosting Options
1. **Netlify** - Free tier, drag-drop deploy
2. **Vercel** - Free tier, Git integration
3. **GitHub Pages** - Free, simple
4. **Cloudflare Pages** - Free, fast CDN

### Domain Registrars
- **Namecheap** - ~€10-15/year
- **Cloudflare** - Wholesale pricing

### Discovery Call Script
See `/business/outreach-scripts/initial-outreach.md`

## Moltbook
- Agent: ChiefOperator
- Profile: https://www.moltbook.com/u/ChiefOperator
- API Key: Stored in `memory/moltbook-credentials.json`

---

## Model Routing: Spawn vs Handle

**Rule of thumb:** If I can verify the result in <30 seconds, spawn to cheap model. If it needs my judgment or multi-turn reasoning, I handle it.

### 🟢 Spawn to Ollama (`ollama/kimi-k2.5:cloud`)
Use for single-turn, verifiable, parallelizable tasks — **cost: $0**

### 🔵 Spawn to Moonshot (`moonshot/kimi-k2.5`)
Use when sub-task needs **my reasoning quality** but I want parallelism — **cost: same as me, but concurrent**

**Example:** Building 3 website sections simultaneously:
```javascript
// Main architecture → Me (moonshot)
// 3 content sections → Spawn(moonshot) × 3 in parallel
// Each gets full reasoning, all run concurrently
// I merge results when done
```

**When to spawn main model:**
- Complex parallel work (3+ creative tasks at once)
- Customer-facing content that needs my tone
- Tasks where quality cannot be verified simply
- When Ollama fails twice — escalate to moonshot

**Cost:** Same as doing it myself, but time savings from parallelism.

---

### 🟢 Spawn to Ollama (`ollama/kimi-k2.5:cloud`)
Use for single-turn, verifiable, parallelizable tasks — **cost: $0**:

| Task Type | Example | Why Spawn |
|-----------|---------|-----------|
| **Summarization** | "Summarize this 5-page article" | One input, one output, easily verified |
| **Data extraction** | "Extract all URLs from this HTML" | Deterministic, testable result |
| **Formatting** | "Convert this CSV to JSON" | Structure in → structure out |
| **URL checking** | "Check if these 10 links return 200" | Parallelizable, binary results |
| **Bulk renaming** | "Rename these files to kebab-case" | Pattern-based, no judgment needed |
| **Translation** | "Translate this Dutch text to English" | Straightforward conversion |
| **Code linting** | "Check this CSS for syntax errors" | Rules-based verification |

**Cost:** ~$0, ~2-5s latency, 128k context
**Spawn format:** `sessions_spawn(task, model="ollama/kimi-k2.5:cloud")`

### 🔵 Handle on Moonshot (`moonshot/kimi-k2.5`)
Use for tasks requiring my judgment, context, or multi-turn reasoning:

| Task Type | Example | Why Handle |
|-----------|---------|-----------|
| **Sales conversations** | Negotiating with prospect | Needs persuasion, objection handling |
| **Strategic decisions** | "Should we pivot to trades?" | Revenue impact, my call |
| **Customer complaints** | Responding to unhappy client | Relationship management, tone matters |
| **Creative direction** | "Is this design on-brand?" | Aesthetic judgment, no right answer |
| **Pricing strategy** | "Quote €280 or €300?" | Business decision, my responsibility |
| **Code architecture** | "Should we use React or vanilla JS?" | Trade-offs need explanation |
| **External communication** | Sending WhatsApp to prospect | Brand voice, can't be wrong |

**Cost:** ~$0.002/1K tokens, ~1-2s latency, 256k context
**Handle format:** I do it directly in main session

### 🟡 Yellow Zone — Decide Based on Context
| Task | Spawn If | Handle If |
|------|----------|-----------|
| **Draft email** | Template-based, routine follow-up | Custom pitch, new prospect |
| **Research** | "Find 5 competitors" (list) | "Analyze competitor strategy" (insights) |
| **Bug fix** | Clear reproduction steps | Ambiguous error, needs debugging |
| **Content generation** | Boilerplate (privacy policy, TOS) | Marketing copy (brand voice) |

### Quick Decision Tree
```
START
  │
  ▼
Can the result be verified 
in under 30 seconds?    ──NO──▶  🔵 HANDLE
(eyeball, spot-check, grep)           (moonshot)
  │
 YES
  │
  ▼
Is it customer-facing    ──YES──▶  🔵 HANDLE
or brand-critical?                    (moonshot)
  │
  NO
  │
  ▼
Does it need multi-turn  ──YES──▶  🔵 HANDLE
reasoning or context?                 (moonshot)
  │
  NO
  │
  ▼
        🟢 SPAWN
    (ollama/kimi-k2.5:cloud)
```

### Hybrid Approach: Spawn-Extract-Analyze (For Large Content)

**When to use:** Input content >30K tokens (large research, bulk data, multiple documents)

**The Pattern:**
```
Step 1: Spawn to Ollama → Extract structured data from raw content
Step 2: Receive compressed output (~10-20% of original size)
Step 3: I analyze the structured data on Moonshot
```

**Token Economics:**
| Content Size | Approach | Cost | Savings |
|--------------|----------|------|---------|
| <10K tokens | Direct (30-sec rule) | Baseline | — |
| 10K-30K tokens | Either works | Marginal | ~20-40% |
| >30K tokens | Hybrid (extract → analyze) | 10-15% of baseline | **85-90%** |

**Example:**
- **Task:** Analyze 20 competitor websites
- **Raw:** 80K tokens HTML → me → **$0.16**
- **Hybrid:** Spawn Ollama extract → receive 4K table → I analyze → **$0.008**
- **Result:** 94% cheaper, same quality output

**Cost Reality Check:**
- Spawn setup: $0 (local Ollama)
- Time cost: +2-3s latency for spawn initialization
- Token savings: All yours

**Decision Rule:**
```
Input tokens > 30K?  → Use hybrid approach
Input tokens < 10K?  → 30-second rule (handle directly)
In between?          → Your call or spawn for parallel speed
```

### Notification Standard
When spawning, I notify you:
```
🤖 DELEGATED | ollama/kimi-k2.5:cloud
Task: [Brief description]
Spawned: [Time] | ETA: [Time]
Will report when complete
```

For hybrid approach:
```
🤖 HYBRID | Extract → Analyze
Raw content: [size/description]
Extracting with: ollama/kimi-k2.5:cloud
Will analyze result on: moonshot/kimi-k2.5
ETA: [Time]
```

---

## Website Deployment Rules

### 🔴 ALWAYS Ask Before Push
**Any changes to:**
- Branding (logo, colors, tagline)
- Hero section (headline, subhead, CTA)
- Main value proposition or pricing claims
- Live customer websites

**Process:**
1. I draft changes locally
2. Show you preview/screenshot
3. You approve or request edits
4. Only then deploy to production

### Examples
| Change | Can I Auto-Deploy? |
|--------|-------------------|
| WhatsApp number update | 🟡 Yellow — notify, then deploy |
| Spelling fix in FAQ | 🟡 Yellow — notify, then deploy |
| New hero headline | 🔴 Red — ask first |
| Logo update | 🔴 Red — ask first |
| "48 hours" → "5 days" correction | 🔴 Red — ask first |
| Customer site: any change | 🔴 Red — ask first |
