---
layout: base
title: Login
permalink: /login
search_exclude: true
---

<style>
  #account-access .account-lead-title {
    color: #f8fafc;
  }
</style>

<section id="account-access" class="mx-auto max-w-6xl">
  <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
    <aside class="rounded-[2.25rem] border border-primary-900/20 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 p-8 text-white shadow-large lg:p-10">
      <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
        SD Auto Access
      </span>
      <h1 class="account-lead-title mt-6 max-w-md text-4xl sm:text-5xl">Access Your Routing Workspace</h1>
      <p class="mt-6 max-w-lg text-base leading-8 text-slate-200">
        Sign in to manage saved routes, account preferences, and premium access. New users can create an account in less than a minute.
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          <p class="text-sm font-semibold text-white">Saved Preferences</p>
          <p class="mt-2 text-sm leading-7 text-slate-200">Keep your account profile, saved destinations, and commute settings in one place.</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          <p class="text-sm font-semibold text-white">Premium Features</p>
          <p class="mt-2 text-sm leading-7 text-slate-200">Unlock multi-stop planning, favorites, and subscriber-only workflow tools after sign in.</p>
        </div>
      </div>

      <div class="mt-10 rounded-[1.75rem] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Account Security</p>
        <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-200">
          <li>Use the same credentials across profile, subscriptions, and saved route history.</li>
          <li>Account creation is free, and you can upgrade later if you need premium routing features.</li>
        </ul>
      </div>
    </aside>

    <div class="grid gap-6 md:grid-cols-2">
      <section class="rounded-[2rem] border border-slate-200/70 bg-white/85 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/75">
        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Returning User</p>
          <h2 class="text-3xl">Sign In</h2>
          <p class="text-sm leading-7 text-slate-600 dark:text-slate-300">Access your personalized routing workspace and account settings.</p>
        </div>

        <form id="pythonForm" onsubmit="pythonLogin(); return false;" class="mt-8 space-y-5">
          <div>
            <label for="uid" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
            <input type="text" id="uid" name="uid" required autocomplete="username"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" id="password" name="password" required autocomplete="current-password"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <p id="message" class="min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
          <button type="submit"
            class="w-full rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-large">
            Sign In
          </button>
        </form>
      </section>

      <section class="rounded-[2rem] border border-slate-200/70 bg-white/85 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/75">
        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">New Account</p>
          <h2 class="text-3xl">Create Your Profile</h2>
          <p id="signupIntro" class="text-sm leading-7 text-slate-600 dark:text-slate-300">Start with a free account, then upgrade only if you need premium features.</p>
        </div>

        <!-- Account type toggle: Personal vs Business (same login system, role differs) -->
        <div class="mt-5 inline-flex rounded-2xl border border-slate-200 dark:border-slate-700 p-1 bg-slate-100 dark:bg-slate-800">
          <button type="button" id="signup-mode-personal" onclick="setSignupMode('personal')"
            class="px-4 py-1.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-950 text-slate-800 dark:text-white shadow">Personal</button>
          <button type="button" id="signup-mode-business" onclick="setSignupMode('business')"
            class="px-4 py-1.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400">Business</button>
        </div>

        <form id="signupForm" onsubmit="signup(); return false;" class="mt-6 space-y-5">
          <div>
            <label for="name" id="signupNameLabel" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <input type="text" id="name" name="name" required autocomplete="name"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <div>
            <label for="signupUid" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
            <input type="text" id="signupUid" name="signupUid" required autocomplete="username"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <div>
            <label for="signupPassword" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" id="signupPassword" name="signupPassword" required autocomplete="new-password"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-soft transition focus:outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100" />
          </div>
          <p id="signupMessage" class="min-h-5 text-sm font-medium text-emerald-600 dark:text-emerald-400"></p>
          <button type="submit"
            class="w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-medium transition duration-300 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-large dark:border-slate-700 dark:bg-primary-600 dark:hover:bg-primary-500">
            Create Account
          </button>
        </form>
      </section>
    </div>
  </div>
</section>

<script type="module">
  import { login, pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  window.pythonLogin = function() {
    const options = {
      URL: `${pythonURI}/api/authenticate`,
      callback: pythonDatabase,
      message: "message",
      method: "POST",
      cache: "no-cache",
      body: {
        uid: document.getElementById("uid").value,
        password: document.getElementById("password").value,
      }
    };
    login(options);
  }

  // Account type for signup: 'personal' (regular user) or 'business' (Business role).
  let signupMode = 'personal';
  window.setSignupMode = function(mode) {
    signupMode = mode === 'business' ? 'business' : 'personal';
    const active = 'px-4 py-1.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-950 text-slate-800 dark:text-white shadow';
    const inactive = 'px-4 py-1.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400';
    const personalBtn = document.getElementById('signup-mode-personal');
    const businessBtn = document.getElementById('signup-mode-business');
    if (personalBtn) personalBtn.className = signupMode === 'personal' ? active : inactive;
    if (businessBtn) businessBtn.className = signupMode === 'business' ? active : inactive;
    const nameLabel = document.getElementById('signupNameLabel');
    if (nameLabel) nameLabel.textContent = signupMode === 'business' ? 'Business Name' : 'Name';
    const intro = document.getElementById('signupIntro');
    if (intro) intro.textContent = signupMode === 'business'
      ? 'Create a business account to submit your business for the Local Businesses directory (admin-approved).'
      : 'Start with a free account, then upgrade only if you need premium features.';
    const submitBtn = document.querySelector('#signupForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = signupMode === 'business' ? 'Create Business Account' : 'Create Account';
    const msg = document.getElementById('signupMessage');
    if (msg) msg.textContent = '';
  };

  window.signup = function() {
    const signupButton = document.querySelector("#signupForm button");
    signupButton.disabled = true;
    signupButton.style.backgroundColor = '#d3d3d3';

    // Business accounts use the dedicated business-register endpoint (role set to
    // "Business" server-side); personal accounts use the existing /api/user route.
    const url = signupMode === 'business'
      ? `${pythonURI}/api/business/register`
      : `${pythonURI}/api/user`;
    const body = {
      name: document.getElementById("name").value,
      uid: document.getElementById("signupUid").value,
      password: document.getElementById("signupPassword").value,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    .then(async response => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || data.message || `Signup failed: ${response.status}`);
      return data;
    })
    .then(() => {
      document.getElementById("signupMessage").textContent = signupMode === 'business'
        ? "Business account created! Sign in, then submit your business at the Business portal."
        : "Signup successful!";
      signupButton.disabled = false;
      signupButton.style.backgroundColor = '';
    })
    .catch(error => {
      document.getElementById("signupMessage").textContent = `Signup Error: ${error.message}`;
      signupButton.disabled = false;
      signupButton.style.backgroundColor = '';
    });
  }

  function pythonDatabase() {
    fetch(`${pythonURI}/api/user`, fetchOptions)
      .then(response => {
        if (!response.ok) throw new Error(`Flask server response: ${response.status}`);
        return response.json();
      })
      .then(() => {
        window.location.href = '{{site.baseurl}}/profile';
      })
      .catch(error => {
        document.getElementById("message").textContent = `Login Error: ${error.message}`;
      });
  }

  document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = document.cookie.includes('auth_token');
    if (isAuthenticated) {
      pythonDatabase();
    }
  });
</script>
