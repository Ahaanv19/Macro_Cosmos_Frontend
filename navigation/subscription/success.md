---
layout: base
title: Payment Successful
permalink: /subscription/success
search_exclude: true
menu: nav/home.html
---

<div id="success-container" class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto">
    
    <!-- Loading State -->
    <div id="loading-state" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
      <p class="text-gray-400">Verifying your payment...</p>
    </div>
    
    <!-- Success State -->
    <div id="success-state" class="hidden text-center py-10">
      <!-- Animated Success Icon -->
      <div class="relative mb-8">
        <div class="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div class="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
        <!-- Confetti Animation -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="confetti"></div>
        </div>
      </div>
      
      <h1 class="text-4xl font-bold text-white mb-4">Payment Successful! 🎉</h1>
      <p class="text-gray-400 text-lg mb-2">Welcome to <span id="plan-name" class="text-green-400 font-semibold">Plus</span>!</p>
      <p class="text-gray-500 mb-8">Your subscription is now active and you have full access to all features.</p>
      
      <!-- Subscription Details Card -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8 text-left">
        <h2 class="text-lg font-bold text-white mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Subscription Details
        </h2>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-400">Plan</span>
            <span id="detail-plan" class="text-white font-semibold">Plus</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Billing</span>
            <span id="detail-billing" class="text-white">Monthly</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Amount Paid</span>
            <span id="detail-amount" class="text-green-400 font-semibold">$4.99</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Next Billing Date</span>
            <span id="detail-next-billing" class="text-white">-</span>
          </div>
        </div>
      </div>
      
      <!-- What's Next -->
      <div class="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-6 border border-green-500/30 mb-8 text-left">
        <h2 class="text-lg font-bold text-white mb-4">What's Next?</h2>
        <ul class="space-y-3">
          <li class="flex items-start text-gray-300">
            <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Start using <strong class="text-white">unlimited route planning</strong></span>
          </li>
          <li class="flex items-start text-gray-300">
            <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Save your <strong class="text-white">favorite locations</strong></span>
          </li>
          <li class="flex items-start text-gray-300">
            <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Set up your <strong class="text-white">daily routine planner</strong></span>
          </li>
          <li class="flex items-start text-gray-300">
            <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Report <strong class="text-white">traffic incidents</strong> to help the community</span>
          </li>
        </ul>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="{{site.baseurl}}/" class="py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30">
          Start Exploring
        </a>
        <a href="{{site.baseurl}}/subscription/manage" class="py-3 px-8 rounded-xl bg-gray-700 text-white font-semibold transition-all duration-300 hover:bg-gray-600">
          Manage Subscription
        </a>
      </div>
      
      <!-- Receipt Info -->
      <p class="text-gray-500 text-sm mt-8">
        A receipt has been sent to your email address.
      </p>
    </div>
    
    <!-- Error State -->
    <div id="error-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Verification Failed</h2>
      <p id="error-message" class="text-gray-400 mb-8">We couldn't verify your payment. Please contact support if you were charged.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="{{site.baseurl}}/pricing" class="py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
          Try Again
        </a>
        <a href="{{site.baseurl}}/subscription/manage" class="py-3 px-8 rounded-xl bg-gray-700 text-white font-semibold transition-all duration-300 hover:bg-gray-600">
          Check Status
        </a>
      </div>
    </div>
    
    <!-- Not Logged In State -->
    <div id="login-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Login Required</h2>
      <p class="text-gray-400 mb-8">Please login to verify your subscription.</p>
      <a href="{{site.baseurl}}/login" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
        Login
      </a>
    </div>
  </div>
</div>

<style>
  @keyframes confetti-fall {
    0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  
  .confetti::before, .confetti::after {
    content: '🎉';
    position: absolute;
    font-size: 2rem;
    animation: confetti-fall 3s ease-out forwards;
  }
  
  .confetti::before {
    left: 20%;
    animation-delay: 0.2s;
  }
  
  .confetti::after {
    right: 20%;
    animation-delay: 0.5s;
  }
</style>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  // Elements
  const loadingState = document.getElementById('loading-state');
  const successState = document.getElementById('success-state');
  const errorState = document.getElementById('error-state');
  const loginState = document.getElementById('login-state');
  
  // Get session ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  // Initialize
  document.addEventListener('DOMContentLoaded', async () => {
    if (!sessionId) {
      showError('No session ID provided. Please complete checkout first.');
      redirectToPricing(5);
      return;
    }
    
    try {
      // Verify the Stripe session and activate subscription (GET request with credentials)
      const baseUrl = pythonURI.endsWith('/') ? pythonURI.slice(0, -1) : pythonURI;
      const verifyResponse = await fetch(`${baseUrl}/api/stripe/verify?session_id=${sessionId}`, {
        ...fetchOptions,     // credentials + Authorization (PWA cookie fallback)
        method: 'GET'
      });
      
      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || 'Failed to verify payment');
      }
      
      const data = await verifyResponse.json();
      
      // Update UI with subscription details
      updateSuccessUI(data);
      
      // Show success state
      loadingState.classList.add('hidden');
      successState.classList.remove('hidden');
      
      // Redirect to pricing page after 5 seconds
      redirectToPricing(5);
      
    } catch (error) {
      console.error('Verification error:', error);
      showError(error.message);
      redirectToPricing(5);
    }
  });
  
  function updateSuccessUI(data) {
    // Get tier from subscription object
    const tier = data.subscription?.tier || data.tier || 'plus';
    const planName = tier.charAt(0).toUpperCase() + tier.slice(1);
    
    document.getElementById('plan-name').textContent = planName;
    document.getElementById('detail-plan').textContent = planName;
    
    // Update billing
    const billingInterval = data.subscription?.billing_interval || data.billing_interval || 'monthly';
    const billing = billingInterval === 'yearly' ? 'Yearly' : 'Monthly';
    document.getElementById('detail-billing').textContent = billing;
    
    // Update amount based on tier and billing
    const prices = {
      plus: { monthly: 4.99, yearly: 47.88 },
      pro: { monthly: 9.99, yearly: 95.88 }
    };
    const amount = prices[tier]?.[billingInterval] || 4.99;
    document.getElementById('detail-amount').textContent = `$${amount.toFixed(2)}`;
    
    // Update next billing date
    const expiresAt = data.subscription?.expires_at || data.expires_at;
    if (expiresAt) {
      const nextBilling = new Date(expiresAt);
      document.getElementById('detail-next-billing').textContent = nextBilling.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
  
  function showError(message) {
    loadingState.classList.add('hidden');
    successState.classList.add('hidden');
    errorState.classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
  }
  
  function redirectToPricing(seconds) {
    setTimeout(() => {
      window.location.href = '{{site.baseurl}}/pricing';
    }, seconds * 1000);
  }
</script>
