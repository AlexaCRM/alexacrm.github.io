---
title: How to retrieve Dataverse records using Web API twig functions
sidebar_position: 17
slug: /knowledge-base/retrieve-records
tags:
    - Knowledge base
    - DataPress
    - Twig
    - Retrieve
    - retrieve_multiple
---

Follow this example to retrieve multiple records:

```twig
{% set contacts = retrieve_multiple(
  entity: 'contact',
  select: ['fullname', 'ownerid'],
  filter: "statecode eq 0 and fullname ne null",  // string or array of conditions
  order: ['fullname desc'],                     
  expand: 'ownerid',
  top: 5,
  includeCount: true
) %}
<ul>
  {% for contact in contacts %}
    <li>
      <b>Name:</b> {{ contact['fullname'] }} |
      <b>Owner:</b> {{ contact['ownerid'].Name }}
    </li>
  {% endfor %}
</ul>
```

Here is an example of how to retrieve a single record:

```twig
{% set account = retrieve(
  entity: 'account',
  guid: 'fa7eadd1-f343-ed11-bba2-6045bd8e5463',
  select: ['accountid', 'name', 'ownerid'],
  expand: 'ownerid'
) %}
<li>
  <b>ID:</b> {{ account['accountid'] }} |
  <b>Name:</b> {{ account['name'] }} |
  <b>Owner:</b> {{ account['ownerid'].Name }}
</li>
```
An example of how to retrieve a record by reference:

```twig
{% set account = retrieve('account', 'c7e9ab7e-98ff-e811-a980-000d3aa0f423', 'ownerid') %}
{% set reference = account | to_entity_reference %}
{% set accountByRef = retrieve(reference) %}

<li>
  <b>ID:</b> {{ accountByRef['accountid'] }} |
  <b>Name:</b> {{ accountByRef['name'] }}
</li> 
```     

For more information about function see [Filters and function](/twig/filters_and_function)