---
sidebar_position: 3
title: Twig Notes. Capabilities & Limitations
slug: /twig/notes
tags: [Twig, DataPress]
keywords: [DataPress twig reference]
description: An overview of the global Twig objects available in DataPress pages.
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
