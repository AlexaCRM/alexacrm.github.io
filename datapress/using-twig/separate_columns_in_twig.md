---
sidebar_position: 2
title: Using Twig to display the value of separate columns 
slug: /twig/display-separate-column-value
tags:
    - Twig
    - DataPress
keywords: [DataPress twig, decimal, float, currency, duration, choice]  
---

## Displaying Column Values

### Get date column from CRM and transform its value

To display a column value in UTC, use the following Twig code snippet:

```twig
{% set record=entities.contact["11c4c8fa-bf0e-ef11-9f89-0022489310b4"] %} 
{{ record.createdon }}
```

To convert a column value to the user's timezone, use the `_local` suffix as shown below:

```twig
{% set record=entities.contact["11c4c8fa-bf0e-ef11-9f89-0022489310b4"] %} 
{{ record.createdon_local }}
```

Use `format_datetime()` to get value of any date column and transform its value. 

```twig
{% set record=entities.contact[GUID] %}
{{ record.date_column|format_datetime(dateFormat='short', timeFormat='short', locale=user.locale, timezone=user.timezone) }}
```

Example: we need to get Birthday column value and to see it as 11/1/22, 12:00 AM

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|format_datetime(dateFormat='short', timeFormat='short', locale=user.locale, timezone=user.timezone) }}
```

You can override the default timezone by explicitly specifying a timezone:

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|date("F jS \\a\\t g:ia", "Europe/Paris") }}
```

You can even define your own pattern using format_datetime() [See details](https://unicode-org.github.io/icu/userguide/format_parse/datetime/#time-zone-pattern-usage):

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|format_datetime(pattern="hh 'oclock' a, zzzz") }}
```

### Get lookup value

You can follow the examples below:

```twig
{{ entities.contact['ae8bca63-706a-ed11-9561-000d3a227751'].parentcustomerid.Name }}

{{ entities.contact['ae8bca63-706a-ed11-9561-000d3a227751'].parentcustomerid.Id }}
```

### Choice data type column

Use `formatted_value()` to get the choice data type column value:

```twig
{% set record=entities.contact["dad5909a-973c-ef11-a316-000d3ad268c1"] %} 
{{ record | formatted_value("cr1d1_choiceday")}}<br> 
```

In this example, the output will be **Monday**.

### Display currency column value

Also use `formatted_value()` to get the currency data type column value:

```twig
{% set record=entities.contact["dad5909a-973c-ef11-a316-000d3ad268c1"] %} 
{{ record | formatted_value("cr1d1_currency")}}<br> 
```

An example output: **$2.25**.

### Display duration column value

When working with a duration column in your model-driven app, you can display the duration value using the `format_time()` filter and transform the value into minutes for further formatting.

```twig
{% set record=entities.contact["dad5909a-973c-ef11-a316-000d3ad268c1"] %}
{{ record.cr8d6_duration*60 | format_time(pattern: 'mm min. ss sec.') }}
```

[Read more about Date/Time Format Syntax](https://unicode-org.github.io/icu/userguide/format_parse/datetime/#datetime-format-syntax)

### Display decimal and float columns

The format of displaying decimal and float columns depends on the settings of your user in Dataverse. You can follow both examples:

```twig
{% set record=entities.contact["dad5909a-973c-ef11-a316-000d3ad268c1"] %}
{{ record | formatted_value("cr1d1_decimal")}}<br> 
{{ record.cr1d1_decimal }}
```