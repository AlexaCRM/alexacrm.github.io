---
title: Form Configuration
sidebar_position: 2
premium: true
slug: /forms/forms-configuration
tags:
  - Form
  - DataPress
keywords: [DataPress forms configuration]
description: How to configure Power Apps Forms
---

## Before you begin

Make sure that:

1. The premium extension is active and licensed
2. A Dataverse (model‑driven) form already exists
3. You know whether the form should create, update, or display records

---

## Creating a form registration

To start collecting data, you must create a form registration.

1. Open the plugin dashboard
2. Go to **Forms**
3. Click **Create new**

Fill in the following fields:

- **Form Name**
- **CRM Form** — select a Dataverse form
- **Mode** — choose how data is processed

Click **Create** to save the registration.

---

## Form modes

### Create a new record

Each submission creates a **new Dataverse record**.

### Update or create a record

The form uses table binding to:

- load an existing record into the form
- update it on submission

If no record is found, a new one is created.

### Read‑only

Table binding is used to load a record, but the form cannot be edited or submitted.

---

## Allow deleting records

When using **Update** or **Read‑only** mode, you can enable record deletion:

- Enable **Allow deleting the record**

⚠️ To prevent unauthorized deletes, implement the filter:

`integration-cds/forms/authorize-delete`

Parameters passed to the filter:

- `$isAuthorized` — whether deletion is allowed
- `$reg` — the active form registration
- `$target` — the record being deleted (or `NULL`)

Return `false` if deletion should not be allowed.

---

## Required and optional attributes

Dataverse defines required fields at the form level.  
DataPress allows additional customization **without modifying the Dataverse form**.

To change requiredness:

1. Select attributes in **Attributes**
2. Move them to:
   - **Required →**
   - **Optional →**
3. Remove items by double‑clicking or using **Remove selected**

---

## Redirect after submit and capture the created record GUID

When a record is successfully created, you can automatically redirect the user to another page and inject the new record's GUID into the URL using the `%s` placeholder. 

Use this to forward users to a “Thank you” page, a confirmation screen, or a details page where they can see the record they just created.

### How to Configure Redirection

You can set up the redirect in two ways:

**1. Via DataPress Admin Area (Global Settings)**
Use this method to set a default redirect for a specific form across your entire site:
* Navigate to **DataPress** Admi Area → **Forms** in your WordPress dashboard.
* Find the necessary form and click to edit it.
* Locate the **Global settings overrides** section.
* In the **Redirect after successful submission** text box, enter your desired URL pattern.
  * *Example:* `/contact-details-page/?id=%s` (where `contact-details-page` is the slug of your existing WordPress page).

**2. During Page Creation (Shortcode)**
You can define a specific redirect at the moment you add the form to a page. This will override any global settings for that specific instance:
```twig
{% form id=707 redirect='/contact-details-page/?id=%s' %}
```

#### Redirection Priority and Global Settings

**Important Note on Overrides:**
The system follows a specific priority for redirects:
1. **Shortcode Setting:** A redirect defined via the `redirect` attribute in a shortcode (e.g., `{% form id=707 redirect='...' %}`) has the highest priority and will **override** any settings in the DataPress Admin Area.
2. **Forms Global Settings:** You can also set a default redirect for **all forms** on your site. To do this, go to **DataPress** → **Forms Global Settings** and find the **Forms** tab. Any URL specified here will apply to all forms unless overridden by the methods mentioned above.

[Redirection examples](/forms/forms-examples/#redirect-after-submit-and-capture-the-created-record-guid)
---

## Global settings overrides

Each form registration can override global form behavior, including:

- reCAPTCHA
- Front‑end dependencies
- Form messages and behavior
- Full Name / Address decomposition

---

## Front‑end dependencies

Power Apps forms require the following libraries:

- **Bootstrap 4** — https://getbootstrap.com/
- **Font Awesome 5** — https://fontawesome.com/

DataPress ships custom, isolated builds of these libraries.  
You may disable them if your WordPress theme already includes compatible versions.

---

## reCAPTCHA support

Dataverse forms integrate with reCAPTCHA.
  
[Read more](/forms/recaptcha/#recaptcha-support-for-power-apps-forms)

---

## Adding the form to a page

Use the Twig tag and the form registration ID:

```twig
{% form id=42 %}
```

This renders the form and starts accepting submissions.

### Usage Requirements

To ensure the form renders correctly on your page, the `{% form %}` tag must be wrapped in a Twig-capable environment. It will not work if pasted as plain text into the editor.

You have two options to implement this:

1. **Using the Twig Shortcode (Recommended for Page Editors):**

   Wrap the tag inside the `[icds_twig]` shortcode:
   ```twig
   [icds_twig]
   {% form id=707 %}
   [/icds_twig]
   ```

2. **Inside a Twig Block**

If you are working within a custom theme template or a Twig-enabled block (such as in an Elementor Twig widget), you can use the tag directly:   

```twig
{% block content %}
    {% form id=707 %}
{% endblock %}
```

:::warning
 If you paste `{% form id=707 %}` directly into the editor without the [icds_twig] wrapper, the form will not render, and the raw code will be visible to your site visitors.
:::