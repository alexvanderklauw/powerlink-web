const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright test...');
  
  // Persistent context - key for stability
  const browser = await chromium.launchPersistentContext(
    './user-data',  // Profile directory
    {
      headless: false,  // Headed mode more stable
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  );
  
  console.log('Browser launched with persistent context');
  
  const page = await browser.newPage();
  
  // Test 1: Navigate to a simple page
  console.log('Navigating to example.com...');
  await page.goto('https://example.com');
  console.log('Page loaded successfully');
  
  // Test 2: Take screenshot
  await page.screenshot({ path: 'test-screenshot.png' });
  console.log('Screenshot saved');
  
  // Test 3: Extract text
  const title = await page.title();
  console.log('Page title:', title);
  
  // Test 4: Simulate human delay
  console.log('Waiting (human-like delay)...');
  await page.waitForTimeout(Math.random() * 2000 + 1000);
  
  console.log('All tests passed! Playwright is working.');
  
  await browser.close();
})();
