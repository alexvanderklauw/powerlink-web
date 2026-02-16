# TOOLS.md - Local Notes

## Web Dev Service

### Business Model (Source of Truth)
**File:** `business/business-model.md`  
**Contains:** Tiers, pricing, customer scripts, objection handling, upgrade paths  
**Update rule:** Update immediately when website/pricing changes

### Templates
- `/templates/onepager/restaurant-template.html` - Restaurants/Cafes
- `/templates/onepager/salon-template.html` - Salons/Barbers
- More coming: shop-template, trade-template, bb-template

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

## Free Stock Photo Resources

### For Customer Websites

| Site | URL | Best For | License | Account Needed |
|------|-----|----------|---------|----------------|
| **Unsplash** | unsplash.com | Modern, diverse, high-quality photos | Free to use (Unsplash License) | Optional (for collections) |
| **Pexels** | pexels.com | Business, people, technology | Free to use (Pexels License) | Optional |
| **Pixabay** | pixabay.com | Illustrations, vectors, icons, video | Free to use (Pixabay License) | Optional |
| **Burst** | burst.shopify.com | E-commerce, business, lifestyle | Free to use (CC0) | No |
| **Freepik** | freepik.com | Vector graphics, PSD, icons | Free with attribution / Premium | Yes (for downloads) |

### Usage Guidelines:
- **Unsplash:** Great for hero images, authentic business photos
- **Pexels:** Excellent for people/business scenarios
- **Pixabay:** Best for icons, illustrations, vector graphics
- **Burst:** Perfect for e-commerce and product photos
- **Freepik:** Good for UI elements, icons, mockups (requires attribution on free tier)

### Download Strategy:
1. Search with specific terms (e.g., "restaurant interior", "professional headshot")
2. Check orientation (landscape for heroes, portrait for team)
3. Download highest resolution available
4. Rename to descriptive filename (e.g., `restaurant-hero-unsplash.jpg`)
5. Store in `/assets/images/[client-name]/`

### Chrome Access Status:
- ✅ Chrome running locally
- ⚠️ Sites have bot protection (manual download needed)
- 🔄 Can browse but not auto-download

### Brave Search API
- **API Key:** `BSAHX4obVplWJIZzblmbn-3gMzeWQQW` (stored in `.env`)
- **Status:** ⚠️ Gateway restart required to activate
- **Usage:** `web_search` tool for research
- **Setup:** Set `BRAVE_API_KEY` environment variable or restart OpenClaw gateway

---

## Browser Access

### Current Status
- **Chrome:** Running on host machine
- **Access:** Via OpenClaw gateway
- **Use cases:** Research, competitor analysis, stock photo browsing
- **Limitations:** Bot protection on some sites

### Setup Commands:
```bash
# Check status
openclaw browser status

# Start if needed
openclaw browser start
```

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

---

## Backup & Rollback Strategy

### Philosophy
**Never lose work. Never break production. Always have a way back.**

We use Git as primary backup system (branches + tags) with local release folders for major milestones.

### Directory Structure
```
clawd/
├── Powerfloat website/ ← WEBSITE: floatweb.nl + templates + backups
│   ├── index.html      ← Main site
│   ├── templates/      ← Customer templates
│   ├── releases/       ← Major version snapshots
│   └── .backup-log.json← Tracks backups
├── workspace/          ← ACTIVE: Work in feature branches only
└── memory/             ← Docs, credentials, daily notes
```

### Workflow: The 4-Step Safety Net

#### Step 1: Feature Branch (Always)
```bash
# Create feature branch before any changes
git checkout -b feature/new-hero-text

# Make changes, commit often
git add .
git commit -m "Draft: New hero text"
```

#### Step 2: Pre-Push Backup Tag (Mandatory)
```bash
# Before pushing to GitHub, create timestamped backup tag
git tag backup-2026-02-15-1730-hero-text
git push origin backup-2026-02-15-1730-hero-text

# Keep last 20 backup tags, delete old ones
git tag -l "backup-*" | sort | head -n -20 | xargs git tag -d
```

#### Step 3: Deploy to Preview (Optional)
```bash
# Push branch for preview (not main)
git push origin feature/new-hero-text
# Netlify deploy preview auto-generated
```

#### Step 4: Production Deploy (Approved Only)
```bash
# After you approve changes
git checkout main
git merge feature/new-hero-text
git tag release-v1.2-hero-update
git push origin main --tags

# Also copy to releases/ folder for local archive
copy workspace/ releases/v1.2-hero-update/
```

### Rollback Commands

| Scenario | Command |
|----------|---------|
| **Undo last commit** (not pushed) | `git reset --soft HEAD~1` |
| **Revert pushed commit** | `git revert <commit-hash>` |
| **Rollback to tag** | `git checkout backup-2026-02-15-1730` |
| **Rollback to release** | Copy `releases/v1.1/` → workspace/ |
| **Emergency: Reset to main** | `git checkout main; git reset --hard origin/main` |

### Backup Log Format (.backup-log.json)
```json
{
  "schema": "backup-log.v1",
  "maxBackups": 20,
  "backups": [
    {
      "tag": "backup-2026-02-15-1730",
      "branch": "feature/new-hero",
      "reason": "Pre-push safety",
      "created": "2026-02-15T17:30:00Z"
    }
  ],
  "releases": [
    {
      "version": "v1.2",
      "folder": "releases/v1.2-hero-update",
      "description": "New hero text + FAQ section",
      "deployed": "2026-02-15T18:00:00Z"
    }
  ]
}
```

### Checklist: Before Any Push

- [ ] Working on feature branch (not main)
- [ ] Created backup tag: `backup-YYYY-MM-DD-HHMM`
- [ ] Changes reviewed locally
- [ ] For customer sites: approval received from Chief
- [ ] For floatweb.nl: approval if branding/copy/hero changed
- [ ] Rollback plan known (which tag to revert to)

### Maintenance

**Weekly:** Review backup tags, delete old ones (keep last 20)
**Monthly:** Archive major releases to `releases/` folder
**Quarterly:** Clean `releases/` folder (keep last 10 major versions)
