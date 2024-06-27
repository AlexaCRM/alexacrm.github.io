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

To `create` a form with a lookup field you can follow next example

```
{% fetchxml collection="contacts" %}
    <fetch mapping='logical' returntotalrecordcount='true'>
        <entity name='contact'>
            <attribute name='contactid' />
            <attribute name='fullname' />
        </entity>
    </fetch>
{% endfetchxml %}

{% form entity="account" mode="create" %}
<form method="POST">
 <input name="name" required placeholder="Name">

 <div class="form-group">
<label>
    Contact:
<select class="form-control custom-select" name="contactid">
        {% for contact in contacts.results.entities %}
<option value="{{ contact['Id'] }}">{{ contact['fullname'] }}</option>
        {% endfor %}
</select>
</label>
</div>
<button type="submit">Submit</button>
 
</form>
{% endform %}
```
 In this example, we create a form based on an account table with a lookup field from the contact table. This allow users to choose an account and a corresponding contact. To filter contacts, you can update the fetchxml part based on your specific requirements:

 ```
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

To use `hidden` fields pay attention to this example
```
        <input type="hidden" name="contactid" value="contact:{{ contact.contactid }}" />
        <input type="hidden" name="accountid" value="account:{{ contact.parentaccount.Id }}" />
```

 To `display` a record with a lookup via a form using free plugin you can follow 2 ways:
 
 1. serialised lookup (recommended)
 In this approach, you’ll serialize the lookup value and store it in a field on your form. When the form is submitted, this serialized value is used to update the corresponding record.
```
 {% fetchxml collection="contacts" %}
    <fetch mapping='logical' returntotalrecordcount='true'>
        <entity name='contact'>
            <attribute name='contactid' />
            <attribute name='fullname' />
        </entity>
    </fetch>
{% endfetchxml %}

{% set currentRecord=entities.account['0a7e4fb6-a6f1-ee11-904b-000d3a6a6eca'] %}
{% set contactref = {"LogicalName": "contact", "Id": contactid } %}
{% form entity="account" mode="update" record=currentRecord|to_entity_reference cache='PT1M' %}
<form>
<div class="form-group">
<label>
            Name:
<input class="form-control" name="name" value="{{ currentRecord["name"] }}">
</label>
</div>
<div class="form-group">
<label>
    Contact:
<select class="form-control custom-select" name="contactid">
        {% for contact in contacts.results.entities %}
<option value='{{contactref}}'>{{ contact.fullname }} </option>
 
        {% endfor %}
</select>
 
</label>
</div>
<div class="form-group">
<button type="submit" class="btn btn-primary">Send</button>
</div>
</form>
{% endform %}
 ```

 2. table:guid
 In this approach, you directly use the GUID value from the lookup field to update the record.
  ```
{% fetchxml collection="contacts" %}
    <fetch mapping='logical' returntotalrecordcount='true'>
        <entity name='contact'>
            <attribute name='contactid' />
            <attribute name='fullname' />
        </entity>
    </fetch>
{% endfetchxml %}

{% set currentRecord=entities.account['0a7e4fb6-a6f1-ee11-904b-000d3a6a6eca'] %}
{% form entity="account" mode="update" record=currentRecord|to_entity_reference cache='PT30M' %}
<form>
    <div class="form-group">
        <label>
            Name:
            <input class="form-control" name="name" value="{{ currentRecord["name"] }}">
        </label>
    </div>
 <div class="form-group">
<label>
    Contact:
<select class="form-control custom-select" name="contactid">
        {% for contact in contacts.results.entities %}
<option value='contact:{{ contact.Id }}'>{{ contact.fullname }} </option>
        {% endfor %}
</select>

</label>
</div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
 ```