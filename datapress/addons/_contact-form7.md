---
title: Contact Form 7
sidebar_position: 3
premium: true
sidebar_class_name: hidden
tags:
    - Contact Form 7
    - Datapress
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
2. Then type Table column which is equal to the Logical name from necessary crm table and set the name for this column. 
3. Make these action for all fields which you want to add.
4. Navigate to the `Dataverse` tab.
5. Choose the table name from the dropdown.
6. Click `Save`

At the top of the page you can see the shortcode how to create a page with this form.


## Lookup Fields

To work with lookup fields you can click the `Dataverse Lookup column` button.

You need to set table column(Logical name of you column), name and view. Also you have an opportunity to choose between dialog and dropdown lookup display method.

