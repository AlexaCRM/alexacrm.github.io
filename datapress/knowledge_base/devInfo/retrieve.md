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

**entity**: This specifies the name of the entity from which records are being retrieved. In this case, the entity is contact.

**select**: A list of the fields to be returned for each record. Here, the columns specified are fullname and ownerid.

**filter**: This parameter is used to filter the records based on specified value. 

**order**: Specifies the ordering of the returned records. The key is the column logical name and the value is the sort direction. 

**expand**: Used to include related entities or additional data from related entities in the results. This parameter can help fetch detailed information from linked entities. Other examples:
- parentcustomerid_account($select=name,telephone1,accountid) 
- transactioncurrencyid($select=isocurrencycode).

**top**: Limits the number of records returned. Here, it is set to 2, meaning only the top 2 records will be returned.

**includeCount**: This should be a boolean value. If set to true, the total record count can be retrieved using `{{ records.TotalRecordCount }}`. In this example, it is set to null, meaning the count is not included.

**skip**: Specifies the records to skip. It is set to null here, meaning no records are skipped.

**skipToken**: Used for pagination. When set to null, it indicates there is no token used for skipping records.

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