---
sidebar_position: 3
title: Twig Reference. Capabilities & Limitations
slug: /twig/reference
tags: [Twig, DataPress]
keywords: [DataPress twig reference]
---

## Global Objects Overview

### `binding` — Current Page-Bound Record  

- `is_bound`
- `reference` — lightweight entity reference
- `record` — full entity data (slower)
- `currentrecord` — legacy alias (use only for backward compatibility)

### `user` — Current User Information

- `is_bound`
- `reference`
- `record`
- `wp_user`
- `timezone`
- `locale`

**Performance tip:** prefer `.reference` unless the full record is needed.

### `entities` — Any Record by Table & GUID

Example:

```twig
{{ entities.contact["GUID"]["fullname"] }}
```
