---
layout: base
title: Checkout
permalink: /subscription/checkout
search_exclude: true
menu: nav/home.html
---

<div id="checkout-container" class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto">
    
    <!-- Loading State -->
    <div id="loading-state" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
      <p class="text-gray-400">Loading...</p>
    </div>
    
    <!-- Checkout Content -->
    <div id="checkout-content" class="hidden">
      <!-- Back Button -->
      <a href="{{site.baseurl}}/pricing" class="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Plans
      </a>
      
      <!-- Order Summary -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <h2 class="text-xl font-bold text-white mb-4">Order Summary</h2>
        <div class="flex items-center justify-between py-4 border-b border-gray-700">
          <div>
            <p id="plan-name" class="text-white font-semibold">Plus Plan</p>
            <p id="billing-type" class="text-gray-400 text-sm">Monthly billing</p>
          </div>
          <p id="plan-price" class="text-2xl font-bold text-white">$4.99</p>
        </div>
        <div class="flex items-center justify-between pt-4">
          <p class="text-gray-400">Total Due Now</p>
          <p id="total-price" class="text-2xl font-bold text-green-400">$4.99</p>
        </div>
      </div>

      <!-- Payment Method Selector -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <h2 class="text-xl font-bold text-white mb-4">Payment Method</h2>
        <div class="grid grid-cols-2 gap-3">
          <button id="tab-stripe" onclick="selectPaymentMethod('stripe')" class="payment-tab py-4 px-4 rounded-xl border-2 border-green-500 bg-green-500/10 text-white font-semibold transition-all duration-300 flex flex-col items-center">
            <svg class="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
            </svg>
            <span>Credit Card</span>
            <span class="text-xs text-green-400 mt-1">Instant Access</span>
          </button>
          <button id="tab-zelle" onclick="selectPaymentMethod('zelle')" class="payment-tab py-4 px-4 rounded-xl border-2 border-gray-600 bg-transparent text-gray-400 font-semibold transition-all duration-300 flex flex-col items-center hover:border-gray-500 hover:text-gray-300">
            <svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Zelle</span>
            <span class="text-xs text-gray-500 mt-1">Manual Verification</span>
          </button>
        </div>
      </div>

      <!-- Stripe Payment Section -->
      <div id="stripe-section" class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Pay with Card</h2>
            <p class="text-gray-400 text-sm">Secure payment via Stripe</p>
          </div>
        </div>
        
        <div class="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <div>
              <p class="text-green-400 font-semibold text-sm">Instant Activation</p>
              <p class="text-green-200/70 text-sm mt-1">Your subscription will be activated immediately after payment</p>
            </div>
          </div>
        </div>

        <div class="space-y-3 mb-6 text-gray-400 text-sm">
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Secure 256-bit SSL encryption
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            All major cards accepted (Visa, Mastercard, Amex)
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Cancel anytime from your profile
          </p>
        </div>
        
        <button id="stripe-checkout-btn" onclick="initiateStripeCheckout()"
          class="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
          <span id="stripe-btn-text">Pay with Card</span>
          <span id="stripe-btn-loading" class="hidden">
            <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        </button>

        <div class="flex items-center justify-center mt-4 space-x-4">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" class="h-6 opacity-60">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" class="h-6 opacity-60">
          <svg class="h-6 w-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.854.803 1.329 1.418 1.613.631.292.843.479.84.74-.004.4-.504.583-.969.583-.647 0-.99-.089-1.524-.31l-.208-.095-.227 1.332c.378.166 1.079.31 1.806.317 1.7 0 2.806-.797 2.82-2.032.006-.677-.424-1.193-1.353-1.617-.563-.275-.908-.459-.904-.738 0-.247.292-.511.922-.511a2.93 2.93 0 0 1 1.213.228l.145.068.22-1.29zm4.155-.148h-1.25c-.389 0-.679.106-.85.495l-2.404 5.445h1.701l.341-.893 2.073.002c.049.209.199.891.199.891h1.502l-1.312-5.94zm-1.896 3.84c.133-.34.643-1.649.643-1.649-.009.015.133-.344.214-.567l.11.512.373 1.704h-1.34z"/>
          </svg>
          <span class="text-gray-500 text-xs">Powered by Stripe</span>
        </div>
      </div>
      
      <!-- Zelle Payment Instructions (Hidden by default) -->
      <div id="zelle-section" class="hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Pay with Zelle</h2>
            <p class="text-gray-400 text-sm">Fast & secure bank transfer</p>
          </div>
        </div>
        
        <div class="bg-gray-700/50 rounded-xl p-4 mb-4">
          <p class="text-gray-300 text-sm mb-3">Send payment to:</p>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div>
                <p class="text-gray-400 text-xs">Phone Number</p>
                <p class="text-white font-mono font-semibold">858-205-9428</p>
              </div>
              <button onclick="copyToClipboard('858-205-9428', this)" class="text-green-400 hover:text-green-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
            
            <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div>
                <p class="text-gray-400 text-xs">Email</p>
                <p class="text-white font-mono font-semibold">ahaanvk@gmail.com</p>
              </div>
              <button onclick="copyToClipboard('ahaanvk@gmail.com', this)" class="text-green-400 hover:text-green-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p class="text-yellow-400 font-semibold text-sm">Important: Include Your Username</p>
              <p class="text-yellow-200/70 text-sm mt-1">In the Zelle memo/note, include your username: <span id="user-username" class="font-mono font-bold text-yellow-300">[loading...]</span></p>
            </div>
          </div>
        </div>
        
        <div class="text-gray-400 text-sm space-y-2">
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Open your bank app and select Zelle
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Send <span id="amount-instruction" class="font-semibold text-white mx-1">$4.99</span> to the number or email above
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Include your username in the memo
          </p>
          <p class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Click "I've Sent Payment" below
          </p>
        </div>
      
        <!-- Zelle Confirmation Form -->
        <div class="mt-6 pt-6 border-t border-gray-700">
          <h3 class="text-lg font-bold text-white mb-4">Confirm Your Payment</h3>
          
          <form id="payment-form">
            <div class="mb-4">
              <label for="zelle-name" class="block text-gray-300 text-sm font-medium mb-2">Name Used on Zelle</label>
              <input type="text" id="zelle-name" placeholder="John Doe" required
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors">
            </div>
            
            <div class="mb-4">
              <label for="zelle-email" class="block text-gray-300 text-sm font-medium mb-2">Your Email (for confirmation)</label>
              <input type="email" id="zelle-email" placeholder="john@example.com" required
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors">
            </div>
            
            <div class="mb-6">
              <label class="flex items-start cursor-pointer">
                <input type="checkbox" id="payment-sent" required class="mt-1 mr-3 h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500">
                <span class="text-gray-400 text-sm">
                  I confirm I have sent <span id="confirm-amount" class="font-semibold text-white">$4.99</span> via Zelle with my username in the memo
                </span>
              </label>
            </div>
            
            <button type="submit" id="submit-btn"
              class="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
              <span id="btn-text">I've Sent Payment</span>
              <span id="btn-loading" class="hidden">
                <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </button>
          </form>
          
          <p class="text-gray-500 text-xs text-center mt-4">
            Your subscription will be activated within 24 hours after payment verification
          </p>
        </div>
      </div>
    </div>
    
    <!-- Pending State -->
    <div id="pending-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Payment Submitted!</h2>
      <p class="text-gray-400 mb-2">Your payment is being verified.</p>
      <p class="text-gray-500 text-sm mb-8">You'll receive access within 24 hours once confirmed.</p>
      <a href="{{site.baseurl}}/subscription/manage" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold transition-all duration-300 hover:from-gray-700 hover:to-gray-800 mr-3">
        Check Status
      </a>
      <a href="{{site.baseurl}}/" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
        Go Home
      </a>
    </div>
    
    <!-- Error State -->
    <div id="error-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Something Went Wrong</h2>
      <p id="error-message" class="text-gray-400 mb-8">Please try again or contact support.</p>
      <a href="{{site.baseurl}}/pricing" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
        Try Again
      </a>
    </div>
    
    <!-- Not Logged In State -->
    <div id="login-state" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Login Required</h2>
      <p class="text-gray-400 mb-8">Please login to upgrade your subscription.</p>
      <a href="{{site.baseurl}}/login" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700">
        Login
      </a>
    </div>
  </div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  // Pricing
  const PRICES = {
    monthly: { plus: 4.99, pro: 9.99 },
    yearly: { plus: 47.88, pro: 95.88 }
  };
  
  // Get URL params
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan') || 'plus';
  const billing = urlParams.get('billing') || 'monthly';
  
  // Elements
  const loadingState = document.getElementById('loading-state');
  const checkoutContent = document.getElementById('checkout-content');
  const pendingState = document.getElementById('pending-state');
  const errorState = document.getElementById('error-state');
  const loginState = document.getElementById('login-state');
  const stripeSection = document.getElementById('stripe-section');
  const zelleSection = document.getElementById('zelle-section');
  
  let currentUser = null;
  let currentPaymentMethod = 'stripe'; // Default to stripe for instant access
  
  // Payment method selection
  window.selectPaymentMethod = function(method) {
    currentPaymentMethod = method;
    
    // Update tab styles
    const stripeTab = document.getElementById('tab-stripe');
    const zelleTab = document.getElementById('tab-zelle');
    
    if (method === 'stripe') {
      stripeTab.classList.add('border-green-500', 'bg-green-500/10', 'text-white');
      stripeTab.classList.remove('border-gray-600', 'bg-transparent', 'text-gray-400');
      zelleTab.classList.remove('border-green-500', 'bg-green-500/10', 'text-white');
      zelleTab.classList.add('border-gray-600', 'bg-transparent', 'text-gray-400');
      stripeSection.classList.remove('hidden');
      zelleSection.classList.add('hidden');
    } else {
      zelleTab.classList.add('border-green-500', 'bg-green-500/10', 'text-white');
      zelleTab.classList.remove('border-gray-600', 'bg-transparent', 'text-gray-400');
      stripeTab.classList.remove('border-green-500', 'bg-green-500/10', 'text-white');
      stripeTab.classList.add('border-gray-600', 'bg-transparent', 'text-gray-400');
      zelleSection.classList.remove('hidden');
      stripeSection.classList.add('hidden');
    }
  };
  
  // Stripe checkout
  window.initiateStripeCheckout = async function() {
    const btn = document.getElementById('stripe-checkout-btn');
    const btnText = document.getElementById('stripe-btn-text');
    const btnLoading = document.getElementById('stripe-btn-loading');
    
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    
    try {
      const baseUrl = pythonURI.endsWith('/') ? pythonURI.slice(0, -1) : pythonURI;
      const response = await fetch(`${baseUrl}/api/stripe/create-checkout-session`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({
          plan: plan,
          billing_interval: billing,
          success_url: `${window.location.origin}{{site.baseurl}}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}{{site.baseurl}}/subscription/cancel`
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      
      const data = await response.json();
      
      // Redirect to Stripe Checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error('No checkout URL returned');
      }
      
    } catch (error) {
      console.error('Stripe checkout error:', error);
      showError(error.message);
      btn.disabled = false;
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
    }
  };
  
  // Copy to clipboard
  window.copyToClipboard = function(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
      setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
    });
  };
  
  // Initialize
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Check login
      const baseUrl = pythonURI.endsWith('/') ? pythonURI.slice(0, -1) : pythonURI;
      const userResponse = await fetch(`${baseUrl}/api/user`, fetchOptions);
      if (!userResponse.ok) {
        loadingState.classList.add('hidden');
        loginState.classList.remove('hidden');
        return;
      }
      
      currentUser = await userResponse.json();
      
      // Setup UI
      setupOrderSummary();
      setupZelleForm();
      
      // Default to Stripe method
      selectPaymentMethod('stripe');
      
      loadingState.classList.add('hidden');
      checkoutContent.classList.remove('hidden');
      
    } catch (error) {
      console.error('Init error:', error);
      showError('Failed to load. Please refresh.');
    }
  });
  
  function setupOrderSummary() {
    const price = PRICES[billing][plan];
    const planDisplay = plan.charAt(0).toUpperCase() + plan.slice(1);
    
    document.getElementById('plan-name').textContent = `${planDisplay} Plan`;
    document.getElementById('billing-type').textContent = billing === 'yearly' ? 'Yearly billing (20% off)' : 'Monthly billing';
    document.getElementById('plan-price').textContent = `$${price.toFixed(2)}`;
    document.getElementById('total-price').textContent = `$${price.toFixed(2)}`;
    document.getElementById('amount-instruction').textContent = `$${price.toFixed(2)}`;
    document.getElementById('confirm-amount').textContent = `$${price.toFixed(2)}`;
    document.getElementById('user-username').textContent = currentUser.uid || currentUser.name || '[your username]';
  }
  
  function setupZelleForm() {
    const form = document.getElementById('payment-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    
    // Pre-fill email if available
    if (currentUser.email) {
      document.getElementById('zelle-email').value = currentUser.email;
    }
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      submitBtn.disabled = true;
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      
      try {
        const baseUrl = pythonURI.endsWith('/') ? pythonURI.slice(0, -1) : pythonURI;
        const response = await fetch(`${baseUrl}/api/subscription/request`, {
          ...fetchOptions,
          method: 'POST',
          body: JSON.stringify({
            plan: plan,
            billing_interval: billing,
            zelle_name: document.getElementById('zelle-name').value,
            email: document.getElementById('zelle-email').value,
            amount: PRICES[billing][plan]
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit request');
        }
        
        // Show pending state
        checkoutContent.classList.add('hidden');
        pendingState.classList.remove('hidden');
        
      } catch (error) {
        console.error('Submit error:', error);
        showError(error.message);
      }
    });
  }
  
  function showError(message) {
    loadingState.classList.add('hidden');
    checkoutContent.classList.add('hidden');
    pendingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
  }
</script>
