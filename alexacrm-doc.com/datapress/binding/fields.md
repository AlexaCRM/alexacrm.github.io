---
title: Dataverse Integration Fields Binding
sidebar_position: 3
permalink: /integration-cds/fields-binding/
premium: true
---

<p class="lead">Display column value using Dataverse Integration Fields Binding!</p>

## Introduction

With the Dataverse Integration Fields Binding plugin available in the Addons, you can work with custom fields, allowing you to display any text before displaying the field value and formatting the field value.

To use this plugin, follow the steps below:
1. Create a page, click `Preferences`, and open the `Panel` settings.
2. Add extra areas to the editor by choosing `Custom fields` option. Click `Enable & Reload` to see the Custom fields section.
3. At the bottom of the page, create a name for custom field(s). Save and publish the page.
4. Go to the pages list, find the page you created and click `Configure Binding` to choose the table to bind.
5. In the Dataverse Admin Area, go to `Bindings` -> `Fields Binding`. Here, you can set pre-rendering Twig code that will execute before rendering Twig expression substitution. You can use it to retrieve data, define variables, etc.
6. Click `Create Binding`, and choose the page that was created earlier. Then select `Add Field` and choose the custom field created for the page.

Additionally, the following options will replace a field:
- Twig Expression (type Twig expression to display it as the field value)
- Column (choose the column logical name from the drop-down)
- Twig Template (choose the Twig template, which is in Templates -> Twig templates)
- Formatted Column (choose the column logical name from the drop-down).

Add the output of the meta field to your template:

```twig
<?= get_post_meta( get_the_ID(), '{fieldName}', true ); ?>
```
