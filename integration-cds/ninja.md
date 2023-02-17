---
title: Ninja Forms
permalink: /integration-cds/ninja-forms/
premium: true
---

<p class="lead">Use Ninja Forms to manage your organization data</p>

## Introduction

Our plugin supports Ninja Forms. So you can use it instead of our Custom or Power Apps forms
<br>
When you create a form you need to map fields to the Dataverse fields. Please follow these steps:

1. Open `Emails & Actions` tab.
2. Click `Add new action`.
3. Choose `Send to Dataverse` step.
4. Choose necessary table in the entity dropdown.
5. Map the Ninja form fields to the crm table fields. 


When you have created the form, clicked the `Done` button and got back to the Forms tab, you can see the shortcode how to create a page with this form.
<br>

## Lookup Fields
To work with lookup fields you can choose the `Dataverse Lookup` field.
<br>
To select a view, you need to open the `Dataverse Lookup` field settings and choose necessary entity and view.
<br>
If you want to set a default value for Dataverse Lookup just type its id:
   {% raw %}
   ```
   98837486-742e-ed22-9db1-00224893bd2f
   ```
   {% endraw %}

Also you can use fetchXML filter:
   {% raw %}
   ```
   <filter>
		<condition attribute="address1_city" operator="eq" value="Sydney" />
   </filter>
   ```
   {% endraw %}