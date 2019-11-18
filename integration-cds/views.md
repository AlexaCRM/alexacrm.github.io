---
title: Views
permalink: /integration-cds/views/
---

<p class="lead">Add views to your WordPress pages to display tabular data from CDS and Dynamics 365.</p>

## Introduction

Views are a concept in PowerApps and Dynamics 365 that allows listing entity records in tables. A view defines what data to show and in which order. **CDS Integration** allows to surface personal, system and public views on your WordPress website.

See [PowerApps documentation on views](https://docs.microsoft.com/en-us/powerapps/maker/model-driven-apps/create-edit-views).

## Use Twig to add a view table to a page

To add a view to the WordPress page, use the `view` tag in a Twig template. The two required parameters are `entity` for the logical name of the entity, e.g. `contact` or `account`, and `name` for the name of the view, e.g. `Active Contacts`. The plugin looks up both personal and system views. `vew` tag requires a closing tag, `endview`.

*Note:* you need to share personal views with the Application User that is used to connect WordPress to your CDS / Dynamics 365 organization.

{% raw %}
```twig
{% view entity="contact" name="Active Contacts" %}{% endview %}
```
{% endraw %}

### Add pagination to your view

By default, all available records below the system-imposed 5000 records are displayed. To enable pagination, specify the number of records per page in the `count` parameter.

{% raw %}
```twig
{% view entity="contact" name="Active Contacts" count=10 %}{% endview %}
```
{% endraw %}

### Change the language of column titles

If you have several languages installed in your organization, you can choose the language of column titles. Specify the LCID in the `language` attribute. 

{% raw %}
```twig
{% view entity="contact" name="Active Contacts" language=1043 %}{% endview %}
```
{% endraw %}

### Enable data caching

CDS Integration always caches the view definition. That includes the underlying FetchXML query and the list of columns. To further boost performance, you can enable caching for the records displayed in the view.

To cache the data in the view, specify the cache duration in the `cache` parameter. ISO 8601 duration format is accepted as a valid duration value.

*Note:* the plugin caches view data based on the resulting FetchXML on-demand. Two pages of the otherwise identical FetchXML query may be cached at different moments of time and get out of sync if data in the view is changed, e.g. records added or removed. Choose the cache duration value based on how frequently the data in CDS is updated. This behavior is subject to change in future versions.

{% raw %}
```twig
{% view entity="contact" name="Active Contacts" cache="P1DT12H" %}{% endview %}
```
{% endraw %}

## Parameterize your views

PowerApps and Dynamics 365 views are essentially FetchXML queries. You can parameterize the filter conditions contained in the view to decide which records to include.

We will assume a PowerApps view for an Invoice entity with two filter conditions: for Status Reason and for Customer. The `<filter/>` portion of the FetchXML is as follow:

```xml
<filter type="and" >
  <condition attribute="customerid" operator="eq" value="a83ec8e5-9e5e-47cd-b5a9-c2ee4eae42c5" />
  <condition attribute="name" operator="like" value="%Value%" />
</filter>
```

### Prepare the view for use

Before you substitute parameters, you need to change the existing condition values to [format items](https://docs.microsoft.com/en-us/dotnet/standard/base-types/composite-formatting), for example `{0}`. Instead of integers, you can use labels, e.g. `{status}`.

### Substitute parameter condition values

Use the `parameters` attribute to substitute condition values in the view FetchXML. It accepts an array of values. `{0}` is replaced with the 1st value, `{1}` is replaced with the 2nd value, and so on. If you used string labels, use a map instead: `{ "nameparam": 1 }`.

{% raw %}
```twig
{# Integer placeholders #}
{% view entity="invoice" name="Customer Invoices" parameters=[ params.name ] %}{% endview %}

{# String placeholders #}
{% view entity="invoice" name="Customer Invoices" parameters={ "nameparam": params.name } %}{% endview %}
```
{% endraw %}

### Substitute lookup condition values

You have to substitute lookup and optionset conditions separately because you cannot specify format items in Advanced Find. Substitution is performed by attribute name using the `lookups` parameter.

 {% raw %}
 ```twig
 {% view entity="contact" name="Active Contacts" lookups={ "customerid": user.id } %}{% endview %}
 ```
 {% endraw %}

## Display data using a custom template

By default, CDS Integration uses `view.twig` as a template. (See `/integration-cds/templates/twig/view.twig`.) You can define your own template inside between {% raw %}`{% view %}` and `{% endview %}`{% endraw %}.

`entityview` is the object exposed inside the template. It contains view data, configuration options and essential metadata required to render the template with CDS records. Following items are included in `entityview`:

- `columns` -- map of view column definitions. Logical names of column attributes are used as a key. Each object includes several fields:
  - `logical_name` -- logical name of the attribute.
  - `attribute_type` -- attribute type name, e.g. `String`, `Money`, `Customer`. Corresponds to [AttributeTypeName](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/attributemetadata?view=dynamics-ce-odata-9#properties).
  - `name` -- column label. Corresponds to [`UserLocalizedLabel`](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/label?view=dynamics-ce-odata-9#properties) of `DisplayName`. `LocalizedLabels` item with the corresponding language code is used if the `language` parameter has been specified.
  - `width` -- column width as set in [Dynamics 365](https://docs.microsoft.com/en-us/dynamics365/sales-professional/customize-views#set-column-width) 
- `records` -- map of Entity objects. Record GUID serves as map key.
- `total_records` -- total count of records in the view.
- `name` -- name of the view, e.g. `Active Contacts`.
- `entity_logical_name` -- logical name of the entity, e.g. `contact`.
- `primary_key_logical_name` -- logical name of the attribute that serves as record GUID, e.g. `contactid`. Corresponds to `PrimaryIdAttribute` entity metadata value.
- `first_page` -- number of the first page, starting with `1`. `NULL` if no results on the current page.
- `last_page` -- number of the last page. `NULL` if no results on the current page.
- `next_page` -- number of the next page. `NULL` if pagination is not enabled or no pages left.
- `previous_page` -- number of the previous page. `NULL if pagination is not enabled or no pages left.
- `page` -- current page number.
- `pages` -- array of all page numbers. Always returns an array, at least `[ 1 ]`.
- `page_size` -- number of records per page.
- `total_pages` -- total number of pages.
