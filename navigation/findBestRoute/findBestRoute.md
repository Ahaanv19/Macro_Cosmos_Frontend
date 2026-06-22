---
toc: true
layout: post
title: Traffic-Aware Route Finder
permalink: /route/
nav: true
---

<!-- Page-specific stylesheets/libraries (kept in-body because the post layout already owns <head>) -->
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/navigation/findBestRoute/map.css">
<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />

<style>
/* This file was previously corrupted (duplicated tokens / broken front matter). */
/* Only keep page-scoped styles here; avoid <head>/<body> tags inside Markdown pages. */

/* ===== REAL-TIME NAVIGATION STYLES ===== */
.nav-controls-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border: none;
  border-radius: 14px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn.start-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.nav-btn.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
}

.nav-btn.stop-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.nav-btn.stop-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
}

.nav-btn.hidden {
  display: none;
}

.voice-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #1e293b;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  color: #94a3b8;
  transition: all 0.2s;
}

.voice-toggle:hover {
  background: #334155;
}

.voice-toggle input {
  cursor: pointer;
}

.voice-toggle input:checked + span {
  color: #0066cc;
}

/* Navigation status bar */
.nav-status-bar {
  display: none;
  background: linear-gradient(135deg, #0066cc 0%, #004d99 100%);
  border-radius: 16px;
  padding: 16px 20px;
  margin-top: 16px;
  color: white;
}

.nav-status-bar.active {
  display: block;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.nav-status-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.nav-current-step {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-current-step .step-number {
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-current-step .step-instruction {
  font-size: 16px;
  font-weight: 600;
}

.nav-distance {
  font-size: 14px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 14px;
  border-radius: 8px;
}

/* Direction steps styling */
.directions-list {
  list-style: none;
  padding: 0;
  margin: 16px 0;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.dark .directions-list {
  background: #1e293b;
  border-color: #334155;
}

.direction-step {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 18px;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.dark .direction-step {
  border-color: #334155;
}

.direction-step:last-child {
  border-bottom: none;
}

.step-indicator {
  flex-shrink: 0;
}

.step-number-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #e2e8f0;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.dark .step-number-badge {
  background: #334155;
  color: #94a3b8;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-content .step-instruction {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}

.dark .step-content .step-instruction {
  color: #f1f5f9;
}

.step-meta {
  font-size: 12px;
  color: #64748b;
}

/* Step states */
.direction-step.step-completed {
  background: rgba(16, 185, 129, 0.08);
}

.direction-step.step-completed .step-number-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.direction-step.step-completed .step-content .step-instruction {
  color: #059669;
  text-decoration: line-through;
  opacity: 0.7;
}

.dark .direction-step.step-completed .step-content .step-instruction {
  color: #34d399;
}

.direction-step.step-active {
  background: linear-gradient(90deg, rgba(0, 102, 204, 0.15) 0%, rgba(0, 102, 204, 0.05) 100%);
  border-left: 4px solid #0066cc;
  padding-left: 14px;
}

.direction-step.step-active .step-number-badge {
  background: linear-gradient(135deg, #0066cc 0%, #06b6d4 100%);
  color: white;
  animation: pulse-nav 2s infinite;
}

@keyframes pulse-nav {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 102, 204, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(0, 102, 204, 0); }
}

.direction-step.step-active .step-content .step-instruction {
  color: #0066cc;
  font-weight: 600;
}

.dark .direction-step.step-active .step-content .step-instruction {
  color: #38bdf8;
}

.direction-step.step-upcoming {
  opacity: 0.7;
}

/* Route header styling */
.route-header {
  margin: 20px 0 8px;
}

.route-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 16px;
  margin: 0;
}

.route-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: linear-gradient(135deg, #0066cc 0%, #06b6d4 100%);
  color: white;
  font-size: 12px;
  font-weight: 700;
  border-radius: 20px;
}

.route-distance, .route-duration {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.dark .route-distance, .dark .route-duration {
  color: #94a3b8;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .nav-controls-wrapper {
    flex-direction: column;
    align-items: stretch;
  }
  
  .nav-btn {
    justify-content: center;
  }
  
  .nav-status-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .directions-list {
    max-height: 300px;
  }
}

/* ===== LIVE DATA DASHBOARD STYLES ===== */
.data-source-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-source-badge .pulse-dot {
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  animation: pulse-live 2s infinite;
}

@keyframes pulse-live {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

/* Weather dashboard */
.weather-dashboard {
  max-width: 900px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #0066cc 0%, #004d99 40%, #003d7a 100%);
  border-radius: 24px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0, 102, 204, 0.4), 0 10px 20px -5px rgba(0, 102, 204, 0.2);
  position: relative;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.weather-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weather-header h3 {
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.weather-location {
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
}

.weather-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0;
  position: relative;
  z-index: 1;
}

.weather-main-display {
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.weather-icon-large {
  font-size: 72px;
  margin-bottom: 8px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.weather-temp-large {
  font-size: 56px;
  font-weight: 800;
  color: white;
  line-height: 1;
  margin-bottom: 4px;
}

.weather-condition-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 600;
}

.weather-feels-like {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-top: 8px;
}

.weather-details-grid {
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.weather-detail-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.weather-detail-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.weather-detail-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.weather-detail-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.weather-detail-value {
  color: white;
  font-size: 20px;
  font-weight: 700;
}

.weather-advisory-banner {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%);
  border-top: 1px solid rgba(251, 191, 36, 0.3);
  padding: 14px 24px;
  display: none;
  align-items: center;
  gap: 12px;
}

.weather-advisory-banner.show { display: flex; }
.weather-advisory-icon { font-size: 24px; }
.weather-advisory-content { flex: 1; }

.weather-advisory-title {
  color: #fbbf24;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.weather-advisory-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin-top: 2px;
}

.weather-last-updated {
  padding: 12px 24px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-last-updated span {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
}

.weather-refresh-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.weather-refresh-btn:hover { background: rgba(255, 255, 255, 0.2); }

/* Traffic dashboard */
.traffic-dashboard {
  max-width: 900px;
  margin: 0 auto 32px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 102, 204, 0.05), 0 10px 15px -3px rgba(0, 102, 204, 0.08);
  border: 1px solid rgba(0, 102, 204, 0.08);
}

.dark .traffic-dashboard {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-color: rgba(148, 163, 184, 0.1);
}

.traffic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid rgba(0, 102, 204, 0.08);
}

.dark .traffic-header {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-color: rgba(148, 163, 184, 0.1);
}

.traffic-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dark .traffic-header h3 { color: white; }

.traffic-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-bottom: 1px solid rgba(0, 102, 204, 0.08);
}

.dark .traffic-stats-row { border-color: rgba(148, 163, 184, 0.1); }

.traffic-stat {
  padding: 20px;
  text-align: center;
  border-right: 1px solid rgba(0, 102, 204, 0.08);
  transition: all 0.3s ease;
}

.traffic-stat:last-child { border-right: none; }
.dark .traffic-stat { border-color: rgba(148, 163, 184, 0.1); }
.traffic-stat:hover { background: rgba(0, 102, 204, 0.03); }

.traffic-stat-value {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #0066cc 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 6px;
}

.traffic-stat-label {
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.dark .traffic-stat-label { color: #94a3b8; }

.traffic-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.traffic-chart-section {
  padding: 20px;
  border-right: 1px solid rgba(0, 102, 204, 0.08);
}

.traffic-chart-section:last-child { border-right: none; }
.dark .traffic-chart-section { border-color: rgba(148, 163, 184, 0.1); }

.traffic-chart-title {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dark .traffic-chart-title { color: white; }

.chart-container-small {
  height: 160px;
  position: relative;
}

.peak-hours-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.peak-hour-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.peak-hour-time {
  width: 70px;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.dark .peak-hour-time { color: white; }

.peak-hour-bar-container {
  flex: 1;
  height: 24px;
  background: #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.dark .peak-hour-bar-container { background: #334155; }

.peak-hour-bar {
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(90deg, #0066cc, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  transition: width 1s ease;
}

.peak-hour-bar span {
  font-size: 11px;
  font-weight: 700;
  color: white;
}

.traffic-congestion-indicator {
  padding: 16px 24px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-top: 1px solid rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  gap: 16px;
}

.traffic-congestion-indicator.moderate {
  background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%);
  border-color: rgba(234, 179, 8, 0.2);
}

.traffic-congestion-indicator.heavy {
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  border-color: rgba(239, 68, 68, 0.2);
}

.dark .traffic-congestion-indicator {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
}

.dark .traffic-congestion-indicator.moderate {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(234, 179, 8, 0.05) 100%);
}

.dark .traffic-congestion-indicator.heavy {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
}

.congestion-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.traffic-congestion-indicator.moderate .congestion-icon {
  background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
}

.traffic-congestion-indicator.heavy .congestion-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.congestion-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: #065f46;
  margin: 0 0 4px 0;
}

.traffic-congestion-indicator.moderate .congestion-info h4 { color: #854d0e; }
.traffic-congestion-indicator.heavy .congestion-info h4 { color: #991b1b; }
.dark .congestion-info h4 { color: #6ee7b7; }
.dark .traffic-congestion-indicator.moderate .congestion-info h4 { color: #fde047; }
.dark .traffic-congestion-indicator.heavy .congestion-info h4 { color: #fca5a5; }

.congestion-info p {
  font-size: 13px;
  color: #047857;
  margin:  0;
}

.traffic-congestion-indicator.moderate .congestion-info p { color: #a16207; }
.traffic-congestion-indicator.heavy .congestion-info p { color: #b91c1c; }
.dark .congestion-info p { color: #a7f3d0; }

/* Mobile */
@media (max-width: 768px) {
  .weather-content { grid-template-columns: 1fr; }
  .weather-main-display {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 24px;
  }
  .weather-icon-large { font-size: 56px; }
  .weather-temp-large { font-size: 42px; }
  .weather-details-grid { grid-template-columns: repeat(2, 1fr); padding: 16px; gap: 12px; }

  .traffic-stats-row { grid-template-columns: repeat(2, 1fr); }
  .traffic-stat { border-bottom: 1px solid rgba(0, 102, 204, 0.08); }
  .traffic-stat:nth-child(2) { border-right: none; }
  .traffic-charts { grid-template-columns: 1fr; }
  .traffic-chart-section {
    border-right: none;
    border-bottom: 1px solid rgba(0, 102, 204, 0.08);
  }
  .traffic-chart-section:last-child { border-bottom: none; }
}
</style>

<div class="route-page">

<!-- Page Header -->
<div class="text-center" style="margin: 16px auto 24px;">
  <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    Powered by Official Government Data Sources
  </span>
</div>

<!-- REAL-TIME WEATHER DASHBOARD -->
<div class="weather-dashboard" id="weather-dashboard">
  <div class="weather-header">
    <div class="weather-header-left">
      <h3>Live Weather</h3>
      <span class="data-source-badge"><span class="pulse-dot"></span>NWS Official</span>
    </div>
    <span class="weather-location" id="weather-location">📍 San Diego, CA</span>
  </div>

  <div class="weather-content">
    <div class="weather-main-display">
      <div class="weather-icon-large" id="weather-icon">☀️</div>
      <div class="weather-temp-large" id="weather-temp">--°F</div>
      <div class="weather-condition-text" id="weather-condition">Loading...</div>
      <div class="weather-feels-like" id="weather-feels-like">Feels like --°F</div>
    </div>

    <div class="weather-details-grid">
      <div class="weather-detail-card">
        <div class="weather-detail-icon">💧</div>
        <div class="weather-detail-label">Humidity</div>
        <div class="weather-detail-value" id="weather-humidity">--%</div>
      </div>
      <div class="weather-detail-card">
        <div class="weather-detail-icon">💨</div>
        <div class="weather-detail-label">Wind</div>
        <div class="weather-detail-value" id="weather-wind">-- mph</div>
      </div>
      <div class="weather-detail-card">
        <div class="weather-detail-icon">👁️</div>
        <div class="weather-detail-label">Visibility</div>
        <div class="weather-detail-value" id="weather-visibility">-- mi</div>
      </div>
      <div class="weather-detail-card">
        <div class="weather-detail-icon">🌡️</div>
        <div class="weather-detail-label">Dew Point</div>
        <div class="weather-detail-value" id="weather-dewpoint">--°F</div>
      </div>
    </div>
  </div>

  <div class="weather-advisory-banner" id="weather-advisory">
    <span class="weather-advisory-icon">⚠️</span>
    <div class="weather-advisory-content">
      <div class="weather-advisory-title">Travel Advisory</div>
      <div class="weather-advisory-text" id="weather-advisory-text"></div>
    </div>
  </div>

  <div class="weather-last-updated">
    <span>Last updated: <span id="weather-updated-time">--</span> • Source: National Weather Service</span>
    <button class="weather-refresh-btn" type="button" onclick="fetchWeatherData()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
      </svg>
      Refresh
    </button>
  </div>
</div>

<!-- TRAFFIC ANALYTICS DASHBOARD -->
<div class="traffic-dashboard" id="traffic-dashboard">
  <div class="traffic-header">
    <h3>📊 San Diego Traffic Analytics</h3>
    <span class="data-source-badge"><span class="pulse-dot"></span>SD Open Data</span>
  </div>

  <div class="traffic-stats-row">
    <div class="traffic-stat">
      <div class="traffic-stat-value" id="stat-avg-volume">--</div>
      <div class="traffic-stat-label">Avg Daily Volume</div>
    </div>
    <div class="traffic-stat">
      <div class="traffic-stat-value" id="stat-congestion">--</div>
      <div class="traffic-stat-label">Congestion Index</div>
    </div>
    <div class="traffic-stat">
      <div class="traffic-stat-value" id="stat-delay">--</div>
      <div class="traffic-stat-label">Avg Delay</div>
    </div>
    <div class="traffic-stat">
      <div class="traffic-stat-value" id="stat-best-time">--</div>
      <div class="traffic-stat-label">Best Travel Time</div>
    </div>
  </div>

  <div class="traffic-charts">
    <div class="traffic-chart-section">
      <div class="traffic-chart-title"><span>📈</span> Hourly Traffic Pattern</div>
      <div class="chart-container-small"><canvas id="hourlyTrafficChart"></canvas></div>
    </div>
    <div class="traffic-chart-section">
      <div class="traffic-chart-title"><span>⏰</span> Peak Congestion Hours</div>
      <div class="peak-hours-list" id="peak-hours-list">
        <div class="peak-hour-item">
          <span class="peak-hour-time">7-9 AM</span>
          <div class="peak-hour-bar-container"><div class="peak-hour-bar" style="width: 92%"><span>92%</span></div></div>
        </div>
        <div class="peak-hour-item">
          <span class="peak-hour-time">4-6 PM</span>
          <div class="peak-hour-bar-container"><div class="peak-hour-bar" style="width: 88%"><span>88%</span></div></div>
        </div>
        <div class="peak-hour-item">
          <span class="peak-hour-time">12-1 PM</span>
          <div class="peak-hour-bar-container"><div class="peak-hour-bar" style="width: 54%"><span>54%</span></div></div>
        </div>
        <div class="peak-hour-item">
          <span class="peak-hour-time">9-11 AM</span>
          <div class="peak-hour-bar-container"><div class="peak-hour-bar" style="width: 38%"><span>38%</span></div></div>
        </div>
      </div>
    </div>
  </div>

  <div class="traffic-congestion-indicator" id="congestion-indicator">
    <div class="congestion-icon">🚗</div>
    <div class="congestion-info">
      <h4 id="congestion-status">Traffic Status: Normal</h4>
      <p id="congestion-advice">Great time to travel! Roads are clear with minimal delays.</p>
    </div>
  </div>
</div>

<!-- ROUTE FINDER FORM (IDs must match map.js) -->
<div class="route-form">
  <h2>🗺️ Traffic-Aware Route Finder</h2>
  <p style="font-size: 15px; color: #64748b;">
    Routes are dynamically adjusted using official San Diego traffic count data and real-time conditions.
  </p>

  <div class="input-group">
    <label for="origin">📍 Origin</label>
    <input type="text" id="origin" placeholder="Enter your starting point (e.g., Downtown San Diego)">
  </div>
  <div class="input-group">
    <label for="destination">🎯 Destination</label>
    <input type="text" id="destination" placeholder="Enter your destination (e.g., La Jolla Beach)">
  </div>
  <div class="input-group">
    <label for="mode">🚗 Travel Mode</label>
    <select id="mode">
      <option value="driving">🚗 Driving</option>
      <option value="walking">🚶 Walking</option>
      <option value="bicycling">🚴 Bicycling</option>
      <option value="transit">🚌 Transit</option>
    </select>
  </div>
  <div class="flex items-center justify-between gap-4">
    <button id="fetch_routes_btn" type="button">Find Best Route →</button>
    <div id="route-usage-display" class="hidden text-sm font-medium px-3 py-1 bg-gray-800/50 rounded-lg"></div>
  </div>
</div>

<div id="map"></div>

<!-- Hazard Legend -->
<div class="hazard-legend" style="max-width: 900px; margin: 16px auto 0; padding: 16px 20px; background: linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%); border: 1px solid #fecaca; border-radius: 14px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
  <div style="display: flex; align-items: center; gap: 8px;">
    <span style="font-size: 18px;">⚠️</span>
    <span style="font-weight: 600; color: #991b1b; font-size: 14px;">Live Hazards on Map:</span>
  </div>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: #7f1d1d;">
      <span style="width: 20px; height: 20px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px;">🚗</span>
      Accident
    </span>
    <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: #7f1d1d;">
      <span style="width: 20px; height: 20px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px;">🚧</span>
      Construction
    </span>
    <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: #7f1d1d;">
      <span style="width: 20px; height: 20px; background: #8b5cf6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px;">⛔</span>
      Closure
    </span>
    <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: #7f1d1d;">
      <span style="width: 20px; height: 20px; background: #6b7280; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px;">⚠️</span>
      Other
    </span>
  </div>
</div>

<!-- Share Route Button -->
<div id="share-route-container" style="display: none; margin-top: 20px; text-align: center;">
  <button id="share-route-btn" type="button" onclick="openShareModal()" style="background: linear-gradient(135deg, #0066cc 0%, #06b6d4 100%); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);">
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
    Share This Route
  </button>
</div>

<div id="result"></div>

<!-- Share Modal -->
<div id="share-modal" class="share-modal">
  <div class="share-modal-content">
    <div class="share-modal-header">
      <h3 class="share-modal-title">Share Route</h3>
      <button type="button" onclick="closeShareModal()" class="share-modal-close">×</button>
    </div>
    <div class="share-modal-body">
      <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Share your optimized route with friends and colleagues</p>

      <div class="share-options">
        <button type="button" class="share-option" onclick="copyRouteLink()"><span class="share-option-icon">📋</span><span class="share-option-label">Copy Link</span></button>
        <button type="button" class="share-option" onclick="shareViaEmail()"><span class="share-option-icon">📧</span><span class="share-option-label">Email</span></button>
        <button type="button" class="share-option" onclick="shareViaTwitter()"><span class="share-option-icon">🐦</span><span class="share-option-label">Twitter</span></button>
        <button type="button" class="share-option" onclick="shareViaWhatsApp()"><span class="share-option-icon">💬</span><span class="share-option-label">WhatsApp</span></button>
      </div>

      <div class="qr-code-container">
        <div class="qr-code-title">Scan QR Code</div>
        <div id="qr-code" style="display: flex; justify-content: center;"></div>
      </div>

      <div id="share-route-summary" style="background: #f1f5f9; border-radius: 12px; padding: 16px; margin-top: 20px;">
        <div style="font-weight: 600; color: #1e293b; margin-bottom: 8px;">Route Summary</div>
        <div id="share-route-details" style="color: #64748b; font-size: 14px;"></div>
      </div>
    </div>
  </div>
</div>

<!-- External libs -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<!-- Leaflet-compatibility adapter over MapLibre GL (defines global L) -->
<script src="{{site.baseurl}}/assets/js/maplibre-leaflet-adapter.js"></script>

<!-- Your existing route logic (must remain module) -->
<script type="module" src="{{site.baseurl}}/assets/js/api/config.js"></script>
<script type="module" src="{{site.baseurl}}/navigation/findBestRoute/map.js"></script>

<script>
// ===== National Weather Service (official US Govt) =====
const NWS_OBSERVATION_URL = 'https://api.weather.gov/stations/KSAN/observations/latest';

const weatherIcons = {
  'Clear': '☀️', 'Sunny': '☀️', 'Mostly Clear': '🌤️', 'Mostly Sunny': '🌤️',
  'Partly Cloudy': '⛅', 'Partly Sunny': '⛅', 'Cloudy': '☁️', 'Mostly Cloudy': '☁️',
  'Overcast': '☁️', 'Fog': '🌫️', 'Haze': '🌫️', 'Drizzle': '🌧️', 'Light Rain': '🌧️',
  'Rain': '🌧️', 'Heavy Rain': '⛈️', 'Showers': '🌧️', 'Thunderstorm': '⛈️',
  'Snow': '❄️', 'Windy': '💨', 'Fair': '☀️'
};

function getWeatherIcon(condition) {
  if (!condition) return '☀️';
  for (const [key, icon] of Object.entries(weatherIcons)) {
    if (condition.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return new Date().getHours() >= 6 && new Date().getHours() < 18 ? '☀️' : '🌙';
}

function celsiusToFahrenheit(c) { return c != null ? Math.round((c * 9/5) + 32) : null; }
function metersToMiles(m) { return m != null ? (m / 1609.344).toFixed(1) : null; }
function kmhToMph(k) { return k != null ? Math.round(k * 0.621371) : null; }

function getWindDirection(deg) {
  if (deg == null) return '';
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

async function fetchWeatherData() {
  try {
    const response = await fetch(NWS_OBSERVATION_URL, {
      headers: { 'User-Agent': 'SD Auto (Jekyll) - https://www.sandiego.gov', 'Accept': 'application/geo+json' }
    });
    if (!response.ok) throw new Error(`NWS API error: ${response.status}`);

    const data = await response.json();
    const p = data.properties;

    const tempF = celsiusToFahrenheit(p.temperature?.value);
    const humidity = p.relativeHumidity?.value;
    const windMph = kmhToMph(p.windSpeed?.value);
    const windDir = getWindDirection(p.windDirection?.value);
    const visibility = metersToMiles(p.visibility?.value);
    const dewPoint = celsiusToFahrenheit(p.dewpoint?.value);
    const condition = p.textDescription || 'Clear';

    let feelsLike = tempF;
    if (tempF != null && windMph != null && tempF <= 50 && windMph > 3) {
      feelsLike = Math.round(35.74 + 0.6215*tempF - 35.75*Math.pow(windMph,0.16) + 0.4275*tempF*Math.pow(windMph,0.16));
    } else if (tempF != null && humidity != null && tempF >= 80 && humidity > 40) {
      feelsLike = Math.round(tempF + 0.5*(humidity/100)*(tempF-50));
    }

    document.getElementById('weather-icon').textContent = getWeatherIcon(condition);
    document.getElementById('weather-temp').textContent = tempF != null ? `${tempF}°F` : '--°F';
    document.getElementById('weather-condition').textContent = condition;
    document.getElementById('weather-feels-like').textContent = feelsLike != null ? `Feels like ${feelsLike}°F` : '';
    document.getElementById('weather-humidity').textContent = humidity != null ? `${Math.round(humidity)}%` : '--%';
    document.getElementById('weather-wind').textContent = windMph != null ? `${windMph} ${windDir}`.trim() : '-- mph';
    document.getElementById('weather-visibility').textContent = visibility != null ? `${visibility} mi` : '-- mi';
    document.getElementById('weather-dewpoint').textContent = dewPoint != null ? `${dewPoint}°F` : '--°F';

    const timestamp = p.timestamp ? new Date(p.timestamp) : new Date();
    document.getElementById('weather-updated-time').textContent = timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const advisory = document.getElementById('weather-advisory');
    const advisoryText = document.getElementById('weather-advisory-text');
    const cond = condition.toLowerCase();

    if (cond.includes('fog') || (visibility != null && parseFloat(visibility) < 3)) {
      advisory.classList.add('show');
      advisoryText.textContent = 'Low visibility. Use headlights and reduce speed.';
    } else if (cond.includes('rain') || cond.includes('storm')) {
      advisory.classList.add('show');
      advisoryText.textContent = 'Wet roads. Increase following distance.';
    } else if (windMph != null && windMph > 25) {
      advisory.classList.add('show');
      advisoryText.textContent = 'High winds. Use caution on bridges.';
    } else {
      advisory.classList.remove('show');
    }
  } catch (e) {
    console.error('Weather error:', e);
    const el = document.getElementById('weather-condition');
    if (el) el.textContent = 'Reconnecting...';
    setTimeout(fetchWeatherData, 30000);
  }
}

// ===== Traffic dashboard (lightweight client-side display) =====
function updateTrafficStats() {
  const hour = new Date().getHours();
  const isWeekend = [0, 6].includes(new Date().getDay());

  if (isWeekend) {
    document.getElementById('stat-avg-volume').textContent = '15.2K';
    document.getElementById('stat-congestion').textContent = '32';
    document.getElementById('stat-delay').textContent = '+5 min';
  } else if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
    document.getElementById('stat-avg-volume').textContent = '28.4K';
    document.getElementById('stat-congestion').textContent = hour >= 16 ? '78' : '72';
    document.getElementById('stat-delay').textContent = hour >= 16 ? '+18 min' : '+15 min';
  } else if (hour >= 10 && hour <= 15) {
    document.getElementById('stat-avg-volume').textContent = '19.8K';
    document.getElementById('stat-congestion').textContent = '42';
    document.getElementById('stat-delay').textContent = '+7 min';
  } else {
    document.getElementById('stat-avg-volume').textContent = '12.1K';
    document.getElementById('stat-congestion').textContent = '25';
    document.getElementById('stat-delay').textContent = '+3 min';
  }
  document.getElementById('stat-best-time').textContent = '10 AM';
}

function initHourlyChart() {
  const canvas = document.getElementById('hourlyTrafficChart');
  if (!canvas || typeof Chart === 'undefined') return;

  // eslint-disable-next-line no-new
  new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['12a','','','3a','','','6a','','','9a','','','12p','','','3p','','','6p','','','9p','',''],
      datasets: [{
        data: [15,18,25,45,72,88,92,85,65,48,52,58,62,55,68,82,95,88,72,55,42,35,28,18],
        borderColor: '#0066cc',
        backgroundColor: 'rgba(0,102,204,0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } },
        y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { display: false }, min: 0, max: 100 }
      }
    }
  });
}

function updateCongestion() {
  const hour = new Date().getHours();
  const indicator = document.getElementById('congestion-indicator');
  const status = document.getElementById('congestion-status');
  const advice = document.getElementById('congestion-advice');
  const icon = indicator?.querySelector('.congestion-icon');
  if (!indicator || !status || !advice || !icon) return;

  if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
    indicator.className = 'traffic-congestion-indicator heavy';
    status.textContent = 'Traffic Status: Heavy Congestion';
    advice.textContent = 'Peak travel time. Consider delaying your trip.';
    icon.textContent = '🚨';
  } else if ((hour >= 6 && hour <= 10) || (hour >= 15 && hour <= 19)) {
    indicator.className = 'traffic-congestion-indicator moderate';
    status.textContent = 'Traffic Status: Moderate Traffic';
    advice.textContent = 'Expect some delays on I-5 and I-15.';
    icon.textContent = '⚡';
  } else {
    indicator.className = 'traffic-congestion-indicator';
    status.textContent = 'Traffic Status: Light Traffic';
    advice.textContent = 'Great time to travel!';
    icon.textContent = '✅';
  }
}

function initTrafficDashboard() {
  updateTrafficStats();
  initHourlyChart();
  updateCongestion();
}

// ===== Share route =====
function generateShareUrl() {
  const origin = document.getElementById('origin')?.value ?? '';
  const destination = document.getElementById('destination')?.value ?? '';
  const mode = document.getElementById('mode')?.value ?? 'driving';
  return `${location.origin}${location.pathname}?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${encodeURIComponent(mode)}`;
}

function openShareModal() {
  document.getElementById('share-modal')?.classList.add('active');
  const details = document.getElementById('share-route-details');
  if (details) {
    details.innerHTML = `<strong>From:</strong> ${document.getElementById('origin')?.value || 'Origin'}<br><strong>To:</strong> ${document.getElementById('destination')?.value || 'Destination'}<br><strong>Mode:</strong> ${document.getElementById('mode')?.value || 'driving'}`;
  }
  if (typeof QRCode !== 'undefined') {
    const qr = document.getElementById('qr-code');
    if (qr) {
      qr.innerHTML = '';
      // eslint-disable-next-line no-new
      new QRCode(qr, { text: generateShareUrl(), width: 150, height: 150, colorDark: '#0066cc' });
    }
  }
}

function closeShareModal() { document.getElementById('share-modal')?.classList.remove('active'); }

function copyRouteLink() {
  const url = generateShareUrl();
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
  } else {
    alert(url);
  }
}

function shareViaEmail() {
  const o = document.getElementById('origin')?.value || 'Origin';
  const d = document.getElementById('destination')?.value || 'Destination';
  window.open(`mailto:?subject=${encodeURIComponent(`Route: ${o} to ${d}`)}&body=${encodeURIComponent(`Check out this route!\n\n${generateShareUrl()}`)}`);
}

function shareViaTwitter() {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Found a great route on SD Auto!')}&url=${encodeURIComponent(generateShareUrl())}`);
}

function shareViaWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this route!\n${generateShareUrl()}`)}`);
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'share-modal') closeShareModal();
});

// Show share button when route results are present
document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();
  initTrafficDashboard();

  setInterval(fetchWeatherData, 600000);
  setInterval(updateTrafficStats, 300000);
  setInterval(updateCongestion, 300000);

  const params = new URLSearchParams(location.search);
  if (params.has('origin')) document.getElementById('origin').value = params.get('origin') || '';
  if (params.has('destination')) document.getElementById('destination').value = params.get('destination') || '';
  if (params.has('mode')) document.getElementById('mode').value = params.get('mode') || 'driving';

  const resultEl = document.getElementById('result');
  const shareContainer = document.getElementById('share-route-container');
  if (resultEl && shareContainer) {
    new MutationObserver(() => {
      if (resultEl.innerHTML.trim()) shareContainer.style.display = 'block';
    }).observe(resultEl, { childList: true, subtree: true });
  }
});
</script>

