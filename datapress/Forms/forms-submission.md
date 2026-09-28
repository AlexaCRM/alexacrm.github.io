---
title: Form Submission Data Collection
sidebar_position: 5
slug: /forms/form-submission-data-collection
tags:
  - Forms
  - Data Collection
  - DataPress
keywords: [form submission, data collection, WordPress forms, track form submissions]
description: Enable automatic tracking and storage of form submission data in Dataverse for all supported form types.
---

<p class="lead">Manage user submitted data collecting for supported forms</p>

:::note
This is a premium feature. For more details see [Premium Edition](/premium-edition).
:::

## Overview

The Form Submission feature allows you to capture and store form submission data from supported WordPress forms directly into the DataPress database. This enables you to track, manage, and analyze all form submissions across your WordPress site.

## Accessing Form Submission Settings

To configure form submission settings:

1. Navigate to **DataPress** → **Form Submission** in the WordPress admin panel
2. You will see the **Form Submission** management page with captured submissions

**Key Features** <br></br>
✅ Automatic Data Capture - All form submissions are automatically recorded without additional configuration <br></br>
✅ Multi-Form Support - Works with Custom Forms, Premium Forms, Elementor, and Gravity Forms<br></br>
✅ Complete Audit Trail - Maintains a historical record of all submissions with timestamps <br></br>
✅ Data Preservation - Submissions are stored even if form processing fails <br></br>
✅ Optional Processing - Choose to capture data before or after form sending <br></br>
✅ Flexible Configuration - Enable/disable per form type or globally <br></br>

## Configuration

### Enable Form Submitted Data Capturing

To start capturing form submissions:

1. Go to **DataPress** → **Form Submission**
2. Toggle **"Enable form submitted data capturing"** ON
3. All new form submissions will now be recorded in the WordPress Form Submission table

### Submission Timing

You have two options for when data is captured:

#### Option 1: Send Asynchronously

- **Status**: OFF (by default)
- **Behavior**: Data capturing is performed simultaneously with form submission
- **Use case**: When you want to ensure form submission completes first, with data capture happening in the background

#### Option 2: Capture Before Form Sending

- **Status**: ON 
- **Behavior**: Data capturing is performed before the form is actually submitted
- **Use case**: Ensures data is captured even if form submission fails

### Select Form Types to Capture

Choose which form builders' submissions you want to capture:

- ✅ **Custom Forms** - Your custom-built forms
- ✅ **Premium Forms** - DataPress Premium Forms
- ✅ **Elementor** - Elementor form submissions
- ✅ **Gravity Forms** - Gravity Forms submissions

Toggle each form type based on your needs. All selected form types will have their submissions automatically captured.

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

### Options Field

The `options` field can be:
- **Array**: List of option labels
  ```json
  ["Option 1", "Option 2", "Option 3"]
  ```
- **Object**: Map of option value to label

  ```json
  {
  "value1": "Option 1",
  "value2": "Option 2"
  }
  ```

## Viewing Submissions

All captured form submissions appear in the **Active WordPress Form Submissions** table in Dataverse:

1. Navigate to **Power Apps** → **Dataverse** → **Active WordPress Form Submissions**
2. View all form submissions with submission details
3. Filter and sort submissions by:
   - Form name
   - Submission date
   - User information
   - Submitted values

## Form Types Supported

### Custom Forms
Custom HTML-based forms created in DataPress work natively with the form submission feature.

**Configuration:**
- Create your form using Custom HTML
- Enable form submission in settings
- All submissions are automatically captured

### Premium Forms
DataPress Premium Forms provide enhanced functionality with built-in submission tracking.

**Configuration:**
- Forms are automatically captured when form submission is enabled
- Premium form features include advanced validation and conditional logic
- All data is recorded in the WordPress Form Submission table

### Elementor Forms
Elementor form submissions can be captured when integrated with DataPress.

**Configuration:**
1. Create form in Elementor
2. Enable "Elementor" in Form Submission settings
3. Submit form on published page
4. Submission is captured automatically

### Gravity Forms
Gravity Forms submissions are captured when the form submission feature is enabled.

**Configuration:**
1. Create Gravity Form (see [Gravity Forms documentation](/forms/gravity-forms))
2. Enable "Gravity Forms" in Form Submission settings
3. User submits form
4. Data is captured in the WordPress Form Submission table

:::info
For detailed Gravity Forms configuration, see [Gravity Forms Integration](/forms/gravity-forms).
:::

## Best Practices

### 1. Enable Only Required Forms
- Enable only the form types you actually use
- This reduces database size and improves performance
- You can enable/disable form types at any time

### 2. Regular Data Review
- Review captured submissions regularly
- Archive old submissions as needed
- Use filters to find specific submissions

### 3. User Privacy
- Ensure your privacy policy discloses form data collection
- Consider GDPR and data retention requirements
- Implement data retention policies

### 4. Performance Considerations
- Capturing data "before form sending" is more reliable
- Asynchronous capturing is better for high-volume forms
- Monitor database size and archive old submissions

### 5. Integration with CRM
- Form submissions capture user data
- Create automation workflows to process captured data
