---
title: Dataverse Integration Fields Binding
sidebar_position: 3
slug: /binding/fields
premium: true
tags:
    - Binding
    - Fields binding
    - DataPress
keywords: [DataPress Fields Binding, Fields Binding addon]    
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Display column value using Dataverse Integration Fields Binding!</p>

## Introduction

:::info

Premium feature! This feature is available in the addon to the premium extension.

:::

With the Dataverse Integration Fields Binding plugin available in the Addons, you can work with custom fields, allowing you to display any text before displaying the field value and format the field value.

To use this plugin, follow the steps below:

1. In the Dataverse Admin Area, navigate to Bindings -> Fields Binding. Here, you can set pre-rendering Twig code that will execute before rendering Twig expression substitution. Use this to retrieve data, define variables, and more.
2. Select `Add field` to choose the custom field to display or click `Create field` to create a new custom field.
3. Add a table from which to retrieve data.
4. Click Save.
5. Return to the WordPress Admin Area and create a page. Click `Preferences`, then open the `Panel` settings.
6. Add extra areas to the editor by choosing `Custom fields` option. Click `Enable & Reload` to see the Custom fields section.
7. At the bottom of the page, create a name for custom field(s). Save and publish the page.
8. Go to the pages list, find the page you created and click `Configure Binding` to choose the table to bind and how to bind the post.

Additionally, the following options can replace a field:

- **Twig Expression:** Type a Twig expression to display it as the field value.
- **Column:** Choose the column logical name from the drop-down.
- **Twig Template:** Choose the Twig template, which can be found under `Templates` -> `Twig Templates`.
- **Formatted Column:** Choose the column logical name from the drop-down.

:::note

The selected table in the Configure Binding item must match the table for this custom field in the Dataverse Admin Area.

:::
