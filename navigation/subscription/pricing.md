---
layout: base
title: Choose Your Plan
permalink: /pricing
search_exclude: true
menu: nav/home.html
---

<style>
  #pricing-container .pricing-stage {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #0b1320 0%, #0f1d32 52%, #12304a 100%);
    border: 1px solid rgba(148, 163, 184, 0.12);
    box-shadow: 0 40px 70px -46px rgba(2, 6, 23, 0.68);
  }

  #pricing-container .pricing-stage::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top center, rgba(69, 176, 167, 0.18), transparent 26%),
      radial-gradient(circle at bottom left, rgba(197, 109, 36, 0.16), transparent 28%);
    pointer-events: none;
  }

  #pricing-container .pricing-stage > * {
    position: relative;
    z-index: 1;
  }

  #pricing-container .pricing-title,
  #pricing-container .pricing-card-title,
  #pricing-container .pricing-faq-title,
  #pricing-container summary,
  #pricing-container .subscription-title {
    color: #f8fafc;
  }

  #pricing-container .pricing-copy,
  #pricing-container .pricing-muted,
  #pricing-container .pricing-feature,
  #pricing-container .pricing-faq-copy,
  #pricing-container .pricing-subscription-copy {
    color: #cbd5e1;
  }

  #pricing-container .pricing-muted {
    color: #94a3b8;
  }

  #pricing-container .pricing-card {
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.82));
    border: 1px solid rgba(148, 163, 184, 0.14);
    box-shadow: 0 26px 40px -34px rgba(2, 6, 23, 0.75);
  }

  #pricing-container .pricing-card-popular {
    background: linear-gradient(180deg, rgba(17, 138, 136, 0.18), rgba(15, 23, 42, 0.86));
    border-color: rgba(74, 222, 128, 0.42);
  }

  #pricing-container .pricing-faq-card {
    background: rgba(15, 23, 42, 0.64);
    border: 1px solid rgba(148, 163, 184, 0.14);
    box-shadow: 0 20px 36px -30px rgba(2, 6, 23, 0.72);
  }

  #pricing-container summary {
    list-style: none;
  }

  #pricing-container summary::-webkit-details-marker {
    display: none;
  }

  .pricing-modal-card {
    background: linear-gradient(180deg, #0f172a, #111c2f);
    border: 1px solid rgba(148, 163, 184, 0.14);
    box-shadow: 0 30px 52px -34px rgba(2, 6, 23, 0.75);
  }
</style>

<div id="pricing-container" class="space-y-10">
  <section class="pricing-stage rounded-[2.75rem] px-6 py-10 sm:px-10 lg:px-12">
    <div class="flex justify-center">
      <div class="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2">
        <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="font-semibold text-yellow-300">Macro Cosmos Premium</span>
      </div>
    </div>

    <div class="mx-auto mt-8 max-w-3xl text-center">
      <h1 class="pricing-title text-4xl font-bold tracking-tight md:text-6xl">Choose The Plan That Fits Your Commute</h1>
      <p class="pricing-copy mx-auto mt-5 max-w-2xl text-lg leading-8">
        Upgrade only when you need more routing power. Every tier is designed around a clearer, more dependable California travel workflow.
      </p>
    </div>

    <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
      <span id="monthly-label" class="text-gray-300 font-medium">Monthly</span>
      <label class="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" id="billing-toggle" class="peer sr-only">
        <div class="h-7 w-14 rounded-full bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 peer peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']"></div>
      </label>
      <span id="yearly-label" class="text-gray-500 font-medium">Yearly</span>
      <span class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-300">Save 20%</span>
    </div>

    <div id="loading-state" class="flex items-center justify-center py-20">
      <div class="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
    </div>

    <div id="pricing-cards" class="hidden mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
      <div class="pricing-card rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1 hover:border-slate-500/40">
        <div class="mb-6 flex justify-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20">
            <svg class="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
        </div>

        <h3 class="pricing-card-title text-center text-2xl font-bold">Free</h3>
        <p class="pricing-muted mt-2 text-center text-sm">Get started with the essentials</p>

        <div class="mt-8 text-center">
          <span class="text-5xl font-bold text-white">$0</span>
          <span class="pricing-muted">/forever</span>
        </div>

        <ul class="mt-8 space-y-4">
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Find Best Route (<span class="ml-1 font-medium text-yellow-300">4 per day</span>)
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            View traffic incidents
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Browse local businesses
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            View community events
          </li>
          <li class="flex items-center text-slate-500">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="line-through">Daily Routine Planner</span>
          </li>
          <li class="flex items-center text-slate-500">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="line-through">Favorite Locations</span>
          </li>
          <li class="flex items-center text-slate-500">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="line-through">Report Traffic Incidents</span>
          </li>
        </ul>

        <button id="free-btn" class="mt-8 w-full rounded-2xl bg-gray-700 px-6 py-3 font-semibold text-gray-300 transition-all duration-300 hover:bg-gray-600">
          Current Plan
        </button>
      </div>

      <div class="pricing-card pricing-card-popular relative rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1 hover:border-green-400/60">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <span class="rounded-full bg-green-500 px-4 py-1 text-sm font-bold text-white">MOST POPULAR</span>
        </div>

        <div class="mb-6 mt-2 flex justify-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/20">
            <svg class="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>

        <h3 class="pricing-card-title text-center text-2xl font-bold">Plus</h3>
        <p class="pricing-muted mt-2 text-center text-sm">For daily commuters</p>

        <div class="mt-8 text-center">
          <span id="plus-price" class="text-5xl font-bold text-white">$4.99</span>
          <span id="plus-period" class="pricing-muted">/month</span>
        </div>

        <ul class="mt-8 space-y-4">
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Find Best Route (<span class="ml-1 font-medium text-green-300">50 routes/day</span>)
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Daily Routine Planner
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Save up to <span class="ml-1 font-medium text-green-300">10</span><span class="ml-1">Favorite Locations</span>
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Report Traffic Incidents
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            View traffic updates
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Browse local businesses
          </li>
          <li class="flex items-center text-slate-500">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span class="line-through">Unlimited routes & locations</span>
          </li>
        </ul>

        <button id="plus-btn" class="mt-8 w-full rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/50">
          Upgrade to Plus
        </button>
      </div>

      <div class="pricing-card rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1 hover:border-purple-400/40">
        <div class="mb-6 flex justify-center">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20">
            <svg class="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>

        <h3 class="pricing-card-title text-center text-2xl font-bold">Pro</h3>
        <p class="pricing-muted mt-2 text-center text-sm">For power users</p>

        <div class="mt-8 text-center">
          <span id="pro-price" class="text-5xl font-bold text-white">$9.99</span>
          <span id="pro-period" class="pricing-muted">/month</span>
        </div>

        <ul class="mt-8 space-y-4">
          <li class="pricing-feature flex items-center text-purple-300">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="font-medium text-purple-300">Everything in Plus</span>
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="font-medium text-green-300">Unlimited</span><span class="ml-1">routes per day</span>
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="font-medium text-green-300">Unlimited</span><span class="ml-1">Favorite Locations</span>
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Daily Routine Planner
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Report Traffic Incidents
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            All community features
          </li>
          <li class="pricing-feature flex items-center">
            <svg class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Priority support
          </li>
        </ul>

        <button id="pro-btn" class="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:from-purple-600 hover:to-purple-700 hover:shadow-purple-500/50">
          Upgrade to Pro
        </button>
      </div>
    </div>

    <div id="subscription-info" class="hidden mx-auto mt-12 max-w-2xl rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 class="subscription-title text-xl font-semibold">Your Current Subscription</h3>
      <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="pricing-subscription-copy">Plan: <span id="current-plan-name" class="font-semibold text-green-300">Free</span></p>
          <p class="pricing-muted text-sm" id="billing-info"></p>
        </div>
        <button id="manage-subscription-btn" class="rounded-xl bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600">
          Manage Subscription
        </button>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-3xl">
    <h2 class="pricing-faq-title mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
    <div class="space-y-4">
      <details class="pricing-faq-card cursor-pointer rounded-2xl p-5">
        <summary class="font-semibold">Can I cancel my subscription anytime?</summary>
        <p class="pricing-faq-copy mt-3">Yes. You can cancel at any time and keep access through the end of the current billing period.</p>
      </details>
      <details class="pricing-faq-card cursor-pointer rounded-2xl p-5">
        <summary class="font-semibold">How does billing work?</summary>
        <p class="pricing-faq-copy mt-3">You are charged at the start of each billing period. Choosing yearly billing keeps the same features and reduces the effective monthly cost.</p>
      </details>
      <details class="pricing-faq-card cursor-pointer rounded-2xl p-5">
        <summary class="font-semibold">What payment methods do you accept?</summary>
        <p class="pricing-faq-copy mt-3">We accept <strong class="text-blue-300">PayPal</strong> for instant activation and <strong class="text-purple-300">Zelle</strong> for bank transfers verified within 24 hours.</p>
      </details>
      <details class="pricing-faq-card cursor-pointer rounded-2xl p-5">
        <summary class="font-semibold">Can I upgrade or downgrade my plan?</summary>
        <p class="pricing-faq-copy mt-3">Yes. Upgrades apply immediately through checkout, and downgrades take effect at the next billing cycle.</p>
      </details>
    </div>
  </section>
</div>

<div id="login-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 backdrop-blur-sm">
  <div class="pricing-modal-card mx-4 w-full max-w-md rounded-[1.75rem] p-8">
    <div class="text-center">
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20">
        <svg class="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      </div>
      <h3 class="subscription-title text-xl font-bold">Login Required</h3>
      <p class="pricing-muted mt-2 mb-6">Please log in before changing subscription plans.</p>
      <div class="flex gap-4">
        <button id="modal-close-btn" class="flex-1 rounded-xl bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600">
          Cancel
        </button>
        <a href="{{site.baseurl}}/login" class="flex-1 rounded-xl bg-green-500 px-4 py-2 text-center text-white transition-colors hover:bg-green-600">
          Login
        </a>
      </div>
    </div>
  </div>
</div>

<script type="module">
import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

// Pricing configuration
const PRICES = {
  monthly: {
    plus: 4.99,
    pro: 9.99
  },
  yearly: {
    plus: 47.88,  // $3.99/month
    pro: 95.88    // $7.99/month
  }
};

// DOM Elements
const billingToggle = document.getElementById('billing-toggle');
const monthlyLabel = document.getElementById('monthly-label');
const yearlyLabel = document.getElementById('yearly-label');
const plusPrice = document.getElementById('plus-price');
const plusPeriod = document.getElementById('plus-period');
const proPrice = document.getElementById('pro-price');
const proPeriod = document.getElementById('pro-period');
const loadingState = document.getElementById('loading-state');
const pricingCards = document.getElementById('pricing-cards');
const subscriptionInfo = document.getElementById('subscription-info');
const loginModal = document.getElementById('login-modal');

let currentUser = null;
let currentSubscription = null;
let isYearly = false;

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  await loadUserAndSubscription();
  setupEventListeners();
});

// Load user and subscription data
async function loadUserAndSubscription() {
  try {
    // Check if user is logged in
    const userResponse = await fetch(`${pythonURI}/api/user`, fetchOptions);
    
    if (userResponse.ok) {
      currentUser = await userResponse.json();
      
      // Fetch subscription status
      try {
        const subResponse = await fetch(`${pythonURI}/api/subscription`, fetchOptions);
        if (subResponse.ok) {
          currentSubscription = await subResponse.json();
        }
      } catch (e) {
        console.log('No subscription data available');
      }
    }
  } catch (error) {
    console.log('User not logged in');
  }
  
  // Show pricing cards
  loadingState.classList.add('hidden');
  pricingCards.classList.remove('hidden');
  
  // Update UI based on subscription
  updateUIForSubscription();
}

// Update UI based on current subscription
function updateUIForSubscription() {
  const freeBtn = document.getElementById('free-btn');
  const plusBtn = document.getElementById('plus-btn');
  const proBtn = document.getElementById('pro-btn');
  
  // Reset buttons
  freeBtn.textContent = 'Current Plan';
  freeBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
  freeBtn.classList.add('bg-gray-700', 'hover:bg-gray-600');
  
  plusBtn.textContent = 'Upgrade to Plus';
  proBtn.textContent = 'Upgrade to Pro';
  
  if (currentUser && currentUser.role === 'Admin') {
    // Admins have full access
    subscriptionInfo.classList.remove('hidden');
    document.getElementById('current-plan-name').textContent = 'Admin (Full Access)';
    document.getElementById('billing-info').textContent = 'You have full access to all features as an admin.';
    document.getElementById('manage-subscription-btn').classList.add('hidden');
    
    freeBtn.textContent = 'Admin Access';
    plusBtn.textContent = 'Admin Access';
    proBtn.textContent = 'Admin Access';
    return;
  }
  
  if (!currentSubscription || currentSubscription.tier === 'free') {
    // Free tier - already set by default
    return;
  }
  
  // Show subscription info
  subscriptionInfo.classList.remove('hidden');
  
  if (currentSubscription.tier === 'plus') {
    document.getElementById('current-plan-name').textContent = 'Plus';
    plusBtn.textContent = 'Current Plan';
    plusBtn.classList.remove('from-green-500', 'to-green-600');
    plusBtn.classList.add('bg-gray-600');
    freeBtn.textContent = 'Downgrade';
    proBtn.textContent = 'Upgrade to Pro';
  } else if (currentSubscription.tier === 'pro') {
    document.getElementById('current-plan-name').textContent = 'Pro';
    proBtn.textContent = 'Current Plan';
    proBtn.classList.remove('from-purple-500', 'to-purple-600');
    proBtn.classList.add('bg-gray-600');
    freeBtn.textContent = 'Downgrade';
    plusBtn.textContent = 'Downgrade to Plus';
  }
  
  // Show billing info
  if (currentSubscription.next_billing_date) {
    const billingDate = new Date(currentSubscription.next_billing_date).toLocaleDateString();
    document.getElementById('billing-info').textContent = `Next billing: ${billingDate} • ${currentSubscription.billing_interval}`;
  }
}

// Setup event listeners
function setupEventListeners() {
  // Billing toggle
  billingToggle.addEventListener('change', (e) => {
    isYearly = e.target.checked;
    updatePrices();
  });
  
  // Plan buttons
  document.getElementById('free-btn').addEventListener('click', () => handlePlanClick('free'));
  document.getElementById('plus-btn').addEventListener('click', () => handlePlanClick('plus'));
  document.getElementById('pro-btn').addEventListener('click', () => handlePlanClick('pro'));
  
  // Modal close
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    loginModal.classList.add('hidden');
  });
  
  // Manage subscription
  document.getElementById('manage-subscription-btn').addEventListener('click', () => {
    window.location.href = '{{site.baseurl}}/subscription/manage';
  });
}

// Update prices based on billing period
function updatePrices() {
  if (isYearly) {
    monthlyLabel.classList.remove('text-gray-300');
    monthlyLabel.classList.add('text-gray-500');
    yearlyLabel.classList.remove('text-gray-500');
    yearlyLabel.classList.add('text-gray-300');
    
    plusPrice.textContent = `$${PRICES.yearly.plus.toFixed(2)}`;
    plusPeriod.textContent = '/year';
    proPrice.textContent = `$${PRICES.yearly.pro.toFixed(2)}`;
    proPeriod.textContent = '/year';
  } else {
    monthlyLabel.classList.remove('text-gray-500');
    monthlyLabel.classList.add('text-gray-300');
    yearlyLabel.classList.remove('text-gray-300');
    yearlyLabel.classList.add('text-gray-500');
    
    plusPrice.textContent = `$${PRICES.monthly.plus.toFixed(2)}`;
    plusPeriod.textContent = '/month';
    proPrice.textContent = `$${PRICES.monthly.pro.toFixed(2)}`;
    proPeriod.textContent = '/month';
  }
}

// Handle plan button clicks
async function handlePlanClick(tier) {
  // Check if user is logged in
  if (!currentUser) {
    loginModal.classList.remove('hidden');
    return;
  }
  
  // If admin, do nothing
  if (currentUser.role === 'Admin') {
    alert('As an admin, you already have full access to all features!');
    return;
  }
  
  const currentTier = currentSubscription?.tier || 'free';
  
  if (tier === currentTier) {
    alert('You are already on this plan!');
    return;
  }
  
  // Handle downgrade
  if (tier === 'free' || (tier === 'plus' && currentTier === 'pro')) {
    if (confirm(`Are you sure you want to downgrade to ${tier === 'free' ? 'Free' : 'Plus'}? Your current benefits will remain until the end of your billing period.`)) {
      await handleDowngrade(tier);
    }
    return;
  }
  
  // Handle upgrade - redirect to checkout
  const billingInterval = isYearly ? 'yearly' : 'monthly';
  window.location.href = `{{site.baseurl}}/subscription/checkout?plan=${tier}&billing=${billingInterval}`;
}

// Handle downgrade
async function handleDowngrade(tier) {
  try {
    const response = await fetch(`${pythonURI}/api/subscription/downgrade`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({ target_tier: tier })
    });
    
    if (response.ok) {
      alert('Your plan has been updated. Changes will take effect at the end of your current billing period.');
      window.location.reload();
    } else {
      const error = await response.json();
      alert('Error: ' + (error.message || 'Failed to update plan'));
    }
  } catch (error) {
    console.error('Downgrade error:', error);
    alert('An error occurred. Please try again.');
  }
}
</script>
