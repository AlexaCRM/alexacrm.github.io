---
title: Using Twig
permalink: /integration-cds/twig/
---

<p class="lead">Use Twig templates to create custom layouts. Access your CDS organization data and metadata in Twig to share your data with your users.</p>

## Introduction

*Integration CDS* employs [Twig](https://twig.symfony.com/) to make most data-rich layout jobs effortless.

On this page you can find information about custom Twig features that Integration CDS brings. Please refer to [Twig documentation](https://twig.symfony.com/doc/2.x/templates.html) to learn about its templating capabilities.

## Runtime settings

Twig in Integration CDS supports debug mode and template caching.

- Debug mode allows using `dump()` to print information about Twig objects using PHP `var_dump()`. It is enabled in [WordPress debug mode](https://wordpress.org/support/article/debugging-in-wordpress/) (`WP_DEBUG`) or if `ICDS_TWIG_DEBUG` is *true*.
- Template caching enhances page rendering performance. Enabled if `ICDS_TWIG_CACHE` is *true*.

## Global objects

Integration CDS makes several new global objects available in the Twig environment.

### Access the current bound record {% include icds_premium.html %}

Use the `binding` object to access entity binding on the current page. See [entity binding](../entity-binding/).

`binding` includes several properties:

- `is_bound` -- *(boolean)* whether current page supports entity binding.
- `reference` -- *(EntityReference)* reference to the bound record.
- `record` -- *(Entity)* bound record object.

Notice that `binding.record` is more expensive performance-wise -- it retrieves data from CDS. `binding.reference` only
reads the local database and request parameters to calculate the entity reference.

{% raw %}
``` twig
{% if binding.is_bound %}
  {% set contact = binding.record %}
  {{ contact["fullname"] }} <{{ contact["emailaddress1"] }}>
{% endif %}
```
{% endraw %}

If `ICDS_COMPATIBLE_BINDING` flag is set to *true* you can use the `currentrecord` variable that refers to the `binding.record`. This is intended mostly for backward compatibility with previous versions of the plugin and should not be used in general.

{% raw %}
``` twig
{% if binding.is_bound %}
  {{ currentrecord["fullname"] }} <{{ currentrecord["emailaddress1"] }}>
{% endif %}
```
{% endraw %}

### Access the current user record {% include icds_premium.html %}

Use the `user` object to check whether the current user is bound, and to access the bound CDS record values. See [user binding](../user-binding/).

The following object members are available:

- `is_bound` -- *(boolean)* whether the current user is bound.
- `reference` -- *(EntityReference)* reference to the bound record.
- `record` -- *(Entity)* bound record object.
- `wp_user` -- *(WP_User)* information about the current WordPress user.

Notice that `user.record` is more expensive performance-wise -- it retrieves data from CDS. `user.reference` only
reads the local database and request parameters to calculate the entity reference.

{% raw %}
``` twig
{% if user.is_bound %}
  {{ user.record["fullname"] }}
{% endif %}
```
{% endraw %}

### Access any record in your CDS organization

Use the `entities` object to access any record in your CDS organization by its entity logical name and GUID. All record fields are available at once.

{% raw %}
``` twig
{{ entities.contact["00000000-0000-0000-0000-000000000000"]["fullname"] }}
```
{% endraw %}

### Access the list of entities in your CDS organization

`entities_list` contains a map of all entities in your CDS organization. It maps logical names to display names.

### Access your CDS organization metadata

`metadata` object allows accessing metadata of your CDS organization. It follows the interface of `EntityMetadata` in XRM SDK. See [Microsoft reference docs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.metadata.entitymetadata).

{% raw %}
``` twig
{% set options = metadata["contact"].Attributes["gendercode"].OptionSet.Options %}
{% for option in options %}
  <li>{{option.Value}} - {{option.Label.UserLocalizedLabel.Label}}</li>
{% endfor %}
```
{% endraw %}

### Get current timestamp

`now` contains the value of PHP function [`time()`](https://www.php.net/manual/en/function.time.php) at the moment of Twig environment initialization.

### Get current request information

Object `request` contains information about the current request. It has the following members:

- `params` -- merged map of cookies, POST form values and GET query arguments
- `path` -- relative page URL
- `path_and_query` -- relative page URL with query arguments
- `query` -- query arguments, start with `?` if not empty
- `url` -- full request URL

Global object `params` is the alias of `request.params`.

### Check if the website is connected to CDS

`crm.connected` tells whether the website is configured to make connections to CDS.

## Filters

Integration CDS provides several CDS-specific and general purpose Twig filters.

- `formatted_value( attributeName )` -- returns the formatted value of the filtered entity record as reported by CDS. Returns the entity record attribute value if no formatted value available.  
 E.g. `record|formatted_value( "preferredappointmenttimecode" )`
- `to_entity_reference` -- converts an Entity object, or an EntityReference-like object to a strongly typed EntityReference object. For an EntityReference-like object, the filter expects `LogicalName` (required), `Id` and `Name` keys.  
 E.g. `record|to_entity_reference` or `{ "LogicalName": "contact", "Id": "00000000-0000-0000-0000-000000000000" }`
- `add_query( queryName, queryValue )` -- adds a GET query argument to the filtered URL, honors the already existing query string which allows piping.
- `wpautop` -- see [WordPress wpautop() docs](https://developer.wordpress.org/reference/functions/wpautop/).

## Functions

- `entity_url( record, postId = null )` -- {% include icds_premium.html %} returns URL to the website page with the given entity record bound to it. Uses [Entity Binding](../entity-binding/) feature. If more than one WordPress post is bound to the entity, you can pass post ID to link to a different page instead.
