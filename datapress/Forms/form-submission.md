---
title: Universal Capture
sidebar_position: 5
premium: true
slug: /forms/universal-capture
tags:
  - Universal Capture
  - Form Submission
  - DataPress
keywords: [DataPress universal capture, asynchronous form submission]
description: Configure Universal Capture to process form submissions asynchronously in Dataverse.
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

:::note
This is a premium feature. For more details see [Premium Edition](/premium-edition).
:::

<p class="lead">Configure asynchronous form submission processing with Universal Capture.</p>

# Universal Capture Overview

Universal Capture enables **asynchronous processing** of form submissions from multiple form types in DataPress. All form data is captured and stored in a dedicated Dataverse table for reliable, background processing without blocking the user experience.

## Key Benefits

- **Non-blocking submissions** — users get immediate feedback while data is processed in the background
- **Reliable data collection** — all submissions are stored in a dedicated capture table before processing
- **Multi-table aggregation** — collects data from different form types in one centralized location
- **Error resilience** — submission errors don't affect the form or user experience
- **Full automation** — ideal for complex data workflows and automation scenarios

---

# Configuration

## Enable Universal Capture

The primary toggle activates Universal Capture for all supported form types or allows you to configure specific forms.

### Global Settings

#### 1. **Send Asynchronously**
Submission data is processed in Dataverse in the background, and errors don't affect the form. When disabled, the form waits for processing to complete.

#### 2. **Capture before form submission processing**
Capture form data before the form plugin saves it and runs its actions. When disabled, data is captured after processing, as saved.

#### 3. **Include file contents**
Upload submitted files to Dataverse with the captured data. When disabled, files remain on the WordPress server and Dataverse receives a private download link.

---

## Select Form Types and Capture Mode

Choose which form types should have their submissions captured and configure the capture scope:

### Supported Form Types

- **HTML Forms** — Custom forms built with HTML and Twig
- **Dataverse Forms** — Power Apps model-driven forms
- **Elementor Forms** — Forms created with Elementor
- **Gravity Forms** — Forms created with Gravity Forms plugin
- **WPForms** — Forms created with WPForms plugin

### Capture Modes

For each enabled form type, choose one of two capture modes:

- **All Forms** — capture submissions from all forms of this type
- **Only Selected Forms** — capture submissions from specific forms you choose

This granular control allows you to enable Universal Capture for specific forms while keeping others on the default Send To Dataverse method.

---

# Using Universal Capture with Forms

## HTML Forms

Enable Universal Capture for individual HTML forms using the `capture=true` attribute:

```twig
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
No field mapping is required — Universal Capture automatically collects all form field data.

## Elementor Forms

To enable Universal Capture for Elementor forms:

1. Open your Elementor form for editing
2. Go to the **Actions After Submit** section
3. Add a new action and select **Universal Capture**
4. Save your form

No field mapping is required — Universal Capture automatically collects all form field data from Elementor.

## Gravity Forms

To enable Universal Capture for Gravity Forms:

1. Open your Gravity Form for editing
2. Go to **Settings** → **Dataverse Universal Capture**
3. Enable Universal Capture for this form
4. Save your settings

No field mapping is required — Universal Capture automatically collects all form submissions.

## WPForms

To enable Universal Capture for WPForms:

1. Open your WPForm for editing
2. Go to **Settings** → **General**
3. Scroll down to the **Advanced section**
4. Enable **Universal Capture**
5. Save your settings

No field mapping is required — Universal Capture automatically collects all form field data from WPForms.

---

# Form Submission Data Structure

Each form submission record captured contains the following information:

```json
{
  "source": {
    "name": "integration-cds-premium/integration-cds-premium.php",
    "version": "2.97-dev"
  },
  "form": {
    "id": 4,
    "name": "Contact Quick"
  },
  "fields": [
    {
      "id": "1",
      "name": "fullname",
      "type": "text",
      "value": {
        "type": "string",
        "data": "John Doe"
      },
      "label": "Full Name",
      "input": "text",
      "required": false,
      "format": "",
      "options": [],
      "defaultValue": "",
      "formattedValue": "John Doe"
    },
    {
      "id": "2",
      "name": "emailaddress1",
      "type": "email",
      "value": {
        "type": "string",
        "data": "john@example.com"
      },
      "label": "Email",
      "input": "email",
      "required": true,
      "format": "email",
      "options": [],
      "defaultValue": "",
      "formattedValue": "john@example.com"
    }
  ],
  "user": {
    "id": 1,
    "login": "admin",
    "name": "admin",
    "locale": "",
    "timezone": "",
    "language": "en-US,en;q=0.9",
    "binding": {
      "Name": "Contact",
      "Id": "f0b9d570-0f71-ef11-a670-000d3acc37f2",
      "LogicalName": "contact",
      "KeyAttributes": null,
      "RowVersion": null
    },
    "isRegistered": true
  },
  "context": {
    "ip": "127.0.0.1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:155.0)",
    "submittedOn": "2026-09-15T12:47:03+00:00",
    "submissionId": "4",
    "pageUrl": "/wp-json/integration-cds/v1/form_submissions/4",
    "referer": "http://example.local/premium-form-contact/?id=f0b9d570-0f71-ef11-a670-000d3acc37f2"
  }
}
```

## Submission Record Fields

| Field | Type | Description |
|-------|------|-------------|
| **source.name** | string | Plugin filename and path |
| **source.version** | string | Plugin version number |
| **form.id** | integer | Unique identifier for the form |
| **form.name** | string | Human-readable form name |
| **fields** | array | Array of submitted form fields |
| **fields[].id** | string | Field ID within the form |
| **fields[].name** | string | Field name/identifier |
| **fields[].type** | string | Field type (text, email, file, date, etc.) |
| **fields[].value** | object | Field value wrapper with type and data |
| **fields[].value.type** | string | Value type: "string" or "file" |
| **fields[].value.data** | string/object | Actual submitted value or file object |
| **fields[].value.data.name** | string | File name (when type is "file") |
| **fields[].value.data.content** | string | File content in base64 (when type is "file") |
| **fields[].label** | string | Human-readable field label |
| **fields[].input** | string | HTML input type |
| **fields[].required** | boolean | Whether field is required |
| **fields[].format** | string | Data format (e.g., "email", "date") |
| **fields[].options** | array/object | Available options for choice/multiselect fields* |
| **fields[].defaultValue** | string | Default field value |
| **fields[].formattedValue** | string | Formatted display value |
| **user.id** | integer | WordPress user ID |
| **user.login** | string | WordPress username |
| **user.name** | string | User display name |
| **user.locale** | string | User locale setting |
| **user.timezone** | string | User timezone setting |
| **user.language** | string | Browser language preference |
| **user.binding** | object | CRM record binding information |
| **user.binding.Name** | string | CRM table/entity name |
| **user.binding.Id** | string | CRM record GUID |
| **user.binding.LogicalName** | string | CRM entity logical name |
| **user.binding.KeyAttributes** | object/null | CRM key attributes (if any) |
| **user.binding.RowVersion** | string/null | CRM row version |
| **user.isRegistered** | boolean | Whether user is logged in |
| **context.ip** | string | Submitter's IP address |
| **context.userAgent** | string | Browser user agent string |
| **context.submittedOn** | string (ISO 8601) | Submission timestamp |
| **context.submissionId** | string | Unique submission identifier |
| **context.pageUrl** | string | Page URL where form was submitted |
| **context.referer** | string | HTTP referrer URL |

Option values are currently available only for form builders that support this feature. For other form types, this field may be empty.

### Field Value Structure

Form submission field values are wrapped in an object structure to support different data types:

#### String Value
```json
{
  "type": "string",
  "data": "value content"
}
```

#### File Value
```json
{
  "type": "file",
  "data": {
    "name": "document.pdf",
    "content": "base64encodedfilecontent=="
  }
}
```

# Best Practices

- **Use for high-volume submissions** — Universal Capture excels when you receive many form submissions
- **Enable asynchronous processing** — allows users to proceed without waiting for Dataverse processing
- **Monitor the capture table** — regularly check the dedicated capture table in Dataverse to ensure data is being collected
- **Test file uploads** — if using file uploads, test whether you want files stored in Dataverse or as links
- **Combine with automation** — use Power Automate flows to process captured data and route it to appropriate tables

---

# Limitations

- **Dedicated storage only** — all submissions are stored in an intermediary capture table, not directly in your main data tables
- **Not ideal for direct updates** — Universal Capture is designed for new data collection, not updating existing records
- **Requires automation** — for data to flow into your main tables, you need to configure Power Automate flows or similar processing logic.