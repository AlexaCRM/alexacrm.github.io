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

### Get date column from CRM

In Dataverse Admin Area you can manage display date and time. Pay attention to the `ICDS_DATETIME_VALUE` setting. It has several options: **Legacy**, **UTC**, **Local**.

Examples for the **createdon** column which has User Local behavior:

|                      | Legacy     |  UTC              | Local  |
|----------------------|--------------|----------------|-----------|
|`{{record.createdon}}`  | UTC | UTC | convert the date and time to the user's timezone |
|`{{record.createdon_utc}}` | UTC | UTC | UTC |
|`{{record.createdon_local}}` |  convert the date and time to the user's timezone | convert the date and time to the user's timezone | convert the date and time to the user's timezone |

[Usage Scenarios](/date-and-time/#usage-scenarios)

To display a column value for Time zone independent and Date only behavior , use the following Twig code snippet:

```twig
{% set record=entities.contact["11c4c8fa-bf0e-ef11-9f89-0022489310b4"] %} 
{{ record.createdon }}
```

Use `format_datetime()` to get the value of any date column and convert its value according to user's locale and timezone. 

```twig
{% set record=entities.contact[GUID] %}
{{ record.date_column|format_datetime(dateFormat='short', timeFormat='short', locale=user.locale, timezone=user.timezone) }}
```

Example: we need to get Birthday column value and to see it as 11/1/22, 12:00 AM

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|format_datetime(dateFormat='short', timeFormat='short', locale=user.locale, timezone=user.timezone) }}
```

You can convert the default timezone by explicitly specifying a timezone:

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|date("F jS \\a\\t g:ia", "Europe/Paris") }}
```

You can even define your own pattern using format_datetime() [See details](https://unicode-org.github.io/icu/userguide/format_parse/datetime/#time-zone-pattern-usage):

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|format_datetime(pattern="hh 'oclock' a, zzzz") }}
```

### How to calculate real GMT offset

To calculate the real GMT offset, you can use the following Twig syntax:

```twig
{{ "2024-08-11T17:39:00+03" | timezone_offset("Australia/Sydney") }}
```

The output: **+10:00**

```twig
{{ "2025-01-11T17:39:00+03" | timezone_offset("Australia/Sydney") }}
```

The output: **+11:00**

You can also use [Windows timezones](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones?view=windows-11).

```twig
{{ "2025-01-11T17:39:00+03"|timezone_offset("Afghanistan Standard Time") }}
```
The output: **+4:30**

```twig
{{ "2025-01-11T17:39:00+03"|timezone_offset("Central America Standard Time") }}
```
The output: **-06:00**

### How to Convert Date and Time to UTC or Necessary Time Zone

Use the `convert_from_utc()` filter to convert date and time from UTC to the necessary time zone:

```twig
{{ "2025-01-11T17:39:00+03"|convert_from_utc("Australia/Sydney") }}
```

Use the `convert_to_utc()` filter to convert date and time from a specific time zone to UTC:

```twig
{{ "2025-01-11T17:39:00+03"|convert_to_utc("Australia/Sydney") }}
```

Use the `convert_timezone()` to convert date and time from UTC to Central European Standard Time in the following example:

```twig
{{ "2025-01-11T17:39:00+03"|convert_timezone("UTC","Central Europe Standard Time") }}
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

An example output: **50,002.25**.
