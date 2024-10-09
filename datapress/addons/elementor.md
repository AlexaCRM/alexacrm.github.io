---
title: Elementor
sidebar_position: 2
premium: true
slug: /addons/elementor
tags:
    - Elementor
    - DataPress
keywords: [DataPress Elementor addon, create DataPress form with Elementor]
---
<p class="lead">Build your forms and write custom twig code using Elementor!</p>

## Introduction

:::info
Premium feature! This feature is available in the addon to the premium extension.
:::

Our plugin supports Elementor. We offer several widgets that are compatible with Elementor (including Elementor Pro). To edit a form using Elementor, you need to install and activate the 'Dataverse Integration Elementor Extension' plugin. Please note that this functionality is available only with the premium version of our plugin.

:::note
You may also need to install and activate Elementor Pro.
:::

## Form widget

Widget Name - `Form`

Category - `Pro`

Description: It is a native form of Elementor, but you should add `Send to Dataverse` action after submit.

All you need to do is drag the `Form` widget into the content area, create  the necessary fields and Save their ID.

<div class="text--center"> 
<img src="/images/elementor-form.jpg" alt="Elementor form" width="400" />
<img src="/images/elementor-id.jpg" alt="Save id" width="550" />
</div>

Next, navigate to `Actions After Submit`, click `+` and add the `Send to Dataverse` action.  

<div class="text--center"> 
<img src="/images/send-to-dataverse.jpg" alt="Send to Dataverse action" width="400" />
</div>

To choose a table save the form and get back to the `Pages` -> `All pages` and find the page  and click `Configure Binding`. Here you can choose a table for new records. 

<div class="text--center"> 
<img src="/images/elementor-bind-table.jpg" alt="Binding configuration" width="550" />
</div>

Click `Edit with Elementor` and `Send to Dataverse`. Here you will see the chosen table in the `Table` dropdown.
After selecting an action, for example `create`, you need to add `Fields Mapping`. Click `+ADD ITEM`. Here, fill in `Form field` (which is the field ID that was saved previously) and `Table column` (which is the logical name for the column) for each field.

<div class="text--center"> 
<img src="/images/elementor-mapping.png" alt="Mapping in Elementor" width="400" />
</div>

**To create a field for a lookup column** you need to add a new field and set its type to `Dataverse Lookup.` Then type the appropriate table and view.
Map this field with the column logical name in the `Send to Dataverse` action.

<div class="text--center"> 
<img src="/images/elementor-lookup.png" alt="Create a lookup field" width="400" />
</div>

**To create a field for a Date Time column** you need to add 2 fields: one field for date and the other - for time.
Set for both fields the same column logical name in `Send to Dataverse` section.

**To create a field for a Date Time column**, follow these steps:

1. Add Two Fields:
 - **Date Field**: Create a field specifically for the date.
 - **Time Field**: Create another field specifically for the time.
 
2. Set Column Logical Name:
In the `Send to Dataverse` section, set the same column logical name for both the date and time fields. This ensures that both fields are recognized as part of the same Date Time column.

## Twig widget

Widget Name - `Twig Template`

Category - `Dataverse`

Description: A simple and visual widget. Write your twig code and you will immediately see the generated content in the content area.

## Field widget

Widget Name - `Dataverse Field`

Category - `Dataverse`

Description: To use this feature, simply select a table and then choose a column from that table which you wish to display.

## Dynamic tags

One of the simplest methods to display a field value for any record is by using dynamic tags. First, configure the binding for the page by selecting a table and the binding method. Then, return to page editing and, in the Elementor Text Editor widget, click the Dynamic Tags button (symbolized by a coins icon). Next, select the 'Dynamic field' option and click the settings button. Now, you can choose any field from which to display a record value.

### Date Time fields in the Dataverse field widget

You can see several options for Date Time and Date Only fields. For example, if we have a Date Time value of **2025-10-01T21:00:00Z**, the field will display the following values for a user in the UTC -4h timezone:

- Column Name Only: **2025-10-01T21:00:00Z** (No timezone conversion)
- Column Name + Local DateTime: **2025-10-01T17:00:00** -04:00 (Timezone conversion according to the user’s timezone)
- Column Name + Local Date: **2025-10-01** (Date part only, converted to the user’s timezone)
- Column Name + Local Time: **17:00:00** (Time part only, converted to the user’s timezone)

## Default record in editing mode

You can enter a record GUID to be used as the default record in the page editing context. Simply find the page, click `Configure Binding`, select a table and enter an id in the `Default record` textbox.

<div class="text--center"> 
<img src="/images/elementor-default.png" alt="Elementor default" width="400" />
</div>