---
title: FetchXML overview
sidebar_position: 1
slug: /fetchxml
tags:
    - FetchXML
    - DataPress
keywords: [DataPress fetchXML]  
description: FetchXML is the native query language of Microsoft Dataverse (Dynamics 365 / CDS) used to retrieve records using conditions, joins, filters, and attributes.
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

## Introduction
FetchXML is the native query language of Microsoft Dataverse (Dynamics 365 / CDS) used to retrieve records using conditions, joins, filters, and attributes.
DataPress brings FetchXML directly into Twig templates, allowing you to:

- Display lists of records
- Fetch single records
- Build dynamic pages
- Apply filters to views and lookups
- Use templates with parameters

FetchXML is used anywhere DataPress needs structured data queries:

- WordPress pages using Twig
- Views
- Lookup fields in forms
- Conditional access rules

[More about FetchXML syntax](https://learn.microsoft.com/power-apps/developer/data-platform/fetchxml/overview)