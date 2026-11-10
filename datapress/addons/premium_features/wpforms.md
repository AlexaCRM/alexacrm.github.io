---
title: WPForms
sidebar_position: 5
premium: true
slug: /forms/wpforms
tags:
    - WPForms
    - DataPress
keywords: [WPForms, create DataPress form with WPForms]    
description: Details of supporting WPForms with Universal Capture integration.
---

:::note
This is a premium feature. For more details see [Premium Edition](/premium-edition).
:::

<p class="lead">Use WPForms to build forms that submit data to Dataverse using Universal Capture.</p>

## Introduction

DataPress integrates with **WPForms**, one of the most popular form builders for WordPress. This integration allows you to leverage WPForms' intuitive interface to create forms that submit data directly to Dataverse using the **Universal Capture** method.

### Supported Features

- **Universal Capture integration** — all form submissions are processed asynchronously and stored in a dedicated Dataverse table
- **Intuitive form builder** — use WPForms' drag-and-drop interface to design your forms
- **Flexible field mapping** — map WPForms fields to Dataverse table columns
- **Reliable data collection** — asynchronous processing ensures no data loss

:::info
Currently, DataPress supports **Universal Capture** submission method for WPForms. This method is ideal for comprehensive data collection and automation scenarios.
:::

---

## Configuration

### Step 1: Create a WPForm

1. Navigate to **WPForms** → **Add New** in your WordPress admin panel
2. Choose a form template or start from scratch
3. Add the necessary fields to your form
4. Assign clear titles and labels to each field for better clarity
5. Save your form

### Step 2: Enable Universal Capture

To connect your WPForm to Dataverse with Universal Capture:

1. Open your WPForm for editing
2. Go to **Settings** → **General**
3. Scroll down to the **Advanced section**
4. **Enable Universal Capture** by checking the corresponding option
5. Configure the field mapping to Dataverse table columns
6. Save your settings

---

## How Universal Capture Works with WPForms

When a user submits a WPForm integrated with DataPress:

1. **Form submission** — user fills out and submits the form
2. **Asynchronous processing** — the submission is queued for background processing
3. **Data storage** — all form data is sent to a dedicated Dataverse table
4. **Non-blocking** — the user receives immediate feedback without waiting for Dataverse processing

This ensures a smooth user experience and reliable data collection, even under high traffic.

---

