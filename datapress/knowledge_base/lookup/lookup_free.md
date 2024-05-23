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

To create a form with a lookup field you can follow next example

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