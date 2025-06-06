---
title: Power Apps Forms
sidebar_position: 1
premium: true
slug: /forms/forms
tags:
    - Form
    - DataPress
keywords: [DataPress forms]  
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Capture leads, feedback and other information from your website using forms designed in Power Apps and Dynamics 365.</p>

## Introduction

:::info

This feature is exclusive to the premium extension.

Licensing Requirement

If the premium plugin is not properly licensed, syntax errors may occur. Ensure the plugin is correctly licensed to maintain Power Apps Forms functionality.

:::

Forms are an essential component of Power Apps and Dynamics 365 which enables interaction with your data. DataPress (Dataverse Integration) brings the comparable experience to your WordPress website. It makes writing data back to Dataverse / Dynamics 365 a priority, and to achieve the goal it provides support for rendering Dataverse / Dynamics 365 forms and processing the input by converting it into new Dataverse rows (records) or updates to the existing rows.

The plugin introduces a concept of *"form registrations"*, a proxy layer between WordPress and a Dataverse form. It specifies among other things which Dataverse form to show, how to handle submissions, which fields to make required or optional.

Forms are fully integrated into the Twig templating engine, and Twig templates are the way to place forms on your website pages.

## Features and limitations

DataPress (Dataverse Integration) renders forms close to what they are defined in Dataverse, layout-wise. Most control types are supported too, including lookups, radio buttons and checkboxes, date & time pickers, as well as simple text (e.g. single-line and multi-line text, email) and number (e.g. integers, money) inputs.

DataPress (Dataverse Integration) provides a lookup dialog very similar to one included in Power Apps and Dynamics 365. It allows picking rows as values for lookup and customer columns. The lookup dialog included in the plugin does not support selecting multiple rows for one column. Multi-select picklists are not supported yet.

Several composite controls are not supported yet. Those include subgrids, maps, nested forms (quick forms), notes (Posts, Assistant, Activities, Notes).

There are no plans for support of web resources, such as custom JavaScript libraries embedded into forms. You can still use CSS and JavaScript to change how your forms appear and behave using standard WordPress means.

### Composite columns

Default Dataverse tables, such as Contact and Lead, include several composite read-only columns.

`fullname` is a calculated column which by default represents First Name and Last Name. DataPress (Dataverse Integration) and Dynamics 365 provide several options to generate the Full Name, [see the article](https://www.magnetismsolutions.com/blog/colinmaitland/2014/02/03/how-to-change-the-full-name-format-for-contacts-in-microsoft-dynamics-crm-2013). The plugin does not show a pop-up to specify each name component separately. It instead decomposes the `fullname` column, if one is present on the form, into separate controls on the form as if the form contained `firstname` and `lastname` instead.

`addressN_composite` columns are likewise calculated based on other `addressN_*` columns. In terms of rendering composite address columns are treated the same as Full Name columns.

DataPress (Dataverse Integration) allows customizing the list of underlying attributes for Full Name and Address columns.

### reCAPTCHA support

Dataverse forms are fully integrated with reCAPTCHA. 
[Read more](/forms/recaptcha/#recaptcha-support-for-power-apps-forms)

### Front-end dependencies

Dataverse forms require [Bootstrap 4](https://getbootstrap.com/) and [Font Awesome 5](https://fontawesome.com/) to work properly. We provide custom builds of these libraries that do not interfere with the existing layout of pages. You can opt out of including these libraries onto your website if your WordPress theme provides these dependencies.

## Create a form registration

To insert a form onto your webpage and start collecting data, you need to create a "form registration", which defines how to treat the incoming data.

In the plugin dashboard, go to the *Forms* tab and click **Create new** to start creating a new form registration.

Enter the *Form Name*, select the *CRM Form* and choose the mode of operation. Three modes are available:

- Create a new record -- submissions always create a new record (row).
- Update or create a record -- form uses [table binding](/datapress/binding/table-binding.md) to acquire a record and put its values into form, and submission updates the row with changed values. If table binding hasn't yielded an existing record, a new record will be created instead.
- Read-only -- table binding is used to acquire a record, its values are displayed, but nothing can be changed on the form.

Finally, click **Create** to save the new form registration.

### Allow deleting records

When you choose the *update* or *read-only* mode, you can enable record deletion by checking *Allow deleting the record.*

You are advised to implement the `integration-cds/forms/authorize-delete` filter hook to guard against unauthorized use. When deletion request is submitted, three parameters are passed into the hook:

- `$isAuthorized` -- *(boolean)* whether to authorize deletion of the record.
- `$reg` -- *(FormRegistration)* form registration which initiated deletion. Contains form ID, target entity and other form registration settings.
- `$target` -- *([EntityReference](https://github.com/AlexaCRM/dynamics-webapi-toolkit/blob/master/src/Xrm/EntityReference.php)|null)* record that is being deleted. The hook should return `false` if `NULL` has been passed.

### Required and optional columns

Dataverse forms can require some columns (fields) to be filled before a form can be submitted. Sometimes you want to make more columns required, or, instead, make some columns optional, without actually customizing the Dataverse form.

To do that, select the columns from the Attributes column and move them to the Required or Optional column by clicking **Required &rarr;** or **Optional &rarr;** respectively. Select columns and click **Remove selected**, or double-click the fields (columns), to remove them from the list.

### Global settings overrides

Form registration provides several options to override global form settings, such as inclusion of reCAPTCHA and front-end dependencies, form behavior, messages and Full Name / Address decomposition columns.

## Add the form to a page

DataPress (Dataverse Integration) provides a custom Twig tag, `{% form %}`, to add Dataverse forms to WordPress pages. When you add a Dataverse form to a page, you need to know its form registration ID -- it is specified in the list of form registrations.

```twig
{% form id=42 %}
```

This code is sufficient to display a Dataverse form on a WordPress page and start accepting submissions.

### Default values

You can provide default values to pre-populate specific form columns by using the ‘defaults’ attribute in the `{% form %}` tag.

```twig
{% form id=42 defaults={ "leadsourcecode": 8, "donotfax": true, "address1_country": "United States" } %}
```

If you create a page using the Dataverse Form block, you can set values in the `defaults` field.

```twig
{ "leadsourcecode": 8, "donotfax": true, "address1_country": "United States" }
```

To set a default value for a choice field, you need to analyze the possible values. For example, you can find the label and value mapping in the table settings. To set the ‘Male’ label for the gender column, you need to choose the value of 1.

```twig
{% form id=4 defaults={"gendercode": 1} %}
```

Similar way to set default value for multiple choice field.

```twig
{% form id=2 defaults={"multipleChoiceColumnName": '3,4'} %}
```

Additionally, you can provide default values in the Dataverse Admin Area. Choose the form, go to Fields Customization, and find the Default Field Values section. Here, you just need to choose the field name and set the default value for it. You can set default values even for lookup and choice fields.

### Getting record GUID

After the record has been successfully created, you can get the guid using the redirect setting with the %s parameter.

For example, `/?id=%s` will be replaced by `/?id=00000000-0000-0000-0000-000000000000`

## Date Time and Date Only fields in forms

When working with date and time values in forms, you can customize how they are displayed to users and how they are adjusted for different time zones. Here are the behavior options available in Dataverse and model-driven apps:

- **User Local**: Adjusts values based on the user’s time zone. 
- **Time Zone Independent**: No time zone conversion is applied.
- **Date Only**: Displays only the date portion without time zone conversion.

[Read more](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/behavior-format-date-time-field)

[Usage Scenarios](/date-and-time/#usage-scenarios)

When using the User Local behavior, all columns will display date or date-time fields converted to the specified time zone in case of the **Legacy** or **Local** option in `ICDS_DATETIME_VALUE`. [More details](/datapress/administration/troubleshooting.md) 

For instance:

If you have a value like **5/15/2028 03:00:00 AM** in a column with User Local behavior and set the time zone to **UTC + 2h**, the form will show **5/15/2028 05:00:00 AM**.
If you set the time zone to **UTC - 4h**, the form will display **5/14/2028 11:00:00 PM**.

|                 | Legacy     |  UTC              | Local  |
|-----------------|--------------|----------------|-----------|
|premium forms | convert the date and time to the user's timezone | UTC | convert the date and time to the user's timezone |

You can set time zones for **individual WordPress users**:

1. Find the user and click **Edit**.
2. Go to the **Dataverse Extra Fields** section.
3. Choose a value from the **Timezone** dropdown.

For example, if a user has the same **5/15/2028 03:00:00 AM** column value with User Local behavior:

- Setting their time zone to **UTC + 2h** will display **5/15/2028 05:00:00 AM**.
- Setting their time zone to **UTC - 4h** will show **5/14/2028 11:00:00 PM**.

Anonymous visitors will see the values in the timezone of the website. To set the time zone for the website, follow these steps:

1. Sign in into WordPress administrative interface.
2. Click **Settings**.
3. Go to **General**.
4. Select the required time zone.

## Lookup fields in forms

In Power Apps Forms for Dataverse, lookups are crucial for creating relationships between tables and enhancing data entry. Here’s a detailed look at how lookups function in different contexts:

1. **Dialog**

Search dialog boxes provide an interactive way to search and select records. Key features include:

**Advanced Search**: Users can view all records or get results as they type, making it easier to find the right record.
**Filters**: Filters set with the view help narrow down search results. You can set values to sort while searching in any view.

2. **Dropdown** 

Dropdown controls are used to display records with selections, allowing users to choose from a predefined list of options. They can be customized as follows:

**Filter Choices**: Use the view to filter the available choices based on the records available in it. The name of the view must be pre-defined by the administrator in the form settings.
**Search Options**: When there are a large number of records, it is convenient to use the search option to find the desired value.

3. Select

This is basically a standard dropdown list where users can select an entry from a dropdown list. By default, about 50 values are displayed.

### Lookup security

Lookups utilize a custom REST API that could potentially execute outside of the form context, thereby unintentionally exposing data. To mitigate the risk of accidental exposure, we have implemented additional security measures:

1. We fully support Wordpress nonces for lookup queries, i.e. queries performed outside of the form context will fail. Learn more at [Nonces – Common APIs Handbook](https://developer.wordpress.org/apis/security/nonces/).

2. We support custom filter restricting access to the lookups. For example, to restrict lookups to the signed-in users only, add the following code to the `functions.php` file of the current theme. 

```php
add_filter( 'integration-cds/lookup/authorize-access', function( $isAllowed, $entityName, $view ){
    if ( !is_user_logged_in() ) {
        return false;
    }

    return $isAllowed;
}, 10, 3 );
```

3. Data returned by a lookup can be filtered using fetchXML templates, refer to the `FetchXML queries` page for sample templates. To add a template to a form in the Dataverse Admin Area, navigate to the Forms settings and scroll down to the `Conditional access` section located at the bottom of the page and add your desired template for the form lookups.

:::note
The following formats of the **Whole Number** data type are currently unsupported: **Language code**, **Duration**, **Time zone**.
:::

## How to work with decimal and float fields

Decimal and float fields depend on your Power Apps website settings. Here, you can set minimum and maximum values, decimal places, and other settings. [Read more](https://learn.microsoft.com/power-apps/maker/data-platform/formula-column-data-types)