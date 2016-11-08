---
title: Forms
---

*Dynamics CRM Integration* allows you to work with Dynamics CRM data using forms. Forms perform basic operations such as Create, Update, and Read.

Form shortcode uses entity forms that are defined in Dynamics CRM. Records that define the forms bear `systemform` as entity type.

You can create and adjust forms in Dynamics CRM and then use them in WordPress in posts, pages and other kinds of post types. The shortcode for that is `[msdyncrm_form]`.

Shortcode syntax:

```
[msdyncrm_form entity="lead" name="Contact Us" mode="create" captcha="true" message="Thanks!" hide_form="true"]
```

## Shortcode attributes

entity
: **Required**{:.tag .tag-danger} **String**{:.tag.tag-primary} Entity name, e.g. `contact` or `lead`.

name
: **Required**{:.tag .tag-danger} **String**{:.tag.tag-primary} Form name of the given entity, e.g. `Contact Quick Form` or `Lead Quick Create`.

mode
: **Required**{:.tag .tag-danger} **String**{:.tag.tag-primary} Form mode. Can be one of the following: `readonly`, `create`, `edit`, `upsert`.

parameter_name
: **String**{:.tag.tag-primary} Name of the query string parameter that contains the ID of the record.

captcha
: **Boolean**{:.tag.tag-primary} Add reCaptcha to the form.

message
: **String**{:.tag.tag-primary} A message that is displayed after the form is submitted successfully.

hide_form
: **Boolean**{:.tag.tag-primary} Hide the form after the form is submitted successfully.
