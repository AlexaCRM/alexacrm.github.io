---
title: Views
sidebar_position: 7
premium: true
slug: /views
tags:
  - Views
  - DataPress
keywords: [DataPress views]
description: How to display views on your WordPress site using DataPress, including view configuration, filtering, lookup substitution, and custom templates.
---

:::note
This is a premium feature. For more details see [Premium Edition](/extensions/gravity-forms).
:::

:::note
The plugin previously known as **Dataverse Integration** has been renamed to **DataPress**. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision. All references to Dataverse Integration in the documentation and UI will be updated to DataPress.
:::

<p class="lead">Display Dataverse and Dynamics 365 views (tabular lists of records) on your WordPress pages using DataPress.</p>

---

## Overview

*In this section, you'll learn what Views are and how DataPress uses them.*

**What are Views?**  
Views in Power Apps / Dynamics 365 are saved lists of records with predefined columns, filters, and sorting.

**What does DataPress do?**  
DataPress lets you embed these Dataverse views directly into WordPress pages using a Twig tag or Gutenberg block. You can:
- Show personal, system, or public views  
- Add pagination, caching, language selection  
- Filter views dynamically  
- Render custom layouts with Twig templates  

See also: [Power Apps documentation on views](https://docs.microsoft.com/en-us/powerappssive to the **premium extension** and requires a valid license.  
- If the premium plugin is not properly licensed, **syntax errors may occur**. Ensure the plugin is correctly licensed to maintain view functionality.  
- If you use **personal views**, share them with the **Application User** that connects WordPress to your Dataverse / Dynamics 365 organization.

### Prerequisites

- This feature requires the **premium extension** and an active license.
- Incorrect or missing license may cause syntax errors.
- Personal views must be **shared** with the Application User used by DataPress.

---

## Quick Start: Add a View with Twig

*In this section, you'll learn to display a Dataverse view using the Twig `view` tag.*

**Basic usage**

```twig
{% view entity="contact" name="Active Contacts" %}{% endview %}
```

## Parameters

**entity** — logical table name (e.g. `contact`)  
**name** — view display name (must match exactly)

```twig
{% view entity="contact" name="Active Contacts" %}{% endview %}
```

## Configuration

In this section, you'll learn to control pagination, language, caching, hyperlink formatting, and date/time behavior.

### Pagination

In this subsection, you'll learn to limit records per page and enable navigation.
By default, all available records below the system-imposed 5,000 limit are displayed. To enable pagination, specify the number of records per page with count:

```twig
{% view entity="contact" name="Active Contacts" count=10 %}{% endview %}
```

### Language

If you have several languages installed in your organization, you can choose the language of column titles. Specify the LCID in the `language` attribute ([see the link to choose language](https://docs.microsoft.com/en-us/openspecs/office_standards/ms-oe376/6c085406-a698-4e12-9d4d-c3b0ee3dbc4a)). 

```php
{% view entity="contact" name="Active Contacts" language=1043 %}{% endview %}
```

### Caching

DataPress (Dataverse Integration) plugin always caches the view definition. That includes the underlying FetchXML query and the list of columns. To further boost performance, you can enable caching for the rows displayed in the view.

To cache the data in the view, specify the cache duration in the `cache` parameter. ISO 8601 duration format is accepted as a valid duration value.

```php
{% view entity="contact" name="Active Contacts" cache="P1DT12H" %}{% endview %}
```

### How to display email and URL as active links

In this subsection, you'll learn to render email addresses and URLs as clickable links.

```
{% view entity="contact" name="Active Contacts" formatHyperlinks=true count=100 %}{% endview %}
```

### How to display date or date-time columns

When using the User Local behavior, columns will display date/time converted to the specified time zone in case of the Local option in **ICDS_DATETIME_VALUE**.

**Examples**

```
{# Convert date/time to the user's time zone #}
{% view entity="account" name="All Accounts" datetime='local' %}{% endview %}
```

```
{# Keep UTC values #}
{% view entity="account" name="All Accounts" datetime='utc' %}{% endview %}
```

| View Configuration              | Legacy                           | UTC                             | Local                                          |
|---------------------------------|----------------------------------|----------------------------------|------------------------------------------------|
| **view**                        | UTC                              | UTC                              | Converts the date and time to the user's timezone |
| **view with `datetime='utc'`**  | UTC                              | UTC                              | UTC                                            |
| **view with `datetime='local'`**| Converts date/time to user timezone | Converts date/time to user timezone | Converts date/time to user timezone |

[Usage Scenarios](/date-and-time/#usage-scenarios)

## Parameterize your views

*In this section, you'll learn to filter views dynamically using FetchXML templates and placeholders.*

**Concept**  
Power Apps / Dynamics 365 views are **FetchXML** queries. You can parameterize filter conditions and supply values at render time.

### 1 — Create a FetchXML template

- Go to **Templates → FetchXML Templates** in the DataPress (Dataverse Integration) plugin menu.  
- Click **Create new**.  
- Save the template **name** — you will use it when creating a page.

**Example (two conditions)**

```xml
<filter type="and">
  <condition attribute="customerid" operator="eq" value="a83ec8e5-9e5e-47cd-b5a9-c2ee4eae42c5" />
  <condition attribute="name" operator="like" value="%Value%" />
</filter>
```

**Example (single condition)**

```
<condition attribute="fullname" operator="like" value="%TestData%" />
```

### 2 — Use the template on a page

Go to **Pages → Add New** and insert:

```twig
{% view entity="contact" name="All Contacts" filter='templateName' %}{% endview %}
```

:::note
The template name must match exactly, including whitespaces.
If you add an extra space (for example, filter=' templateName'), the filter will not work and you will get all records instead.
:::

### 3 — Prepare the view for parameter substitution

Before substituting parameters, change the existing condition values to **format items**  
(Composite formatting).

**Example**  
In Power Apps, choose the **account** entity and the **Inactive Accounts** view and set filters:
- `Account Name` should be equal to `{0}`
- `Address 1: City` begins with `{1}`

You can also use string labels instead of integers, for example `{status}`.

### 4 — Substitute parameter values

Use the `parameters` attribute to substitute condition values in the view FetchXML. It accepts:
- an **array** for positional values (`{0}`, `{1}`, …)
- a **map** for named placeholders (`{city}`, `{status}`, …)

**Positional placeholders**

```twig
{# {0} → "Topiclounge", {1} → "Sydn" #}
{% view entity="account" name="Inactive Accounts" parameters=[ "Topiclounge", "Sydn" ] %}{% endview %}
```

**Named placeholders**

```
{# {accountName} → "param1", {city} → "param2" #}
{% view entity="account" name="Inactive Accounts" parameters={ "accountName": "param1", "city": "param2" } %}{% endview %}
```

**Dynamic examples**

```
{# Integer placeholders #}
{% view entity="invoice" name="Customer Invoices" parameters=[ params.name ] %}{% endview %}
```

```
{# String placeholders #}
{% view entity="invoice" name="Customer Invoices" parameters={ "nameparam": params.name } %}{% endview %}
```

## Substitute lookup condition values

You need to substitute lookup and optionset conditions separately because you cannot specify format items in Advanced Find. Substitution is performed by attribute name using the `lookups` parameter.

### Steps to Perform Lookup Substitution for a View

1. Go to Power Apps, find the necessary table, and create a new view.  
2. Add a filter for a lookup field.  
   For example, in the **account** table, filter the **Primary Contact** by the value “Mateo Passman”.  
3. If you want to substitute this value (e.g., to show accounts with “Amelita Ensten”), insert the view on a WordPress page and pass the target record GUID.

**Static GUID example**

```twig
{% view entity="account" name="account with lookup substitution"
   lookups={ "parentcustomerid": "97737487-742e-ed11-9db1-00224893bd2f" } %}
{% endview %}
```

## Dataverse view block

To simplify work with views, you can use the **Dataverse view** block in the WordPress editor.  
This block allows you to:

- Select the **table** and **view name** from dropdown menus  
- Set **cache duration** (seconds)  
- Change the **language** (LCID)  
- Define the **page size** (must be an odd number)  
- Choose a **FetchXML template** for additional filtering  
- Provide **lookup substitutions**  
- Provide **parameter substitutions**

**Lookup substitution example**

```json
{ "parentcustomerid": "97737487-742e-ed11-9db1-00224893bd2f" }
```

**Parameter substitution example**

```
{ "accountName": "param1Value", "city": "param2Value" }
```

### Display data using a custom template


By default, DataPress (Dataverse Integration) uses `view.twig` as a template. (See `/integration-cds/templates/twig/view.twig`.) You can define your own template inside between `{% view %}` and `{% endview %}`.

You can access the base view via ssh or ftp by navigating to `{your_wordpress_site_path}/wp-content/plugins/integration-cds/templates/twig/view.twig`. Below you can see the description of the variables present in the file.

`entityview` is the object exposed inside the template. It contains view data, configuration options and essential metadata required to render the template with Dataverse rows. Following items are included in `entityview`:

- `columns` -- map of view column definitions. Logical names of column attributes are used as a key. Each object includes several columns:
  - `logical_name` -- logical name of the column.
  - `attribute_type` -- column type name, e.g. `String`, `Money`, `Customer`. Corresponds to [AttributeTypeName](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/attributemetadata?view=dynamics-ce-odata-9#properties).
  - `name` -- column label. Corresponds to [`UserLocalizedLabel`](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/label?view=dynamics-ce-odata-9#properties) of `DisplayName`. `LocalizedLabels` item with the corresponding language code is used if the `language` parameter has been specified.
  - `width` -- column width as set in [Dynamics 365](https://docs.microsoft.com/en-us/dynamics365/sales-professional/customize-views#set-column-width).
- `records` -- map of Entity objects. Record GUID serves as map key.
- `total_records` -- total count of rows in the view.
- `name` -- name of the view, e.g. `Active Contacts`.
- `entity_logical_name` -- logical name of the entity, e.g. `contact`.
- `primary_key_logical_name` -- logical name of the column that serves as record GUID, e.g. `contactid`. Corresponds to `PrimaryIdAttribute` entity metadata value.
- `first_page` -- number of the first page, starting with `1`. `NULL` if no results on the current page.
- `last_page` -- number of the last page. `NULL` if no results on the current page.
- `next_page` -- number of the next page. `NULL` if pagination is not enabled or no pages left.
- `previous_page` -- number of the previous page. `NULL` if pagination is not enabled or no pages left.
- `page` -- current page number.
- `pages` -- array of all page numbers. Always returns an array, at least `[ 1 ]`.
- `page_size` -- number of rows per page.
- `total_pages` -- total number of pages.

**Custom template example**

```
{% view entity="account" name="Active Accounts" %}
  <table>
    <thead>
      <tr>
        {% for col_name, col in entityview.columns %}
          <th>{{ col.name }}</th>
        {% endfor %}
      </tr>
    </thead>
    <tbody>
      {% for id, record in entityview.records %}
        <tr>
          {% for col_name, col in entityview.columns %}
            <td>{{ record[col_name] }}</td>
          {% endfor %}
        </tr>
      {% endfor %}
    </tbody>
  </table>
{% endview %}
```

## Troubleshooting & Tips

- If the premium license is not properly activated, syntax errors may appear.
- The view name must match exactly, including spaces.
- Personal views must be shared with the Application User.
- Reduce or clear cache if the data is outdated.
- Ensure that the LCID used for the language parameter is installed in your Dataverse environment.