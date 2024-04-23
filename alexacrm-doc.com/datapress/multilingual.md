---
title: Multilingual
sidebar_position: 11
---

The page describes multilingual support in Dataverse plugin

## WPML support 
<div style={{ padding: '3px', backgroundColor: 'gold' }}>
    <h3>Premium</h3>
</div> 
Integration-cds plugin supports wpml string translations. 

To add a string to wpml you need to use `translate` twig filter.

Example: `'Your string'|translate`

After that, you should load the page with this string once. The string will be added on the wpml string translation page.

All lines with `translate` filter will be added with the `twig-translates` domain. So you can easily find those strings.

## Forms translation

In Forms you may have necessity to translate fields and buttons. 
As for buttons, in Dataverse Admin Area when you look at your form you can see Form Buttons section. Click `+` button and select necessary language. Then type new button title for this language. For example, select `French` language and type `Soumettre`.
Then  click `Settings` > `General` in WordPress Admin Area and select `Francais` in the site language dropdown. When you view the page which uses mentioned form you will see the `Soumettre` button in the end of the page.

To translate form fields you need to set and enable this language in your crm settings. [How to set language](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/admin/enable-languages?view=op-9-1)
Then you call form:

```twig
{% form id= {formId} language=1036 %}
```

To make translation for custom fields or custom table you need to go to the solution explorer and make Export Translations. [See details](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/customize/export-customized-entity-field-text-translation?view=op-9-1) 
Then you should write translation for custom field or the whole table. Then you need to make Import Translations.
To make translation process easier you can use Easy Translator tool from XrmToolBox. 
[See detailed video how to use Easy Translator](https://www.youtube.com/watch?v=BNMVt-uhBbQ)

## View translation

To translate a view you can use next example:

```twig
{% view entity="contact" name="Active Contacts" language=1036 %}{% endview %}
```

In this example all columns will be in french.

## Gravity Forms translation

To translate Gravity Forms you can choose one of several options:

1. To create several Gravity Forms for each of language and set fields or buttons titles for each language.

2. Use a plugin for this aim, such as WPML.
[How to make Gravity Form multilingual](https://wpml.org/documentation/related-projects/gravity-forms-multilingual/)