---
title: Views
---

A view is a grid with records listed under selected column headings. It is a type of [saved query](https://msdn.microsoft.com/en-us/library/gg328457.aspx). Users can select different views to look at a subset of records of the same entity that fit into pre-specified filter conditions. There are 3 main types of views: public, system, and personal.

You can insert views from Dynamics CRM into your posts and pages using shortcode `[msdyncrm_view]`.

Shortcode syntax:

```
[msdyncrm_view entity="invoice" name="Show Invoices" parameters="{querystring.id}" lookups="{contact:}" allfields="true"]
```

The output of this shortcode is a table populated with record columns retrieved from Dynamics CRM based on view settings.

{% include consider_twig.html %}

## Shortcode attributes

name
: **Required**{:.tag .tag-danger} **String**{:.tag.tag-primary} Name of the view (saved query) to display records, e.g. `Active Invoices`.

entity
: **Required**{:.tag .tag-danger} **String**{:.tag.tag-primary} Logical name of the entity that contains the view, e.g. `invoice`.

parameters
: **String**{:.tag.tag-primary} See [Parameters](#parameters)

lookups
: **String**{:.tag.tag-primary} See [Lookups](#lookups)

count
: **Integer**{:.tag.tag-primary} Records per page. Enables pagination if value is larger than zero.

### Parameters

TODO.

### Lookups

TODO.

## Inline views
{% include wpcrm_premium.html %}

*Dynamics CRM Integration Premium* allows to define views that do not rely on view definitions in the CRM. The basic view consists of a view shortcode with attributes, but a view for the inline templates can be defined inside the msdyncrm_view tag, i. e. `[msdyncrm_view]...[/msdyncrm_view]`.

The inline templates for views allow to:

1. Specify custom FetchXML to retrieve entity records from Dynamics CRM with placeholder parameters like `currentuser`, `currentrecord`, and `querystring`.
1. Create layouts for results that support HTML markup, *foreach* loops and formatted fields.
1. Print a custom template if no records have been retrieved.

### Creating inline templates

Generate a FetchXML via Dynamics CRM Advanced Find tool, or create one yourself and insert it into the `[msdyncrm_view]` shortcode.

#### Define a FetchXML

See also: [FetchXML documentation](https://msdn.microsoft.com/en-us/library/gg328332.aspx) at MSDN.

In this example, we're retrieving ten *Contact* records, fetching only fields `contactid`, `fullname`, `emailaddress1`, and `mobilephone`, using `fullname` for ascending order.

{% gist wizardist/366675d7caff2b154bcfea12c59400ed %}

#### Define a results template

Add the results node into the `[msdyncrm_view]` shortcode. `<results />` may contain HTML tags. Please note that its contents must be valid XML.

```xml
<results>
    <h2>Contacts list</h2>
    <p>List of active contacts</p>
</results>
```

To show retrieved records, tags `<foreachrow />` and `<foreachcell />` are introduced.

`<foreachrow />` loops through the collection of retrieved records. If you retrieve ten records, the template contained in this tag will be rendered ten times -- once for each record. To access record fields, use the `$row.fieldname` syntax inside `<foreachrow />`. For instance, `$row.emailaddress1` will print the value of `emailaddress1` field of the current record.

{% gist wizardist/f40d44771484ae954f739d7f7f56b081 %}

To print out all available record fields straight away, use `<foreachcell />` inside the `<foreachrow />` tag. Formatted field value can be accessed using the `$cell` construct.

{% gist wizardist/478102cc67e5aa498554e96693c49603 %}

#### Define an empty results template

If no records were retrieved from the CRM, you can display a custom message using `<noresults />`.

```xml
<noresults>
    <p>Sorry, no contact records found.</p>
</noresults>
```

#### Assemble all pieces together

Below is the resulting code for the inline view template including the shortcode opening and closing tags.

{% gist wizardist/88ef5a72ffa2f764474aa94fa47cd0bb %}

### Using inline templates with CRM views

`<results />` and `<noresults />` templates may be used with CRM views.

{% gist wizardist/eddf7afef7bee8c96e44fb34ef270c93 %}

### Using lookups and parameters in FetchXML

TODO.
