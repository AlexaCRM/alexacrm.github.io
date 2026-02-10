---
title: Notes (capabilities & limitations)
sidebar_position: 3
premium: true
slug: /forms/forms-reference
tags:
  - Form
  - DataPress
keywords: [DataPress forms configuration]
description: Features of working with different types of fields
---

## Supported controls

DataPress renders forms close to their Dataverse definitions.

Supported control types include:

- Single‑line and multi‑line text
- Email and numeric fields
- Money and integer fields
- Radio buttons and checkboxes
- Date and time pickers
- Lookup fields

---

## Limitations

### Lookup selection
- Lookup dialogs do **not** support selecting multiple records
- Multi‑select picklists are **not supported**

### Unsupported composite controls
The following controls are not currently supported:

- Subgrids
- Maps
- Quick (nested) forms
- Notes, activities, posts, assistant panels

### Web resources
Custom JavaScript web resources embedded in Dataverse forms are not supported.

You may still use WordPress‑level CSS and JavaScript to customize appearance and behavior.

---

## Composite columns

### Full Name (`fullname`)

`fullname` is a calculated field composed of name attributes.

If present on the form, DataPress automatically decomposes it into individual controls (such as `firstname` and `lastname`) instead of using a popup editor.

Microsoft reference:  
https://www.magnetismsolutions.com/blog/colinmaitland/2014/02/03/how-to-change-the-full-name-format-for-contacts-in-microsoft-dynamics-crm-2013

### Address (`addressN_composite`)

Address composite columns are handled similarly and decomposed into their underlying attributes.

The plugin allows configuring which attributes are used for Full Name and Address fields.

---

## Date and time behavior

Dataverse supports multiple date behaviors:

- **User Local**: Adjusts values based on the user’s time zone. 
- **Time Zone Independent**: No time zone conversion is applied.
- **Date Only**: Displays only the date portion without time zone conversion.

Documentation:  
https://learn.microsoft.com/en-us/power-apps/maker/data-platform/behavior-format-date-time-field

### Time zone handling

For **User Local** fields, displayed values depend on:

- `ICDS_DATETIME_VALUE` setting (Legacy или Local)
- User time zone

Example:

| Stored Value | Timezone | Displayed Value |
|-------------|----------|----------------|
| 5/15/2028 03:00 AM | UTC+2 | 5/15/2028 05:00 AM |
| 5/15/2028 03:00 AM | UTC‑4 | 5/14/2028 11:00 PM |

Anonymous visitors see values using the WordPress site time zone.

---

## Lookup behavior and security

### Display modes

1. **Dialog** — searchable modal lookup
2. **Dropdown** — filtered list with optional search
3. **Select** — simple dropdown (≈ 50 options)

---

### Security measures

To prevent unauthorized data access:

1. WordPress nonces are enforced  
   https://developer.wordpress.org/apis/security/nonces/

2. Access can be restricted using a filter hook:

```php
add_filter( 'integration-cds/lookup/authorize-access', function( $isAllowed, $entityName, $view ){
    if ( !is_user_logged_in() ) {
        return false;
    }
    return $isAllowed;
}, 10, 3 );
```

3. FetchXML templates can filter lookup results.

## Unsupported Whole Number Formats
These Dataverse formats are not supported:

Language code
Duration
Time zone

## Decimal & Float Fields
Handled according to Dataverse settings (min/max, decimals).
[Reference](https://learn.microsoft.com/power-apps/maker/data-platform/formula-column-data-types)