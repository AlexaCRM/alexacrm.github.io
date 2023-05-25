---
title: PowerApps Forms
permalink: /integration-cds/forms/
premium: true
---

<p class="lead">Capture leads, feedback and other information from your website using forms designed in PowerApps and Dynamics 365.</p>

## Introduction

Forms are an essential component of Power Apps and Dynamics 365 which enables interaction with your data. Dataverse Integration brings the comparable experience to your WordPress website. It makes writing data back to Dataverse / Dynamics 365 a priority, and to achieve the goal it provides support for rendering Dataverse / Dynamics 365 forms and processing the input by converting it into new Dataverse rows (records) or updates to the existing rows.

The plugin introduces a concept of *"form registrations"*, a proxy layer between WordPress and a Dataverse form. It specifies among other things which Dataverse form to show, how to handle submissions, which fields to make required or optional.

Forms are fully integrated into the Twig templating engine, and Twig templates are the way to place forms on your website pages.

## Features and limitations

Dataverse Integration renders forms close to what they are defined in Dataverse, layout-wise. Most control types are supported too, including lookups, radio buttons and checkboxes, date & time pickers, as well as simple text (e.g. single-line and multi-line text, email) and number (e.g. integers, money) inputs.

Dataverse Integration provides a lookup dialog very similar to one included in Power Apps and Dynamics 365. It allows picking rows as values for lookup and customer columns. The lookup dialog included in the plugin does not support selecting multiple rows for one column. Multi-select picklists are not supported yet.

Several composite controls are not supported yet. Those include subgrids, maps, nested forms (quick forms), notes (Posts, Assistant, Activities, Notes).

There are no plans for support of web resources, such as custom JavaScript libraries embedded into forms. You can still use CSS and JavaScript to change how your forms appear and behave using standard WordPress means.

### Composite columns

Default Dataverse tables, such as Contact and Lead, include several composite read-only columns.

`fullname` is a calculated column which by default represents First Name and Last Name. Dataverse Integration and Dynamics 365 provide several options to generate the Full Name, [see the article](https://www.magnetismsolutions.com/blog/colinmaitland/2014/02/03/how-to-change-the-full-name-format-for-contacts-in-microsoft-dynamics-crm-2013). The plugin does not show a pop-up to specify each name component separately. It instead decomposes the `fullname` column, if one is present on the form, into separate controls on the form as if the form contained `firstname` and `lastname` instead.

`addressN_composite` columns are likewise calculated based on other `addressN_*` columns. In terms of rendering composite address columns are treated the same as Full Name columns.

Dataverse Integration allows customizing the list of underlying attributes for Full Name and Address columns.

### reCAPTCHA support

Dataverse forms are fully integrated with reCAPTCHA. Version 2 with checkbox challenge, version 2 invisible and version 3 are supported.

Dataverse Integration supports 3rd party plugins to retrieve reCAPTCHA credentials and settings:

- [Contact Form 7 Captcha](https://wordpress.org/plugins/contact-form-7-simple-recaptcha/)
- [Google Captcha (reCAPTCHA) by BestWebSoft](https://wordpress.org/plugins/google-captcha/)

### Front-end dependencies

Dataverse forms require [Bootstrap 4](https://getbootstrap.com/) and [Font Awesome 5](https://fontawesome.com/) to work properly. We provide custom builds of these libraries that do not interfere with the existing layout of pages. You can opt out of including these libraries onto your website if your WordPress theme provides these dependencies.

## Create a form registration

To insert a form onto your webpage and start collecting data, you need to create a "form registration", which defines how to treat the incoming data.

In the plugin dashboard, go to the *Forms* tab and click **Create new** to start creating a new form registration.

Enter the *Form Name*, select the *CRM Form* and choose the mode of operation. Three modes are available:

- Create a new record -- submissions always create a new record (row).
- Update or create a record -- form uses [table binding](../entity-binding/) to acquire a record and put its values into form, and submission updates the row with changed values. If table binding hasn't yielded an existing record, a new record will be created instead.
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

Dataverse Integration provides a custom Twig tag, {% raw %}`{% form %}`{% endraw %}, to add Dataverse forms to WordPress pages. When you add a Dataverse form to a page, you need to know its form registration ID -- it is specified in the list of form registrations.

{% raw %}
``` twig
{% form id=42 %}
```
{% endraw %}

This code is sufficient to display a Dataverse form on a WordPress page and start accepting submissions.

### Default values

You can provide default values to pre-populate specific form columns using the `defaults` attribute in the {% raw %}`{% form %}`{% endraw %} tag.

{% raw %}
``` twig
{% form id=42 defaults={ "leadsourcecode": 8, "donotfax": true, "address1_country": "United States" } %}
```
{% endraw %}

If you create a page using the Dataverse Form block set values in the `defaults` field.

{% raw %}
``` twig
{ "leadsourcecode": 8, "donotfax": true, "address1_country": "United States" }
```
{% endraw %}

To set default value for choice field you need to analyze possible values. For example, you can find label and value mapping in table settings. For the gender column to set `Male` label you need to choose 1 value.

{% raw %}
``` twig
{% form id=4 defaults={"gendercode": 1} %}
```
{% endraw %}

Also you can provide default values in Dataverse Admin Area. Choose the form and go to Fields customization, find the Default field values section. Here you just need to choose field name and set the default value for it. Feel free to set default value even for lookup and choice fields.

### Getting record GUID

After the record has been successfully created, you can get the guid using the redirect setting with the %s parameter.

For example, `/?id=%s` will be replaced by `/?id=00000000-0000-0000-0000-000000000000`
