---
title: Using lookups in the premium plugin version
sidebar_position: 21
slug: /knowledge-base/lookup-premium
tags:
    - Knowledge base
    - Lookup
    - Datapress
---

Use next steps to manage lookup fields in your forms:

- Navigate to the Dataverse Admin Area.
- Click `Forms` and then select `Forms Editor`.
- Choose any form you want to work with.
- In the form editor, locate the Global settings overrides section.
- If you set `Render form based on twig template` to `Yes`, you can choose any twig template from the available Twig Templates. This allows you to modify fields using twig templates.

Focus on the Lookup Fields section. Here, you can configure how lookup fields behave:
- *Display Mode*: Choose from options like select, dialog, or dropdown to determine how lookup fields appear to users.
- *Filtering Lookup Values*: To filter lookup values based on specific criteria, select a fetchXML template from the dropdown list. This template defines the conditions for filtering the lookup values. For more details on fetchXML, you can refer to the [FetchXML documentation](/datapress/fetchxml.md)
 