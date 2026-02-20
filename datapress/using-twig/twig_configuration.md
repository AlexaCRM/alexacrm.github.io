---
sidebar_position: 2
title: Twig Configuration
slug: /twig/configuration
tags: [Twig, Configuration]
keywords: [DataPress twig configuration]
description: Configuration guide for Twig in DataPress, covering debug mode, caching, device detection, date/time handling, and request context objects.
---

## Debug Mode

Twig debugging allows use of `dump()` to inspect Twig variables.  
It becomes active when:

- WordPress debug mode (`WP_DEBUG`) is enabled, or  
- `ICDS_TWIG_DEBUG = true`.

## Template Caching

Caching improves Twig template rendering performance.  
Enable it with (Advanced settings in DataPress Admin Area):

```
ICDS_TWIG_CACHE = true
```

## Mobile Device Detection

DataPress exposes **MobileDetect** helpers in Twig:

```twig
isMobile: {% if isMobile %}Yes{% else %}No{% endif %}
isChrome: {% if isChrome %}Yes{% else %}No{% endif %}
isFirefox: {% if isFirefox %}Yes{% else %}No{% endif %}
```

Intellisense hints are available when typing `{{` inside a Dataverse Twig block.

## Date/Time Mode

Your Dataverse **ICDS_DATETIME_VALUE** setting controls how date columns behave:

- Legacy
- UTC
- Local

Different fields (e.g., User Local) adjust their output accordingly.
Use `format_datetime()` for consistent locale/timezone formatting.

Examples for the **createdon** column which has User Local behavior:

|                      | Legacy     |  UTC              | Local  |
|----------------------|--------------|----------------|-----------|
|`{{record.createdon}}`  | UTC | UTC | convert the date and time to the user's timezone |
|`{{record.createdon_utc}}` | UTC | UTC | UTC |
|`{{record.createdon_local}}` |  convert the date and time to the user's timezone | convert the date and time to the user's timezone | convert the date and time to the user's timezone |

[Usage Scenarios](/date-and-time/#usage-scenarios)

### Timezone & Locale Sources

- user.timezone / user.locale
- site.timezone / site.locale

These follow the IANA timezone format (e.g., Europe/Paris, UTC).

## Request Context

Object `request` contains information about the current request. It has the following members:

- `params` -- merged map of cookies, POST form values and GET query arguments
- `path` -- relative page URL
- `path_and_query` -- relative page URL with query arguments
- `query` -- query arguments, start with `?` if not empty
- `url` -- full request URL

Global object `params` is the alias of `request.params`.

### Dataverse Connection Status

```
{% if crm.connected %}
  Dataverse connection active
{% endif %}
```