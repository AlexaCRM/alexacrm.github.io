---
title: Custom Forms
sidebar_position: 3
tags:
    - Form
    - Datapress
---

<p class="lead">Design forms with Twig and HTML and capture submissions into your Dataverse instance.</p>

## Introduction

Using PowerApps or Dynamics 365 forms is not the only way to capture submissions from your WordPress website. You can use Twig and HTML forms syntax to create custom form layouts.

Custom forms are a feature provided in the free Dataverse Integration plugin at [wordpress.org](https://wordpress.org/plugins/integration-cds/). 

## Use Twig to design a form

Dataverse Integration provides a pair of Twig tags, `{% form %}{% endform %}`, to define a form. `{% form %}` tag accepts the following parameters:

- `entity` -- *(string, required)* logical name of the target table.
- `mode` -- *(string, required)* `create` for creation forms. `update` for update forms.
- `record` -- *(EntityReference)* row (record) GUID, or EntityReference, or Table to update. Used in `update` mode.
- `recaptcha` -- *(boolean)* whether reCAPTCHA validation is required. See [Protect form submissions with reCAPTCHA](#protect-form-submissions-with-recaptcha).
- `redirect` -- *(string)* URL to redirect to after a successful submission.
- `message` -- *(string)* custom message to show after a successful submission.
- `messages` -- *(object)* custom messages to show after a form submission. For example, `{ "success": "Thanks for a submission!", "failure": "Failed to submit the form. Try again later, please." }`
- `keep` -- *(boolean)* whether to keep the form visible after a successful submission. `false` is the default value and the form is collapsed.
- `keep_data` -- *(boolean)* whether to keep values entered into form inputs after a successful submission. `false` is the default value and all values are removed.

*Note:* when the premium add-on is installed, the `{% form %}` acts as a PowerApps form tag if the `id` parameter is specified. See [PowerApps forms documentation](./forms.md).

```twig
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

## Protect form submissions with reCAPTCHA

To prevent spam submissions from getting into your CRM, add reCAPTCHA to your form. Add `recaptcha=true` to the list of `{% raw %}{% form %}{% endraw %}` parameters, and add the `<recaptcha>` placeholder to a desired place in your form.

Before you start using reCAPTCHA in your forms, please configure reCAPTCHA in the plugin settings interface.

#### Example

```twig
{% set useRecaptcha = true %}
{% form entity="lead" mode="create" recaptcha=useRecaptcha %}
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

### Getting row GUID

After the row has been successfully created, you can get the guid using the redirect setting with the %s parameter.

For example, `/?id=%s` will be replaced by `/?id=00000000-0000-0000-0000-000000000000`
