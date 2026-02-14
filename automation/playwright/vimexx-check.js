const { chromium } = require('playwright');

// Floatweb Vimexx Automation Script
const CONFIG = {
  username: 'floatweb',
  password: 'FloatWeb2026!',
  vimexxUrl: 'https://my.vimexx.nl',
  domain: 'floatweb.nl'
};

async function loginToVimexx(page) {
  console.log('Navigating to Vimexx login...');
  await page.goto(`${CONFIG.vimexxUrl}/login`);
  
  // Wait for login form
  await page.waitForSelector('input[name="username"]', { timeout: 10000 });
  
  // Fill credentials (batch operation for speed)
  await page.evaluate((user, pass) => {
    document.querySelector('input[name="username"]').value = user;
    document.querySelector('input[name="password"]').value = pass;
  }, CONFIG.username, CONFIG.password);
  
  console.log('Credentials filled');
  
  // Click login
  await page.click('button[type="submit"]');
  
  // Wait for dashboard
  await page.waitForSelector('text=Welkom terug', { timeout: 15000 });
  console.log('Logged in successfully');
}

async function checkDomainStatus(page) {
  console.log('Checking domain status...');
  await page.goto(`${CONFIG.vimexxUrl}/domain`);
  
  // Wait for domain list
  await page.waitForTimeout(2000);
  
  // Check if floatweb.nl is present
  const domainText = await page.textContent('body');
  if (domainText.includes(CONFIG.domain)) {
    console.log(`✅ Domain ${CONFIG.domain} found`);
    return true;
  } else {
    console.log(`❌ Domain ${CONFIG.domain} not found`);
    return false;
  }
}

async function takeScreenshot(page, name) {
  await page.screenshot({ 
    path: `screenshots/${name}-${Date.now()}.png`,
    fullPage: true 
  });
  console.log(`Screenshot saved: ${name}`);
}

(async () => {
  console.log('=== Floatweb Vimexx Automation ===\n');
  
  const browser = await chromium.launchPersistentContext(
    './vimexx-profile',
    {
      headless: false,
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  );
  
  const page = await browser.newPage();
  
  try {
    // Step 1: Login
    await loginToVimexx(page);
    await takeScreenshot(page, 'dashboard');
    
    // Step 2: Check domain
    const hasDomain = await checkDomainStatus(page);
    await takeScreenshot(page, 'domain-list');
    
    if (hasDomain) {
      console.log('\n✅ All checks passed!');
      console.log(`Domain ${CONFIG.domain} is registered and active.`);
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await takeScreenshot(page, 'error');
  } finally {
    console.log('\nClosing browser...');
    await browser.close();
    console.log('Done!');
  }
})();
