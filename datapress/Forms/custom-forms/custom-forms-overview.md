---
title: Custom Forms - Overview
sidebar_position: 1
slug: /forms/custom-forms-overview
tags:
  - Form
  - DataPress
keywords: [DataPress custom form]
description: Custom Forms let you capture data from your WordPress site without using Power Apps or Dynamics 365 forms.
---

:::note
The plugin previously known as **Dataverse Integration** has been renamed to **DataPress**. All references in documentation and UI are being updated accordingly. [1](https://docs.alexacrm.com/forms/custom-forms/)
:::

<p class="lead">Use Twig + HTML to build custom forms and send submissions directly into Dataverse.</p>

# Overview

Custom Forms let you capture data from your WordPress site **without** using Power Apps or Dynamics 365 forms.  
Instead, you build the layout yourself using regular HTML form markup and wrap it inside Twig tags. 

Key capabilities:
- Build any HTML layout using your own design.
- Map form fields to Dataverse table columns via input `name` attributes. 
- Submit data directly into Dataverse (create or update records).
- Optionally add reCAPTCHA protection. 

Custom Forms are included in the **free** DataPress plugin on WordPress.org.

---

# Configuration

## 1. Wrap your HTML form with `{% form %} ... {% endform %}`

A custom form begins with a pair of Twig tags:  
`{% form ... %}` → configuration  
`{% endform %}` → closing tag 

Inside them, you **must** place a standard HTML `<form>...</form>` element.  
The submit event is handled automatically when the user submits the form.

## 2. Connect form inputs to Dataverse columns

Use the Dataverse column logical name for each `<input>`:

```html
<input name="firstname">
<input name="emailaddress1">
```

The plugin uses these names to map the values to Dataverse.

## 3. Enable reCAPTCHA (optional)

To protect from spam:

- Add recaptcha=true to `{% form %}`.
- Add the placeholder `<recaptcha>` inside your `<form>`.
- Configure reCAPTCHA keys in plugin settings — otherwise the form may not load or submit. 

## 4. Place the form on a WordPress page

Use the Gutenberg block **Dataverse Plain**, which accepts Twig and renders it as HTML on the frontend.
