---
sidebar_position: 3
title: Twig template
slug: /twig/twig_template
tags:
    - Twig
    - DataPress
keywords: [DataPress twig]  
---

:::info

Premium feature! 

:::

## Templates usage

DataPress (Dataverse Integration) gives you the ability to create reusable templates. To do this, you need to go to the plugin admin area and open the "Templates" tab.

There you must enter the name of the template and the content of the template. The content could contain all the functions, statements and filters of Twig.

To use templates in `Dataverse Twig Gutenberg` block, you need to use the `include` statement with the template name. For example:

```twig
{% include 'name_of_your_template' %}
```


If you want to create a template for updating record you can look at this example:

```php
{% set currentRecord=entities.account[params.id] %}
{% form entity="account" mode="update" record=currentRecord|to_entity_reference %}
<form>
    <div class="form-group">
        <label>
            Account Name:
            <input class="form-control" name="name" value="{{ currentRecord["name"] }}">
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
            Last Date Included in Campaign:
            <input class="vdatetime" name="lastusedincampaign" value="{{ currentRecord["lastusedincampaign"] }}">
        </label>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
```

Then at the moment of page creation you need to use the `include` statement with the template name(previous example). And you need to configure binding for this page to have opportunity to update necessary record. [See how to configure binding.](/datapress/binding/table-binding.md) 

You can also use templates to replace the form template or individual form fields in form registration editor. For this purpose click `Render form based on twig template` on the creation form page. Then choose your template name from the form template dropdown. If you want to replace just some fields you should leave default value for the form template dropdown, but set value for `fields templates`.

Also you can partially change behavior for some fields. For example, this code will change placeholders for first name and last name fields:

```php
{% set firstnameDisabled = control.disabled %}
{% set lastnameDisabled = control.disabled %}
<div class="row">
  <div class="col-6 {% if 'firstname' in form.errors|keys %}has-danger{% endif %}">
    <input type="text" name="firstname" placeholder="Client First Name" class="form-control form-control-danger" value="{{ attribute(record, 'firstname') ?? formDefaults['firstname'] }}" {% if firstnameDisabled %}readonly="readonly"{% endif %}>
    {% if 'firstname' in form.errors|keys %}
      {% for errorMessage in form.errors['firstname'] %}
        <div class="form-control-feedback">{{ errorMessage }}</div>
      {% endfor %}
    {% endif %}
  </div>
  <div class="col-6 {% if 'lastname' in form.errors|keys %}has-danger{% endif %}">
    <input type="text" name="lastname" placeholder="Client Last Name" class="form-control" value="{{ attribute(record, 'lastname') ?? formDefaults['lastname'] }}" {% if lastnameDisabled %}readonly="readonly"{% endif %}>
    {% if 'lastname' in form.errors|keys %}
      {% for errorMessage in form.errors['lastname'] %}
        <div class="form-control-feedback">{{ errorMessage }}</div>
      {% endfor %}
    {% endif %}
  </div>
</div>
```

To use this template at the moment of form creation set `Render form based on twig template` as `Yes` on the creation form page. Then set mapping between `Fullname` field and your template name as value.
