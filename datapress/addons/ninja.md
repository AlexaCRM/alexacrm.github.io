---
title: Ninja Forms
permalink: /datapress/ninja-forms/
sidebar_position: 4
premium: true
sidebar_class_name: hidden
---

<p class="lead">Use Ninja Forms to manage your organization data</p>

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

Our plugin supports Ninja Forms. So you can use it instead of our Custom or Power Apps forms

When you create a form you need to map fields to the Dataverse columns. Please follow these steps:

1. Open `Emails & Actions` tab.
2. Click `Add new action`.
3. Choose `Send to Dataverse` step.
4. Choose necessary table in the table dropdown.
5. Map the Ninja form fields to the crm table columns. 


When you have created the form, clicked the `Done` button and got back to the Forms tab, you can see the shortcode how to create a page with this form.

## Lookup Fields
To work with lookup columns you can choose the `Dataverse Lookup` column.

To select a view, you need to open the `Dataverse Lookup` column settings and choose necessary table and view.

If you want to set a default value for Dataverse Lookup just type its id:
```bash
   98837486-742e-ed22-9db1-00224893bd2f
```

Also you can use fetchXML filter:
```bash
   <filter>
		<condition attribute="address1_city" operator="eq" value="Sydney" />
   </filter>
```