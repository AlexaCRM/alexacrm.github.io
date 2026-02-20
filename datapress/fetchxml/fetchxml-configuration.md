---
title: FetchXML configuration
sidebar_position: 2
slug: /fetchxml-configuration
tags:
    - FetchXML
    - DataPress
keywords: [DataPress fetchXML] 
description: A concise guide to configuring FetchXML queries, templates, and filters in Twig with DataPress. 
---

## Configuration

### 1. FetchXML in Twig Templates

Use the `{% fetchxml %}` tag to run FetchXML queries inside Twig templates.

```twig
{% fetchxml collection="customers" cache="PT30M" %}
<fetch mapping="logical" returntotalrecordcount="true">
</fetch>
{% endfetchxml %}
```

**Attributes:**

- collection — required; name of the variable storing query results
- cache — optional; ISO‑8601 duration (e.g., PT30M for 30 minutes)

**Returned structure:**

- xml – query sent to Dataverse
- error – null or message
- results:

**entities** – array of records
**total_record_count** – total records (requires returntotalrecordcount="true")
**more_records** – indicates more pages
**paging_cookie** – for manual paging

### 2. Displaying Records

Use results.entities in a loop:

```twig
{% if customers.results.entities|length > 0 %}
  {% for row in customers.results.entities %}
      {{ row["name"] }}
  {% endfor %}
{% else %}
  No customers found.
{% endif %}
```

### 3. Linked Tables and Aliases

FetchXML supports joins through `<link-entity>`.

Alias the linked entity to access attributes:

```twig
{{ record["alias.attribute"] }}
```

Or alias individual attributes:

```
{{ record["cityname"] }}
```

:::warning
Avoid alias names that match existing column names to prevent conflicts.
:::

### 4. FetchXML Templates (Reusable)

Templates can be assigned to:

- page binding
- views
- lookup fields
- form global settings

Basic template example:

```
<fetch mapping="logical">
  /
</fetch>
```

Templates in views

Apply using:
`filter="TemplateName"`

**Template parameters (dynamic values)**

```twig
<filter>
  <condition attribute="address1_city" operator="eq" value="*city*" />
  <condition attribute="name" operator="eq" value="*name*" />
</filter>
```

Parameter values may come from defaults, forms, or page binding.

### 5. Templates for Lookup Fields (Forms)

To filter lookup values:

- Open **DataPress Admin Area**
- Go to **Forms Editor**
- Open your form → **Lookup Fields**
- Assign a FetchXML template

Global lookup filter:

- Set the template in **Forms Global Settings**

### 6. Using FormattedValues

Use FormattedValues to display user-friendly representations of fields such as option sets, dates, currency:

```
{% set record = accounts.results.entities[0] %}
{{ record.FormattedValues["cont.modifiedon"] }}
```