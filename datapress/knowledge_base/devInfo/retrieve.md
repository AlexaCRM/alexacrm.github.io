---
title: How to retrieve Dataverse records using Web API twig functions
sidebar_position: 17
slug: /knowledge-base/retrieve-records
tags:
    - Knowledge base
    - DataPress
    - Twig
---

Follow this example to retrieve multiple records:

```twig
{% set records = 
retrieve_multiple(
entity:'contact', 
select:["fullname","ownerid"], 
filter: {"contactid":"ae8bca63-706a-ed11-9561-000d3a227751"},
order: {"fullname":"desc"}, 
expand:"ownerid",
top:2,
includeCount: null,
skip: null,
skipToken:null
) %}

<ul>
{% for record in records %}
    <li> <b>Name: </b>{{record["fullname"]}}|{{record["ownerid"].Name}}</li> 
{% endfor %}
</ul>
```

Here is an example of how to retrieve a single record:

```twig
{% set record1 = 
retrieve(
entity:'account',
guid: 'fa7eadd1-f343-ed11-bba2-6045bd8e5463',
select:["accountid","name","ownerid"], 
expand:"ownerid"
)
%}

<li><b>ID:</b> {{record1["accountid"]}} <b>Name: </b>{{record1["name"]}} |{{record1["ownerid"].Name}}</li>
```
An example of how to retrieve a record by reference:

```twig
{% set recordOne = retrieve("account", "c7e9ab7e-98ff-e811-a980-000d3aa0f423", "ownerid") %}
{% set recordRef = recordOne|to_entity_reference %}
 
{% set recordByRef =  retrieve(recordRef) %}           
<li><b>ID:</b> {{recordByRef["accountid"]}} <b>Name: </b>{{recordByRef["name"]}}</li>   
```     

For more information about function see [Filters and function](/datapress/using-twig/filters_and_function.md)