---
title: Page Builder
sidebar_position: 7
slug: /page-builder
tags:
  - Custom pages
  - Page Builder
  - DataPress
keywords: [Page Builder]
---

# Page Builder

## Overview

The Page Builder allows you to display **records from any Dataverse table** directly on your WordPress site.  
You can create fully customized pages using the built‑in **Query Loop** block and filter which Dataverse records appear.

Use this tool when you want to:

- Publish Dataverse table data on a public page  
- Display records using a selected view  
- Control filtering, pagination, and layout via Gutenberg

---

## Accessing Dataverse Tables

1. Open the **DataPress** menu in WordPress.  
2. Navigate to **Tables**.  
3. All available tables will be displayed. Select the tables you want to work with.  
4. Switch to the **Records** tab.  
5. Choose a table from the dropdown and click **Filter** to load its records.

This gives you a preview of the data that will later be displayed on pages.

---

## Creating a Page Using Query Loop

### Step 1 — Create a new page

1. Go to **Pages → Add New** in WordPress.  
2. Add the **Query Loop** block.

You can choose any of the predefined Query Loop patterns as a starting layout.

### Step 2 — Configure the Query Loop

Open the right‑side **Block Settings** panel and configure:

#### 1. **Query Type**
- Set **Query Type** → **Custom**
- Set **Post Type** → **Dataverse records**

#### 2. **Filters**
1. Expand the **Filters** section.  
2. Click the **Taxonomies** menu in the top-right corner of the Filters panel.  
3. Select:
   - **Table** you want to display  
   - **View** (optional) to limit which records appear  

#### 3. **Pagination**
- Adjust **Items per page** if you want to limit how many records appear at once.

---

## Example: Displaying Contacts from Dataverse

1. Create a new page  
2. Insert a **Query Loop** → choose a simple list layout  
3. In Settings:
   - **Custom Query**  
   - **Post Type: Dataverse records**  
4. Set Filters:
   - **Table: Contacts**  
   - **View: Active Contacts**  
5. Set **Items per page: 20**

Publish the page → it now shows Dataverse records directly on the site.
