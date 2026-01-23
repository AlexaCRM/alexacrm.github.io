
---
title: Forms Examples
sidebar_position: 4
premium: true
slug: /forms/forms/examples
tags:
  - Form
  - DataPress
  - Examples
keywords: [DataPress forms, Power Apps Forms examples, Dataverse forms examples]
---

# Examples

This page provides copy/paste examples for rendering **Power Apps / Dataverse forms** on WordPress using **DataPress** form registrations.

> **Prerequisite:** You must create a **form registration** in the plugin admin area.  
> You will need its registration ID (for example, `id=42`).

---

##  Render a basic form

Render a form using its **form registration ID**:

```twig
{% form id=42 %}
```

##  Render a form with default field values
Use the defaults attribute to pre-populate fields:

```
{% form id=42 defaults={
  "leadsourcecode": 8,
  "donotfax": true,
  "address1_country": "United States"
} %}
```

**Notes:**

- Defaults values must match Dataverse attribute logical names.
- Boolean fields accept true/false.
- For choice fields, pass the numeric option value (see next section).

##  Set a default value for a Choice (Option Set) field

For choice fields, pass the integer value of the option.
**Example:** set gendercode to “Male” where “Male” has value 1:

```
{% form id=4 defaults={"gendercode": 1} %}
```

You can find label/value mapping in Dataverse column settings or metadata.

##  Set a default value for a Multi-Select Choice field

Multi-select values are passed as a comma-separated string:

```

{% form id=2 defaults={"multipleChoiceColumnName": "3,4"} %}
```

### Pre-select lead source

```
{% form id=42 defaults={"leadsourcecode": 8} %}
```

##  Redirect after submit and capture the created record GUID

When a record is successfully created, you can inject the record GUID into a redirect URL using %s.
Example:

- Redirect setting: /?id=%s
- After create: /?id=00000000-0000-0000-0000-000000000000

Use this to forward users to a “Thank you” page, a confirmation screen, or a details page.

##  Set default values via Admin UI (no Twig changes)

You can define default values inside the Dataverse Admin Area:

1. Choose the form
2. Go to Fields Customization
3. Find Default Field Values
4. Add field name + default value

This method supports defaults for:

- text/number fields
- choice fields
- lookup fields (when configured)

## Deletion security — authorize delete requests

If your form registration enables **Allow deleting the record**, you should guard it with the `integration-cds/forms/authorize-delete filter`.

Add to functions.php:

```
add_filter( 'integration-cds/forms/authorize-delete', function( $isAuthorized, $reg, $target ) {
    // Reject if no record was resolved
    if ( $target === null ) {
        return false;
    }

    // Example rule: only signed-in users can delete
    if ( ! is_user_logged_in() ) {
        return false;
    }

    // You can add more rules here:
    // - check user role/capability
    // - check ownership against $target
    // - check registration ID via $reg

    return $isAuthorized;
}, 10, 3 );
```

## Lookup security — restrict lookup access to signed-in users

Lookups use a REST API endpoint and should be protected to avoid accidental data exposure.
The snippet below restricts lookups to **authenticated users only**.

Add it to the active theme’s functions.php:

```
add_filter( 'integration-cds/lookup/authorize-access', function( $isAllowed, $entityName, $view ) {
    if ( ! is_user_logged_in() ) {
        return false;
    }

    return $isAllowed;
}, 10, 3 );
```

## Date & Time behavior — what users will see 

Dataverse fields can behave as:

**User Local**: value converts to user timezone
**Time Zone Independent**: no conversion
**Date Only**: date without time conversion

Example value stored: 5/15/2028 03:00:00 AM (User Local field)

If timezone is UTC + 2, users see 5/15/2028 05:00:00 AM
If timezone is UTC - 4, users see 5/14/2028 11:00:00 PM

Set timezone per WordPress user

Users → Edit
Dataverse Extra Fields
Choose Timezone

Anonymous visitors use the site timezone configured in:
Settings → General → 

## Troubleshooting tips (quick)

- If the premium plugin is not licensed, forms may fail with syntax errors — verify licensing first.
- If your theme already includes Bootstrap/Font Awesome, consider disabling DataPress dependencies to avoid conflicts.
- If lookup results look too broad, use view filters and/or FetchXML templates in conditional access settings.