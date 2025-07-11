---
title: Views
sidebar_position: 5
premium: true
slug: /views
tags:
    - Views
    - DataPress
keywords: [DataPress views]  
---

:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Add views to your WordPress pages to display tabular data from Dataverse and Dynamics 365.</p>

## Introduction

:::info

This feature is exclusive to the premium extension.

Licensing Requirement

If the premium plugin is not properly licensed, syntax errors may occur. Ensure the plugin is correctly licensed to maintain view functionality.

:::

Views are a concept in PowerApps and Dynamics 365 that allows listing table records in tables. A view defines what data to show and in which order. **Dataverse Integration** allows to surface personal, system and public views on your WordPress website.

See [PowerApps documentation on views](https://docs.microsoft.com/en-us/powerapps/maker/model-driven-apps/create-edit-views).

## Use Twig to add a view table to a page

To add a view to the WordPress page, use the `view` tag in a Twig template. The two required parameters are `entity` for the logical name of the table, e.g. `contact` or `account`, and `name` for the name of the view, e.g. `Active Contacts`. The plugin looks up both personal and system views. `vew` tag requires a closing tag, `endview`.

*Note:* you need to share personal views with the Application User that is used to connect WordPress to your Dataverse / Dynamics 365 organization.

```php
{% view entity="contact" name="Active Contacts" %}{% endview %}
```

### Add pagination to your view

By default, all available records below the system-imposed 5000 records are displayed. To enable pagination, specify the number of records per page in the `count` parameter.

```php
{% view entity="contact" name="Active Contacts" count=10 %}{% endview %}
```

### Change the language of column titles

If you have several languages installed in your organization, you can choose the language of column titles. Specify the LCID in the `language` attribute ([see the link to choose language](https://docs.microsoft.com/en-us/openspecs/office_standards/ms-oe376/6c085406-a698-4e12-9d4d-c3b0ee3dbc4a)). 

```php
{% view entity="contact" name="Active Contacts" language=1043 %}{% endview %}
```

### Enable data caching

DataPress (Dataverse Integration) plugin always caches the view definition. That includes the underlying FetchXML query and the list of columns. To further boost performance, you can enable caching for the rows displayed in the view.

To cache the data in the view, specify the cache duration in the `cache` parameter. ISO 8601 duration format is accepted as a valid duration value.

*Note:* the plugin caches view data based on the resulting FetchXML on-demand. Two pages of the otherwise identical FetchXML query may be cached at different moments of time and get out of sync if data in the view is changed, e.g. rows added or removed. Choose the cache duration value based on how frequently the data in Dataverse is updated. This behavior is subject to change in future versions.

```php
{% view entity="contact" name="Active Contacts" cache="P1DT12H" %}{% endview %}
```

## Parameterize your views

PowerApps and Dynamics 365 views are essentially FetchXML queries. You can parameterize the filter conditions contained in the view to decide which rows to include.

To create filter you should go to Templates -> FetchXML Templates in DataPress (Dataverse Integration) plugin menu. Then you click `create new` button. Save the template name to use it when you create page.

We will assume a PowerApps view for an Invoice entity with two filter conditions: for Status Reason and for Customer. The `<filter/>` portion of the FetchXML is as follow:

```
<filter type="and" >
  <condition attribute="customerid" operator="eq" value="a83ec8e5-9e5e-47cd-b5a9-c2ee4eae42c5" />
  <condition attribute="name" operator="like" value="%Value%" />
</filter>
```

If you want to filter using only one condition you can type text like this one:
```
<condition attribute="fullname" operator="like" value="%TestData%" />
```

Then Go to Pages -> Add New and type:

```php
{% view entity="contact" name="All Contacts" filter='templateName' %}{% endview %}
```

Note: It's important for the name to match including whitespaces. If you add an extra space, for example `filter=' templateName'`, your filter won't work and you will get all records instead.

### Prepare the view for use

Before you substitute parameters, you need to change the existing condition values to [format items](https://docs.microsoft.com/en-us/dotnet/standard/base-types/composite-formatting).
For example, you go to your crm admin, choose an entity(in this example - account) and a view (in this example - Inactive Accounts) and set filters: `Account Name` should be equal to `{0}` parameter, `Address 1: City` begins with `{1}` parameter. 

Then Go to WordPress, click Pages -> Add New and type:

```php
{% view entity="account" name="Inactive Accounts" parameters={ "0": "Voomm", "1": "Manyana" } %}{% endview %}
```

When you click `Preview` you will see only records with `Voomm` Account name and the city, which begins with `Manyana` letters.
Instead of integers, you can use labels, e.g. `{status}`.

### Substitute parameter condition values

Use the `parameters` attribute to substitute condition values in the view FetchXML. It accepts an array of values. `{0}` is replaced with the 1st value, `{1}` is replaced with the 2nd value, and so on. If you used string labels, use a map instead: `{ "nameparam": 1 }`.

```php
{# Integer placeholders #}
{% view entity="invoice" name="Customer Invoices" parameters=[ params.name ] %}{% endview %}

{# String placeholders #}
{% view entity="invoice" name="Customer Invoices" parameters={ "nameparam": params.name } %}{% endview %}
```

This is an example from previous situation:

```php
{# Integer placeholders #}
{% view entity="account" name="Inactive Accounts" parameters=[ "Topiclounge", "Sydn" ] %}{% endview %}
```

If we change `{0}` parameter to `accountName`, `{1}` to `city`, our example will contain next text:

```php
{# String placeholders #}
{% view entity="account" name="Inactive Accounts" parameters={ "accountName": "param1", "city": "param2" } %}{% endview %}
```

### Substitute lookup condition values

You need to substitute lookup and optionset conditions separately because you cannot specify format items in Advanced Find. Substitution is performed by attribute name using the lookups parameter.

**Steps to Perform Lookup Substitution for a View:**

1. Go to Power Apps, find the necessary table, and create a new view.
2. Add a filter for a lookup field. For example, in the account table, you can filter the Primary Contact by the value “Mateo Passman”. This will display only accounts with Mateo Passman as the primary contact. If you want to substitute this value to display accounts with “Amelita Ensten” as the primary contact, follow the next step:
- Create a page with the Dataverse view block and set the Amelita Ensten record GUID as shown in the example:

```php
{ "primarycontactid": "97737487-742e-ed11-9db1-00224893bd2f" }
```
 
Alternatively, use the **view** tag in a Twig template:

```php
{% view entity="account" name="account with lookup substitution" lookups={ "parentcustomerid": "97737487-742e-ed11-9db1-00224893bd2f" }%}{% endview %}
 ```

Example Using **user.id**:

```php
{% view entity="contact" name="Active Contacts" lookups={ "customerid": user.id } %}{% endview %}
 ```

## How to display email and url as active links

To display email addresses and URLs as active links, set the formatHyperlinks option to true. Otherwise, they will appear as plain text.

```php
{% view entity="contact" name="Active Contacts" formatHyperlinks=true  count=100 %}{% endview %}
```
## How to display date or date-time column

When using the **User Local** behavior, all columns will display date or date-time columns converted to the specified time zone in case of the **Local** option in `ICDS_DATETIME_VALUE`. [More details](/datapress/administration/troubleshooting.md) 

**Examples:**

To get the value of a date column and convert it to the user's time zone, use:

```php
{% view entity="account" name="All Accounts" datetime = 'local' %} {% endview %}
```

To get the value of a date column in UTC, use:

```php
{% view entity="account" name="All Accounts" datetime = 'utc' %} {% endview %}
```

**Comparison Table**

|                 | Legacy     |  UTC              | Local  |
|-----------------|------------|-------------------|--------|
|view | UTC  | UTC | convert the date and time to the user's timezone |
|view with datetime = 'utc' | UTC  | UTC | UTC |
|view with datetime = 'local' | convert the date and time to the user's timezone  | convert the date and time to the user's timezone | convert the date and time to the user's timezone |

[Usage Scenarios](/date-and-time/#usage-scenarios)

## Display data using a custom template

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


## Dataverse view block

To simplify your work with views, you can utilize the Dataverse view block while editing a page. In this block, you have the option to select the table and view name from dropdown menus.

Additionally, you can adjust the cache time in seconds or change the language for the view.

The page size determines the number of records displayed on each page. The number of pages is displayed digitally at the bottom of the screen. Please note that when entering a value in the text field, it must be an odd number.

To further filter the view, you can choose a fetchXML template from the dropdown menu.

If you want to filter the view based on a lookup, enter a similar value in the lookups substitution textbox. Ensure you have a filter set in the view settings in Power Apps:

```php
{ "parentcustomerid": "97737487-742e-ed11-9db1-00224893bd2f" }
 ```

In the case of variables in a view, you can input values in the parameters substitution textbox:

```php
{ "accountName": "param1Value", "city": "param2Value" }
 ```