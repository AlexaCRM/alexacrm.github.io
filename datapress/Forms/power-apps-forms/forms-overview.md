---
title: Power Apps Forms
sidebar_position: 1
premium: true
slug: /forms/forms
tags:
  - Form
  - DataPress
keywords: [DataPress forms]
---

:::note
The plugin previously known as **Dataverse Integration** has been renamed to **DataPress**.
All references in the documentation and user interface will be gradually updated.
:::

<p class="lead">
Capture leads, feedback, and other data from your website using forms designed in Power Apps and Dynamics 365.
</p>

## What are Power Apps Forms in DataPress?

**Power Apps Forms** allow you to display Dataverse (Dynamics 365) forms on your WordPress website and submit user input directly back to Dataverse.

With DataPress, you can:

- Render Dataverse forms on public or protected pages
- Create new records from form submissions
- Update existing records using table binding
- Display data in a read‑only mode

## Key concept: Form Registration

To use a Dataverse form on a WordPress page, DataPress introduces the concept of a **form registration**.

A form registration acts as a proxy between WordPress and Dataverse. It defines:

- Which Dataverse form to display
- How the form handles submissions
- Which attributes are required or optional
- Which form‑level settings override global defaults

## How forms are rendered on the website

Forms are embedded into pages using the Twig templating engine.

```twig
{% form id=42 %}
```