---
title: FetchXML queries
permalink: /integration-cds/fetchxml/
---

<p class="lead">Use the powerful FetchXML query language in Twig to reflect your Common Data Service / Dynamics 365 data in WordPress.</p>

## Introduction

FetchXML is a query language used in Common Data Service to retrieve entity records using a set of conditions. *Integration CDS* brings support of FetchXML into Twig to allow rendering collections of CRM records or individual records on WordPress pages.

Please refer to the [Microsoft Docs portal](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/use-fetchxml-construct-query) to learn about constructing FetchXML queries.

## Query data using FetchXML in Twig templates

*Integration CDS* provides a new Twig tag, {% raw %}`{% fetchxml %}`{% endraw %}, which is accompanied by the required closing {% raw %}`{% endfetchxml %}`{% endraw %} tag. You must specify the collection Twig variable name in the `collection` attribute inside the opening tag -- you will access retrieved records via this variable. FetchXML query body is put between these tags.

{% raw %}
``` twig
{% fetchxml collection="customers" %}
<fetch mapping='logical' returntotalrecordcount='true'>  
   <entity name='account'>
      <attribute name='accountid'/>
      <attribute name='name'/>
   </entity>
</fetch>
{% endfetchxml %}
```
{% endraw %}

### Collection structure

The returned collection contains several members:

- `xml` -- FetchXML query that was sent to CDS.
- `results` -- an object that contains results of the query.
  - `entities` -- array of returned Entity objects
  - `total_record_count` -- total count of records that much the conditions, i.e. without imposed pagination limits. You must set `returntotalrecordcount="true"` to receive the record count. See [sample FetchXML](https://crmtipoftheday.com/1207/check-applied-entity-permissions-in-portals/) with this parameter set.
  - `more_records` -- whether more records are available while paginating.
  - `paging_cookie` -- paging cookie for pagination, see [Microsoft Docs](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/org-service/page-large-result-sets-with-fetchxml).

## Display FetchXML query results on a page

Use `results.entities` to access the fetched records. You can use a `for` loop to display a list of records.

{% raw %}
``` twig
<ul>
{% for customer in customers.results.entities %}
  <li>{{customer["name"]}}</li>
{% endfor %}
</ul>
```
{% endraw %}

## Joined entities and aliased attributes

FetchXML provides SQL JOIN operations via `<link-entity />` tag. Common Data Service / Dynamics 365 may provide an unreliable access name for the linked entity. To mitigate that, two options are available:

- Alias the `link-entity`. You will be able to access linked entity attributes via dot-notation: {% raw %}`{{record["aliasedEntity.attributeName"]}}`{% endraw %}.
- Alias the attributes inside `link-entity`. You will be able to access the aliased attributes directly: {% raw %}`{{record["aliasedLinkedAttributeName"]}}`{% endraw %}. Keep in mind that naming collisions may occur between alias names and main entity attribute names.
