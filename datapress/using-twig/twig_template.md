---
sidebar_position: 4
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

## Using Twig Templates from a Folder

To keep your Twig templates organized and reusable, you can load them from a custom folder on your WordPress site. This allows you to separate content logic from layout components and maintain a modular development structure.

**Steps:**

1. Create a Folder for Templates

Inside your WordPress installation, create a directory to store Twig templates, for example:

```plaintext
wp-content/uploads/templates/
```

Place your Twig files in this folder, such as:

```
wp-content/uploads/templates/t1.twig
```

2. Register the Template Folder in functions.php
Add the following snippet to your theme's functions.php file to tell the integration plugin where to look for custom templates:

```php
add_filter( 'integration-cds/twig/templates', function( $templatePaths ) {
    $templatePaths[] = ABSPATH . 'wp-content/uploads/templates/';
    return $templatePaths;
});
```

This appends your custom directory to the list of locations the Twig engine searches for templates.

3. Include the Template in a Page

To use a template from your custom folder, create a WordPress page or post with the following Twig syntax:

```twig
{% include 't1.twig' %}
```

This will load and render the contents of `t1.twig` from the folder you registered in the previous step.