---
title: Table Binding
sidebar_position: 1
premium: true
slug: /binding/table-binding
tags:
  - Table binding
  - DataPress
keywords: [DataPress Table binding, Table Binding]
---

:::note
The plugin previously known as Dataverse Integration has been renamed to **DataPress**.  
All references to “Dataverse Integration” in the documentation and user interface are being updated to DataPress.
:::

<p class="lead">Link WordPress pages to Dataverse tables to provide direct access to your organization data.</p>

## Introduction

:::info
Premium feature! This feature is available in the premium extension.
:::

**What Table Binding does**
- Links a WordPress post/page to a specific Dataverse **table** and a **current record**.
- Exposes the current record to **Twig**, **forms**, views, and other DataPress services.
- Removes repetitive page‑level scaffolding when you would otherwise run a FetchXML on each page.

**Why use it**
- Single‑record pages (e.g., “Invoice View”) selected by a GUID or alternate keys.
- Forms that **update/create** the **current** record without extra configuration.
- **Conditional access** to restrict who can view a given table row.

**Quick payoff (Twig on a bound page)**

```twig
<h2>{{ binding.record["name"] }}</h2>
<p>Owner: {{ binding.record["ownerid.name"] }}</p>
```

---

## Understand table binding

- Data in Dataverse is organized in **tables** (e.g., contacts, leads, invoices).
- A typical scenario: a WordPress page displays a single record of one table type (e.g., one invoice); which record to show is determined by the URL or custom logic.
- While you can achieve similar behavior with a FetchXML query, Table Binding:
  - centralizes **how** the current record is selected;
  - makes the current record available to **Twig** and **forms** via a global object;
  - integrates with other plugin features (e.g., views, conditional access).

When table binding is enabled for a WordPress post, a **current record** object is established.  
It contains a **Table object** with the column values of the bound table row (record). In Twig, the current record is exposed via the global object `binding.record`. The type of table binding determines how the right record is picked per request.

---

## Types of table binding

<div class="text--center"> 
<img src="/images/table-binding-mode.png" alt="table binding mode" width="700" />
</div>

**Available options**
- **Via GUID in query string**  
  Reads a GUID from a URL query parameter you choose in binding options.  
  Example URL (parameter `id`):  
  `https://example.com/sample-page/?id=00000000-0000-0000-0000-000000000000`

- **Via alternate key in query string**  
  Uses the table’s configured alternate key; you provide query parameter names for the key columns.  
  Example URL (parameters `attr1` and `attr2`):  
  `https://example.com/sample-page/?attr1=val1&attr2=val2`

- **Via custom code**  
  Resolve the record programmatically using two WordPress filters:  
  `integration-cds/binding/custom/target-{$postId}` and `integration-cds/binding/custom/url-{$postId}`  
  (where `{$postId}` is the WordPress post ID of the bound page).

**When to use which**
- GUID in query — canonical “record details” pages and predictable URLs.
- Alternate key — human‑friendly URLs or when integrating with external systems using business keys.
- Custom code — complex routing rules, SSO scenarios, or non‑URL selection logic.

---

## Conditional access

In many scenarios, you will want to limit which table rows a user can access (e.g., self‑service portals where users should only see **their** invoices).

**How it works**
- Provide a **FetchXML** query (it is a **Twig template**) that determines the relationship between the requested table row and the current visitor.
- Access is **granted** if the evaluated query returns **at least one** row.
- The template can reference:
  - `binding` — the current record context,
  - `user` — the current user context (if User Binding is implemented).

**Minimal example** (grants access only if the current user’s contact is related to the requested account):
```xml
<fetch mapping="logical">
  <entity name="contact">
    <attribute name="contactid" />
    <filter>
      <condition attribute="contactid" operator="eq" value="{{ user.reference.Id }}" />
    </filter>
    <link-entity name="account" from="primarycontactid" to="contactid">
      <filter>
        <condition attribute="accountid" operator="eq" value="{{ binding.reference.Id }}" />
      </filter>
    </link-entity>
  </entity>
</fetch>
```

## Evaluation logic

Access to the post is **allowed** if:
- Binding is not configured, **or**
- Binding is configured, **and**
  - Conditional access is not enabled, **or**
  - Conditional access is enabled, **and**
    - The query template is empty (not configured), **or**
    - The evaluated template becomes empty, **or**
    - The evaluated query returns a non‑empty collection

Access to the post is **not allowed** if:
- Binding is configured, **and**
  - Conditional access is enabled, **and**
    - The query template is not empty, **and**
      - Dataverse connection is not configured, **or**
      - The evaluated query returns an empty collection, **or**
      - Query failed

How to use FetchXML template and view

---

## Configure global binding settings

Open **Settings UI → Binding** to configure global options.

### Choose post types to allow binding
- WordPress has built‑in post types (posts, pages), and plugins may add custom post types.
- Select which post types should be eligible for Table Binding.

### Choose default posts for bound Dataverse tables
- Several features (including views and the `entity_url()` Twig filter) may link table references to **bound** WordPress posts.
- In WordPress, table binding is a many‑to‑many association. In global settings you can choose the **default post** for each bound table.
- Bind a post to a table **at least once** before it appears in the dropdown.

:::note
**Configure Binding Settings for a page**

The first time you configure binding, the page selector may be disabled.  
In that case:

1) Go to WordPress and open the page you want to bind.  
2) Click **Configure binding** and choose the table to take data from.  
3) Return to the Dataverse Admin Area → **Binding → Page Binding** and select the page name.
:::

---

## Configure post binding

1. Open the list for the post type you need (e.g., **All Posts**, **All Pages**, or a custom post type).
2. Hover a post and click **Configure Binding** → **Setup binding**.
3. Choose the **table** from the dropdown.
4. Choose **how** to select the record (see “Types of table binding” above) and set the options.
5. Click **Save**.

All bound posts display a small Dynamics 365 logo beside the post title.

---

## Implement custom binding

If you choose binding **via custom code**, implement these two filter hooks:

- `integration-cds/binding/custom/target-{$postId}`  
  **Expects:** a Table object or `NULL`.  
  **Also receives:** `$target` (string) — logical name of the target table.

- `integration-cds/binding/custom/url-{$postId}`  
  **Expects:** a string containing a URL to the bound post or `NULL`.  
  **Also receives:** `WP_Post` `$post` and TableReference `$ref`.  
  You should return a URL that displays `$ref` on the requested bound page.

---

## Implement conditional access

Enable conditional access on the page by checking the option and pasting a **FetchXML** query in the textarea.

- The query is a **Twig template**; all usual Twig constructs, objects, filters and functions are available.
- Members of the `binding` object refer to the **current record**; members of the `user` object refer to the **current user** if User Binding is implemented.

**Sample template stub**

It grants access only to users which are bound to contacts which in turn belong to the requested Account.

```xml
<fetch version="1.0" output-format="xml-platform" mapping="logical" >
  <entity name="contact" >
    <attribute name="emailaddress1" />
    <attribute name="contactid" />
    <filter>
      <condition attribute="contactid" operator="eq" value="{{user.reference.Id}}" />
    </filter>
    <link-entity name="account" from="accountid" to="parentcustomerid" >
      <filter>
        <condition attribute="accountid" operator="eq" value="{{binding.reference.Id}}" />
      </filter>
    </link-entity>
  </entity>
</fetch>
```

More examples: [FetchXML templates](/fetchxml-examples)

## Use table binding on your website

- Manage page binding in **WordPress Admin → Bindings → Page Binding**.
- You can choose any page for any table; by default, only the **contact** table is visible.
- To make additional tables available in the selector:
  1) Create a new page in WordPress.  
  2) Click **Configure Binding** on that page.  
  3) Select the Dataverse table you want to bind.  
  4) After saving, the table will appear in **Bindings → Page Binding**.

Information retrieved via table binding is commonly used with forms to **update the current record (row)**.  
See **Forms documentation** for details.

**Accessing current record in Twig**
```twig
{{ binding.record["fullname"] }}
```

[More Twig usage examples](/twig/examples)

---

## Troubleshooting


1. URL looks correct but displays a different record
- Verify that the page’s binding configuration matches the URL method (GUID vs alternate key).


2. Access is unexpectedly denied
- Inspect the evaluated Twig/FetchXML template used for conditional access.
- Confirm that the template produces a valid query and returns rows.
- Check Dataverse connection status if the query fails.


3. Record fields do not display
- Ensure the column logical names are correct.
- Confirm that the current user has permission to read the record in Dataverse.