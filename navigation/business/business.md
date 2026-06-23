---
layout: base
title: Business Portal
permalink: /business
search_exclude: true
menu: nav/home.html
---

<!-- This page is intentionally dark-themed in both site modes. The base layout
     styles .site-main h1/input for the page's own theme, so we override here with
     ID-scoped rules (higher specificity) to keep headings/inputs readable. -->
<style>
  #business-portal h1, #business-portal h2, #business-portal h3 { color: #f8fafc; }
  #business-portal input,
  #business-portal textarea,
  #business-portal select {
    background: rgba(15, 23, 42, 0.72);
    color: #e2e8f0;
    border-color: rgba(148, 163, 184, 0.18);
  }
  #business-portal input::placeholder,
  #business-portal textarea::placeholder { color: #64748b; }
</style>

<section id="business-portal" class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto">

    <!-- Loading -->
    <div id="biz-loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
      <p class="text-slate-400">Loading business portal…</p>
    </div>

    <!-- Not a business account -->
    <div id="biz-denied" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-3">Business accounts only</h2>
      <p class="text-slate-400 mb-8 max-w-md mx-auto">This portal is for business accounts. Create a free business account on the login page to submit your business to the Local Businesses directory.</p>
      <a href="{{site.baseurl}}/login" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold">
        Go to Login / Create Business Account
      </a>
    </div>

    <!-- Business content -->
    <div id="biz-content" class="hidden">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Business Portal</h1>
        <p class="text-slate-400 mt-2">Submit your business to the Local Businesses directory. Submissions are reviewed by an admin before going live.</p>
      </div>

      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Submit form -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
          <h2 class="text-lg font-bold text-white mb-4">Submit a business</h2>
          <form id="biz-form" class="space-y-4" onsubmit="submitBusiness(event)">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1">Business name <span class="text-rose-400">*</span></label>
              <input id="biz-name" type="text" required maxlength="255"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1">Address <span class="text-rose-400">*</span></label>
              <input id="biz-address" type="text" required maxlength="500"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1">Category <span class="text-rose-400">*</span></label>
              <input id="biz-category" type="text" required maxlength="120" placeholder="e.g. Cafe, Healthcare, Printing"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea id="biz-description" rows="3" maxlength="2000"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1">Website</label>
              <input id="biz-website" type="text" maxlength="500" placeholder="https://…"
                class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500" />
            </div>
            <p id="biz-form-message" class="min-h-5 text-sm font-medium"></p>
            <button type="submit" id="biz-submit-btn"
              class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:-translate-y-0.5 transition">
              Submit for review
            </button>
          </form>
        </div>

        <!-- My submissions -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
          <div class="p-6 border-b border-slate-700">
            <h2 class="text-lg font-bold text-white">My submissions</h2>
            <p class="text-slate-400 text-sm">Track the review status of your listings.</p>
          </div>
          <div id="biz-mine" class="divide-y divide-slate-700">
            <div class="p-8 text-center text-slate-500">Loading…</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  // Defined locally (not imported) so this page is immune to a stale cached
  // config.js that predates these helpers.
  const escapeHTML = (v) => v == null ? '' : String(v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const safeUrl = (v) => {
    if (!v) return '#';
    const u = String(v).trim();
    return /^(https?:|mailto:|tel:|\/)/i.test(u) ? escapeHTML(u) : '#';
  };

  const statusStyles = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    approved: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  };

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch(`${pythonURI}/api/user`, fetchOptions);
      if (!res.ok) { showDenied(); return; }
      const user = await res.json();
      if (user.role !== 'Business' && user.role !== 'Admin') { showDenied(); return; }
      document.getElementById('biz-loading').classList.add('hidden');
      document.getElementById('biz-content').classList.remove('hidden');
      loadMine();
    } catch (e) {
      showDenied();
    }
  });

  function showDenied() {
    document.getElementById('biz-loading').classList.add('hidden');
    document.getElementById('biz-denied').classList.remove('hidden');
  }

  async function loadMine() {
    const container = document.getElementById('biz-mine');
    try {
      const res = await fetch(`${pythonURI}/api/business/mine`, fetchOptions);
      const subs = res.ok ? await res.json() : [];
      if (!subs.length) {
        container.innerHTML = `<div class="p-8 text-center text-slate-500">No submissions yet.</div>`;
        return;
      }
      container.innerHTML = subs.map(b => `
        <div class="p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h3 class="text-white font-semibold">${escapeHTML(b.name)}</h3>
              <p class="text-slate-400 text-sm">${escapeHTML(b.category)} · ${escapeHTML(b.address)}</p>
              ${b.review_note ? `<p class="text-red-400 text-xs mt-1">Note: ${escapeHTML(b.review_note)}</p>` : ''}
            </div>
            <span class="shrink-0 text-xs px-3 py-1 rounded-full ${statusStyles[b.status] || 'bg-slate-700 text-slate-300'}">${escapeHTML((b.status || '').toUpperCase())}</span>
          </div>
        </div>
      `).join('');
    } catch (e) {
      container.innerHTML = `<div class="p-8 text-center text-slate-500">Could not load submissions.</div>`;
    }
  }

  window.submitBusiness = async function(event) {
    event.preventDefault();
    const btn = document.getElementById('biz-submit-btn');
    const msg = document.getElementById('biz-form-message');
    msg.textContent = '';
    btn.disabled = true;

    const body = {
      name: document.getElementById('biz-name').value.trim(),
      address: document.getElementById('biz-address').value.trim(),
      category: document.getElementById('biz-category').value.trim(),
      description: document.getElementById('biz-description').value.trim(),
      website: document.getElementById('biz-website').value.trim(),
    };

    if (!body.name || !body.address || !body.category) {
      msg.className = 'min-h-5 text-sm font-medium text-rose-400';
      msg.textContent = 'Name, address, and category are required.';
      btn.disabled = false;
      return;
    }

    try {
      const res = await fetch(`${pythonURI}/api/business/submit`, {
        ...fetchOptions, method: 'POST', body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Submit failed (${res.status})`);
      msg.className = 'min-h-5 text-sm font-medium text-emerald-400';
      msg.textContent = data.message || 'Submitted for review.';
      document.getElementById('biz-form').reset();
      loadMine();
    } catch (e) {
      msg.className = 'min-h-5 text-sm font-medium text-rose-400';
      msg.textContent = e.message;
    } finally {
      btn.disabled = false;
    }
  };
</script>
