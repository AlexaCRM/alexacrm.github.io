---
title: Messages in custom twig form
permalink: /wpcrm/twig/messages
sidebar_position: 28
---

Messages in twig forms can be customized using messages property. That approach, however, does not work for custom twig forms where the form is provided as part of the `{% form %}` tag.

In this scenario, the following additional properties of the form tag can be used:

submission – boolean flag indicating if the template is being rendered before (false) or after (true) the form has been submitted
status – boolean flag indicating if the form submission succeeded (true) or failed (false)
form.parameters.messages – provides access to the messages map defined as part of the form tag
The following example illustrates how these properties can be used at run-time to render different messages depending on form submission status.

```
{% form entity="lead" mode="create" required=["firstname", "companyname", "mobilephone"]
messages={ "success": "Form submitted.", "error": "Submission failed." } %}
{% if form.submission and form.status %}
  <div class="row">
    <div class="col-12">
      <div class="alert alert-success">
        {{ form.parameters.messages.success ?? "The form has been successfully submitted." }}
      </div>
    </div>
  </div>
{% elseif form.submission and (not form.status) %}
  <div class="row">
    <div class="col-12">
      <div class="alert alert-danger">
        {% if form.parameters.messages.error %}
          {{ form.parameters.messages.error }}
        {% else %}
          {% for descriptor, message in form.errors %}
            <div>{{ descriptor }}: {{ message|join(', ') }}</div>
          {% endfor %}
        {% endif %}
      </div>
    </div>
  </div>
{% endif %}
  <form method="POST">
    <input name="firstname" type="text" placeholder="First Name">
    <input name="companyname" type="tel" placeholder="Company">
    <input name="mobilephone" type="text" placeholder="Mobile Number">
    <button class="button custombutton" type="Submit">Text me a demo</button>
    <input type="hidden" name="_key" value="{{form.key}}">
  </form>
{% endform %}
```