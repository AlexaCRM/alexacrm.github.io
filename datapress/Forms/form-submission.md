---
title: Form Submission
sidebar_position: 5
slug: /forms/form-submission
tags:
  - Form Submission
  - DataPress
keywords: [DataPress form submission, capture form data]
description: Configure how form submissions are captured and processed in Dataverse.
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

<p class="lead">Manage user submitted data collecting for supported forms.</p>

# Form Submission Configuration

The Form Submission settings allow you to capture and manage form submission data from various form types in DataPress.

## Enable Universal Forms Capture

The primary toggle to enable form submitted data capturing for all supported form types.

### Options

#### 1. **Send Asynchronously**
Submission data is processed in Dataverse in the background, and errors don't affect the form. When off, the form waits for processing to finish.

#### 2. **Capture before form submission processing**
Capture form data before the form plugin saves it and runs its actions. When off, data is captured after processing, as saved.

#### 3. **Include file contents**
Upload submitted files to Dataverse with the captured data. When off, files stay on the WordPress server and Dataverse receives a private download link.

## Select Form Types to Capture

Choose which form types should have their submissions captured:

- **HTML Forms** - Forms built with HTML and Twig
- **Dataverse Forms** - Power Apps model-driven forms
- **Elementor Forms** - Forms created with Elementor
- **Gravity Forms** - Forms created with Gravity Forms plugin

Each form type can be independently enabled or disabled for submission capture.

## Form Submission Data Structure

Each form submission record contains the following information:

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

### Submission Record Fields

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