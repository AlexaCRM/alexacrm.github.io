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

Our plugin supports Gravity Forms. So you can use it instead of our Custom or Power Apps forms

:::info
Premium feature! This feature is available in the addon to the premium extension.
:::

## Form configuration

1. **Create a Gravity Form**

- To begin, navigate to **Forms** → **Add New** in Gravity Forms.

- Add the necessary fields to the form.

- Assign titles to each field to ensure clarity.

- Once all required fields are set up, click the **Save Form** button to finalize the form creation.

2. **Configure Dataverse Feed**

- After saving the form, you must set up a **Dataverse Feed** to integrate the form with Dataverse.

- Without closing your Gravity Form, go to **Settings** → **Dataverse**.

- Follow the necessary configuration steps to map form fields to Dataverse columns.

<div class="text--center"> 
<img src="/images/gf-dataverse.png" width="400" />
</div>

Then click `Add New`, select the CRM table, choose the action type (create, update, or upsert - which performs create or update depending on the situation), and map the form columns to the CRM columns by setting a correspondence between the CRM column name (key) and the Gravity Form field name (value).

<div class="text--center"> 
<img src="/images/gf-mapping.png" width="600" />
</div>

### Access to a table

Be attentive with the access to tables from Maker portal. Pages, based on Gravity forms do not show any error when you try to fill in and submit the form even if you don't have an access to this table. You click Submit and then you will see success message even when you don't have privilege to create a new record. In that case the administrator will get an email with the details.

### Dynamic column population

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

### How to bind a record by its guid

To bind a record on a page created with the help of Gravity Forms, follow these steps:

1. Create a Gravity Form with an Update Action in Dataverse Feed:
- First, create a Gravity Form that includes the necessary fields for your record.
- Configure the form to perform an update action in your Dataverse feed.

<div class="text--center"> 
<img src="/images/feed-to-update.png" width="400" />
</div>

- Remember the name of this Gravity Form.

2. Create a Page based on the Gravity Form Block:
- Create a new page. Use the Gravity Form block to build your page. Save the page.

<div class="text--center"> 
<img src="/images/gravity-form.png" width="400" />
</div>

3. Configure Binding for the Page:
- Locate the page you just created in your list of pages.
- Click `Configure binding` -> `Setup binding`.
- Choose the appropriate table name and select the `Via GUID in query string` option 

<div class="text--center"> 
<img src="/images/gf-configuration.png" width="400" />
</div>

4. Add the Record GUID to the Page URL:
- Now you can include the record GUID as part of the URL.
- For example, if your record GUID is 65ffaf9a-e8c5-432d-860b-32f841b00d87, your URL could look like

```php
https://yourwebsite.com/your-page?id=65ffaf9a-e8c5-432d-860b-32f841b00d87
```

Alternatively, you can use a shortcode to achieve the same result (use the `Custom HTML` block):

```php
[gravityform id="1" action="icds" icds_record="account:2793c9dc-ff0d-ef11-9f89-0022489310b4"]
```

This shortcode will populate the form fields with values from the record with the GUID 2793c9dc-ff0d-ef11-9f89-0022489310b4 in the contact table. In this case you don't need to configure binding for the page, just to write the record guid in the `Custom HTML` block.

:::note

**Duplicating Gravity Forms with Dataverse Feed**

If you need to reuse an existing form setup, Gravity Forms makes duplication fast and efficient—especially when working with Dataverse integration.

When you duplicate a form through the Gravity Forms admin interface:
- The form structure and all fields are copied.
- The associated Dataverse feed is duplicated automatically—retaining table mappings, action types (create or update), and field relationships.

This eliminates the need to manually reconfigure Dataverse integration for each new form. It’s particularly useful for scenarios like:
- Building multiple forms for similar entities (e.g. contacts, leads, events)
- Creating multilingual or region-specific versions of forms
- Iterating new versions for testing, staging, or conditional logic workflows.

> After duplication, you can tweak individual mappings or feed settings in the new form without affecting the original.

<div class="text--center"> 
<img src="/images/gravity-duplicate.png" width="400" />
</div>
:::

## Handling Various Data Types

### Lookup Columns

Lookup column supports two views for displaying the column: dropdown and dialog.

To select a view, you need to click the `Add Fields` tab and choose `Dataverse Lookup` from `Advanced Fields`. Then open the `Appearance` tab in the column settings.

<div class="text--center"> 
<img src="/images/gf-lookup.png" width="400" />
</div>

If you select the dropdown, you must also select the table and view to lookup. The dialog view does not require any additional settings.

<div class="text--center"> 
<img src="/images/gf-lookup2.png" width="400" />
</div>

To set a default value for a Dataverse Lookup field, use the following format:

```php
   table:98837486-742e-ed22-9db1-00224893bd2f
```

<div class="text--center"> 
<img src="/images/gf-lookup-default.png" width="400" />
</div>

To filter the available options in a dropdown lookup, you can apply a FetchXML query:

```twig
<filter>
  <condition attribute="address1_city" operator="eq" value="London" />
</filter>
```

<div class="text--center"> 
<img src="/images/gf-fetch.png" width="400" />
</div>

For a **Dialog** Lookup, the format includes the entity name:

```php
account:98837486-742e-ed22-9db1-00224893bd2f
```

Replace account or table with the appropriate entity logical name, and use the actual GUID of the record you want to preselect.

To control conditional access to requested records in dropdown or dialog use fetchXML filter.

### Choice

Choice columns allow you to present dropdown lists with fixed values in your app, ensuring data consistency. [Read more](https://learn.microsoft.com/power-apps/maker/data-platform/custom-picklists).

Choice columns can be configured as either **single selection (choice)** or **multi-selection (choices)**.

**Single Selection (Choice) - Radio Buttons**

When a user must select only one value from the list, use **Radio Buttons**:

<div class="text--center"> 
<img src="/images/gravity-single-choice.png" width="400" />
</div>

- Select the **table** and the **column** where the choice values are stored.

Map the selected **Form Field** to the corresponding **Dataverse column** in Dataverse Feed.

**Multi-Selection (Choices) - Multi Select**

For cases where multiple values can be selected, use **Multi Select**:

<div class="text--center"> 
<img src="/images/gravity-multiple-choice.png" width="400" />
</div>

- Select the **table** and the **column** where the multi-choice values are stored.

- Map the selected **Form Field** to the corresponding **Dataverse column** in Dataverse Feed.

### Date and time columns

To create a record with `date and time` data type columns you need to follow next steps:
1. Add a Date Field to Your Gravity Form:
- In your Gravity Form, create a field that captures the date. This field will store the date portion of your record.
- Configure the date field according to your requirements (e.g., date format, default value, etc.).

<div class="text--center"> 
<img src="/images/date-gr.png" width="400" />
</div>

2. Add a Time Field:
- Next, add a separate field to capture the time. This field will store the time portion of your record.
- Customize the time field settings as needed (e.g., 12-hour or 24-hour format, default time, etc.).

<div class="text--center"> 
<img src="/images/time-gr.png" width="400" />
</div>

3. Map the Fields and columns in Dataverse Feed:
- When configuring your Dataverse feed (integration with DataPress), you’ll observe that instead of a single column from the Power App, you’ll encounter two separate columns: one for the date and another for the time. These columns are `pseudo-columns` because they do not exist in Dataverse as standalone entities. Instead, they are derived by splitting or combining data from the source column as needed.

<div class="text--center"> 
<img src="/images/fields-gf.png" width="400" />
</div>

- Map the date field from your Gravity Form to the corresponding date column in Dateverse.
- Similarly, map the time field from your Gravity Form to the corresponding time column in Dateverse.

<div class="text--center"> 
<img src="/images/mapping.png" width="700" />
</div>

Here are two options. We recommend using **Local Date** and **Local Time** for the **User Local** behavior option, and **Date Only**, **Time Only** (or **UTC Date** and **UTC Time**) for the **Time Zone Independent** and **Date Only** behavior options.
[Read more](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/behavior-format-date-time-field)

**Dataverse Admin Area Settings:**

Adjust the `ICDS_DATETIME_VALUE` setting with options like:

- **Legacy**
- **UTC**
- **Local**

The **Time Zone Independent** and **Date Only** behavior options works as UTC and don't depend on the user's timezone

Examples for the **DateTimeUserLocal** column which has User Local behavior:

|                      | Legacy     |  UTC              | Local  |
|----------------------|--------------|----------------|-----------|
|`DateTimeUserLocal (UTC DateTime) (Date Only)` | UTC | UTC | UTC |
|`DateTimeUserLocal (UTC DateTime) (Time Only)` | UTC | UTC | UTC |
|`DateTimeUserLocal (Local Date)` |  convert the date to the user's timezone | convert the date to the user's timezone | convert the date to the user's timezone |
|`DateTimeUserLocal (Local Time)` |  convert the time to the user's timezone | convert the time to the user's timezone | convert the time to the user's timezone |

Examples for the **DateOnlyUserLocal** column which has User Local behavior:

|                      | Legacy     |  UTC              | Local  |
|----------------------|--------------|----------------|-----------|
|`DateOnlyUserLocal (UTC Date) (Date Only)` | UTC | UTC | UTC |
|`DateOnlyUserLocal (Local Date)` |  convert the date to the user's timezone | convert the date to the user's timezone | convert the date to the user's timezone |

<div class="text--center"> 
<img src="/images/gravity-date-options.png" width="400" />
</div>

In case, when you set only time value, the date represents the date zero (January 1, 1900).

### File upload columns

You can set maximum attached file size for File upload column in Gravity Forms. But you should also remember about the file size limits which are set for such columns in crm. So that your maximum attached file should not be more than the size from the crm column settings.

At current moment we don't support uploading multiple files.  

## Sending Error Messages to the Admin Email

To configure error notifications:
1. Navigate to the Gravity Forms plugin settings.
2. Open the Dataverse menu.
3. Specify one or more email addresses to receive error messages.

You can enter any valid email address — not just admin accounts. This allows you to notify stakeholders whenever an error occurs during form submission or CRM integration.