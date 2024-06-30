---
title: Using lookups in the free plugin version
sidebar_position: 20
slug: /knowledge-base/lookup
tags:
    - Knowledge base
    - Lookup
    - DataPress
keywords: [DataPress lookup]  
---

In this example, we create a form based on an account table with a lookup field from the contact table. This allow users to choose an account and a corresponding contact. To filter contacts, you can update the fetchxml part based on your specific requirements:

 ```twig
{% fetchxml collection="contacts" %}
    <fetch mapping='logical' returntotalrecordcount='true'>
        <entity name='contact'>
            <attribute name='contactid' />
            <attribute name='fullname' />
            <filter>
                <condition attribute="firstname" operator="eq" value="Tom" />
            </filter>
        </entity>
    </fetch>
{% endfetchxml %}
 ```

To display a dropdown control for a lookup column you can use one of the following methods:

### Serialised lookup (recommended)
   
In this approach, you’ll serialize the lookup value and store it in a field on your form. When the form is submitted, this serialized value is used to update the corresponding record.

```twig
{% fetchxml collection="contacts" %}
  <fetch mapping='logical' returntotalrecordcount='true'>
    <entity name='contact'>
      <attribute name='contactid' />
      <attribute name='fullname' />
    </entity>
  </fetch>
{% endfetchxml %}

{% set currentRecord=entities.account['0a7e4fb6-a6f1-ee11-904b-000d3a6a6eca'] %}
{% form entity="account" mode="update" record=currentRecord|to_entity_reference cache='PT1M' %}
<form>
<div class="form-group">
<label>Name:</label>
<input class="form-control" name="name" value="{{ currentRecord["name"] }}">
</div>
<div class="form-group">
<label>Contact:</label>
<select class="form-control custom-select" name="contactid">
{% for contact in contacts.results.entities %}
  {% set contactref = {"LogicalName": "contact", "Id": contact.contactid } %}
  <option value='{{contactref}}'>{{ contact.fullname }} </option>
{% endfor %}
</select>
</div>
<div class="form-group">
<button type="submit" class="btn btn-primary">Send</button>
</div>
</form>
{% endform %}
```

### Table:guid

In this approach, you directly use the GUID value from the lookup field to update the record. Note: this method is supported for backward compatibility with v1 plugin only and should not be used when writing new code. The only difference is how the value is set in the `<option>` element.

```twig
<option value='contact:{{ contact.Id }}'>{{ contact.fullname }} </option>
```

### Hidden fields

Hidden fields are often used to pass a fixed lookup value to the backend. For example, it could be a current user or active account, etc. You can use either serialized lookup or `table:guid` approach to set the value, for example:

```html
<input type="hidden" name="contactid" value='{"LogicalName": "contact", "Id": contact.contactid }' />
<input type="hidden" name="accountid" value="account:{{ contact.parentaccount.Id }}" />
```

 