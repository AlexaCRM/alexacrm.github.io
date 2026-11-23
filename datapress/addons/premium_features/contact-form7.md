---
title: Contact Form 7
sidebar_position: 3
premium: true
tags:
    - Contact Form 7
    - DataPress
---

<p class="lead">Use Contact Form 7 to manage your organization data</p>

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

Our plugin supports Contact Form 7.

Please follow these instructions:
1. When you create a form using Contact Form 7 you need to choose the `Dataverse column` option.
2. Then type the Table column, which is the Logical name of the necessary CRM table column, and set the name for this column.
3. Repeat these actions for all fields you want to add.
4. Navigate to the `Dataverse` tab.
5. Choose the table name from the dropdown.
6. Click `Save`.

At the top of the page you can see the shortcode for creating a page with this form.

## Universal Submission

We also support Universal Submission.

To enable it, go to **Universal Form Capture** and **Enable Form Capture**.

That's it! No field mapping is required — Form Capture automatically collects all form field data and stores it asynchronously in a dedicated Dataverse table.

For more details on Universal Capture features and configuration, see [Universal Capture](/forms/universal-capture/).

## Lookup Fields

To work with lookup fields, click the `Dataverse Lookup column` button.

You need to set:
- the entity column (the Logical name of your column);
- field name;
- lookup display method;
- the view.

You can also choose between the dialog and dropdown lookup display methods.

When you type the view name, you can use a space. The plugin automatically replaces it with `=`, for example `All=accounts`. This is a limitation of Contact Form 7.