---
title: Forms
sidebar_position: 15
tags:
    - Forms
    - Default fields values
    - Dynamics 365 Integration
---


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

<Highlight color="#6e001d">This feature has been deprecated! Please use Twig templates. Twig provides richer opportunities for programmed page templates.</Highlight>

*Dynamics CRM Integration* allows you to work with Dynamics CRM data using forms. Forms perform basic operations such as Create, Update, and Read.

Form shortcode uses entity forms that are defined in Dynamics CRM. Records that define the forms bear `systemform` as entity type.

You can create and adjust forms in Dynamics CRM and then use them in WordPress in posts, pages and other kinds of post types. The shortcode for that is `[msdyncrm_form]`.

Shortcode syntax:

```
[msdyncrm_form entity="lead" name="Contact Us" mode="create" captcha="true" message="Thanks!" hide_form="true"]
```

## Shortcode attributes

**entity** <br></br>
**Required String** Entity name, e.g. `contact` or `lead`.

**name** <br></br>
**Required String** Form name of the specified entity, e.g. `Contact Quick Form` or `Lead Quick Create`.

**mode**<br></br>
**Required String** Form mode. Can be one of the following: `readonly`, `create`, `edit`, `upsert`.

**parameter_name**<br></br>
**String** Name of the query string parameter that contains the ID of the record.

**captcha**<br></br>
**Boolean** Add reCaptcha to the form.

**message**<br></br>
**String** A message that is displayed after the form is submitted successfully.

**hide_form**<br></br>
**Boolean** Hide the form after the form is submitted successfully.

**redirect_url**<br></br>
**String** URL to redirect to after the form is submitted successfully. If set, `message` and `hide_form` arguments are ignored. Should be a relative or absolute URL.

**default** <br></br>
**String** Set default values for form fields.<br></br>
Example: `default="{firstname:John}{lastname:querystring.lastname}"`

**default_mode**<br></br>
**String** Constrain `default` fields substitution to the specified modes.<br></br>
Example: `default_mode="{upsert},{create}"` allows a default value for `firstname` to be set only in *upsert* mode, and `lastname` only in *create* mode.

**required**<br></br>
**String** Set required fields. Allows overriding Dynamics CRM form settings for the field.

**optional**<br></br>
**String** Set optional fields. Allows overriding Dynamics CRM form settings for the field.

**lookuptypes**<br></br>
**String** Restrict lookup controls to specified entities.

**lookupviews**<br></br>
**String** Display a dropdown instead of a lookup dialog for the specified field with records from the specified view.<br></br>
 Example: `lookupviews="{parentcustomerid:Active Contacts}"`

**validation_error**<br></br>
**String** Error message displayed if the form contains invalid data.

**submit_error**<br></br>
**String** Error message displayed if data could not be submitted to Dynamics CRM.

**force_https**<br></br>
**Boolean** When set to true, https protocol is used during the form submission. If undefined, form submission follows the page protocol.

**enable_layout**<br></br>
**Boolean** When set to `true`,  columns and label alignment and position will follow the form definition. Default value is `false`, i.e. simplified form layout with a single column and labels on the left.

**attachment**<br></br>
**Boolean** When set to `true` and entity supports annotations, file upload control is added to the form.

**attachment_label**<br></br>
**String** Label text for the attachment upload control. Note: top label placement is not currently supported but css can be used to achieve the same effect.

**ignore_nonce**<br></br>
**Boolean** When set to `true`, nonce check is disabled during form submitting.


## Using default values

`default` argument receives a list of fields using a following notation: `{fieldname:fieldvalue}{fieldname:fieldvalue}`. Key and value are separated using a colon, and every field-value pair is enclosed in curly brackets.

For `fieldname` you can use any field name that is present in the form. `fieldvalue` may be of several different flavours which are covered below.

### Simple value

You can set a static default value for a given field, e.g. `{topic:Contact form submission}`.

### Query string parameter value

You can fill a field with a value from the query string. For instance, if you have a URL like `http://example.com/?score=42`, then `{score:querystring.score}` will fill the field `score` with value "42" right from the query string. As you can see, query string values follow the next notation: `querystring.parameterName`.

### Currentuser value

<Highlight color="#25c2a0">Premium feature! This feature is available in the premium extension.</Highlight>

When a user marked as CRM user logs in to WordPress, they're mapped to a linked record in Dynamics CRM -- usually a contact or an account. By using `currentuser` as a value you can put that record's ID into the field. E.g. `{parentcustomerid:currentuser}` will put the current user's record ID into `parentcustomerid`.

### Currentuser field value

<Highlight color="#25c2a0">Premium feature! This feature is available in the premium extension.</Highlight>

Similar to `currentuser`, you can put any record field value into the form field by using dot notation. E.g., `{firstname:currentuser.firstname}{lastname:currentuser.lastname}` will set `firstname` and `lastname` in the form to the values of the current user record's `firstname` and `lastname`.
