---
sidebar_position: 5
title: Using Twig - old
slug: /twig/introduction
tags:
    - Twig
    - DataPress
keywords: [DataPress twig]  
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Use Twig templates to create custom layouts. Access your Dataverse data and metadata in Twig to share your data with your users.</p>

## Introduction

**DataPress (Dataverse Integration)** employs [Twig](https://twig.symfony.com/) to make most data-rich layout jobs effortless.

On this page you can find information about custom Twig features that Integration DataPress (Dataverse Integration) brings. Please refer to [Twig documentation](https://twig.symfony.com/doc/2.x/templates.html) to learn about its templating capabilities.

## Runtime settings

Twig in DataPress (Dataverse Integration) supports debug mode and template caching.

- Debug mode allows using `dump()` to print information about Twig objects using PHP `var_dump()`. It is enabled in [WordPress debug mode](https://wordpress.org/support/article/debugging-in-wordpress/) (`WP_DEBUG`) or if `ICDS_TWIG_DEBUG` is *true*.
- Template caching enhances page rendering performance. Enabled if `ICDS_TWIG_CACHE` is *true*.

## Supporting Mobile-Detect

The `MobileDetect` class contains various functions for detecting mobile devices and browsers. [Read more](https://github.com/serbanghita/Mobile-Detect)

```twig
isMobile: {% if isMobile %} Yes! {% else %} No! {% endif %}<br/>

isChrome: {% if isChrome %} Yes! {% else %} No! {% endif %}<br/>

isFirefox: {% if isFirefox %} Yes! {% else %} No! {% endif %}<br/>
```

:::tip Intellisense

Intellisense for working with the mobile detection methods is available in the `Dataverse Twig` block after typing `{{`.

:::


## Global objects

DataPress (Dataverse Integration) makes several new global objects available in the Twig environment.

### Access the current bound record 

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

:::info
Premium feature! This feature is available in the premium extension.
:::

Use the `binding` object to access table binding on the current page. See [table binding](/datapress/binding/table-binding.md).

`binding` includes several properties:

- `is_bound` -- *(boolean)* whether current page supports table binding.
- `reference` -- *(EntityReference)* reference to the bound record.
- `record` -- *(Entity)* bound record object.

Notice that `binding.record` is more expensive performance-wise -- it retrieves data from Dataverse. `binding.reference` only
reads the local database and request parameters to calculate the entity reference.

```twig
{% if binding.is_bound %}
  {% set contact = binding.record %}
  {{ contact["fullname"] }} <{{ contact["emailaddress1"] }}>
{% endif %}
```

If `ICDS_COMPATIBLE_BINDING` flag is set to *true* you can use the `currentrecord` variable that refers to the `binding.record`. This is intended mostly for backward compatibility with previous versions of the plugin and should not be used in general.

```twig
{% if binding.is_bound %}
  {{ currentrecord["fullname"] }} <{{ currentrecord["emailaddress1"] }}>
{% endif %}
```

### Access the current user record 

The user object allows you to check whether the current user is bound and access their associated Dataverse record values. For more details, see [user binding](/datapress/binding/user-binding.md).


The following object members are available:

- `is_bound` -- *(boolean)* Indicates whether the current user is bound.
- `reference` -- *(EntityReference)* Provides a reference to the bound record.
- `record` -- *(Entity)* Represents the bound record object.
- `wp_user` -- *(WP_User)* Contains information about the current WordPress user.
- `timezone`-- Returns the timezone for the current user. The timezone should not be null and typically returns as a string. Example output: **America/New_York**, **UTC**. The format "Asia/Tokyo" is known as an [**IANA time zone name**](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). The exact format depends on how the timezone is stored and managed in your WordPress setup. If you need to convert or manipulate this value further, you can use additional Twig filters or functions as needed. If user timezone is not specified, it returns the actual site zone.
- `locale` -- Return locale for the current user. Example output: **en_GB**

**Performance Considerations**

- **user.record** retrieves data directly from Dataverse, making it more resource-intensive.

- **user.reference** derives the entity reference from the local database and request parameters, offering a more efficient solution.

**Example: Displaying User Full Name**

```twig
{% if user.is_bound %}
  {{ user.record["fullname"] }}
{% endif %}
```

**Example: Formatting Date with User Locale and Timezone**

```twig
{{ "now"|format_datetime('short', 'short', locale: user.locale, timezone: user.timezone) }} 
```

### Access any record in your Dataverse instance

Use the `entities` object to access any record in your Dataverse instance by its table logical name and GUID. All record fields are available at once.

```twig
{{ entities.contact["00000000-0000-0000-0000-000000000000"]["fullname"] }}
```

### Access the list of tables in your Dataverse instance

`entities_list` contains a map of all tables in your Dataverse instance. It maps logical names to display names.

### Access your Dataverse Integration organization metadata

`metadata` object allows accessing metadata of your Dataverse instance. It follows the interface of `EntityMetadata` in XRM SDK. See [Microsoft reference docs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.metadata.entitymetadata).

```twig
{% set options = metadata["contact"].Attributes["gendercode"].OptionSet.Options %}
{% for option in options %}
  <li>{{option.Value}} - {{option.Label.UserLocalizedLabel.Label}}</li>
{% endfor %}
```

### Get site timezone and locale

Use the `site` object to get the site's locale or timezone:

- `timezone`-- Returns the timezone for the site. The format "Asia/Tokyo" is known as an [**IANA time zone name**](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). The exact format depends on how the timezone is stored and managed in your WordPress setup (**Settings** -> **General**). 
- `locale` -- Returns the locale for the site.

### Get current timestamp

`now` contains the value of PHP function [`time()`](https://www.php.net/manual/en/function.time.php) at the moment of Twig environment initialization.

### Specify fields to display

When using the `expand` filter, you can specify which fields to display. If you don’t specify any fields, all of them will be selected. Fields are specified as an array or a comma-delimited string.

```twig
{%  set contact = entities.contact['ea8157fa-cc32-ef11-8409-000d3a38d58d']|expand('createdby','fullname,Id') %}

{%  set contact = entities.contact['ea8157fa-cc32-ef11-8409-000d3a38d58d']|expand('createdby',['fullname']) %}

{%  set contact = entities.contac​t['ea8157fa-cc32-ef11-8409-000d3a38d58d']|expand('createdby') %}
```

### Get current request information

Object `request` contains information about the current request. It has the following members:

- `params` -- merged map of cookies, POST form values and GET query arguments
- `path` -- relative page URL
- `path_and_query` -- relative page URL with query arguments
- `query` -- query arguments, start with `?` if not empty
- `url` -- full request URL

Global object `params` is the alias of `request.params`.

### Check if the website is connected to Dataverse

`crm.connected` tells whether the website is configured to make connections to Dataverse.