---
title: Twig Page Rendering
description: How to enable full-page Twig rendering in DataPress, its advantages for visual editing, and how to avoid errors caused by third-party plugins modifying image markup.
sidebar_position: 21
slug: /knowledge-base/twig-page-rendering
tags:
    - Knowledge base
    - Twig
    - DataPress
---

## Overview

DataPress provides a **Twig Page Rendering** setting that controls how Twig is applied to a WordPress page. This is especially useful when you need conditional logic or data-driven content spread across a full page, which can otherwise be awkward when relying on disconnected Twig blocks — particularly in page builders such as Elementor.

---

## Rendering Modes

The setting offers three options:

### No Twig

Twig post-processing is disabled for the page. Twig blocks and Twig shortcodes placed explicitly on the page are still rendered as usual.

Use this mode when you do not need full-page Twig processing and want to keep the default behavior.

### Page Content and Title

The entire page content and title are rendered together as a single Twig template. You can use Twig syntax anywhere on the page without needing to wrap sections in dedicated Twig blocks or shortcodes.

This mode is the recommended choice when you want to combine visual page editing with dynamic Twig content. Conditional logic and data-driven layouts become much easier to manage because the full page is treated as one coherent template.

### Entire HTML

The complete HTML output of the page — including the header and footer — is processed as a Twig template.

:::caution

This mode is generally not recommended unless Twig processing is specifically required in the page header or footer. Processing the full HTML output increases the risk of conflicts with other plugins that modify page markup.

:::

---

## Advantage: Visual Editing with Twig

With **Page Content and Title** mode enabled, you can use Twig expressions directly inside a visual editor. For example, you can render a data-driven image table without separate Twig blocks:

```twig
<img src="{{ record.image_url }}" alt="{{ record.image_title }}" title="{{ record.image_title }}">
```

This avoids the need to switch between visual and code editing modes just to add Twig logic.

---

## Known Issue: Third-Party Plugins Modifying Image Markup

Some SEO and accessibility plugins automatically add missing `alt` and `title` attributes to `<img>` tags based on the image source URL. When the image source contains a Twig expression, this can produce invalid Twig markup.

For example, consider the following image tag:

```twig
<img src="{{ record.image_url }}">
```

A plugin may parse the `src` attribute value and derive an `alt` text from the filename portion of the URL. If underscores in variable names are replaced with spaces during that process, the resulting markup could become:

```twig
<img src="{{ record.image url }}" alt="image url" title="image url">
```

Because `image url` is not a valid Twig expression, this will trigger a runtime error similar to:

```
Unexpected token "name" of value "url" ("end of print statement" expected)
```

### Recommendation

Always include explicit `alt` and `title` attributes on your image tags. This prevents SEO and accessibility plugins from attempting to generate these attributes automatically and inadvertently breaking the Twig markup:

```twig
<img src="{{ record.image_url }}" alt="{{ record.image_title }}" title="{{ record.image_title }}">
```

By providing these attributes upfront, third-party plugins have no reason to modify the tag, and the Twig template remains valid.
