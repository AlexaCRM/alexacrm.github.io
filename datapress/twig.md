---
sidebar_position: 4
title: Using Twig
slug: /twig
tags:
    - Twig
    - Datapress
---

<p class="lead">Use Twig templates to create custom layouts. Access your Dataverse data and metadata in Twig to share your data with your users.</p>

## Introduction

*Dataverse Integration* employs [Twig](https://twig.symfony.com/) to make most data-rich layout jobs effortless.

On this page you can find information about custom Twig features that Integration Dataverse Integration brings. Please refer to [Twig documentation](https://twig.symfony.com/doc/2.x/templates.html) to learn about its templating capabilities.

## Runtime settings

Twig in Dataverse Integration supports debug mode and template caching.

- Debug mode allows using `dump()` to print information about Twig objects using PHP `var_dump()`. It is enabled in [WordPress debug mode](https://wordpress.org/support/article/debugging-in-wordpress/) (`WP_DEBUG`) or if `ICDS_TWIG_DEBUG` is *true*.
- Template caching enhances page rendering performance. Enabled if `ICDS_TWIG_CACHE` is *true*.

## Global objects

Dataverse Integration makes several new global objects available in the Twig environment.

### Access the current bound record 

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

<Highlight color="#25c2a0">Premium feature! This feature is available in the premium extension.</Highlight>

Use the `binding` object to access table binding on the current page. See [table binding](binding/table-binding).

`binding` includes several properties:

- `is_bound` -- *(boolean)* whether current page supports table binding.
- `reference` -- *(EntityReference)* reference to the bound record.
- `record` -- *(Entity)* bound record object.

Notice that `binding.record` is more expensive performance-wise -- it retrieves data from Dataverse. `binding.reference` only
reads the local database and request parameters to calculate the entity reference.

```twig
{% if binding.is_bound %}
  {% set contact = binding.record %}
  {{ contact["fullname"] }} <{{ contact["emailaddress1"] }}>
{% endif %}
```

If `ICDS_COMPATIBLE_BINDING` flag is set to *true* you can use the `currentrecord` variable that refers to the `binding.record`. This is intended mostly for backward compatibility with previous versions of the plugin and should not be used in general.

```twig
{% if binding.is_bound %}
  {{ currentrecord["fullname"] }} <{{ currentrecord["emailaddress1"] }}>
{% endif %}
```

### Access the current user record 

Use the `user` object to check whether the current user is bound, and to access the bound Dataverse record values. See [user binding](binding/user-binding).

The following object members are available:

- `is_bound` -- *(boolean)* whether the current user is bound.
- `reference` -- *(EntityReference)* reference to the bound record.
- `record` -- *(Entity)* bound record object.
- `wp_user` -- *(WP_User)* information about the current WordPress user.

Notice that `user.record` is more expensive performance-wise -- it retrieves data from Dataverse. `user.reference` only
reads the local database and request parameters to calculate the entity reference.

```twig
{% if user.is_bound %}
  {{ user.record["fullname"] }}
{% endif %}
```

### Access any record in your Dataverse instance

Use the `entities` object to access any record in your Dataverse instance by its table logical name and GUID. All record fields are available at once.

```twig
{{ entities.contact["00000000-0000-0000-0000-000000000000"]["fullname"] }}
```

### Access the list of tables in your Dataverse instance

`entities_list` contains a map of all tables in your Dataverse instance. It maps logical names to display names.

### Access your Dataverse Integration organization metadata

`metadata` object allows accessing metadata of your Dataverse instance. It follows the interface of `EntityMetadata` in XRM SDK. See [Microsoft reference docs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.metadata.entitymetadata).

```twig
{% set options = metadata["contact"].Attributes["gendercode"].OptionSet.Options %}
{% for option in options %}
  <li>{{option.Value}} - {{option.Label.UserLocalizedLabel.Label}}</li>
{% endfor %}
```

### Get current timestamp

`now` contains the value of PHP function [`time()`](https://www.php.net/manual/en/function.time.php) at the moment of Twig environment initialization.

### Get date column from CRM and transform its value

Use `format_datetime()` to get value of any date column and transform its value. 

```twig
{% set record=entities.contact[GUID] %}
{{ record.date_column|format_datetime(dateFormat='short', timeFormat='short', locale=user.locale, timezone=user.timezone) }}
```

Example: we need to get Birthday column value and to see it as 11/1/22, 12:00 AM

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|format_datetime(dateFormat='short', timeFormat='short', locale=user.locale, timezone=user.timezone) }}
```

You can override the default timezone by explicitly specifying a timezone:

```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|date("F jS \\a\\t g:ia", "Europe/Paris") }}
```

You can even define your own pattern using format_datetime() [See details](https://unicode-org.github.io/icu/userguide/format_parse/datetime/#time-zone-pattern-usage):
```twig
{% set record=entities.contact[9ff7777f-6266-ed11-9562-00224892b4a1] %}
{{ record.birthdate|format_datetime(pattern="hh 'oclock' a, zzzz") }}
```

### Get current request information

Object `request` contains information about the current request. It has the following members:

- `params` -- merged map of cookies, POST form values and GET query arguments
- `path` -- relative page URL
- `path_and_query` -- relative page URL with query arguments
- `query` -- query arguments, start with `?` if not empty
- `url` -- full request URL

Global object `params` is the alias of `request.params`.

### Check if the website is connected to Dataverse

`crm.connected` tells whether the website is configured to make connections to Dataverse.

## Filters

Dataverse Integration provides several Dataverse-specific and general purpose Twig filters.

- `formatted_value( attributeName )` -- returns the formatted value of the filtered entity record as reported by Dataverse. Returns the entity record attribute value if no formatted value available.  
 E.g. `record|formatted_value( "preferredappointmenttimecode" )`
- `to_entity_reference` -- converts an Entity object, or an EntityReference-like object to a strongly typed EntityReference object. For an EntityReference-like object, the filter expects `LogicalName` (required), `Id` and `Name` keys.  
 E.g. `record|to_entity_reference` or `{ "LogicalName": "contact", "Id": "00000000-0000-0000-0000-000000000000" }`
- `add_query( queryName, queryValue )` -- adds a GET query argument to the filtered URL, honors the already existing query string which allows piping.
- `wpautop` -- see [WordPress wpautop() docs](https://developer.wordpress.org/reference/functions/wpautop/).

## Functions

```twig
- image_url(
    record,
    column,
    isThumb,
    {
        "Content-Disposition": "inline",
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "max-age=604800"
    }
) -- returns URL to the image stored in the specified Dataverse image column. 

- file_url(
    record,
    column,
    {
        "Content-Disposition": "inline",
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "max-age=604800"
    }
) -- returns download URL for the file stored in the specified Dataverse file column.  

- `last_error()` - returns last error generated by the Twig provider.

- `entity_url( record, postId = null )` -- {% include icds_premium.html %} returns URL to the website page with the given entity record bound to it. Uses [Table Binding](binding/table-binding) feature. If more than one WordPress post is bound to the table, you can pass post ID to link to a different page instead.
```

## Templates usage

Dataverse Integration gives you the ability to create reusable templates. To do this, you need to go to the plugin admin area and open the "Templates" tab.

There you must enter the name of the template and the content of the template. The content could contain all the functions, statements and filters of Twig.

To use templates in `Dataverse Twig Gutenberg` block, you need to use the `include` statement with the template name. For example:

```twig
{% include 'name_of_your_template' %}
```


If you want to create a template for updating record you can look at this example:

```twig
{% set currentRecord=entities.account[params.id] %}
{% form entity="account" mode="update" record=currentRecord|to_entity_reference %}
<form>
    <div class="form-group">
        <label>
            Account Name:
            <input class="form-control" name="name" value="{{ currentRecord["name"] }}">
        </label>
    </div>
	<div class="form-group">
        <label>
            Email:
            <input class="form-control" name="emailaddress1" value="{{ record["emailaddress1"] }}">
        </label>
    </div>
    <div class="form-group">
        <label>
            Last Date Included in Campaign:
            <input class="vdatetime" name="lastusedincampaign" value="{{ currentRecord["lastusedincampaign"] }}">
        </label>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
```

Then at the moment of page creation you need to use the `include` statement with the template name(previous example). And you need to configure binding for this page to have opportunity to update necessary record. [See how to configure binding.](binding/table-binding) 

You can also use templates to replace the form template or individual form fields in form registration editor. For this purpose click `Render form based on twig template` on the creation form page. Then choose your template name from the form template dropdown. If you want to replace just some fields you should leave default value for the form template dropdown, but set value for `fields templates`.

Also you can partially change behavior for some fields. For example, this code will change placeholders for first name and last name fields:

```twig
{% set firstnameDisabled = control.disabled %}
{% set lastnameDisabled = control.disabled %}
<div class="row">
  <div class="col-6 {% if 'firstname' in form.errors|keys %}has-danger{% endif %}">
    <input type="text" name="firstname" placeholder="Client First Name" class="form-control form-control-danger" value="{{ attribute(record, 'firstname') ?? formDefaults['firstname'] }}" {% if firstnameDisabled %}readonly="readonly"{% endif %}>
    {% if 'firstname' in form.errors|keys %}
      {% for errorMessage in form.errors['firstname'] %}
        <div class="form-control-feedback">{{ errorMessage }}</div>
      {% endfor %}
    {% endif %}
  </div>
  <div class="col-6 {% if 'lastname' in form.errors|keys %}has-danger{% endif %}">
    <input type="text" name="lastname" placeholder="Client Last Name" class="form-control" value="{{ attribute(record, 'lastname') ?? formDefaults['lastname'] }}" {% if lastnameDisabled %}readonly="readonly"{% endif %}>
    {% if 'lastname' in form.errors|keys %}
      {% for errorMessage in form.errors['lastname'] %}
        <div class="form-control-feedback">{{ errorMessage }}</div>
      {% endfor %}
    {% endif %}
  </div>
</div>
```

To use this template at the moment of form creation set `Render form based on twig template` as `Yes` on the creation form page. Then set mapping between `Fullname` field and your template name as value.

## Date Time and Date Only fields in twig templates

For example, you have several custom fields: `cr1d1_dateonly` - Date Only format, `cr1d1_datetime` - Date Time format. Specify them in a twig template.

```twig
{% form entity="contact" mode="create" record=record|to_entity_reference %}
<form>
    <div class="form-group">
        <label>
            Account Name:
            <input class="form-control" name="name" value="{{ record["name"] }}">
        </label>
    </div>
    <div class="form-group">
        <label>
            Date Only field:
            <input class="vdatetime" name="cr1d1_dateonly" value="{{ record["cr1d1_dateonly"] }}">
        </label>
    </div>
	<div class="form-group">
        <label>
            Date Time field:
            <input class="vdatetime" name="cr1d1_datetime" value="{{ record["cr1d1_datetime"] }}">
        </label>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
```

Then you view page with this template. To fill in this form you should type content in Date only field in `yyyy-mm-dd` or `yyyy/mm/dd` format (like `2023-01-20` or `2023/01/20`), Date Time field in `yyyy-mm-ddThh:mm` format (like `2023-01-20T12:30`).
