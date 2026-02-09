---
title: Form Configuration
sidebar_position: 2
premium: true
slug: /forms/forms-configuration
tags:
  - Form
  - DataPress
keywords: [DataPress forms configuration]
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