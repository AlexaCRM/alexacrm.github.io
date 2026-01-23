---
title: reCAPTCHA support
sidebar_position: 7
premium: true
slug: /forms/recaptcha
tags:
    - Form
    - DataPress
    - reCAPTCHA
keywords: [DataPress forms, reCAPTCHA]  
---

## Introduction

reCAPTCHA is a security service designed to protect your site from spam and abuse. By leveraging advanced risk analysis techniques, it differentiates between human users and automated bots.

Dataverse forms are fully integrated with reCAPTCHA, supporting:

- **reCAPTCHA v2** (Checkbox Challenge)
- **reCAPTCHA v2 (Invisible)**
- **reCAPTCHA v3** (Score-based Analysis)

**Adding reCAPTCHA to Your Settings**

To integrate Google reCAPTCHA:
- Fill out this  [form](https://www.google.com/recaptcha/admin/create) to obtain your site key and secret key.
- Save the keys and navigate to the Dataverse Admin Area.
- Open the reCAPTCHA settings menu.
- Select the appropriate reCAPTCHA type and input your keys in the designated fields.

<div class="text--center"> 
<img src="/images/recaptcha.png" alt="Add recaptcha settings" width="700" />
</div>

DataPress (Dataverse Integration) also supports third-party plugins for managing reCAPTCHA settings:

- [Contact Form 7 Captcha](https://wordpress.org/plugins/contact-form-7-simple-recaptcha/)
- [Google Captcha (reCAPTCHA) by BestWebSoft](https://wordpress.org/plugins/google-captcha/)

### reCAPTCHA support for Power Apps Forms

The **Forms Global Settings** allow administrators to enable or disable reCAPTCHA for all forms within the Dataverse Admin Area. By default, reCAPTCHA is turned off across all forms.

<div class="text--center"> 
<img src="/images/recaptcha-global.png" alt="Add recaptcha global settings" width="700" />
</div>

To activate reCAPTCHA for **individual forms**:

- Open the form.
- Locate the **Global Settings Overrides** section.
- Enable reCAPTCHA within the **reCAPTCHA settings** override area.

<div class="text--center"> 
<img src="/images/premium-recaptcha.png" alt="Add recaptcha form settings" width="700" />
</div>

### Protect custom form submissions with reCAPTCHA

For custom forms, you must explicitly configure reCAPTCHA before implementation. Below is an example setup:

:::note
If you enable `recaptcha=true` in the `{% form %}` tag, you must include the `<recaptcha>` placeholder inside your form markup. This placeholder will be replaced with the actual reCAPTCHA widget at runtime.

Before using reCAPTCHA, make sure it is properly configured in the plugin settings. Without configuration, the form will fail to render or submit.
:::

```php
{% set useRecaptcha = true %}
{% form entity="lead" mode="create" recaptcha=useRecaptcha %}
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
    <div class="form-group">
        <recaptcha>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
```