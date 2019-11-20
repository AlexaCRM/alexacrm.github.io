---
title: Custom Forms
permalink: /integration-cds/custom-forms/
---

<p class="lead">Design forms with Twig and HTML and capture submissions into your CDS organization.</p>

## Introduction

Using PowerApps or Dynamics 365 forms is not the only way to capture submissions from your WordPress website. You can use Twig and HTML forms syntax to create custom form layouts.

Custom forms are a feature provided in the free CDS Integration plugin at [wordpress.org](https://wordpress.org/plugins/integration-cds/). 

## Use Twig to design a form

CDS Integration provides a pair of Twig tags, {% raw %}`{% form %}{% endform %}`{% endraw %}, to define a form. {% raw %}`{% form %}`{% endraw %} tag accepts the following parameters:

- `entity` -- *(string, required)* logical name of the target entity.
- `mode` -- *(string, required)* `create` for creation forms. `update` for update forms.
- `record` -- *(EntityReference)* record GUID, or EntityReference, or Entity to update. Used in `update` mode.

*Note:* when the premium add-on is installed, the {% raw %}`{% form %}`{% endraw %} acts as a PowerApps form tag if the `id` parameter is specified. See [PowerApps forms documentation](../forms/).

{% raw %}
``` twig
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
{% endraw %}

Make sure to define your form between the `<form></form>` tags. The form submission will be handled on the [`submit` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event).

To link a form control to a corresponding entity attribute, specify the logical name of the attribute in the HTML attribute `name`, e.g. `emailaddress1` for Email.
