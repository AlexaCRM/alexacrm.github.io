---
title: Fields Binding
sidebar_position: 3
slug: /binding/fields
premium: true
tags:
    - Binding
    - Fields binding
    - DataPress
keywords: [DataPress Fields Binding, Fields Binding addon]
description: Guide to using the Fields Binding feature in DataPress, allowing you to display and format Dataverse column values with custom Twig code and templates.
---
<div
  role="note"
  aria-label="Product note"
  style={{
    borderLeft: '4px solid #2f81f7',
    background: '#f0f7ff',
    padding: '12px 16px',
    borderRadius: '6px',
    margin: '1em 0',
    color: '#0b2e59',
  }}
>
  <div style={{ color: '#0b63d1', fontWeight: 600, marginBottom: '6px' }}>Note</div>
  <p style={{ margin: '0 0 6px 0' }}>
    The plugin previously known as <em>Dataverse Integration</em> has been renamed to <strong>DataPress</strong>.
  </p>
  <p style={{ margin: '0 0 6px 0' }}>
    This change reflects our commitment to enhancing user experience and aligning with our product vision.
  </p>
  <p style={{ margin: 0 }}>
    All references to Dataverse Integration in the documentation and UI will be updated to DataPress.
  </p>
</div>

:::note
This is a premium feature. For more details see [Premium Edition](/premium-edition/).
:::

<p class="lead">Display column value using Dataverse Integration Fields Binding!</p>

## Introduction

:::info

Premium feature! This feature is available in the addon to the premium extension.

:::

With the Dataverse Integration Fields Binding plugin available in the Addons, you can work with custom fields, allowing you to display any text before displaying the field value and format the field value.

To use this plugin, follow the steps below:

1. Navigate to **Bindings -> Fields Binding** in the Dataverse Admin Area:

- Here, you can set pre-rendering Twig code that will execute before rendering Twig expression substitution. Use this to retrieve data, define variables, and more.

2. **Create or Add Fields:**

- Click **Create field** to create a new custom field, then click **Add field** to choose the custom field to display. 

3. **Choose a Table:**

- Add a table from which to retrieve data.

4. Click **Save**

5. Return to the WordPress Admin Area and create a page. 

6. **Enable Custom Fields**:

- Click **Preferences**, then open the **Panel** settings. Add extra areas to the editor by choosing the **Custom fields** option. Click **Enable & Reload** to see the Custom fields section.

7. **Select and Add Custom Fields:**

At the bottom of the page, select the custom field(s) created in the Dataverse Admin Area and click **Add Custom Field**. Use the following example to display the field on the page:

```twig
{{ getMeta("custom_field_name")}}<br>
```

8. **Save and publish** the page.

9. **Add the output of the meta field to your template:**

```twig
add_filter('integration-cds/twig/functions', function ($functionsArray) {    
    $functionsArray['getMeta'] = new Twig\TwigFunction('getMeta', function ($metaName) { 
        return get_post_meta(get_the_ID(), $metaName);    });    
        return $functionsArray;}, 10, 5);
```

10. **Configure Binding**

- Go to the pages list, find the page you created, and click **Configure Binding** to choose the table to bind and how to bind the post.

Additionally, the following options can replace a field:

- **Twig Expression:** Type a Twig expression to display it as the field value.
- **Column:** Choose the column logical name from the drop-down.
- **Twig Template:** Choose the Twig template, which can be found under **Templates** -> **Twig Templates**.
- **Formatted Column:** Choose the column logical name from the drop-down.

:::note

The selected table in the Configure Binding item must match the table for this custom field in the Dataverse Admin Area.

:::