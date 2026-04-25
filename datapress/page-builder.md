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
You can create fully customized pages using the built-in **Query Loop** block and filter which Dataverse records appear.

Use this tool when you want to:

- Publish Dataverse table data on a public page
- Display records using a selected view
- Control filtering, pagination, and layout via Gutenberg

---

## Configuring Dataverse Tables

Before displaying data, you must enable the desired tables within the DataPress settings:

1. Navigate to **DataPress → Manage Tables** in your WordPress admin dashboard.
2. Locate the tables you wish to use and select them.
3. Choose a specific **View** for each selected table and **save configurations**. You can select multiple views for each table.
4. Once saved, these tables will appear as sub-menus under the **DataPress** section.
5. Switch to the specific records tab (e.g., **Contact records**) to preview the data synchronized from Dataverse. Here you can switch between configured views and display records.

---

## Building a Page with the Query Loop

### Step 1: Create a New Page

1. Go to **Pages → Add New**.
2. Insert the **Query Loop** block into the editor.
3. Select a predefined pattern or start with a blank layout.

### Step 2: Configure the Data Source

With the **Query Loop** block selected, open the **Block Settings** panel on the right:

1. **Query Type**: Enable the **Custom Query** toggle.
2. **Post Type**: Select the corresponding Dataverse table (e.g., **`Table Name` records**).
3. **Pagination**: Adjust **Items per page** to control how many records are loaded at once.
4. **Filters**: Click **+** and select **Taxonomies**. In the **`Table Name` views** field, type the chosen view name.
5. **Pagination**: If the selected view contains many records, add a **Pagination** block to the page so all records are accessible.

When you preview the page, all records will be visible. You can click any record to see its field values.

The link for an individual record will follow this pattern:

```
https://your-site.com/{table-name}/{guid}
```

For example:

```
https://your-site.com/contact/1a1111df-0de4-ed11-8847-1122489804cd
```

:::tip
If the individual record links do not match this pattern, go to **Settings → Permalinks** in the WordPress Admin Area and scroll to **Dataverse records base slug**. Enter `/%table%/%guid%`.
:::

---

## Quick Example: Listing Contacts

To display a list of contacts from Dataverse:

1. Create a new page and add a **Query Loop** block.
2. In the block settings, set the **Post Type** to `Contact (contact) records`.
3. Set **Items per page** to `20`.
4. Add a **Pagination** block to the page.
5. Customize the inner blocks (Title, Excerpt, etc.) to map to your Dataverse fields.
6. **Publish** the page to view your live Dataverse records on the frontend.
