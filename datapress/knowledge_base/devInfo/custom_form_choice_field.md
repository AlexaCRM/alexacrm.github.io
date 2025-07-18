---
title: Custom Forms with Multiple Choice Fields
sidebar_position: 14
slug: /custom-form-with-choice
tags:
    - Custom form
    - DataPress
    - Choice
keywords: [Custom form, choice]  
---

:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

This guide shows how to create a custom form in WordPress using DataPress, where a choice field supports multiple selections.

**Prerequisites**: 
Dataverse column with multiple choice options (e.g., hobbies field on the contact entity)

**Using** `<select multiple>`

```twig
{% form entity="contact" mode="create" %}
<form>
  <div class="form-group">
    <label>First Name:
      <input class="form-control" name="firstname">
    </label>
  </div>

  <div class="form-group">
    <label>Last Name:
      <input class="form-control" name="lastname">
    </label>
  </div>

  <label>Hobbies:
    <select name="hobbies" multiple>
      <option value="1">Reading</option>
      <option value="2">Traveling</option>
      <option value="3">Cooking</option>
      <option value="4">Gaming</option>
    </select>
  </label>

  <div class="form-group">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
{% endform %}
```