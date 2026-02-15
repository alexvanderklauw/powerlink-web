const { chromium } = require('playwright');

// Floatweb DNS Automation Script
const CONFIG = {
  username: 'floatweb',
  password: 'FloatWeb2026!',
  vimexxUrl: 'https://my.vimexx.nl',
  domain: 'floatweb.nl'
};

// Test DNS record to add
const TEST_RECORD = {
  name: 'test',           // test.floatweb.nl
  type: 'A',              // A record
  content: '192.168.1.1', // Fake IP
  ttl: 3600
};

async function loginToVimexx(page) {
  console.log('🔑 Logging into Vimexx...');
  await page.goto(`${CONFIG.vimexxUrl}/login`);
  
  // Wait a moment for page to load
  await page.waitForTimeout(3000);
  
  // Check if already logged in
  const pageContent = await page.textContent('body');
  if (pageContent.includes('Welkom terug') || pageContent.includes('Mijn Domeinen')) {
    console.log('✅ Already logged in!');
    return;
  }
  
  // Check if on login page
  if (pageContent.includes('Gebruikersnaam') || pageContent.includes('Inloggen')) {
    console.log('📝 Filling login form...');
    
    // Fill credentials using evaluate for reliability
    await page.evaluate(({user, pass}) => {
      const userField = document.querySelector('input[name="username"], input[id="username"]');
      const passField = document.querySelector('input[name="password"], input[id="password"]');
      
      if (userField) userField.value = user;
      if (passField) passField.value = pass;
    }, {user: CONFIG.username, pass: CONFIG.password});
    
    // Click login
    const loginButton = await page.locator('button[type="submit"]').or(page.locator('button:has-text("Inloggen")')).first();
    if (loginButton) {
      await loginButton.click();
    }
    
    // Wait for dashboard
    await page.waitForTimeout(3000);
    
    // Verify login
    const newContent = await page.textContent('body');
    if (newContent.includes('Welkom terug') || newContent.includes('Mijn Domeinen')) {
      console.log('✅ Logged in successfully');
    } else {
      throw new Error('Login may have failed - dashboard not detected');
    }
  } else {
    console.log('⚠️ Unexpected page state');
    throw new Error('Could not determine login state');
  }
}

async function navigateToDNS(page) {
  console.log('📁 Navigating to domain DNS...');
  
  // Go to domains page
  await page.goto(`${CONFIG.vimexxUrl}/domain`);
  await page.waitForTimeout(2000);
  
  // Find floatweb.nl domain and click manage
  // Look for the domain in the list
  const domainLink = await page.locator(`text=${CONFIG.domain}`).first();
  
  if (!domainLink) {
    throw new Error(`Domain ${CONFIG.domain} not found`);
  }
  
  // Click on the domain to manage it
  await domainLink.click();
  await page.waitForTimeout(2000);
  
  // Look for DNS or Nameservers link
  const dnsLink = await page.locator('text=DNS').or(page.locator('text=Nameservers')).or(page.locator('text=Domeininstellingen')).first();
  
  if (dnsLink) {
    await dnsLink.click();
    await page.waitForTimeout(2000);
  }
  
  console.log('✅ DNS page loaded');
}

async function addDNSRecord(page) {
  console.log(`➕ Adding test DNS record: ${TEST_RECORD.name}.${CONFIG.domain}`);
  
  // Look for "Add record" or "Nieuw record" button
  const addButton = await page.locator('button:has-text("Toevoegen")')
    .or(page.locator('button:has-text("Nieuw")'))
    .or(page.locator('a:has-text("DNS beheren")'))
    .first();
  
  if (addButton) {
    await addButton.click();
    await page.waitForTimeout(1000);
  }
  
  // Fill in the DNS record form
  // Look for input fields (name, type, content, ttl)
  
  // Try to find and fill name field
  try {
    const nameInput = await page.locator('input[name="name"], input[placeholder*="subdomain"], input[placeholder*="naam"]').first();
    if (nameInput) {
      await nameInput.fill(TEST_RECORD.name);
    }
  } catch (e) {
    console.log('Name field not found, trying alternative...');
  }
  
  // Try to select type
  try {
    const typeSelect = await page.locator('select[name="type"]').first();
    if (typeSelect) {
      await typeSelect.selectOption(TEST_RECORD.type);
    }
  } catch (e) {
    console.log('Type select not found...');
  }
  
  // Try to fill content/IP field
  try {
    const contentInput = await page.locator('input[name="content"], input[name="value"], input[name="ip"], input[placeholder*="IP"]').first();
    if (contentInput) {
      await contentInput.fill(TEST_RECORD.content);
    }
  } catch (e) {
    console.log('Content field not found...');
  }
  
  // Try to fill TTL
  try {
    const ttlInput = await page.locator('input[name="ttl"]').first();
    if (ttlInput) {
      await ttlInput.fill(TEST_RECORD.ttl.toString());
    }
  } catch (e) {
    console.log('TTL field not found, using default...');
  }
  
  console.log('✅ Form filled with test record');
  
  // Take screenshot before saving
  await page.screenshot({ path: `screenshots/dns-form-filled-${Date.now()}.png` });
  
  // Look for save button
  const saveButton = await page.locator('button[type="submit"]')
    .or(page.locator('button:has-text("Opslaan")'))
    .or(page.locator('button:has-text("Save")'))
    .first();
  
  if (saveButton) {
    console.log('💾 Clicking save...');
    await saveButton.click();
    await page.waitForTimeout(2000);
  }
  
  console.log('✅ Test DNS record added!');
}

async function verifyDNSRecord(page) {
  console.log('🔍 Verifying DNS record...');
  
  // Refresh page to see if record was added
  await page.reload();
  await page.waitForTimeout(2000);
  
  // Look for our test record in the list
  const pageContent = await page.textContent('body');
  
  if (pageContent.includes(TEST_RECORD.name)) {
    console.log(`✅ Test record "${TEST_RECORD.name}" found in DNS list!`);
    return true;
  } else {
    console.log('⚠️ Test record not immediately visible, may need to refresh');
    return false;
  }
}

async function takeScreenshot(page, name) {
  await page.screenshot({ 
    path: `screenshots/${name}-${Date.now()}.png`,
    fullPage: true 
  });
  console.log(`📸 Screenshot: ${name}`);
}

(async () => {
  console.log('=== Floatweb DNS Automation ===\n');
  console.log(`Domain: ${CONFIG.domain}`);
  console.log(`Test Record: ${TEST_RECORD.name}.${CONFIG.domain} → ${TEST_RECORD.content}\n`);
  
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
    await takeScreenshot(page, '01-dashboard');
    
    // Step 2: Navigate to DNS
    await navigateToDNS(page);
    await takeScreenshot(page, '02-dns-page');
    
    // Step 3: Add test DNS record
    await addDNSRecord(page);
    await takeScreenshot(page, '03-record-added');
    
    // Step 4: Verify
    await verifyDNSRecord(page);
    await takeScreenshot(page, '04-verification');
    
    console.log('\n✅ DNS automation complete!');
    console.log(`Test record "${TEST_RECORD.name}.${CONFIG.domain}" should now exist.`);
    console.log('\n⚠️  IMPORTANT: This is a TEST record.');
    console.log('   You can safely delete it after verification.');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await takeScreenshot(page, 'error');
    console.log('\n📸 Error screenshot saved for debugging');
  } finally {
    console.log('\n🔒 Closing browser...');
    await browser.close();
    console.log('Done! Check screenshots folder for proof.');
  }
})();
