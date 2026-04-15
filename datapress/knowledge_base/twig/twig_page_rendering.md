---
title: Twig Page Rendering
sidebar_position: 5
slug: /knowledge-base/twig-page-rendering
description: Learn how to use Twig for rendering entire pages in DataPress, including different modes, advantages, and best practices to avoid common issues.
tags:
    - Knowledge base
    - Twig
    - DataPress
---

## Overview

DataPress allows rendering entire pages as Twig templates, providing a unified approach to dynamic content generation. This feature simplifies page creation, especially when conditional blocks are involved, by treating the page as a single Twig source instead of disconnected blocks.

To access the Twig rendering modes, edit a page and look in the right-hand menu. On the **Page** tab at the bottom, you will find the **Twig Page** block where you can select the desired rendering mode.

## Rendering Modes

DataPress supports different Twig rendering modes, controlled by a dedicated flag:

### No Twig

- Disables Twig processing for the entire page.
- **Twig blocks and shortcodes are still processed as usual, but no additional Twig post-processing occurs.**

### Page Content and Title

- Renders the page content and title as one Twig block.
- Twig can be used anywhere on the page without relying on shortcodes or blocks.

### Entire HTML

- Processes the entire page output, including header and footer, as Twig.
- Generally, we do not recommend this unless Twig processing is required in the header or footer.

## Advantages

The primary advantage of Twig page rendering is the ability to create pages with complex logic and conditional rendering in a seamless manner. For instance, it enables visual editing capabilities that would otherwise be cumbersome with fragmented Twig blocks.

You can use Twig to render dynamic content, such as table images:

```twig
<img src="{{ image_url(record, 'entityimage') }}">
```

## Potential Issues and Best Practices

Third-party plugins, such as SEO tools that automatically add missing `alt` and `title` attributes, may modify the HTML and inadvertently break Twig syntax. For example, if a plugin replaces underscores with spaces in the `src` attribute, the pre-processed markup might become invalid:

```html
<!-- Original -->
<img src="{{ image_url(record, 'entityimage') }}">

<!-- After plugin modification -->
<img src="{{ image url(record, 'entityimage') }}" alt="{{ image url(record, 'entityimage') }}">
```

This can result in runtime errors similar to the following:

```
Unexpected token "name" of value "url" ("end of print statement" expected)
```

### Recommendation

To avoid unexpected behavior, always include `alt` and `title` attributes explicitly:

```html
<img src="{{ image_url(record, 'entityimage') }}" alt="{{ record.name }}" title="{{ record.name }}">
```

:::note

Use the Entire HTML mode cautiously, as plugins modifying content can introduce Twig syntax errors.

:::