---
title: Table Binding
sidebar_position: 1
premium: true
slug: /binding/table-binding
tags:
    - Table binding
    - DataPress
keywords: [DataPress Table binding, Table Binding]  
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Link WordPress pages to Dataverse tables to provide direct access to your organization data.</p>

## Introduction

:::info

Premium feature! This feature is available in the premium extension.

:::

Table binding is a feature of DataPress (Dataverse Integration) plugin that allows linking specific Dataverse tables to WordPress posts and pages. When binding is set up, Twig, forms and other services get access to the "current" bound record and its columns.

## Understand table binding

Data in Dataverse is organized in various tables. All contacts, leads, invoices, etc. are organized as distinct tables.

In most integration scenarios, one WordPress page is used to display data records of one table type. For example, "Invoice View" page displays an invoice and its details -- the system decides which invoice to show via GUID in the URL query string.

Such binding may be achieved with a [FetchXML query](/datapress/fetchxml.md). However, it requires a certain amount of scaffolding on each bound page. Table binding lets you avoid this, and also enables tighter integration with other plugin features and services.

When table binding is enabled for a WordPress post, a new object called "current record" is established. It contains an Table object with the column values of the bound table row (record). In Twig the current record is exposed via the global object `record`. The type of table binding determines how to pick the right record for a request.

### Types of table binding

<div class="text--center"> 
<img src="/images/table-binding-mode.png" width="700" />
</div>

You can choose from several options how to bind the post.

**Via GUID in query string.** Specify the query parameter name in the binding options. For "id" the sample URL would be `htps://example.com/sample-page/?id=00000000-0000-0000-0000-000000000000`.

**Via alternate key in query string.** Choose the alternate key and specify the query parameter name for each key column. For "attr1" and "attr2" as query parameter names the sample URL would be `https://example.com/sample-page/?attr1=val1&attr2=val2`.

**Via custom code.** Add handlers for two WordPress filters, `integration-cds/binding/custom/target-{$postId}` and `integration-cds/binding/custom/url-{$postId}`, where `{$postId}` is the WordPress post ID of the bound page.

### Conditional access

In certain integration scenarios, it may be desirable to limit the number of table rows exposed to a user. In a self-service portal, you may want to allow a user access to their invoices, but keep them from seeing invoices for your other clients.

DataPress (Dataverse Integration) provides capability of restricting access by executing a provided FetchXML query before access to the page is granted. The query allows determining relations between the requested table row and the visitor. Access is granted if the query returns any rows.


[How to use fetchXML template and view](/fetchxml/#using-fetchxml-template)

## Configure global binding settings

Go to **Settings UI > Binding** to configure global binding settings.

:::note

Configure Binding Settings for a page

The first time you configure binding, the dropdown to choose a page will be disabled. In that case, you need to go back to WordPress and find the page you want to bind. 
Click **Configure binding** and choose the table from which you will take data.
Then, return to the Dataverse Admin Area and go to **Binding** -> **Page Binding**. Here, you need to choose the page name.

:::

### Choose post types to allow binding

WordPress has several built-in post types, including posts and pages. 3rd-party plugins can add custom post types. You can choose which post types should be exposed to Table Binding. 

### Choose default posts for bound Dataverse tables

Several features, including [views](/datapress/views.md) and `entity_url()` Twig filter, may link table references to the bound WordPress. In WordPress, table binding is a many-to-many association. In global settings you can choose the default post of each bound table. You need to bind a post to an table before it is shown in the dropdown.

## Configure post binding

Go to the list of posts. Depending on the post type, that could be *All Posts*, *All Pages*, etc. When you hover over the post row, the actions list is revealed.  Click *Configure Binding*, then *Setup binding*.

Choose the table from the dropdown. Then choose how the plugin should determine which exact record to bind to. Configure the binding as described in the section ["Types of table binding"](#types-of-table-binding). Hit **Save** afterwards.

All bound posts display a small Dynamics 365 logo beside the post title.

### Implement custom binding

If you choose binding via custom code, you must implement two filter hooks.

`integration-cds/binding/custom/target-{$postId}` expects an [Table](https://github.com/AlexaCRM/dynamics-webapi-toolkit/blob/master/src/Xrm/Entity.php) object or `NULL`. One additional parameter, `$target`, is passed -- it is a *string* that contains the logical name of the target table.

`integration-cds/binding/custom/url-{$postId}` expects a *string* that contains a URL to the bound post or `NULL`. Two additional parameters are passed: [WP_Post](https://developer.wordpress.org/reference/classes/wp_post/) `$post` and [TableReference](https://github.com/AlexaCRM/dynamics-webapi-toolkit/blob/master/src/Xrm/EntityReference.php) `$ref`. Based on `$ref`, you are expected to provide a URL which allows to display the given record on the requested bound page.

### Implement conditional access

Enable conditional access by selecting the checkbox. Add a FetchXML query in the text area.

The query is virtually a [Twig template](/datapress/using-twig/twig_template.md), and all the same Twig constructs, objects, filters and functions are available. Members of the `binding` object will reference the current record, and `user` object members will reference to the current user if [User Binding](/datapress/binding/user-binding.md) is implemented.

Sample FetchXML query that grants access only to users which are bound to contacts which in turn belong to the requested Account.

```xml
<fetch version="1.0" output-format="xml-platform" mapping="logical" >
  <entity name="contact" >
    <attribute name="emailaddress1" />
    <attribute name="contactid" />
    <filter>
      <condition attribute="contactid" operator="eq" value="{{user.reference.Id}}" />
    </filter>
    <link-entity name="account" from="accountid" to="parentcustomerid" >
      <filter>
        <condition attribute="accountid" operator="eq" value="{{binding.reference.Id}}" />
      </filter>
    </link-entity>
  </entity>
</fetch>
```

#### Access to the post is allowed if:

- Binding is not configured, **OR**
- Binding is configured, **AND**
  - Conditional access is not enabled, **OR**
  - Conditional access is enabled, **AND**
    - Query template is empty (i.e. not configured properly), **OR**
    - The evaluated query (after Twig expansion) is empty, **OR**
    - The evaluated query returns a non-empty collection

#### Access to the post is not allowed if:

- Binding is configured, **AND**
  - Conditional access is enabled, **AND**
    - Query template is not empty, **AND**
      - Dataverse connection is not configured, **OR**
      - The evaluated query returns an empty collection, **OR**
      - Query failed

[More examples for fetchXML templates](/fetchxml/#using-fetchxml-template)

## Use table binding on your website

You can manage page binding in WordPress Admin Area by navigating to Bindings -> Page Binding. Here, you can choose any page for any table. However, by default, only the contact table is visible. To add more tables, you need to create a page and click ‘Configure Binding’ to select the table to bind. After doing this, the table dropdown will appear in the Page Binding section.

Information retrieved via table binding is used to update a certain record(row) with a form. See [Forms documentation](/datapress/Forms/forms.md).

In Twig, the current row on a page is exposed via the global object `binding.record`. It contains an Table object of the current row, and you can access any column, e.g. `{{ binding.record["fullname"] }}`. For more information see [Twig documentation](/datapress/using-twig/twig_introduction.md)
