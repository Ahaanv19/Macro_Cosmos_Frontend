---
layout: base
title: Home Page
search_exclude: true
nav: true
hide: true
menu: nav/home.html
---


<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SD Auto - Smart City Navigation | City of San Diego</title>

  <!-- SEO Meta Tags -->
  <meta name="description" content="SD Auto - Real-time traffic intelligence, optimized routing, and smart navigation designed for San Diego's streets. Built for efficiency, driven by data.">
  <meta name="keywords" content="San Diego, navigation, traffic, route planning, smart city, SD Auto">
  <meta name="author" content="Ahaan Vaidyanathan">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://ahaanv19.github.io/SD_Auto_Frontend/">
  <meta property="og:title" content="SD Auto - Smart City Navigation for San Diego">
  <meta property="og:description" content="Real-time traffic intelligence, optimized routing, and smart navigation designed for San Diego's streets.">
  <meta property="og:image" content="https://ahaanv19.github.io/SD_Auto_Frontend/images/og-image.png">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://ahaanv19.github.io/SD_Auto_Frontend/">
  <meta name="twitter:title" content="SD Auto - Smart City Navigation for San Diego">
  <meta name="twitter:description" content="Real-time traffic intelligence, optimized routing, and smart navigation designed for San Diego's streets.">
  <meta name="twitter:image" content="https://ahaanv19.github.io/SD_Auto_Frontend/images/og-image.png">

  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://unpkg.com">
  <link rel="preconnect" href="https://assets10.lottiefiles.com">
  <link rel="dns-prefetch" href="https://unpkg.com">
  <link rel="dns-prefetch" href="https://assets10.lottiefiles.com">

  <!-- External Stylesheets -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />

  <!-- Page Styles -->
  <style>
    /* Hero gradient overlay */
    .hero-gradient {
      background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(0, 102, 204, 0.05) 100%);
    }

    #map {
      height: 450px;
      margin-top: 20px;
      border-radius: 24px;
      border: none;
      box-shadow: 0 25px 50px -12px rgba(0, 102, 204, 0.15);
      overflow: hidden;
    }

    .feature-card {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    lottie-player {
      width: 100%;
      height: 400px;
      filter: drop-shadow(0 25px 50px rgba(0, 102, 204, 0.2));
    }

    /* Stats counter animation */
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .stat-item {
      animation: countUp 0.6s ease-out forwards;
    }

    .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .stat-item:nth-child(3) { animation-delay: 0.3s; }
    .stat-item:nth-child(4) { animation-delay: 0.4s; }

    /* Feature icon hover */
    .feature-icon {
      transition: all 0.3s ease;
    }

    .feature-card:hover .feature-icon {
      transform: scale(1.1) rotate(5deg);
    }

    /* Smooth scroll reveal */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease;
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }

    /* Loading Skeleton Animations */
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    .dark .skeleton {
      background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
      background-size: 200% 100%;
    }

    .map-skeleton {
      height: 450px;
      border-radius: 24px;
    }

    /* Mobile Navigation */
    .mobile-nav-toggle {
      display: none;
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 1001;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: white;
      border: 1px solid #e5e7eb;
      cursor: pointer;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .dark .mobile-nav-toggle {
      background: #1f2937;
      border-color: #374151;
    }

    .mobile-nav-toggle span {
      display: block;
      width: 24px;
      height: 2px;
      background: #374151;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .dark .mobile-nav-toggle span {
      background: #e5e7eb;
    }

    .mobile-nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .mobile-nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    .mobile-nav-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 999;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .mobile-nav-overlay.active {
      opacity: 1;
    }

    .mobile-nav-menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 280px;
      height: 100vh;
      background: white;
      z-index: 1000;
      padding: 80px 24px 24px;
      transition: right 0.3s ease;
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    }

    .dark .mobile-nav-menu {
      background: #1f2937;
    }

    .mobile-nav-menu.active {
      right: 0;
    }

    .mobile-nav-menu a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      margin-bottom: 8px;
      border-radius: 12px;
      color: #374151;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .dark .mobile-nav-menu a {
      color: #e5e7eb;
    }

    .mobile-nav-menu a:hover {
      background: #f3f4f6;
      transform: translateX(4px);
    }

    .dark .mobile-nav-menu a:hover {
      background: #374151;
    }

    @media (max-width: 768px) {
      .mobile-nav-toggle {
        display: flex;
      }
    }

    /* FAQ Accordion Styles */
    .faq-item {
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .faq-item:hover {
      transform: translateY(-2px);
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px 24px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      cursor: pointer;
      text-align: left;
      font-weight: 600;
      color: #1f2937;
      transition: all 0.3s ease;
    }

    .dark .faq-question {
      background: #1f2937;
      border-color: #374151;
      color: white;
    }

    .faq-question:hover {
      border-color: #0066cc;
    }

    .faq-question.active {
      border-radius: 16px 16px 0 0;
      border-bottom: none;
    }

    .faq-icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
    }

    .faq-question.active .faq-icon {
      transform: rotate(180deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      background: white;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 16px 16px;
      transition: max-height 0.3s ease;
    }

    .dark .faq-answer {
      background: #1f2937;
      border-color: #374151;
    }

    .faq-answer.active {
      max-height: 200px;
    }

    .faq-answer-content {
      padding: 20px 24px;
      color: #6b7280;
      line-height: 1.6;
    }

    .dark .faq-answer-content {
      color: #9ca3af;
    }

    /* Testimonial Styles */
    .testimonial-card {
      position: relative;
      overflow: hidden;
    }

    .testimonial-card::before {
      content: '"';
      position: absolute;
      top: -20px;
      left: 20px;
      font-size: 120px;
      font-family: Georgia, serif;
      color: rgba(0, 102, 204, 0.1);
      line-height: 1;
    }
  </style>

  <!-- External Scripts -->
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" defer></script>
</head>

<body>
  <!-- Mobile Navigation -->
  <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Toggle navigation">
    <span></span>
    <span></span>
    <span></span>
  </button>
  
  <div class="mobile-nav-overlay" id="mobileNavOverlay"></div>
  
  <nav class="mobile-nav-menu" id="mobileNavMenu">
    <a href="{{site.baseurl}}/route/">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
      Find Best Route
    </a>
    <a href="{{site.baseurl}}/routine/">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Daily Routine
    </a>
    <a href="{{site.baseurl}}/hazard/">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Report Hazard
    </a>
    <a href="{{site.baseurl}}/localbusinesses/">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      Local Businesses
    </a>
    <a href="{{site.baseurl}}/pricing/">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Premium Plans
    </a>
    <a href="{{site.baseurl}}/login/">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
      Login
    </a>
  </nav>

  <main class="relative overflow-hidden">

    <!-- Hero Section -->
    <section class="relative hero-gradient py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left space-y-8 animate-fade-in">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Official City of San Diego Initiative
            </div>

            <!-- Main Heading -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span class="text-slate-900 dark:text-white">Navigate Smarter with</span>
              <br>
              <span class="gradient-text">SD Auto</span>
            </h1>

            <!-- Description -->
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Real-time traffic intelligence, optimized routing, and smart navigation designed for San Diego's streets. Built for efficiency, driven by data.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="{{site.baseurl}}/route/" class="group inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary text-white rounded-2xl font-semibold text-base shadow-large">
                <span>Find Best Route</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="{{site.baseurl}}/Readme4yml/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-2xl font-semibold text-base transition-all hover:shadow-medium">
                <span>Learn More</span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>

            <!-- Trust Indicators -->
            <div class="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Real-time Data</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Optimized for San Diego</span>
              </div>
            </div>
          </div>

          <!-- Lottie Animation -->
          <div class="flex-1 w-full max-w-lg lg:max-w-xl animate-slide-up">
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_kyu7xb1v.json"
              background="transparent"
              speed="1"
              loop
              autoplay>
            </lottie-player>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions Menu -->
    <section class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a href="{{site.baseurl}}/route/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Find Best Route</span>
          </a>
          <a href="{{site.baseurl}}/routine/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-accent-500 dark:hover:border-accent-500 transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Daily Routine</span>
          </a>
          <a href="{{site.baseurl}}/hazard/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-warning dark:hover:border-warning transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Report Hazard</span>
          </a>
          <a href="{{site.baseurl}}/localbusinesses/" class="feature-card group flex flex-col items-center gap-3 p-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-success dark:hover:border-success transition-all hover:shadow-medium">
            <div class="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="font-semibold text-slate-700 dark:text-slate-200 text-center">Local Businesses</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Built for San Diego
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Powered by real traffic data from the City of San Diego's open data portal
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">Real-Time</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Traffic Updates</p>
          </div>

          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/50 dark:to-accent-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">Secure</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Data Protected</p>
          </div>

          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">Citywide</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Coverage</p>
          </div>

          <div class="stat-item bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold gradient-text mb-2">24/7</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Availability</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 lg:py-24 bg-gradient-to-b from-transparent via-primary-50/50 to-transparent dark:via-primary-900/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Core Features
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need for<br>Smarter Navigation
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Comprehensive tools designed to make your daily commute and travel around San Diego more efficient
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Traffic-Aware Routing</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Routes dynamically adjusted using real traffic data from San Diego's open data portal for accurate ETAs.</p>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Favorite Locations</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Save and quickly access your frequently visited places for faster route planning and navigation.</p>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Daily Routine Planner</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Plan your entire day with optimized routes between multiple destinations.</p>
          </div>

          <!-- Feature 4 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Hazard Reporting</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Report road hazards and help keep San Diego's streets safe for everyone.</p>
          </div>

          <!-- Feature 5 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Local Business Discovery</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Discover and support local San Diego businesses along your routes.</p>
          </div>

          <!-- Feature 6 -->
          <div class="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700 card-hover">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Multi-Modal Transport</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">Support for driving, walking, bicycling, and public transit options.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Map Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Your Location in San Diego
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Interactive map showing your current location. Enable location services to see real-time positioning.
          </p>
        </div>
        <div class="relative">
          <!-- Loading Skeleton for Map -->
          <div id="map-skeleton" class="skeleton map-skeleton w-full flex items-center justify-center" style="position: absolute; top: 0; left: 0; right: 0; z-index: 10;">
            <div class="text-center">
              <svg class="animate-spin h-10 w-10 mx-auto mb-3 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-slate-500 dark:text-slate-400">Loading map...</p>
            </div>
          </div>
          <div id="map" class="w-full"></div>
          <!-- Map overlay badge -->
          <div id="map-badge" class="hidden absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Live Location</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 lg:py-24 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent dark:via-primary-900/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            What Users Say
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Trusted by San Diego Commuters
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Join thousands of San Diegans who navigate smarter every day
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="testimonial-card bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="flex items-center gap-1 mb-4">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              "SD Auto has completely changed my daily commute from La Jolla to Downtown. I save at least 20 minutes every day by avoiding traffic hotspots!"
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                MR
              </div>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">Maria R.</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">La Jolla Resident</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="testimonial-card bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="flex items-center gap-1 mb-4">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              "The daily routine planner is a game-changer! I can plan my entire day with multiple stops and it optimizes everything automatically."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold">
                JT
              </div>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">James T.</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">Small Business Owner</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="testimonial-card bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-slate-100 dark:border-slate-700">
            <div class="flex items-center gap-1 mb-4">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              "As a delivery driver, SD Auto Pro is essential. Unlimited routes and the hazard alerts keep me efficient and safe on the road."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold">
                SK
              </div>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">Sarah K.</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">Delivery Professional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300">
            Everything you need to know about SD Auto
          </p>
        </div>

        <div class="space-y-4">
          <!-- FAQ Item 1 -->
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>How does SD Auto find the best route?</span>
              <svg class="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-content">
                SD Auto uses real-time traffic data from the City of San Diego's open data portal combined with advanced routing algorithms to calculate the fastest route based on current traffic conditions, road closures, and historical patterns.
              </div>
            </div>
          </div>

          <!-- FAQ Item 2 -->
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>Is SD Auto free to use?</span>
              <svg class="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-content">
                Yes! SD Auto offers a free tier with 4 route searches per day. For unlimited routes and advanced features like Daily Routine Planner and Favorite Locations, check out our Plus and Pro plans.
              </div>
            </div>
          </div>

          <!-- FAQ Item 3 -->
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>What areas does SD Auto cover?</span>
              <svg class="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-content">
                SD Auto is optimized for the entire San Diego metropolitan area, including all neighborhoods from La Jolla to Chula Vista, and from the coast to East County. Our traffic data covers all major highways and surface streets.
              </div>
            </div>
          </div>

          <!-- FAQ Item 4 -->
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>How accurate is the traffic data?</span>
              <svg class="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-content">
                Our traffic data is sourced directly from the City of San Diego's official traffic sensors and is updated in real-time. This official data ensures high accuracy for route planning and ETA calculations.
              </div>
            </div>
          </div>

          <!-- FAQ Item 5 -->
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>Can I report road hazards?</span>
              <svg class="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="faq-answer">
              <div class="faq-answer-content">
                Yes! Plus and Pro subscribers can report road hazards, accidents, and other incidents. These reports help the entire SD Auto community stay informed and navigate safely.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 rounded-4xl p-8 sm:p-12 lg:p-16 text-center shadow-large">
          <!-- Background pattern -->
          <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          <div class="relative z-10">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Navigate Smarter?
            </h2>
            <p class="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of San Diegans using SD Auto for their daily commute. Start optimizing your routes today.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="{{site.baseurl}}/login/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <span>Get Started Free</span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- JavaScript -->
  <script>
    // Mobile Navigation
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavMenu = document.getElementById('mobileNavMenu');

    function toggleMobileNav() {
      mobileNavToggle.classList.toggle('active');
      mobileNavOverlay.classList.toggle('active');
      mobileNavMenu.classList.toggle('active');
      
      if (mobileNavOverlay.classList.contains('active')) {
        mobileNavOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      } else {
        setTimeout(() => {
          mobileNavOverlay.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
      }
    }

    mobileNavToggle.addEventListener('click', toggleMobileNav);
    mobileNavOverlay.addEventListener('click', toggleMobileNav);

    // FAQ Toggle Function
    function toggleFaq(button) {
      const answer = button.nextElementSibling;
      const isActive = button.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-question.active').forEach(q => {
        if (q !== button) {
          q.classList.remove('active');
          q.nextElementSibling.classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      button.classList.toggle('active');
      answer.classList.toggle('active');
    }

    // Map Initialization
    document.addEventListener('DOMContentLoaded', function() {
      const mapSkeleton = document.getElementById('map-skeleton');
      const mapContainer = document.getElementById('map');
      const mapBadge = document.getElementById('map-badge');
      
      // Initialize map immediately (it's visible now, just covered by skeleton)
      const map = L.map('map');
      
      function showMap() {
        // Hide skeleton and show badge
        mapSkeleton.style.display = 'none';
        mapBadge.classList.remove('hidden');
        // Invalidate size to ensure proper rendering
        setTimeout(() => map.invalidateSize(), 100);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            L.marker([latitude, longitude]).addTo(map)
              .bindPopup('You are here!')
              .openPopup();
            
            showMap();
          },
          () => {
            // Default to San Diego downtown
            map.setView([32.7157, -117.1611], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            L.marker([32.7157, -117.1611]).addTo(map)
              .bindPopup('San Diego - Enable location for your position')
              .openPopup();
            
            showMap();
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        // Geolocation not supported - default to San Diego
        map.setView([32.7157, -117.1611], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([32.7157, -117.1611]).addTo(map)
          .bindPopup('San Diego - Geolocation not supported')
          .openPopup();
        
        showMap();
      }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
      revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on load
  </script>

</body>
</html>
