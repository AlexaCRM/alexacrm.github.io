---
title: Multilingual Support
sidebar_position: 10
---

**Dynamics 365 Integration** provides limited support for multiple languages in Dynamics 365 and Dynamics CRM. Display forms and views in different CRM languages.

The plugin allows to specify a custom language to render forms and views in. To render a form or a view in a certain language, [Dynamics 365 Language Pack](https://technet.microsoft.com/en-us/library/hh699736.aspx) must be installed and the language must be [enabled](https://technet.microsoft.com/en-us/library/dn832148.aspx).

## In Twig

### Forms

Language is specified in the `form` tag via language code in the `language` parameter.

```twig
{% form entity="contact" name="Contact Form" language=3082 %}{% endform %}
```

Translations come from entity attribute metadata, and form control labels are replaced by default. If you want to keep the original form labels (e.g. different forms per language are used) please specify additional parameter `keep_labels`:

```twig
{% form entity="contact" name="Contact Form" language=3082 keep_labels=true %}{% endform %}
```

### Views

You can translate table headers by specifying the `language` parameter in the `view` tag.

```twig
{% view entity="contact" name="Active Contacts" language=3082 %}{% endview %}
```

## In shortcodes

<div style={{ padding: '3px', backgroundColor: 'red' }}>
    <h3>Deprecated twig</h3>
</div> 

### Forms

Language is specified in the `form` shortcode via language code in the `language` parameter.

```
[msdyncrm_form entity="contact" name="Contact Form" language="3082"]
```

Translations come from entity attribute metadata, and form control labels are replaced by default. If you want to keep the original form labels (e.g. different forms per language are used) please specify additional parameter `keep_labels`:

```
[msdyncrm_form entity="contact" name="Contact Form" language="3082" keep_labels="true"]
```

### Views

You can translate table headers by specifying the `language` parameter in the `view` tag.

```
[msdyncrm_view entity="contact" name="Active Contacts" language="3082"]
```
