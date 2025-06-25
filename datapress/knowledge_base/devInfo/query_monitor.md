---
title: Troubleshooting Form Performance with Query Monitor
sidebar_position: 9
slug: /knowledge-base/query-monitor
tags:
  - performance
  - diagnostics
  - QueryMonitor
---

# Troubleshooting Form Performance Using Query Monitor

When dealing with slow or unresponsive forms, identifying the performance bottlenecks is crucial. This guide shows how to use **Query Monitor** and browser developer tools to find where time is being spent during form rendering and submission.


## Monitoring Page Execution Time with Query Monitor

If you're logged in as an **admin user**, Query Monitor will automatically be visible in the WordPress admin bar. Here's how to check page performance:

### 1. Open the Query Monitor Console
- Navigate to the page in question (where the form is rendered).
- In the top admin bar, click **Query Monitor** to open the console.

### 2. Use the **Timings** Tab
- Go to the **Timings** tab, located in the dropdown menu at the top of the Query Monitor panel.
- This view shows a breakdown of page load execution time, including:
  - Template rendering
  - Hooks and filters
  - Custom PHP functions
- Use this to identify which parts of the form consume the most time during page load or form submission.

>  This is especially helpful for diagnosing heavy server-side logic or misbehaving third-party plugins that impact initial form rendering.


## Analyzing Form Submission via AJAX

For forms submitted with JavaScript (AJAX), Query Monitor won’t directly capture the performance inside the admin bar. Instead, use your browser’s **Developer Tools**.

### 1. Open the Browser Developer Console
- Press **F12** or right-click → **Inspect** → **Console** tab.

### 2. Look for ICDS Debug Entries
- During the form submission process, look under the **Info** level messages in the Console.
- Entries with the prefix `ICDS:` will show execution time.

### 3. Cross-Reference with Network Tab (Optional)
- Use the **Network** tab to find the specific AJAX request made during submission.
- Check timing breakdown: **Waiting (TTFB)**, **Content Download**, and **Total** time.


## ✅ Summary

| Tool | Use Case | Visibility |
|------|----------|------------|
| **Query Monitor (Timings Tab)** | Page load rendering (form output and template performance) | Admin users only |
| **Browser Console (ICDS prefix)** | AJAX form submission and server-side profiling | All users via dev tools |
| **Network Tab** | Detailed HTTP request timing | All users via dev tools |

