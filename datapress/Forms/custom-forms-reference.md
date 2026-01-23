---
title: Custom Forms - Reference
sidebar_position: 8
slug: /forms/custom-forms-reference
tags:
  - Form
  - DataPress
keywords: [DataPress custom form]
---

# Reference (Capabilities & Limitations)

## What Custom Forms can do

- **Create** new Dataverse records (rows) from a WordPress page. 
- **Update** existing Dataverse records when `mode="update"` and `record` is provided.
- Map HTML inputs to Dataverse columns using the input `name` attribute (Dataverse logical column name).
- Optionally enable **reCAPTCHA** [protection for custom forms](https://docs.alexacrm.com/forms/recaptcha/)  

## How submission works (important note)

DataPress processes submissions using the HTML form **submit** event (standard browser behavior). [1](https://docs.alexacrm.com/forms/custom-forms/)[3](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)  

Make sure your markup contains a real `<form>...</form>` element, because [submission is tied to the form itself](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)  

---

## `{% form %}` parameters

Use these parameters in the opening Twig tag:


| Parameter   | Type                | Description |
|-------------|---------------------|-------------|
| **entity**  | string (required)   | Logical name of the target Dataverse table.  |
| **mode**    | string (required)   | Form mode: `create` to create a new record, `update` to update an existing one. |
| **record**  | EntityReference     | Record GUID, EntityReference, or Table object used in `update` mode.|
| **recaptcha** | boolean          | Enables reCAPTCHA validation. Requires `<recaptcha>` placeholder inside the form. See *Protect form submissions with reCAPTCHA*. |
| **redirect** | string            | URL to redirect the user to after a successful submission. Supports `%s` for record GUID. |
| **message**  | string            | Custom success message displayed after form submission. |
| **messages** | object            | Custom messages object (e.g., success / failure messages). Example: `{ "success": "Thanks!", "failure": "Please try again later." }` |
| **keep**      | boolean          | Keeps the form visible after a successful submission (`false` by default; form collapses). |
| **keep_data** | boolean          | Keeps form field values after a successful submission (`false` by default; values are cleared). |

[Examples](/forms/custom-forms-example)

---

## Premium behavior (Power Apps forms)

If the premium add‑on is installed and an `id` parameter is used, the `{% form %}` tag behaves like a Power Apps form [tag](/forms/forms-configuration/) 

---

## reCAPTCHA requirements (Custom Forms)

If you enable reCAPTCHA with `recaptcha=true`, you must do **both**:

1. Configure [reCAPTCHA keys in DataPress settings](/forms/recaptcha/)  
2. Add the `<recaptcha>` placeholder **inside** your `<form>` markup.  
   DataPress replaces it with the actual reCAPTCHA widget at runtime. 

If reCAPTCHA is enabled but not configured, the form may fail to render or submit. 

Read more: [reCAPTCHA support](/forms/recaptcha/)

---

## Date/Time fields in Custom Forms

### Expected input formats

When you fill date fields manually in a custom form, use these formats:

- **Date Only**: `yyyy-mm-dd` or `yyyy/mm/dd`  
  Example: `2023-01-20` or `2023/01/20` [1](https://docs.alexacrm.com/forms/custom-forms/)  
- **Date Time**: `yyyy-mm-ddThh:mm`  
  Example: `2023-01-20T12:30` [1](https://docs.alexacrm.com/forms/custom-forms/)  

### Time zone behavior

How date/time values are displayed can depend on Dataverse behavior (User Local / Time Zone Independent / Date Only) and DataPress settings such as [`ICDS_DATETIME_VALUE`](/date-and-time/)
[1](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/behavior-format-date-time-field)  

Read more: [Date and Time columns](https://docs.alexacrm.com/date-and-time/)

---

## Getting the created record GUID via redirect

After a record is created successfully, you can capture its GUID using `redirect` with a `%s` placeholder.

Example:

- `redirect="/?id=%s"` becomes:  
  `/?id=00000000-0000-0000-0000-000000000000`   
