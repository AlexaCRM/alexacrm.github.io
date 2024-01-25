---
title: Gravity Forms
sidebar_position: 1
premium: true
---

<p class="lead">Use gravity forms to manage your organization data</p>

## Introduction

Our plugin supports Gravity Forms. So you can use it instead of our Custom or Power Apps forms

When you have created the form and clicked the `Save Form` button, you must also create a Dataverse Feed.

To create a Dataverse Feed, you need to click `Settings` -> `Dataverse` without closing your Gravity form.

Then click `Add New`, select crm table, action type(create or update) and map form columns to crm columns(set a correspondence between the column name from crm (key) and the column name from the gravity form(value)).

## Dynamic column population

If you want to set default values for columns you can follow these instructions:

1. To set default value for standard columns go to `Field settings` tab - `Advanced`.
2. To add lookup column you should go to `Add Fields` tab and choose `Dataverse Lookup` from `Advanced Fields` tab. Then you need to open the `Appearance` tab and set default value.

If you want to set default values dynamically for columns using the form's field_values attribute (see [Dynamically Populating a Field](https://docs.gravityforms.com/using-dynamic-population/), you can follow the following instructions.

1. Add a new field, go to `Advanced Settings` and check the `Allow field to be populated dynamically` checkbox.
2. Specify a parameter name just below the `Allow field to be populated dynamically` checkbox and save the parameter name.
3. Map the field to one of the Dataverse columns in the `Dataverse Feed` settings.
4. Remember your Gravity Form id.
5. Go to `Pages` -> `Add New` and choose `Custom HTML` block

Example for setting dynamic value:
   
```twig
	gravityforms id="1" field_values="parameter_name=Dynamic Value"
```


**Note:** The parameter name in the `field_values` attribute must be the same as specified in the `2nd` point.

**Note:** When populate a lookup parameter, use the following syntax: parameter_name=`entity_name`:`record_id`. 

Example for `companyid` parameter name (actual column name is `parentcustomerid` in the `contact` Dataverse table): 

1. Fixed value:
   
```twig
   field_values="companyid=account:f5aaed4c-654c-4730-bd4f-38bc19a330bd"
```

2. Using twig expressions to get dynamic value:

```twig
   field_values="companyid=account:{{account.accountid}}"
```

## Lookup Fields

Lookup column supports two views for displaying the column: dropdown and dialog.

To select a view, you need to click the `Add Fields` tab and choose `Dataverse Lookup` from `Advanced Fields`. Then open the `Appearance` tab in the column settings.

If you select the dropdown, you must also select the table and view to lookup. The dialog view does not require any additional settings.

If you want to set a default value for Dataverse Lookup look at this example:
```twig
   table:98837486-742e-ed22-9db1-00224893bd2f
```

## File upload columns

You can set maximum attached file size for File upload column in Gravity Forms. But you should also remember about the file size limits which are set for such columns in crm. So that your maximum attached file should not be more than the size from the crm column settings.

At current moment we don't support uploading multiple files.  

## Access to a table

Be attentive with the access to tables from Maker portal. Pages, based on Gravity forms do not show any error when you try to fill in and submit the form even if you don't have an access to this table. You click Submit and then you will see success message even when you don't have privilege to create a new record. In that case the administrator will get an email with the details.