---
title: Custom Forms
sidebar_position: 6
slug: /forms/custom-forms
tags:
    - Form
    - DataPress
keywords: [DataPress custom form]  
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Design forms with Twig and HTML and capture submissions into your Dataverse instance.</p>

## Introduction

Using PowerApps or Dynamics 365 forms is not the only way to capture submissions from your WordPress website. You can use Twig and HTML forms syntax to create custom form layouts.

Custom forms are a feature provided in the free DataPress (Dataverse Integration) plugin at [wordpress.org](https://wordpress.org/plugins/integration-cds/). 

## Use Twig to design a form

DataPress (Dataverse Integration) provides a pair of Twig tags, `{% form %}{% endform %}`, to define a form. `{% form %}` tag accepts the following parameters:

- `entity` -- *(string, required)* logical name of the target table.
- `mode` -- *(string, required)* `create` for creation forms. `update` for update forms.
- `record` -- *(EntityReference)* row (record) GUID, or EntityReference, or Table to update. Used in `update` mode.
- `recaptcha` -- *(boolean)* whether reCAPTCHA validation is required. See [Protect form submissions with reCAPTCHA](#protect-form-submissions-with-recaptcha).
- `redirect` -- *(string)* URL to redirect to after a successful submission.
- `message` -- *(string)* custom message to show after a successful submission.
- `messages` -- *(object)* custom messages to show after a form submission. For example, `{ "success": "Thanks for a submission!", "failure": "Failed to submit the form. Try again later, please." }`
- `keep` -- *(boolean)* whether to keep the form visible after a successful submission. `false` is the default value and the form is collapsed.
- `keep_data` -- *(boolean)* whether to keep values entered into form inputs after a successful submission. `false` is the default value and all values are removed.

:::note

 When the premium add-on is installed, the `{% form %}` acts as a PowerApps form tag if the `id` parameter is specified. See [PowerApps forms documentation](/datapress/Forms/forms.md).
 
 :::

```php
{% form entity="contact" mode="update" record=record|to_entity_reference %}
<form>
    <div class="form-group">
        <label>
            First Name:
            <input class="form-control" name="firstname" value="{{ record["firstname"] }}">
        </label>
    </div>
    <div class="form-group">
        <label>
            Last Name:
            <input class="form-control" name="lastname" value="{{ record["lastname"] }}">
        </label>
    </div>
    <div class="form-group">
        <label>
            Email:
            <input class="form-control" name="emailaddress1" value="{{ record["emailaddress1"] }}">
        </label>
    </div>
    <div class="form-group">
        <label>
            Phone:
            <input class="form-control" name="telephone1" value="{{ record["telephone1"] }}">
        </label>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
```

Make sure to define your form between the `<form></form>` tags. The form submission will be handled on the [`submit` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event).

To link a form control to a corresponding table column, specify the logical name of the column in the HTML column `name`, e.g. `emailaddress1` for Email.

[Read more about a form with a lookup](../knowledge_base/lookup/lookup_free.md)

## Protect form submissions with reCAPTCHA

To prevent spam submissions from getting into your CRM, add reCAPTCHA to your form. Add `recaptcha=true` to the list of `{% raw %}{% form %}{% endraw %}` parameters, and add the `<recaptcha>` placeholder to a desired place in your form.
[Read more](/forms/recaptcha/#protect-custom-form-submissions-with-recaptcha)

## Create a Contact Us form

The plugin provides a Gutenberg block, "Dataverse Plain". It accepts Twig code and renders it as HTML at front-end. 
Custom forms allow creating new Dataverse / Dynamics 365 rows, as well as updating existing rows. 

:::note
If you enable `recaptcha=true` in the `{% form %}` tag, you must include the `<recaptcha>` placeholder inside your form markup. This placeholder will be replaced with the actual reCAPTCHA widget at runtime.

Before using reCAPTCHA, make sure it is properly configured in the plugin settings. Without configuration, the form will fail to render or submit. [More details](/datapress/Forms/recaptcha.md)

:::

```php
{% form entity="lead" mode="create" recaptcha=true %}
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

The `{% form %}` Twig tag lets you configure the form settings, such as target table, submission mode (create or update), etc. 
Form control `name` columns refer to the corresponding table columns, such as `firstname`, `lastname` and `emailaddress1`. Put the `<recaptcha>` placeholder where you want to put reCAPTCHA control if you enable reCAPTCHA on your form. Before you use reCAPTCHA, please configure it in plugin settings.

## Date Time and Date Only fields in custom forms

For example, you have several custom fields: `cr1d1_dateonly` - Date Only format, `cr1d1_datetime` - Date Time format.

```php
{% form entity="contact" mode="create" record=record|to_entity_reference %}
<form>
    <div class="form-group">
        <label>
            Account Name:
            <input class="form-control" name="name" value="{{ record["name"] }}">
        </label>
    </div>
    <div class="form-group">
        <label>
            Date Only field:
            <input class="vdatetime" name="cr1d1_dateonly" value="{{ record["cr1d1_dateonly"] }}">
        </label>
    </div>
	<div class="form-group">
        <label>
            Date Time field:
            <input class="vdatetime" name="cr1d1_datetime" value="{{ record["cr1d1_datetime"] }}">
        </label>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
```

Then you view page with this template. To fill in this form you should type content in Date only field in `yyyy-mm-dd` or `yyyy/mm/dd` format (like `2023-01-20` or `2023/01/20`), Date Time field in `yyyy-mm-ddThh:mm` format (like `2023-01-20T12:30`).

When using the User Local behavior, all columns will display date or date-time fields converted to the specified time zone in case of the **Local** option in `ICDS_DATETIME_VALUE`. [More details](/datapress/administration/troubleshooting.md) 

|                 | Legacy     |  UTC              | Local  |
|-----------------|------------|-------------------|--------|
|cr1d1_datetime | UTC  | UTC | convert the date and time to the user's timezone |
|cr1d1_datetime_utc | UTC  | UTC | UTC |
|cr1d1_datetime_local | convert the date and time to the user's timezone  | convert the date and time to the user's timezone | convert the date and time to the user's timezone |

[Usage Scenarios](/date-and-time/#usage-scenarios)

To display only a date or time column value, use the following code snippet:

```php
<div class="form-group">
       <label>
        dateuserlocal date utc:
        <input class="form-control" name="cr1d1_datetime_utc_date" value="{{ currentRecord["cr1d1_datetime_utc_date"] }}">
        </label>
</div>
<div class="form-group">
       <label>
        dateuserlocal date local:
        <input class="form-control" name="cr1d1_datetime_local_date" value="{{ currentRecord["cr1d1_datetime_local_date"] }}">
        </label>
</div>
 
<div class="form-group">
       <label>
               dateuserlocal time utc:
        <input class="form-control" name="cr1d1_datetime_utc_time" value="{{ currentRecord["cr1d1_datetime_utc_time"] }}">
        </label>
</div>
 
<div class="form-group">
        <label>
        dateuserlocal time local:
        <input class="form-control" name="cr1d1_datetime_local_time" value="{{ currentRecord["cr1d1_datetime_local_time"] }}">
        </label>
</div>
```

### Getting row GUID

After the row has been successfully created, you can get the guid using the redirect setting with the %s parameter.

For example, `/?id=%s` will be replaced by `/?id=00000000-0000-0000-0000-000000000000`
