---
title: Forms
permalink: /integration-cds/forms/
---

<p class="lead">Capture leads, feedback and other information from your website using forms designed in Dynamics 365.</p>

## Introduction

Forms along with grid tables are corner stones of user interaction in PowerApps and Dynamics 365. Integration CDS brings the comparable experience to your WordPress website. It makes writing data back to CDS / Dynamics 365 a priority, and to achieve the goal it provides support for rendering Dynamics 365 forms and processing the input by converting it into new CRM records or updates to the existing records.

The plugin introduces a concept of *"form registrations"*, a proxy layer between WordPress and a CRM form. It specifies among other things which CRM form to show, how to handle submissions, which fields to make required or optional.

Forms are fully integrated into the Twig templating engine, and Twig templates are the way to place forms on your website pages.

## Features and limitations

CDS Integration renders forms close to what they are defined in CRM, layout-wise. Most control types are supported too, including lookups, radio buttons and checkboxes, date & time pickers, as well as simple text (e.g. single-line and multi-line text, email) and number (e.g. integers, money) inputs.

CDS Integration provides a lookup dialog very similar to one included in PowerApps and Dynamics 365. It allows picking records as values for lookup and customer fields. The lookup dialog included in the plugin does not support selecting multiple records for one field. Multi-select picklists are not supported yet.

Several composite controls are not supported yet. Those include subgrids, maps, nested forms (quick forms), notes (Posts, Assistant, Activities, Notes).

There are no plans for support of web resources, such as custom JavaScript libraries embedded into forms. You can still use CSS and JavaScript to change how your forms appear and behave using standard WordPress means.

### Composite fields

Default Common Data service entities, such as Contact and Lead, include several composite read-only fields.

`fullname` is a calculated field which by default represents First Name and Last Name. CDS and Dynamics 365 provide several options to generate the Full Name, [see the article](https://www.magnetismsolutions.com/blog/colinmaitland/2014/02/03/how-to-change-the-full-name-format-for-contacts-in-microsoft-dynamics-crm-2013). The plugin does not show a pop-up to specify each name component separately. It instead decomposes the `fullname` field, if one is present on the form, into separate controls on the form as if the form contained `firstname` and `lastname` instead.

`addressN_composite` fields are likewise calculated based on other `addressN_*` fields. In terms of rendering composite address fields are treated the same as Full Name fields.

CDS Integration allows customizing the list of underlying attributes for Full Name and Address fields.

### reCAPTCHA support

CDS Integration forms are fully integrated with reCAPTCHA. Version 2 with checkbox challenge, version 2 invisible and version 3 are supported.

CDS Integration supports 3rd party plugins to retrieve reCAPTCHA credentials and settings:

- [Contact Form 7 Captcha](https://wordpress.org/plugins/contact-form-7-simple-recaptcha/)
- [Google Captcha (reCAPTCHA) by BestWebSoft](https://wordpress.org/plugins/google-captcha/)

### Front-end dependencies

CDS Integration forms require [Bootstrap 4](https://getbootstrap.com/) and [Font Awesome 5](https://fontawesome.com/) to work properly. We provide custom builds of these libraries that do not interfere with the existing layout of pages. You can opt out of including these libraries onto your website if your WordPress theme provides these dependencies.

## Create a form registration

To insert a form onto your webpage and start collecting data, you need to create a "form registration", which defines how to treat the incoming data.

In the plugin dashboard, go to the *Forms* tab and click **Create new** to start creating a new form registration.

Enter the *Form Name*, select the *CRM Form* and choose the mode of operation. Three modes are available:

- Create a new record -- submissions always create a new record.
- Update or create a record -- form uses [entity binding](../entity-binding/) to acquire a record and put its values into form, and submission updates the record with changed values. If entity binding hasn't yielded an existing record, a new record will be created instead.
- Read-only -- entity binding is used to acquire a record, its values are displayed, but nothing can be changed on the form.

Finally, click **Create** to save the new form registration.

### Required and optional fields

CRM forms can require some fields to be filled before a form can be submitted. Sometimes you want to make more fields required, or, instead, make some fields optional, without actually customizing the CRM form.

To do that, select the fields from the Attributes column and move them to the Required or Optional column by clicking **Required &rarr;** or **Optional &rarr;** respectively. Select fields and click **Remove selected**, or double-click the fields, to remove them from the list.

### Global settings overrides

Form registration provides several options to override global form settings, such as inclusion of reCAPTCHA and front-end dependencies, form behavior, messages and Full Name / Address decomposition fields.

## Add the form to a page

CDS Integration provides a custom Twig tag, {% raw %}`{% form %}`{% endraw %}, to add CRM forms to WordPress pages. When you add a CRM form to a page, you need to know its form registration ID -- it is specified in the list of form registrations.

{% raw %}
``` twig
{% form id=42 %}
```
{% endraw %}

This code is sufficient to display a CRM form on a WordPress page and start accepting submissions.

### Default values

You can provide default values to pre-populate specific form fields using the `defaults` attribute in the {% raw %}`{% form %}`{% endraw %} tag.

{% raw %}
``` twig
{% form id=42 defaults={ "leadsourcecode": 8, "donotfax": true, "address1_country": "United States" } %}
```
{% endraw %}
