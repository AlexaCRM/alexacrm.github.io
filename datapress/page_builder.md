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

You can configure fields which you want to display for an individual record. For example, if you go to **Contact records** and choose **Active contacts**:
* Click any record to open the post editing page.
* Add a Paragraph, Heading, or Image block.
* In the right-hand menu, go to the **Block** tab and click the **Settings** button.
* Click **Dataverse**.
* In the **BIND TO COLUMN** dropdown, choose the column you wish to display.
* Save changes.

This allows you to control the display of field values for an individual record.

---

## Building a Page with the Query Loop

### Step 1: Create a New Page
1. Go to **Pages** → **Add New**.
2. Insert the **Query Loop** block into the editor.
3. Select a predefined pattern or start with a blank layout.

### Step 2: Configure the Data Source
With the Query Loop block selected, open the **Block Settings** panel on the right:

* **Query Type**: Enable the **Custom Query** toggle.
* **Post Type**: Select the corresponding Dataverse table (e.g., *Table Name records*).
* **Items per page**: Adjust this to control how many records are loaded at once.
* **Filters**: Click **+** and select **Taxonomies**. In the **Table Name views** field, type the name of your chosen view.
* **Pagination**: If the selected view contains many records, add a **Pagination** block inside or below the Query Loop so all records are accessible.

When you preview the page, all records will be visible. You can click any record to see its field values. 

The link for an individual record follows this pattern:
`https://your-site.com/{table name}/{guid}`

**Example:**
`https://your-site.com/contact/1a1111df-0de4-ed11-8847-1122489804cd`

:::info
If the individual record links do not match this pattern, go to **Settings → Permalinks** in the WordPress Admin Area and scroll to **Dataverse records base slug**. Enter `/%table%/%guid%`.
:::

If you make settings for an individual record according to previous instruction you will see only selected fields values.
---

## Quick Example: Listing Contacts

To display a list of contacts from Dataverse:

1. Create a new page and add a **Query Loop** block.
2. In the block settings, set the **Post Type** to `Contact (contact) records`.
3. Set **Items per page** to `20`.
4. Add a **Pagination** block to the page.
5. Customize the inner blocks (Title, Excerpt, etc.) to map to your Dataverse fields.
6. **Publish** the page to view your live Dataverse records on the frontend.