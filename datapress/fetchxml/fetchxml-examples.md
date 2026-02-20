---
title: FetchXML examples
sidebar_position: 3
slug: /fetchxml-examples
tags:
    - FetchXML
    - DataPress
keywords: [DataPress fetchXML]  
description: Practical one‑line FetchXML examples demonstrating common query patterns in DataPress.
---

## Examples

### Example 1: Simple FetchXML Query

```twig
{% fetchxml collection="accounts" %}
<fetch>
  <entity name="account">
    <attribute name="name"/>
    <attribute name="accountnumber"/>
  </entity>
</fetch>
{% endfetchxml %}
```

This retrieves account names and numbers and stores them in the accounts collection.

### Example 2: Display Linked Entity Data

Using link-entity to retrieve related table data:

```twig
{% fetchxml collection="orders" %}
<fetch>
  <entity name="salesorder">
    <attribute name="name" />
    <link-entity name="account" from="accountid" to="customerid" alias="acc">
      <attribute name="name" alias="customer_name" />
    </link-entity>
  </entity>
</fetch>
{% endfetchxml %}

{% for order in orders.results.entities %}
  {{ order["name"] }} — {{ order["customer_name"] }}
{% endfor %}
```

Shows an order name and its related account name.

### Example 3: Parameterized View Filter

Template:

```twig
<filter>
  <condition attribute="statuscode" operator="eq" value="*status*" />
</filter>
```

View configuration: `filter="AccountStatusFilter"`

This allows the view to dynamically filter records by status using a parameter.

### Example 4: FetchXML for Lookup Field Filtering

```twig
<filter>
  <condition attribute="statecode" operator="eq" value="0"/>
</filter>
```

Assign this FetchXML template to a lookup field to show only active records.

### Example 5: Retrieve Formatted Values

Use FormattedValues to show formatted labels (e.g., option sets, dates):

```twig
{% set r = accounts.results.entities[0] %}
<p>Created On: {{ r.FormattedValues["createdon"] }}</p>
```

This outputs the user-friendly formatted version of createdon instead of the raw datetime.

### Example 6: Loop Through Records With a Fallback Message

```twig
{% fetchxml collection="contacts" %}
<fetch>
  <entity name="contact">
    <attribute name="fullname"/>
    <attribute name="emailaddress1"/>
  </entity>
</fetch>
{% endfetchxml %}

{% if contacts.results.entities|length > 0 %}
  <ul>
    {% for c in contacts.results.entities %}
      <li>{{ c["fullname"] }} — {{ c["emailaddress1"] }}</li>
    {% endfor %}
  </ul>
{% else %}
  No contacts found.
{% endif %}
```

A practical template for lists with a fallback when no records are returned.

### Example 7: Using Paging Cookie for Large Data Sets

```twig
{% fetchxml collection="pagedAccounts" %}
<fetch page="1" count="50" mapping="logical">
  <entity name="account">
    <attribute name="name" />
  </entity>
</fetch>
{% endfetchxml %}

{% if pagedAccounts.results.more_records %}
  Next Page Cookie: {{ pagedAccounts.results.paging_cookie }}
{% endif %}
```

Shows how to detect additional pages and extract the paging cookie.