# Playwright Automation for Floatweb

## Installation ✅ COMPLETE

Playwright is installed and tested at:
`C:\Users\power\clawd\automation\playwright`

## Files Created

| File | Purpose |
|------|---------|
| `test-basic.js` | Basic functionality test |
| `vimexx-check.js` | Automated Vimexx login & domain check |

## How to Use

### 1. Run Basic Test
```powershell
cd C:\Users\power\clawd\automation\playwright
node test-basic.js
```

### 2. Run Vimexx Check
```powershell
cd C:\Users\power\clawd\automation\playwright
node vimexx-check.js
```

This will:
- Launch Chrome with persistent profile
- Login to Vimexx automatically
- Check floatweb.nl domain status
- Take screenshots for verification

### 3. Create New Scripts

Template:
```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launchPersistentContext(
    './profile-name',
    {
      headless: false,
      viewport: { width: 1920, height: 1080 }
    }
  );
  
  const page = await browser.newPage();
  
  // Your automation here
  await page.goto('https://example.com');
  
  await browser.close();
})();
```

## Key Features

✅ **Persistent Context** - Cookies/session saved between runs  
✅ **Headed Mode** - More stable than headless  
✅ **Human Delays** - Random waits to appear human  
✅ **Batch Operations** - Fill multiple fields at once  
✅ **Screenshots** - Visual verification of each step  

## Next Steps

1. Test Vimexx script
2. Create DNS update script
3. Create form automation scripts
4. Integrate with main workflow

## Troubleshooting

**Browser doesn't open:**
- Check if another Chrome instance is running
- Try closing all Chrome windows first

**Login fails:**
- Check credentials in script
- Take screenshot to see error

**Timeout errors:**
- Increase timeout values
- Check internet connection

## Success Metrics

- ✅ Playwright installed
- ✅ Basic test passed
- ⏳ Vimexx test pending
- ⏳ DNS automation pending
