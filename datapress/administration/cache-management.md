---
title: Cache Management
sidebar_position: 1
slug: /administration/cache
tags:
    - Cache
    - DataPress
keywords: [DataPress cache]   
description: This page explains how caching works in DataPress and how you can configure it to improve performance or debug your site. 
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">This page describes how to manage caching, including force disabling caching, configuring cache storage, and clearing the cache.</p>


## Overview

DataPress caches responses received from Dataverse to reduce API calls and speed up page loads.  
On this page you can:

- Temporarily **disable** caching for debugging
- Choose **cache storage**
- **Clear** cache globally or by type
- Configure **per-entity (table)** cache rules
- Override cache for **forms**, **views**, and **fetchXML** inline

**How it works (at a glance):**
1. A DataPress component (form/view/fetchXML) requests data.
2. Cache layer checks if a valid cached copy exists.
3. If **hit** → return fast from cache.
4. If **miss** → pull from Dataverse → store in cache → return result.

---

## Configuration

> You’ll find most settings in the **Admin Area → Cache** section.

### Disable caching (for debugging)

:::warning
Disabling caching forces each request to call Dataverse directly. This can significantly slow down pages and increase API consumption.  
Use **only** for short-term debugging and avoid leaving it enabled in production.
:::

1. Go to **Admin Area → Cache**  
2. Find **`ICDS_DISABLE_CACHE`**  
3. **Enable** it to disable all caching (i.e., every request will go directly to Dataverse)

---

### Choose cache storage

1. Go to **Admin Area → Status → Advanced settings**  
2. Set **`ICDS_CACHE_STORAGE`** to **`Files`**

**Why “Files”?**  
- Required for the **cache clearing** feature to function reliably  
- Recommended for consistent behavior across environments

> Other storage backends may be available in your build, but **Files** is the recommended and supported choice for stable cache clearing.

---

### Clear cache

Go to **Admin Area → Cache** to:

- **Clear all cache** — removes all cached items
- **Clear cache by type** — removes only a specific category (e.g., entities/tables, views, forms, fetchXML)

> For best results, ensure **`ICDS_CACHE_STORAGE = Files`** before clearing the cache.

---

### Per-entity (table) cache settings

Set different durations for different tables:

1. Go to **Admin Area → Cache → Entity Cache Settings**  
2. Click **Add** / **Create rule**  
3. Choose a **table** (entity)  
4. Set a **cache duration** in **ISO 8601** format (e.g., `PT30M`, `P1DT12H`)  
5. Save

**When to use:**  
- High-churn data → shorter duration (e.g., `PT10M`)  
- Read-mostly data → longer duration (e.g., `P1D` or `P3D`)

---

### Per-form / per-view overrides

You can override cache duration directly in your markup.

**Form (example, cache for 1 day 10 hours):**
```twig
{% form id=42 cache='P1DT10H' %}
```

**View (example, cache for 1 day 12 hours):**

```
{% view entity="contact" name="Active Contacts" cache="P1DT12H" %}{% endview %}
```

**fetchXML overrides**

Add a cache attribute to your fetchXML block:

```
{% fetchxml collection="customers" cache="PT30M" %}
<fetch mapping='logical' returntotalrecordcount='true'>
  <!-- your fetch definition here -->
</fetch>
{% endfetchxml %}
```

## Notes

### Settings

#### `ICDS_DISABLE_CACHE`

**Type:** Boolean  
**Default:** `false`  
**Location:** Admin Area → Cache 
**Description:** When enabled, all caching is turned off. Every request is sent directly to Dataverse.  
**Use when:** Debugging or validating live data. Not recommended for long-term use in production.

---

#### `ICDS_CACHE_STORAGE`
**Type:** Enum  
**Default:** `Files`  
**Location:** Admin Area → Cache 
**Description:** Determines where cached data is stored.  
**Recommended value:** `Files` — required for the cache clearing function to work reliably.

---

#### Entity Cache Settings
**Type:** Duration (ISO 8601)  
**Default:** none  
**Location:** Admin Area → Cache → Entity Cache Settings  
**Description:** Allows defining a custom cache duration for specific tables (e.g., `PT30M`, `P1D`).  
**Use when:** Dataset update frequency differs per table.

---

#### Component-level `cache` attribute
**Type:** Duration (ISO 8601)  
**Location:** Inline in forms, views, and fetchXML components  
**Description:** Overrides the cache duration for a specific instance of a component.

**Example:**
```twig
{% form id=42 cache="P1DT10H" %}
```

### Precedence Rules

Caching configuration in DataPress follows this order of priority:

1. **Global disable (`ICDS_DISABLE_CACHE`)**  
   When this option is enabled, *all caching is turned off*, regardless of any other settings.

2. **Component-level `cache` attribute**  
   A cache duration specified directly in a form, view, or fetchXML tag overrides all entity-level and system-level cache durations.

3. **Entity Cache Settings**  
   Cache rules defined per entity/table are applied when no component-level override exists.

4. **System defaults**  
   If no custom configuration is provided, DataPress uses its internal default caching behavior.

### ISO 8601 Duration Guide

Durations in DataPress must follow the **ISO 8601** format.  
A duration is built using the letters **P** (period) and **T** (time), followed by numeric values.

**Common examples:**

- 30 minutes — `PT30M`
- 1 hour — `PT1H`
- 1 day — `P1D`
- 1 day 12 hours — `P1DT12H`
- 3 days — `P3D`
- 2 weeks — `P2W`
- 2 hours 30 minutes — `PT2H30M`

**Format rules:**

- Every duration must **start with `P`**
- If a time part is included, it must be prefixed with **`T`**
- Valid patterns include:
  - `P<n>D` (days)
  - `P<n>W` (weeks)
  - `PT<n>H` (hours)
  - `PT<n>M` (minutes)
  - `PT<n>S` (seconds)
  - Combinations like `P<n>DT<n>H`, `PT<n>H<n>M`, etc.

**Structure template:**

ISO 8601 duration values follow this structural pattern:

`PnYnMnDTnHnMnS`

Where:

- **`P`** — required prefix (period)
- **`<date>`** — can include:
  - `nW` — weeks
  - `nD` — days
- **`T`** — separates date and time parts (only needed if `<time>` is used)
- **`<time>`** — can include:
  - `nH` — hours
  - `nM` — minutes
  - `nS` — seconds

**Examples based on the template:**

P3D        → 3 days
PT30M      → 30 minutes
P1DT2H     → 1 day and 2 hours
PT1H15M    → 1 hour and 15 minutes