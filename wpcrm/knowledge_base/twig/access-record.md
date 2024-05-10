---
title: Access record identifier in form redirect
slug: /knowledge-base/access-record
sidebar_position: 27
tags:
    - Knowledge base
    - Twig
    - Dynamics 365 Integration
---

The record identifier can be included in the redirect string using `%s` placeholder. For example, if a form is used to create a new record, and you would like to redirect to a page `viewrecord` afterwards, then the new record identifier can be passed in the query string:    

```php
{% form mode="create" ... redirect="/viewrecord/?id=%s" ... %}
```

At runtime, `%s` placeholder will be replaced with the record unique identifier.

Note that the placeholder works for both new and existing records.