---
layout: base
title: Admin - Subscription Management
permalink: /subscription/admin
search_exclude: true
menu: nav/home.html
---

<!-- Dark-themed dashboard in both site modes; override base .site-main typography
     so headings stay light and inputs stay dark regardless of light/dark mode. -->
<style>
  #admin-dashboard h1, #admin-dashboard h2, #admin-dashboard h3 { color: #f8fafc; }
  #admin-dashboard input,
  #admin-dashboard textarea,
  #admin-dashboard select {
    background: rgba(15, 23, 42, 0.72);
    color: #e2e8f0;
    border-color: rgba(148, 163, 184, 0.18);
  }
  #admin-dashboard input::placeholder,
  #admin-dashboard textarea::placeholder { color: #64748b; }
</style>

<div id="admin-dashboard" class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto">
    
    <!-- Loading State -->
    <div id="loading-state" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
      <p class="text-gray-400">Loading admin panel...</p>
    </div>
    
    <!-- Access Denied -->
    <div id="access-denied" class="hidden text-center py-20">
      <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Access Denied</h2>
      <p class="text-gray-400 mb-8">You don't have permission to access this page.</p>
      <a href="{{site.baseurl}}/" class="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold">
        Go Home
      </a>
    </div>
    
    <!-- Admin Content -->
    <div id="admin-content" class="hidden">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white">Subscription Admin</h1>
            <p class="text-gray-400 mt-2">Manage user subscriptions and approve payments</p>
          </div>
          <button onclick="refreshData()" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <p class="text-gray-400 text-sm">Pending Approvals</p>
          <p id="stat-pending" class="text-3xl font-bold text-yellow-400">0</p>
        </div>
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <p class="text-gray-400 text-sm">Active Subscriptions</p>
          <p id="stat-active" class="text-3xl font-bold text-green-400">0</p>
        </div>
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <p class="text-gray-400 text-sm">Plus Members</p>
          <p id="stat-plus" class="text-3xl font-bold text-blue-400">0</p>
        </div>
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <p class="text-gray-400 text-sm">Pro Members</p>
          <p id="stat-pro" class="text-3xl font-bold text-purple-400">0</p>
        </div>
      </div>
      
      <!-- Tabs -->
      <div class="flex space-x-2 mb-6">
        <button onclick="switchTab('pending')" id="tab-pending" class="px-4 py-2 rounded-lg font-medium transition-colors bg-yellow-500/20 text-yellow-400">
          Pending Payments
        </button>
        <button onclick="switchTab('active')" id="tab-active" class="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-gray-400 hover:text-white">
          Active Subscriptions
        </button>
        <button onclick="switchTab('all')" id="tab-all" class="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-gray-400 hover:text-white">
          All Users
        </button>
        <button onclick="switchTab('businesses')" id="tab-businesses" class="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-gray-400 hover:text-white">
          Business Submissions
        </button>
      </div>
      
      <!-- Pending Payments Section -->
      <div id="section-pending" class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
        <div class="p-4 border-b border-gray-700">
          <h2 class="text-lg font-bold text-white">Pending Payment Verifications</h2>
          <p class="text-gray-400 text-sm">Review and approve Zelle payments</p>
        </div>
        
        <div id="pending-list" class="divide-y divide-gray-700">
          <!-- Populated by JS -->
          <div class="p-8 text-center text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p>No pending payments to review</p>
          </div>
        </div>
      </div>
      
      <!-- Active Subscriptions Section -->
      <div id="section-active" class="hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
        <div class="p-4 border-b border-gray-700">
          <h2 class="text-lg font-bold text-white">Active Subscriptions</h2>
          <p class="text-gray-400 text-sm">Manage current subscribers</p>
        </div>
        
        <div id="active-list" class="divide-y divide-gray-700">
          <div class="p-8 text-center text-gray-500">Loading...</div>
        </div>
      </div>
      
      <!-- All Users Section -->
      <div id="section-all" class="hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
        <div class="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold text-white">All Users</h2>
            <p class="text-gray-400 text-sm">Search and manage any user's subscription</p>
          </div>
          <div class="relative">
            <input type="text" id="user-search" placeholder="Search by username..." 
              class="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 w-64">
          </div>
        </div>
        
        <div id="all-list" class="divide-y divide-gray-700">
          <div class="p-8 text-center text-gray-500">Loading...</div>
        </div>
      </div>

      <!-- Business Submissions Section -->
      <div id="section-businesses" class="hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
        <div class="p-4 border-b border-gray-700 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-lg font-bold text-white">Business Submissions</h2>
            <p class="text-gray-400 text-sm">Review listings submitted by business accounts. Approved listings appear in Local Businesses.</p>
          </div>
          <div class="flex gap-2">
            <button onclick="filterBusinesses('pending')" id="bizfilter-pending" class="px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-500/20 text-yellow-400">Pending</button>
            <button onclick="filterBusinesses('approved')" id="bizfilter-approved" class="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 text-gray-400 hover:text-white">Approved</button>
            <button onclick="filterBusinesses('rejected')" id="bizfilter-rejected" class="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 text-gray-400 hover:text-white">Rejected</button>
          </div>
        </div>
        <div id="businesses-list" class="divide-y divide-gray-700">
          <div class="p-8 text-center text-gray-500">Loading...</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Approve Modal -->
<div id="approve-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
  <div class="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
    <h3 class="text-xl font-bold text-white mb-2">Approve Payment</h3>
    <p class="text-gray-400 mb-4">Confirm you've received the Zelle payment from this user.</p>
    
    <div id="approve-details" class="bg-gray-700/50 rounded-xl p-4 mb-4">
      <!-- Populated by JS -->
    </div>
    
    <div class="flex space-x-3">
      <button onclick="closeApproveModal()" class="flex-1 py-3 px-4 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
        Cancel
      </button>
      <button onclick="confirmApprove()" class="flex-1 py-3 px-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
        Approve & Activate
      </button>
    </div>
  </div>
</div>

<!-- Reject Modal -->
<div id="reject-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
  <div class="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
    <h3 class="text-xl font-bold text-white mb-2">Reject Payment</h3>
    <p class="text-gray-400 mb-4">Provide a reason for rejecting this payment request.</p>
    
    <textarea id="reject-reason" rows="3" placeholder="Payment not received, incorrect amount, etc..."
      class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 mb-4"></textarea>
    
    <div class="flex space-x-3">
      <button onclick="closeRejectModal()" class="flex-1 py-3 px-4 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
        Cancel
      </button>
      <button onclick="confirmReject()" class="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">
        Reject Request
      </button>
    </div>
  </div>
</div>

<!-- Manual Upgrade Modal -->
<div id="upgrade-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
  <div class="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
    <h3 class="text-xl font-bold text-white mb-4">Manual Subscription Update</h3>
    
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-medium mb-2">User</label>
      <p id="upgrade-user" class="text-white font-semibold">Username</p>
    </div>
    
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-medium mb-2">Set Tier</label>
      <select id="upgrade-tier" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
        <option value="free">Free</option>
        <option value="plus">Plus ($4.99/mo)</option>
        <option value="pro">Pro ($9.99/mo)</option>
      </select>
    </div>
    
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-medium mb-2">Billing Interval</label>
      <select id="upgrade-billing" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
    
    <div class="flex space-x-3">
      <button onclick="closeUpgradeModal()" class="flex-1 py-3 px-4 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
        Cancel
      </button>
      <button onclick="confirmUpgrade()" class="flex-1 py-3 px-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
        Update Subscription
      </button>
    </div>
  </div>
</div>

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
  
  let currentUser = null;
  let pendingRequests = [];
  let businessSubmissions = [];
  let businessFilter = 'pending';
  let activeSubscriptions = [];
  let allUsers = [];
  let selectedRequest = null;
  let selectedUserId = null;
  
  // Initialize
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Check login and admin status
      const userResponse = await fetch(`${pythonURI}/api/user`, fetchOptions);
      if (!userResponse.ok) {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('access-denied').classList.remove('hidden');
        return;
      }
      
      currentUser = await userResponse.json();
      
      if (currentUser.role !== 'Admin') {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('access-denied').classList.remove('hidden');
        return;
      }
      
      // Load data
      await loadAllData();
      
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('admin-content').classList.remove('hidden');
      
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('loading-state').classList.add('hidden');
      document.getElementById('access-denied').classList.remove('hidden');
    }
  });
  
  async function loadAllData() {
    await Promise.all([
      loadPendingRequests(),
      loadActiveSubscriptions(),
      loadAllUsers(),
      loadBusinessSubmissions()
    ]);
    updateStats();
  }
  
  window.refreshData = loadAllData;
  
  async function loadPendingRequests() {
    try {
      const response = await fetch(`${pythonURI}/api/admin/subscriptions/pending`, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        // Handle both array and object with data property
        pendingRequests = Array.isArray(data) ? data : (data.data || data.requests || data.subscriptions || []);
        renderPendingList();
      } else {
        console.log('Pending requests endpoint returned:', response.status);
        pendingRequests = [];
        renderPendingList();
      }
    } catch (e) {
      console.error('Error loading pending:', e);
      pendingRequests = [];
      renderPendingList();
    }
  }
  
  async function loadActiveSubscriptions() {
    try {
      const response = await fetch(`${pythonURI}/api/admin/subscriptions/active`, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        // Handle both array and object with data property
        activeSubscriptions = Array.isArray(data) ? data : (data.data || data.subscriptions || []);
        renderActiveList();
      } else {
        console.log('Active subscriptions endpoint returned:', response.status);
        activeSubscriptions = [];
        renderActiveList();
      }
    } catch (e) {
      console.error('Error loading active:', e);
      activeSubscriptions = [];
      renderActiveList();
    }
  }
  
  async function loadAllUsers() {
    try {
      const response = await fetch(`${pythonURI}/api/admin/users`, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        // Handle both array and object with data property
        allUsers = Array.isArray(data) ? data : (data.data || data.users || []);
        renderAllList();
      } else {
        console.log('All users endpoint returned:', response.status);
        allUsers = [];
        renderAllList();
      }
    } catch (e) {
      console.error('Error loading users:', e);
      allUsers = [];
      renderAllList();
    }
  }
  
  function updateStats() {
    document.getElementById('stat-pending').textContent = (pendingRequests || []).length;
    document.getElementById('stat-active').textContent = (activeSubscriptions || []).length;
    document.getElementById('stat-plus').textContent = (activeSubscriptions || []).filter(s => s.tier === 'plus').length;
    document.getElementById('stat-pro').textContent = (activeSubscriptions || []).filter(s => s.tier === 'pro').length;
  }
  
  function renderPendingList() {
    const container = document.getElementById('pending-list');
    const requests = pendingRequests || [];
    
    if (requests.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p>No pending payments to review</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = requests.map(req => `
      <div class="p-4 hover:bg-gray-700/30 transition-colors">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
              <span class="text-yellow-400 font-bold">${(req.username || req.name || '?')[0].toUpperCase()}</span>
            </div>
            <div>
              <p class="text-white font-semibold">${req.username || req.name || 'Unknown'}</p>
              <p class="text-gray-400 text-sm">${req.email || 'No email'}</p>
            </div>
          </div>
          <div class="text-right mr-4">
            <p class="text-white font-bold">$${req.amount || '0'}</p>
            <p class="text-gray-400 text-sm">${req.plan || 'plus'} - ${req.billing_interval || 'monthly'}</p>
          </div>
          <div class="flex space-x-2">
            <button onclick="openApproveModal(${req.id}, '${req.username}', '${req.plan}', ${req.amount})" 
              class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors">
              Approve
            </button>
            <button onclick="openRejectModal(${req.id})" 
              class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors">
              Reject
            </button>
          </div>
        </div>
        <div class="mt-2 text-sm text-gray-500">
          <span>Zelle Name: ${req.zelle_name || 'Not provided'}</span>
          <span class="mx-2">•</span>
          <span>Submitted: ${req.created_at || 'Unknown'}</span>
        </div>
      </div>
    `).join('');
  }
  
  function renderActiveList() {
    const container = document.getElementById('active-list');
    const subs = activeSubscriptions || [];
    
    if (subs.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-gray-500">No active subscriptions</div>`;
      return;
    }
    
    container.innerHTML = subs.map(sub => `
      <div class="p-4 hover:bg-gray-700/30 transition-colors">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 ${sub.tier === 'pro' ? 'bg-purple-500/20' : 'bg-blue-500/20'} rounded-full flex items-center justify-center mr-4">
              <span class="${sub.tier === 'pro' ? 'text-purple-400' : 'text-blue-400'} font-bold">${(sub.username || '?')[0].toUpperCase()}</span>
            </div>
            <div>
              <p class="text-white font-semibold">${sub.username || 'Unknown'}</p>
              <p class="text-gray-400 text-sm">${sub.email || 'No email'}</p>
            </div>
          </div>
          <div class="text-center">
            <span class="px-3 py-1 rounded-full text-sm font-medium ${sub.tier === 'pro' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}">
              ${sub.tier?.toUpperCase() || 'FREE'}
            </span>
          </div>
          <div class="text-right mr-4">
            <p class="text-gray-400 text-sm">Since: ${sub.start_date || 'Unknown'}</p>
            <p class="text-gray-500 text-xs">${sub.billing_interval || 'monthly'}</p>
          </div>
          <button onclick="openUpgradeModal(${sub.user_id}, '${sub.username}', '${sub.tier}')" 
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors">
            Modify
          </button>
        </div>
      </div>
    `).join('');
  }
  
  function renderAllList(filter = '') {
    const container = document.getElementById('all-list');
    let filtered = allUsers || [];
    
    if (filter) {
      filtered = filtered.filter(u => 
        (u.username || '').toLowerCase().includes(filter.toLowerCase()) ||
        (u.name || '').toLowerCase().includes(filter.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(filter.toLowerCase())
      );
    }
    
    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-gray-500">No users found</div>`;
      return;
    }
    
    container.innerHTML = filtered.slice(0, 50).map(user => `
      <div class="p-4 hover:bg-gray-700/30 transition-colors">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-4">
              <span class="text-gray-300 font-bold">${(user.username || user.name || '?')[0].toUpperCase()}</span>
            </div>
            <div>
              <p class="text-white font-semibold">${user.username || user.name || 'Unknown'}</p>
              <p class="text-gray-400 text-sm">${user.email || 'No email'}</p>
            </div>
          </div>
          <div class="text-center">
            <span class="px-3 py-1 rounded-full text-sm font-medium ${
              user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
              user.tier === 'pro' ? 'bg-purple-500/20 text-purple-400' :
              user.tier === 'plus' ? 'bg-blue-500/20 text-blue-400' :
              'bg-gray-500/20 text-gray-400'
            }">
              ${user.role === 'Admin' ? 'ADMIN' : (user.tier || 'FREE').toUpperCase()}
            </span>
          </div>
          <button onclick="openUpgradeModal(${user.id}, '${user.username || user.name}', '${user.tier || 'free'}')" 
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors">
            Set Plan
          </button>
        </div>
      </div>
    `).join('');
  }
  
  // Search
  document.getElementById('user-search')?.addEventListener('input', (e) => {
    renderAllList(e.target.value);
  });
  
  // Tab switching
  window.switchTab = function(tab) {
    // Update tab buttons
    ['pending', 'active', 'all', 'businesses'].forEach(t => {
      const tabBtn = document.getElementById(`tab-${t}`);
      const section = document.getElementById(`section-${t}`);
      if (!tabBtn || !section) return;
      
      if (t === tab) {
        tabBtn.className = 'px-4 py-2 rounded-lg font-medium transition-colors ' + 
          (t === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400');
        section.classList.remove('hidden');
      } else {
        tabBtn.className = 'px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-gray-400 hover:text-white';
        section.classList.add('hidden');
      }
    });
  };

  // ===== Business Submissions (community listings pending admin review) =====
  async function loadBusinessSubmissions() {
    try {
      const response = await fetch(`${pythonURI}/api/business/submissions`, fetchOptions);
      businessSubmissions = response.ok ? await response.json() : [];
    } catch (e) {
      console.error('Error loading business submissions:', e);
      businessSubmissions = [];
    }
    renderBusinessSubmissions();
  }

  window.filterBusinesses = function(status) {
    businessFilter = status;
    ['pending', 'approved', 'rejected'].forEach(s => {
      const btn = document.getElementById(`bizfilter-${s}`);
      if (!btn) return;
      if (s === status) {
        btn.className = 'px-3 py-1.5 rounded-lg text-sm font-medium ' +
          (s === 'pending' ? 'bg-yellow-500/20 text-yellow-400'
            : s === 'approved' ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400');
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 text-gray-400 hover:text-white';
      }
    });
    renderBusinessSubmissions();
  };

  function renderBusinessSubmissions() {
    const container = document.getElementById('businesses-list');
    if (!container) return;
    const list = (businessSubmissions || []).filter(b => b.status === businessFilter);
    if (list.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-gray-500">No ${businessFilter} submissions</div>`;
      return;
    }
    // All business fields are user-submitted -> escape before inserting.
    container.innerHTML = list.map(b => `
      <div class="p-4">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-white font-semibold">${escapeHTML(b.name)}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">${escapeHTML(b.category)}</span>
            </div>
            <p class="text-gray-400 text-sm mt-1">📍 ${escapeHTML(b.address)}</p>
            ${b.description ? `<p class="text-gray-500 text-sm mt-1">${escapeHTML(b.description)}</p>` : ''}
            ${b.website ? `<a href="${safeUrl(b.website)}" target="_blank" rel="noopener noreferrer" class="text-blue-400 text-sm mt-1 inline-block break-all">${escapeHTML(b.website)}</a>` : ''}
            <p class="text-gray-600 text-xs mt-2">Submitted by ${escapeHTML(b.owner_uid || 'unknown')}</p>
            ${b.review_note ? `<p class="text-red-400 text-xs mt-1">Note: ${escapeHTML(b.review_note)}</p>` : ''}
          </div>
          <div class="flex flex-col gap-2 shrink-0">
            ${b.status === 'pending' ? `
              <button onclick="approveBusiness(${b.id})" class="py-2 px-4 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">Approve</button>
              <button onclick="rejectBusiness(${b.id})" class="py-2 px-4 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">Reject</button>
            ` : `<span class="text-xs px-3 py-1 rounded-full ${b.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">${escapeHTML((b.status || '').toUpperCase())}</span>`}
          </div>
        </div>
      </div>
    `).join('');
  }

  window.approveBusiness = async function(id) {
    try {
      const response = await fetch(`${pythonURI}/api/business/submissions/${id}/approve`, { ...fetchOptions, method: 'POST' });
      if (response.ok) { await loadBusinessSubmissions(); }
      else alert('Could not approve submission.');
    } catch (e) { alert('Error approving submission.'); }
  };

  window.rejectBusiness = async function(id) {
    const note = prompt('Reason for rejecting (optional):');
    if (note === null) return; // cancelled
    try {
      const response = await fetch(`${pythonURI}/api/business/submissions/${id}/reject`, {
        ...fetchOptions, method: 'POST', body: JSON.stringify({ note: note || '' })
      });
      if (response.ok) { await loadBusinessSubmissions(); }
      else alert('Could not reject submission.');
    } catch (e) { alert('Error rejecting submission.'); }
  };
  
  // Approve Modal
  window.openApproveModal = function(id, username, plan, amount) {
    selectedRequest = id;
    document.getElementById('approve-details').innerHTML = `
      <p class="text-gray-300"><strong>User:</strong> ${username}</p>
      <p class="text-gray-300"><strong>Plan:</strong> ${plan}</p>
      <p class="text-gray-300"><strong>Amount:</strong> $${amount}</p>
    `;
    document.getElementById('approve-modal').classList.remove('hidden');
  };
  
  window.closeApproveModal = function() {
    document.getElementById('approve-modal').classList.add('hidden');
    selectedRequest = null;
  };
  
  window.confirmApprove = async function() {
    if (!selectedRequest) return;
    
    try {
      const response = await fetch(`${pythonURI}/api/admin/subscriptions/approve`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ request_id: selectedRequest })
      });
      
      if (response.ok) {
        closeApproveModal();
        await loadAllData();
      } else {
        alert('Failed to approve. Please try again.');
      }
    } catch (e) {
      alert('Error approving request.');
    }
  };
  
  // Reject Modal
  window.openRejectModal = function(id) {
    selectedRequest = id;
    document.getElementById('reject-modal').classList.remove('hidden');
  };
  
  window.closeRejectModal = function() {
    document.getElementById('reject-modal').classList.add('hidden');
    document.getElementById('reject-reason').value = '';
    selectedRequest = null;
  };
  
  window.confirmReject = async function() {
    if (!selectedRequest) return;
    
    try {
      const response = await fetch(`${pythonURI}/api/admin/subscriptions/reject`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({ 
          request_id: selectedRequest,
          reason: document.getElementById('reject-reason').value
        })
      });
      
      if (response.ok) {
        closeRejectModal();
        await loadAllData();
      } else {
        alert('Failed to reject. Please try again.');
      }
    } catch (e) {
      alert('Error rejecting request.');
    }
  };
  
  // Upgrade Modal
  window.openUpgradeModal = function(userId, username, currentTier) {
    selectedUserId = userId;
    document.getElementById('upgrade-user').textContent = username;
    document.getElementById('upgrade-tier').value = currentTier || 'free';
    document.getElementById('upgrade-modal').classList.remove('hidden');
  };
  
  window.closeUpgradeModal = function() {
    document.getElementById('upgrade-modal').classList.add('hidden');
    selectedUserId = null;
  };
  
  window.confirmUpgrade = async function() {
    if (!selectedUserId) return;
    
    try {
      const response = await fetch(`${pythonURI}/api/admin/subscriptions/set`, {
        ...fetchOptions,
        method: 'POST',
        body: JSON.stringify({
          user_id: selectedUserId,
          tier: document.getElementById('upgrade-tier').value,
          billing_interval: document.getElementById('upgrade-billing').value
        })
      });
      
      if (response.ok) {
        closeUpgradeModal();
        await loadAllData();
      } else {
        alert('Failed to update. Please try again.');
      }
    } catch (e) {
      alert('Error updating subscription.');
    }
  };
</script>
