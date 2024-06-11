---
title: Gravity Forms
sidebar_position: 1
premium: true
slug: /addons/gravity-forms
tags:
    - Gravity Forms
    - DataPress
keywords: [DataPress Gravity Forms addon, create DataPress form with Gravity Forms]    
---

<p class="lead">Use gravity forms to manage your organization data</p>

## Introduction

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<Highlight color="#25c2a0">Premium feature! This feature is available in the addon to the premium extension.</Highlight>

Our plugin supports Gravity Forms. So you can use it instead of our Custom or Power Apps forms

When you have created the form and clicked the `Save Form` button, you must also create a Dataverse Feed.

To create a Dataverse Feed, you need to click `Settings` -> `Dataverse` without closing your Gravity form.

<div class="text--center"> 
<img src="/images/gf-dataverse.png" width="400" />
</div>

Then click `Add New`, select crm table, action type(create or update) and map form columns to crm columns(set a correspondence between the column name from crm (key) and the column name from the gravity form(value)).

<div class="text--center"> 
<img src="/images/gf-mapping.png" width="600" />
</div>

## Dynamic column population

If you want to set default values for columns you can follow these instructions:

1. To set default value for standard columns go to `Field settings` tab - `Advanced`.
2. To add lookup column you should go to `Add Fields` tab and choose `Dataverse Lookup` from `Advanced Fields` tab. Then you need to open the `Appearance` tab and set default value.

If you want to set default values dynamically for columns using the form's field_values attribute (see [Dynamically Populating a Field](https://docs.gravityforms.com/using-dynamic-population/)), you can follow the following instructions.

1. Add a new field, go to `Advanced Settings` and check the `Allow field to be populated dynamically` checkbox.
2. Specify a parameter name just below the `Allow field to be populated dynamically` checkbox and save the parameter name.
3. Map the field to one of the Dataverse columns in the `Dataverse Feed` settings.
4. Remember your Gravity Form id.
5. Go to `Pages` -> `Add New` and choose `Custom HTML` block

Example for setting dynamic value:

```php
[gravityforms id="1" field_values="parameter_name=Dynamic Value"]
```

**Note:** The parameter name in the `field_values` attribute must be the same as specified in the `2nd` point.

**Note:** When populate a lookup parameter, use the following syntax: parameter_name=`entity_name`:`record_id`. 

Example for `companyid` parameter name (actual column name is `parentcustomerid` in the `contact` Dataverse table): 

1. Fixed value:

  ```php
     field_values="companyid=account:f5aaed4c-654c-4730-bd4f-38bc19a330bd"
  ```

1. Using twig expressions to get dynamic value:

  ```php
     field_values="companyid=account:{{account.accountid}}"
  ```

## Lookup Fields

Lookup column supports two views for displaying the column: dropdown and dialog.

To select a view, you need to click the `Add Fields` tab and choose `Dataverse Lookup` from `Advanced Fields`. Then open the `Appearance` tab in the column settings.

<div class="text--center"> 
<img src="/images/gf-lookup.png" width="400" />
</div>
If you select the dropdown, you must also select the table and view to lookup. The dialog view does not require any additional settings.

<div class="text--center"> 
<img src="/images/gf-lookup2.png" width="400" />
</div>

If you want to set a default value for Dataverse Lookup look at this example:

```php
   table:98837486-742e-ed22-9db1-00224893bd2f
```

<div class="text--center"> 
<img src="/images/gf-lookup-default.png" width="400" />
</div>

To control conditional access to requested records in dropdown or dialog use fetchXML filter.

## Date and time columns

To create a record with `date and time` data type fields you need to follow next steps:
1. Add a Date Field to Your Gravity Form:
- In your Gravity Form, create a field that captures the date. This field will store the date portion of your record.
- Configure the date field according to your requirements (e.g., date format, default value, etc.).
2. Add a Time Field:
- Next, add a separate field to capture the time. This field will store the time portion of your record.
- Customize the time field settings as needed (e.g., 12-hour or 24-hour format, default time, etc.).
3. Map the Fields in Dataverse Feed:
- When setting up your Dataverse feed (integration with DataPress), you’ll notice that instead of a single field from the maker portal, you’ll encounter two separate fields: one for the date and another for the time.
- Map the date field from your Gravity Form to the corresponding date field in Dateverse.
- Similarly, map the time field from your Gravity Form to the corresponding time field in Dateverse.

<div class="text--center"> 
<img src="/images/date-time-gf.png" width="400" />
</div>

## File upload columns

You can set maximum attached file size for File upload column in Gravity Forms. But you should also remember about the file size limits which are set for such columns in crm. So that your maximum attached file should not be more than the size from the crm column settings.

At current moment we don't support uploading multiple files.  

## Access to a table

Be attentive with the access to tables from Maker portal. Pages, based on Gravity forms do not show any error when you try to fill in and submit the form even if you don't have an access to this table. You click Submit and then you will see success message even when you don't have privilege to create a new record. In that case the administrator will get an email with the details.

## How to bind a record by its guid

To bind a record on a page created with the help of Gravity Forms, follow these steps:
1. Create a Gravity Form with an Update Action in Dataverse Feed:
- First, create a Gravity Form that includes the necessary fields for your record.
- Configure the form to perform an update action in your Dataverse feed.
- Remember the name of this Gravity Form.
2. Create a Page based on the Gravity Form Block:
- Create a new page. Use the Gravity Form block to build your page. Save the page.
3. Configure Binding for the Page:
- Locate the page you just created in your list of pages.
- Click `Configure binding` -> `Setup binding`.
- Choose the appropriate table name and select the `Via GUID in query string` option 
4. Add the Record GUID to the Page URL:
- Now you can include the record GUID as part of the URL.
- For example, if your record GUID is 65ffaf9a-e8c5-432d-860b-32f841b00d87, your URL could look like

```php
https://yourwebsite.com/your-page?id=65ffaf9a-e8c5-432d-860b-32f841b00d87
```

Alternatively, you can use a shortcode to achieve the same result (use the `Custom HTML` block):

```php
[gravityform id="1" action="icds" icds_record="contact:2793c9dc-ff0d-ef11-9f89-0022489310b4"]
```

This shortcode will populate the form fields with values from the record with the GUID 2793c9dc-ff0d-ef11-9f89-0022489310b4 in the contact table. In this case you don't need to configure binding for the page, just to write the record guid in the `Custom HTML` block.



