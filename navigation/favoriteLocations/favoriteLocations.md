---
layout: base
title: Favorite Locations
hide: true
menu: nav/home.html
permalink: /favoriteLocations/
---

<head>
  <link rel="stylesheet" type="text/css" href="{{site.baseurl}}/navigation/favoriteLocations/favoriteLocations.css">
</head>

<style>
  .access-control-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }
  .access-control-card {
    text-align: center;
    padding: 48px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-radius: 24px;
    border: 1px solid #334155;
    max-width: 450px;
  }
  .access-control-card h2 {
    color: #f1f5f9;
    margin-bottom: 16px;
    font-size: 24px;
  }
  .access-control-card p {
    color: #94a3b8;
    margin-bottom: 12px;
  }
  .access-control-card .tier-info {
    color: #22c55e;
    font-weight: 600;
  }
  .lock-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #334155;
    border-top-color: #0a7cc2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .access-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 24px;
  }
  .upgrade-btn {
    padding: 14px 28px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s;
  }
  .upgrade-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
  }
  .back-btn {
    padding: 14px 28px;
    background: #334155;
    color: #f1f5f9;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s;
  }
  .back-btn:hover {
    background: #475569;
  }
</style>

<!-- Access Control: Loading/Denied States -->
<div id="access-loading" class="access-control-overlay">
  <div class="access-control-card">
    <div class="spinner"></div>
    <p>Checking subscription...</p>
  </div>
</div>

<div id="access-denied" class="access-control-overlay" style="display: none;">
  <div class="access-control-card">
    <div class="lock-icon">🔒</div>
    <h2>Premium Feature</h2>
    <p>Favorite Locations is available for <strong>Plus</strong> and <strong>Pro</strong> members.</p>
    <p class="tier-info">Upgrade to unlock this feature and more!</p>
    <div class="access-buttons">
      <a href="{{site.baseurl}}/pricing" class="upgrade-btn">Upgrade Now</a>
      <a href="{{site.baseurl}}/" class="back-btn">Go Home</a>
    </div>
  </div>
</div>

<!-- Main Content (hidden until access verified) -->
<div id="main-content" style="display: none;">
  <!-- Usage Display Header -->
  <div id="usage-header" class="usage-header" style="display: none;">
    <div class="usage-info">
      <span id="usage-display" class="usage-text"></span>
      <a href="{{site.baseurl}}/pricing" id="upgrade-link" class="upgrade-link" style="display: none;">Upgrade for more</a>
    </div>
  </div>
  <div id="locations-grid"></div>
  <button id="new-location-button" class="new-location-button">New</button>
</div>

<style>
  .usage-header {
    padding: 12px 20px;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-radius: 12px;
    border: 1px solid #334155;
  }
  .usage-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .usage-text {
    font-size: 14px;
    font-weight: 600;
  }
  .usage-text.text-green-400 { color: #4ade80; }
  .usage-text.text-yellow-400 { color: #facc15; }
  .usage-text.text-red-400 { color: #f87171; }
  .upgrade-link {
    font-size: 13px;
    color: #22c55e;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
  }
  .upgrade-link:hover {
    color: #4ade80;
    text-decoration: underline;
  }
</style>

<!-- Subscription Access Check (runs first) -->
<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  let currentTier = 'free';
  let locationLimit = 0;
  
  async function checkAccess() {
    try {
      // Check if user is logged in
      const userResponse = await fetch(`${pythonURI}/api/user`, fetchOptions);
      if (!userResponse.ok) {
        window.location.href = '{{site.baseurl}}/login';
        return;
      }
      
      const user = await userResponse.json();
      
      // Admins have full access
      if (user.role === 'Admin') {
        currentTier = 'admin';
        locationLimit = Infinity;
        showContent();
        return;
      }
      
      // Check subscription
      const subResponse = await fetch(`${pythonURI}/api/subscription`, fetchOptions);
      if (subResponse.ok) {
        const subscription = await subResponse.json();
        currentTier = subscription.tier || 'free';
        
        if (currentTier === 'plus') {
          locationLimit = 10;
          showContent();
          return;
        } else if (currentTier === 'pro') {
          locationLimit = Infinity;
          showContent();
          return;
        }
      }
      
      // Free tier - show access denied
      showAccessDenied();
      
    } catch (error) {
      console.error('Access check error:', error);
      showAccessDenied();
    }
  }
  
  function showContent() {
    document.getElementById('access-loading').style.display = 'none';
    document.getElementById('access-denied').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Show usage header
    document.getElementById('usage-header').style.display = 'block';
    
    // Load the main functionality and then update usage display
    import('{{site.baseurl}}/navigation/favoriteLocations/favoriteLocations.js').then(() => {
      // Wait a bit for locations to load, then update display
      setTimeout(updateUsageDisplay, 500);
    });
    
    // Store tier info globally for the usage display
    window.favoriteLocationsTier = currentTier;
    window.favoriteLocationsLimit = locationLimit;
  }
  
  function showAccessDenied() {
    document.getElementById('access-loading').style.display = 'none';
    document.getElementById('access-denied').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
  }
  
  // Update the usage display based on current locations count
  window.updateUsageDisplay = function() {
    const grid = document.getElementById('locations-grid');
    const usageDisplay = document.getElementById('usage-display');
    const upgradeLink = document.getElementById('upgrade-link');
    const tier = window.favoriteLocationsTier;
    const limit = window.favoriteLocationsLimit;
    
    // Count current locations
    const locationCount = grid ? grid.querySelectorAll('.location-square').length : 0;
    
    if (tier === 'admin' || tier === 'pro' || limit === Infinity) {
      usageDisplay.textContent = `📍 ${locationCount} locations saved • Unlimited`;
      usageDisplay.className = 'usage-text text-green-400';
      upgradeLink.style.display = 'none';
    } else if (tier === 'plus') {
      const remaining = limit - locationCount;
      const colorClass = remaining <= 2 ? 'text-red-400' : remaining <= 5 ? 'text-yellow-400' : 'text-green-400';
      usageDisplay.textContent = `📍 ${locationCount}/${limit} locations saved`;
      usageDisplay.className = `usage-text ${colorClass}`;
      
      if (remaining <= 3) {
        upgradeLink.style.display = 'inline';
        upgradeLink.textContent = remaining <= 0 ? 'Upgrade for unlimited' : 'Upgrade for unlimited';
      } else {
        upgradeLink.style.display = 'none';
      }
    }
  };
  
  checkAccess();
</script>
