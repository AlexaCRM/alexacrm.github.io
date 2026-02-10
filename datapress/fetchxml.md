---
title: FetchXML
sidebar_position: 6
slug: /fetchxml
tags:
    - FetchXML
    - DataPress
keywords: [DataPress fetchXML]  
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Use the powerful FetchXML query language in Twig to reflect your Common Data Service / Dynamics 365 data in WordPress.</p>

## Introduction

FetchXML is a query language used in Common Data Service to retrieve table rows using a set of conditions. **DataPress (Dataverse Integration)** brings support of FetchXML into Twig to allow rendering collections of CRM records or individual records on WordPress pages.

Please refer to the [Microsoft Docs portal](https://docs.microsoft.com/power-apps/developer/data-platform/use-fetchxml-construct-query) to learn about constructing FetchXML queries.

## Query data using FetchXML in Twig templates

**DataPress (Dataverse Integration)** provides a new Twig tag, `{% fetchxml %}`, which is accompanied by the required closing `{% endfetchxml %}` tag. Use the required `collection` column to specify the variable you will use to access retrieved records. Write your FetchXML query inside these tags. Use the optional `cache` attribute to enable query cache -- please adhere to the [ISO 8601 duration specification](https://en.wikipedia.org/wiki/ISO_8601#Durations).

```
{% fetchxml collection="customers" cache="PT30M" %}
<fetch mapping='logical' returntotalrecordcount='true'>  
   <entity name='account'>
      <attribute name='accountid'/>
      <attribute name='name'/>
   </entity>
</fetch>
{% endfetchxml %}
```

### Collection structure

The returned collection contains several members:

- `xml` -- FetchXML query that was sent to Dataverse.
- `error` -- error message, null if no errors.
- `results` -- an object that contains results of the query.
  - `entities` -- array of retrieved Entity objects
  - `total_record_count` -- total count of rows that much the conditions, i.e. without imposed pagination limits. You must set `returntotalrecordcount="true"` to receive the row count. See [sample FetchXML](https://crmtipoftheday.com/1207/check-applied-entity-permissions-in-portals/) with this parameter set.
  - `more_records` -- whether more rows are available while paginating.
  - `paging_cookie` -- paging cookie for pagination, see [Microsoft Docs](https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/org-service/page-large-result-sets-with-fetchxml).

## Display FetchXML query results on a page

Use `results.entities` to access the fetched rows. You can use a `for` loop to display a list of records (rows).

```php
{% if customers.results.entities|length > 0 %}
    <ul>
    {% for customer in customers.results.entities %}
      <li>{{customer["name"]}}</li>
    {% endfor %}
    </ul>
{% else %}
    <p>No customers found.</p>
{% endif %}
```

## Linked tables and aliased columns

FetchXML provides SQL JOIN operations via `<link-entity />` tag. Common Data Service / Dynamics 365 may provide an unreliable access name for the linked table. To mitigate that, two options are available:

- Alias the `link-entity`. You will be able to access linked entity attributes via dot-notation: `{{record["aliasedEntity.attributeName"]}}`.
- Alias the attributes inside `link-entity`. You will be able to access the aliased attributes directly: `{{record["aliasedLinkedAttributeName"]}}`. Keep in mind that naming collisions may occur between alias names and main entity attribute names.

:::warning Important

If the linked entity alias matches any column name, it may result in errors or unpredictable output.

:::

## Using FetchXML Template

You can apply a FetchXML template while configuring binding for a page. Simply select your FetchXML template title in the Conditional Access section.

**Example FetchXML Template**:

```xml
<fetch version="1.0" output-format="xml-platform" mapping="logical">
  <entity name="account">
    <attribute name="accountid" />
    <attribute name="name" />
    <filter type="and">
      <condition attribute="name" operator="eq" value="OrganizationName" />
    </filter>
  </entity>
</fetch>
```

**FetchXML Template with Multiple Tables**:

```xml
<fetch version="1.0" output-format="xml-platform" mapping="logical">
  <entity name="contact">
    <attribute name="contactid" />
    <attribute name="fullname" />
    <link-entity name="account" from="accountid" to="parentcustomerid" alias="account">
      <attribute name="name" />
    </link-entity>
  </entity>
</fetch>
```

**FetchXML Key Concepts:**

- Filter Types: Use **not**, **and**, or **or** filters to refine queries.
- Using **link-entity**: Establish relationships between entities and retrieve related data in a single query, avoiding multiple separate queries.
- Using **attribute**: Specifies which fields should be retrieved from a table. Each corresponds to a column in the Dataverse table.

[Microsoft FetchXML Documentation](https://learn.microsoft.com/power-apps/developer/data-platform/fetchxml/overview)

### Using FetchXML Template with views

FetchXML templates can be used to apply filters in views.

For example, to filter the All Accounts view, create the following FetchXML template in the DataPress Admin Area: 

```
<filter>
  <condition attribute="address1_city" operator="eq" value="Sydney" />
  <condition attribute="name" operator="eq" value="OrganizationName" />
</filter>
```

**Using Template Parameters**

To make the filter dynamic, modify the template using **parameters**:

```
<filter>
  <condition attribute="address1_city" operator="eq" value="*city*" />
  <condition attribute="name" operator="eq" value="*name*" />
</filter>
```

- Set default values for these parameters in the FetchXML section or directly in the form settings.

- When selecting a template, it will indicate whether parameters are required.

📌 Use `filter='fetchXMLtemplateName'` to apply a FetchXML template in a view

User `filter='fetchXMLtemplateName'` to use a new fetchXML template with a view.
[Learn more about FetchXML templates and views](/datapress/views.md#parameterize-your-views)

**Applying FetchXML Templates in Forms**

FetchXML templates can also be configured for lookup fields in forms.
To set a FetchXML template for a lookup field:

- Navigate to DataPress (Dataverse) Admin Area.
- Open the **Forms Editor** and find your form.
- Locate the **Lookup Fields** section.
- Assign a FetchXML template to the desired lookup field.

To apply a FetchXML template globally across all forms, set the template in **Forms Global Settings**.

**FetchXML Template Creation Tools**

🛠 **XrmToolBox** can help you to create fetchXML filters. 
[XrmToolBox documentation](https://www.xrmtoolbox.com/documentation/) Use FetchXML Builder tool to get help for fetchXML creation.

## How to use formattedValues

`FormattedValues` is a property used in the context of Dataverse. It provides a collection of formatted values for the table columns. This property is particularly useful when you need to display data to users in a user-friendly format. It is often used in forms and reports where the raw data needs to be presented in a more understandable way. [Read more](https://learn.microsoft.com/dotnet/api/microsoft.xrm.sdk.entity.formattedvalues?view=dataverse-sdk-latest)<br></br>
This is an example of how to use `FormattedValues` in your code:

```twig
{% fetchxml collection="accounts" %}
<fetch>
<entity name="account">
  <attribute name="name" />
  <link-entity name="contact" to="primarycontactid" from="contactid" alias="cont">
   <attribute name="createdon" />
   <attribute name="modifiedon" />
  </link-entity>
</entity>
</fetch> 
{% endfetchxml %}

{% set record=accounts.results.entities[0] %}

{{ record.FormattedValues["cont.modifiedon"] }}
```
