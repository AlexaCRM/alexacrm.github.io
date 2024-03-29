---
title: Create your form
permalink: /integration-cds/create-form/
redirect_from:
 - /integration-dynamics/create-form/
typora-root-url: ../
---

## Create a Contact Us form

The plugin provides a Gutenberg block, "Dataverse Plain". It accepts Twig code and renders it as HTML at front-end. To create your first form, you can use the [custom form syntax](/integration-cds/custom-forms/). It allows creating HTML forms and capturing submissions into your Dataverse or Dynamics 365 organization.

Custom forms allow creating new Dataverse / Dynamics 365 rows, as well as updating existing rows. reCAPTCHA is supported to protect your forms from spam.

{% raw %}
``` twig
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
{% endraw %}

The {% raw %}`{% form %}`{% endraw %} Twig tag lets you configure the form settings, such as target table, submission mode (create or update), etc. See [custom forms documentation](/integration-cds/custom-forms/).

Form control `name` columns refer to the corresponding table columns, such as `firstname`, `lastname` and `emailaddress1`. Put the `<recaptcha>` placeholder where you want to put reCAPTCHA control if you enable reCAPTCHA on your form. Before you use reCAPTCHA, please configure it in plugin settings.
