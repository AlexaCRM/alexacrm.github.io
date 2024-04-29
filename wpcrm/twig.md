---
title: Twig Templates
sidebar_position: 5
tags:
    - Twig
    - FetchXML
    - Views
    - Dynamics 365 Integration
---

**Twig templates** give you a powerful tool to create a custom experience for your users.

With [Twig](https://twig.symfony.com/), a flexible, fast, and secure template engine, implemented in **Dynamics 365 Integration** you can display CRM data in WordPress using CRM views, FetchXML queries, as well as sending data back to CRM via forms.

Twig syntax is explained in [Twig documentation](https://twig.symfony.com/doc/2.x/templates.html).

## Features

- *entity binding* -- bind any entity to a page and display relevant record data
- *user binding* -- access record data of the the current [CRM identity](./authentication.md)
- *views* -- render CRM views in WordPress, with customizable templates
- *inline FetchXML queries* -- query CRM data and render it in WordPress
- *forms* -- render CRM forms or custom HTML forms in WordPress, capture submissions and send data back to CRM
- *access any record by ID*
- *access entity metadata*
- *extensibility* -- add new tags, functions and filters to the engine with WordPress actions and filters

## Global objects

- `entities` -- access to any entity record by ID. See [Access to records by ID](#access-to-records-by-id)
- `entities_list` -- map of all entities in the CRM (logical name -> display name)
- `metadata` -- access to entity metadata
- `currentrecord` -- access to the bound entity record. See [Entity binding](#entity-binding)
- `now` -- time in unixtime format (integer) when Twig was initialized
- `request` -- stores request-related data
  - `params` -- map of cookies, POST and GET values. The latter values override the former
  - `path` -- raw path to the page
  - `path_and_query` -- raw URI of the page
  - `query` -- query string prepended with `?` character or empty if no query string
  - `url` -- URL of the current page
  - `referer` -- URL of the page that linked to the current one
- `params` -- see `request.params`
- `crm` -- CRM-related parameters
  - `connected` -- *(boolean)* tells whether the site is connected to CRM

## Functions

- `entityUrl(entityName, entityId)` -- builds an URL leading to the page marked as "Default for views"
- `attachmentUrl(attachmentId)` -- builds an URL leading to the attachment download page. File download is triggered and a "Save As" dialog is displayed after visiting the link

## Filters

- `url|add_query(argName, argValue)` -- adds a query argument to the given URL
- `content|wpautop` -- filters the given content through the [`wpautop()`](https://codex.wordpress.org/Function_Reference/wpautop) WordPress function

## Examples

### Basic shortcode

All Twig templates must be enclosed into the special Twig shortcode -- `[msdyncrm_twig]`.

```
[msdyncrm_twig]
Twig templates go here...
[/msdyncrm_twig]
```

### Entity binding

Configure entity binding for the page as described in [Entity binding](./binding.md). If the page is bound to an entity, and the respective entity record is found in the CRM, that record will be available as a global `currentrecord` object in Twig templates.

```
{{ currentrecord.name }}
```

### User binding

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

Configure authentication for the site as described in [Authentication](./authentication.md). If the current user is an identity user, then the global `user` object will be available in Twig templates.

```
{{ user.emailaddress1 }}
```

### Views

The `view` tag allows you to fetch structured data from CRM and display it as a table. You can customize the template or write your own one and create a unique experience.

The tag has a number of arguments:

- `entity` -- *(required)* logical name of the entity which the view belongs to
- `name` -- *(required)* name of the entity view
- `cache` -- specifies expiration time for the fetched **records**. The format is based on the [ISO 8601 duration specification](https://en.wikipedia.org/wiki/ISO_8601#Durations)
- `parameters` -- an array of values to substitute placeholders in the view FetchXML
- `lookups` -- a key-value map to substitute lookup conditions in the view FetchXML
- `count` -- number of items per page. If specified, pagination is enabled

Inside the template the tag exposes `entityview` object with a collection of fields:

- `columns` -- collection of fetched columns (key: logical name, value: field label)
- `entity_logical_name` -- logical name of the entity
- `first_page` -- page number of the first page. Set to `1` if the result is not empty, `null` otherwise
- `last_page` -- page number of the last page. `null` if the result is empty)
- `name` -- name of the fetched CRM view
- `next_page` -- page number of the next page. `null` if pagination is not enabled or the last page has been reached
- `page` -- the current page number
- `pages` -- array of all available page numbers
- `page_size` -- number of items per page
- `previous_page` -- page number of the previous page. `null` if pagination is not enabled or the first page is reached
- `primary_key_logical_name` -- logical name of the primary field
- `records` -- collection of retrieved records, accessible by record ID
- `rows` -- collection of retrieved records with prepared values, accessible by record ID. Individual item fields are:
  - `head` -- label of the current column
  - `formatted_value` -- formatted value of the current column. May be a HTML link referring to a data-bound page if the column field is a lookup
  - `value` -- raw value of the field as reported by the CRM
  - `properties` -- field metadata
- `total_pages` -- total number of pages in the view
- `total_records` -- total record count as reported by the CRM

Please note that personal views must be shared with the user you use to connect WordPress to Dynamics 365 before you start surfacing them with Twig. The user must have *read* access to that view in order to surface it in WordPress.

![Dynamics 365 Share Personal View window.]

#### Parameters substitution

In order to use `parameters` attribute, you need to create a view with placeholders. A placeholder is an integer value (0, 1, 2...) enclosed in the curly braces: `{0}`. When you construct a view, enter these placeholders into field values you want to filter. See the example below.

![Dynamics 365 Advanced Find window.]

`parameters` receives a Twig array: `[ "value 0", "value 1", "value 2" ]`.

Alternatively, you can specify a placeholder label in the view instead of a number, e.g. `{email}`. To substitute that placeholder later, please use a map as `parameters` value: `{ "email": "contoso.com" }`.

#### Lookups substitution

You can substitute lookup conditions in the view. Please use a map `{ attribute => GUID }` for that. For example, `{ "parentcustomerid": params.account "}` or `{ "ownerid": user.id }`.

#### Simple view

The following snippet will insert a Contact view "Active Contacts" with pagination enabled with 10 records per page. The result of the view query will be fetched for 30 minutes. It will substitute placeholder `{0}` with raw value `contoso.com` and substitute `parentcustomerid` lookup with `account` query argument (i.e. `?account=GUID` in the URL).

```
{% view entity="contact" name="Active Contacts" parameters=[ "contoso.com" ] lookups={ "parentcustomerid": params.account } count="10" cache="PT30M" %}{% endview %}
```

### FetchXML queries

The `fetchxml` tag allows you to query the CRM using the powerful FetchXML query language. Please refer to [MSDN documentation](https://msdn.microsoft.com/en-us/library/gg328332.aspx) regarding the technology.

The tag supports the following attributes:

- `collection` -- the name of the variable that would contain query results object
- `cache` -- specifies expiration time for the fetched records. The format is based on the [ISO 8601 duration specification](https://en.wikipedia.org/wiki/ISO_8601#Durations)

The FetchXML query is contained between the `fetchxml` and `endfetchxml` tags.

```twig
{% fetchxml collection="contacts" cache="PT30M" %}
```
```xml
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">
  <entity name="contact">
    <attribute name="fullname" />
    <attribute name="emailaddress1" />
    <attribute name="contactid" />
    <order attribute="lastname" descending="false" />
  </entity>
</fetch>
```
```twig
{% endfetchxml %}
```

Variable `contacts` would contain an object with the following fields:

- `xml` - the original FetchXML query
- `results`
  - `entities` - collection of fetched entity records
  - `total_record_count` - the total record count in case pagination is enabled. Add `returntotalrecordcount="true"` to the `fetchxml` element in order to access this value
  - `more_records` - (boolean) tells whether more records are available if pagination is enabled
  - `paging_cookie` - paging cookie value
- `error` - contains an error message if there's any

```
<ul>
{% for contact in contacts.results.entities %}
  <li><a href="{{ entityUrl( "contact", contact.id ) }}">{{contact.fullname ?? "[noname]" }}</a> &lt;{{contact.emailaddress1}}&gt;</li>
{% endfor %}
</ul>
```

### Forms

`form` tag allows you to display CRM forms and custom forms on your WordPress site.

This tag supports the following attributes:

- `entity` *(required)* -- entity name of the form (contact, account, lead, etc.)
- `name` -- name of the form. If specified, a CRM form will be rendered
- `mode` -- mode of operation. `create`, `edit` and `upsert` are supported. Use the `record` attribute in `edit`/`upsert` modes to specify the edited record
- `optional` -- array of optional entity attributes (i.e. override CRM constraints)
- `required` -- array of required entity attributes. If the submitted field is empty, the form will emit an error message
- `default` -- map of attribute names and their default values. For lookup fields, the default value format is as follows: `{ "LookupAttributeName": { "LogicalName": "contact", "Id": user.id, "DisplayName": user.fullname } }`
- `lookupviews` -- map of lookups that need to be displayed as a dropdown list of existing records per specified view. The value is as follows: `{ "LookupAttributeName": [ "ViewEntityName", "ViewName" ] }`
- `redirect` -- URL to redirect to after a successful form submission
- `messages` -- a map with messages for the form. `success` and `error` keys are supported by default: `{ "success": "Form submitted.", "error": "Submission failed." }`
- `key` -- an identifier that helps to distinguish one form from another if two or more forms are present on one page. The key is calculated automatically based on attributes listed above. If there are two identical forms present on one page, please specify a custom key
- `record` -- entity record object to fill form fields from, can be retrieved via `currentrecord` or `entities` objects, or a GUID

To specify a default lookup value, please adhere to the following format: `{ "LogicalName": "contact", "Id": "00000000-0000-0000-0000-000000000000", "DisplayName": "CRM record" }`.

If the `name` attribute is specified, the plugin will render a CRM form, and expose a `form` object to the inner template. This object has the following structure:

- `id` -- unique one-time form ID
- `key` -- an automatically generated identifier used to distinguish submissions from different forms on one page. May be overridden with the `key` attribute
- `name` -- form name
- `tabs` -- [FormXML](https://msdn.microsoft.com/en-us/library/gg327975.aspx) representation of the form. Each CRM form is comprised of a number of tabs
  - `expanded` -- *(boolean)* whether the tab is not collapsed by default
  - `showLabel` -- *(boolean)* whether to display the tab label
  - `label` -- label value
  - `columns` -- collection of columns inside a tab. Tabs are comprised of a number of columns in Dynamics 365
    - `width` -- column width in percentage, with the percent sign appended
    - `sections` -- collection of sections inside a column. Columns are comprised of a number of sections in Dynamics 365
      - `showLabel` -- *(boolean)* whether to display the section label
      - `label` -- label value
      - `cellLabelAlignment` -- control label alignment (left/center/right)
      - `cellLabelPosition` -- control label position relative to the input control (top/left)
      - `rows` -- collection of rows. Each section in CRM is comprised of a number of rows. Each row in its turn is a collection of cells, the latter each containing a single control (label + input)
        - `showLabel` -- *(boolean)* whether to display the control label
        - `label` -- control label value
        - `colspan` -- number of cell columns in the row used to display the control
        - `rowspan` -- number of rows used to display the control
        - `isSpacer` -- *(boolean)* whether the cell contains a spacer
        - `control` -- control settings
          - `id` -- control ID
          - `classId` -- control class ID (see [MSDN](https://msdn.microsoft.com/en-us/library/gg334472.aspx))
          - `disabled` -- *(boolean)* whether the control is disabled
          - `required` -- *(boolean)* whether the control is required, defined by entity attribute metadata, form settings and `optional`/`required` attributes for the Twig tag (the latter values take priority)
          - `parameters` -- map of control parameters (see [MSDN](https://msdn.microsoft.com/en-us/library/gg328411.aspx))
          - `options` -- map of entity records. Available if the entity attribute is specified in the `lookupviews` attribute for the Twig tag
- `options`
  - `dateformat` -- date format to use with the `date` Twig filter
  - `datetimeformat` -- date/time format to use with the `date Twig filter
- `metadata` -- metadata of the form entity (attributes, relationships, etc.)
- `entities` -- *(deprecated, use the global `entities_list` object)* map of all entities in the CRM (logical name -> display name)
- `parameters` -- map of attributes supplied to the form tag
- `record` -- record object

The default form template is located in `templates/twig/form.twig`. If you need to create a new form template, please refer to it.

#### Displaying custom forms

You don't need a form defined in CRM to capture data from WordPress. You can design your own form, and data received from it will be sent to Dynamics 365 the same way if you had a CRM form.

To capture data this way, you need to define a custom template inside the `{% form %}{% endform %}` tags. You need to specify the entity name, and you must not include the `name` attribute. In the template, a POST form must be present, and input names (`name` attribute) must correspond to respective CRM entity attribute names. You can enforce required fields on your custom form with the `required` attribute.

If you have more than one Twig form on the page, you need to add the hidden `_key` input and specify `form.key` as its value. This will help to distinguish submissions from different forms. If you omit the key, every form present on the page will try to process the submission which is likely undesired.

```twig
{% form entity="lead" mode="create" required=["lastname", "emailaddress1", "description"] %}
<form method="POST">
<input name="firstname" required placeholder="First Name">
<input name="lastname" required placeholder="Last Name">
<input name="mobilephone" type="tel" placeholder="Phone Number">

<textarea name="description" rows="4" placeholder="Share Your Story"></textarea>

<button type="submit">Submit</button>
<input type="hidden" name="_key" value="{{form.key}}">
</form>
{% endform %}
```

### Access to records by ID

You can access any entity record by its ID.

```
{% set fooContact = entities.contact["36049e71-8132-e711-8102-5065f38b2601"] %}
{% set barAccount = entities.account["ce039e71-8132-e711-8102-5065f38b2601"] %}
```
