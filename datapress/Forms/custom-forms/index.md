---
title: HTML Forms Overview
sidebar_position: 1
slug: /forms/custom-forms
tags:
  - Form
  - DataPress
keywords: [DataPress HTML form, custom form]
description: HTML Forms let you capture data from your WordPress site without using Power Apps or Dynamics 365 forms.
---

<div
  role="note"
  aria-label="Product note"
  style={{
    borderLeft: '4px solid #2f81f7',
    background: '#f0f7ff',
    padding: '12px 16px',
    borderRadius: '6px',
    margin: '1em 0',
    color: '#0b2e59',
  }}
>
  <div style={{ color: '#0b63d1', fontWeight: 600, marginBottom: '6px' }}>Note</div>
  <p style={{ margin: '0 0 6px 0' }}>
    The plugin previously known as <em>Dataverse Integration</em> has been renamed to <strong>DataPress</strong>.
  </p>
  <p style={{ margin: '0 0 6px 0' }}>
    This change reflects our commitment to enhancing user experience and aligning with our product vision.
  </p>
  <p style={{ margin: 0 }}>
    All references to Dataverse Integration in the documentation and UI will be updated to DataPress.
  </p>
</div>

<p class="lead">Use Twig + HTML to build HTML forms and send submissions directly into Dataverse.</p>

# Overview

HTML Forms let you capture data from your WordPress site **without** using Power Apps or Dynamics 365 forms.  
Instead, you build the layout yourself using regular HTML form markup and wrap it inside Twig tags. 

Key capabilities:
- Build any HTML layout using your own design.
- Map form fields to Dataverse table columns via input `name` attributes. 
- Submit data directly into Dataverse (create or update records).
- Choose submission method: **Send To Dataverse** (default, free) or **Universal Capture** (premium, asynchronous).
- Optionally add reCAPTCHA protection. 

HTML Forms are included in the **free** DataPress plugin on WordPress.org.

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

## 4. Choose submission method (premium feature)

:::info
**Universal Capture** is a premium feature. For more details see [Premium Edition](/premium-edition).
:::

By default, forms use the **Send To Dataverse** method (synchronous submission). With a premium license, you can enable **Universal Capture** (asynchronous submission) by adding the `capture=true` attribute:

```html
{% form entity="contact" mode="create" capture=true %}
  <form>
    <div class="form-group">
      <label>
        First Name:
        <input class="form-control" name="firstname">
      </label>
    </div>
    <div class="form-group">
      <label>
        Last Name:
        <input class="form-control" name="lastname">
      </label>
    </div>
    <div class="form-group">
      <label>
        Email:
        <input class="form-control" name="emailaddress1">
      </label>
    </div>
    <button type="submit">Submit</button>
  </form>
{% endform %}
```

**Submission methods:**
- **Send To Dataverse** (default) — synchronous submission, records are written directly to Dataverse tables
- **Universal Capture** (`capture=true`, premium) — asynchronous submission, records are sent to a dedicated capture table for processing

For more details, see [Form Submission Methods](/forms/forms-overview).

## 5. Place the form on a WordPress page

Use the Gutenberg block **Dataverse Plain**, which accepts Twig and renders it as HTML on the frontend.