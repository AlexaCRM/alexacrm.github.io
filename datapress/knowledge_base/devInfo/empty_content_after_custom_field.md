---
title: ERROR Class "TwigFunction" not found
sidebar_position: 21
slug: /knowledge-base/empty-page-after-custom-field
tags:
    - Knowledge base
    - DataPress
    - TwigFunction
    - Fields binding
---
**Issue:**
When adding custom fields, you may encounter an empty content of a page and see the following error in the logs: `ERROR: Class "TwigFunction" not found`.  

**Solution:**
Add `use Twig\TwigFunction;` to your Theme file.