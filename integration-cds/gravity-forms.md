---
title: Gravity Forms
permalink: /integration-cds/gravity-forms/
premium: true
---

<p class="lead">Use gravity forms to manage your organization data</p>

## Introduction

Our plugin supports Gravity Forms. So you can use it instead of our Custom or Power Apps forms
<br>
When you have created the form, you must also create a Dataverse Feed.
<br>
To create a Dataverse Feed, you need to click `Dataverse` in the `Settings` dropdown.
<br>
Then click `Add New`, select crm table, action type and map form fields to crm fields.

## Dynamic field population

If you want to set default values for fields using the form's field_values attribute (see [Dynamically Populating a Field](https://docs.gravityforms.com/using-dynamic-population/), you can follow the following instructions.

1. Add a new field and check the `Allow field to be populated dynamically` checkbox.
2. Specify a parameter name just below the `Allow field to be populated dynamically` checkbox.
3. Map the field to one of the Dataverse fields in the `Dataverse feed` settings.

**Note:** The parameter name in the `field_values` attribute must be the same as specified in the `2nd` point.

**Note:** When populate a lookup parameter, use the following syntax: parameter_name=`entity_name`:`record_id`. 

Example for `companyid` parameter name (actual column name is `parentcustomerid` in the `contact` Dataverse table): 

1. Fixed value:
   
   {% raw %}
   ```
   field_values="companyid=account:f5aaed4c-654c-4730-bd4f-38bc19a330bd"
   ```
   {% endraw %}

2. Using twig expressions to get dynamic value:

   {% raw %}
   ```
   field_values="companyid=account:{{account.accountid}}"
   ```
   {% endraw %}

## Lookup Fields
Lookup field supports two views for displaying the field: dropdown and dialog.
<br>
To select a view, you need to open the `Appearance` tab in the field settings.
<br>
If you select the dropdown, you must also select the entity and view to lookup. The dialog view does not require any additional settings.
