---
sidebar_position: 4
title: Twig Examples
slug: /twig/examples
tags: [Twig, DataPress]
keywords: [DataPress twig examples]
description: A collection of practical Twig examples for DataPress, covering record rendering, user info, metadata access, formatting, lookups, choices, currency, and more.
---

# Twig Examples

This page provides practical Twig snippets for displaying data, formatting values, and building custom forms in DataPress.

---

## Render a Page-Bound Record

```twig
{% if binding.is_bound %}
  {% set contact = binding.record %}
  {{ contact["fullname"] }} <{{ contact["emailaddress1"] }}>
{% endif %}
```

## Display Current User Information

```twig

{% if user.is_bound %}
  {{ user.record["fullname"] }}
{% endif %}
```

## Access your Dataverse Integration organization metadata

`metadata` object allows accessing metadata of your Dataverse instance. It follows the interface of `EntityMetadata` in XRM SDK. See [Microsoft reference docs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.metadata.entitymetadata).

```twig
{% set options = metadata["contact"].Attributes["gendercode"].OptionSet.Options %}
{% for option in options %}
  <li>{{option.Value}} - {{option.Label.UserLocalizedLabel.Label}}</li>
{% endfor %}
```

## Format Date Using User Locale & Timezone

```twig
{{ "now" | format_datetime('short', 'short', locale=user.locale, timezone=user.timezone) }}
```

## Access Any Dataverse Record

```twig
{{ entities.contact["00000000-0000-0000-0000-000000000000"]["fullname"] }}
```

##  Using Twig to display the value of separate columns 

### Working with Date Columns

Standard formatting

```twig
{{ record.birthdate | format_datetime(
    dateFormat='short',
    timeFormat='short',
    locale=user.locale,
    timezone=user.timezone
) }}
```

Convert timezone

```twig
{{ record.birthdate | date("F jS \\a\\t g:ia", "Europe/Paris") }}
```

Custom datetime pattern

```twig
{{ record.birthdate | format_datetime(pattern="hh 'oclock' a, zzzz") }}
```

Calculate real GMT offset

```twig
{{ "2024-08-11T17:39:00+03" | timezone_offset("Australia/Sydney") }}
```

### Lookup Fields

```twig
{{ record.parentcustomerid.Name }}
{{ record.parentcustomerid.Id }}
```

### Choice Fields

```twig
{{ record | formatted_value("cr1d1_choiceday") }}
```

### Currency Fields

```twig
{{ record | formatted_value("cr1d1_currency") }}
```

### Duration Fields

Convert CRM duration (minutes) → readable format:

```twig
{% set record=entities.contact["dad5909a-973c-ef11-a316-000d3ad268c1"] %}
{{ record.cr8d6_duration*60 | format_time(pattern: 'mm min. ss sec.') }}
```

## Specify fields to display

When using the `expand` filter, you can specify which fields to display. If you don’t specify any fields, all of them will be selected. Fields are specified as an array or a comma-delimited string.

```twig
{%  set contact = entities.contact['ea8157fa-cc32-ef11-8409-000d3a38d58d']|expand('createdby','fullname,Id') %}

{%  set contact = entities.contact['ea8157fa-cc32-ef11-8409-000d3a38d58d']|expand('createdby',['fullname']) %}

{%  set contact = entities.contac​t['ea8157fa-cc32-ef11-8409-000d3a38d58d']|expand('createdby') %}
```