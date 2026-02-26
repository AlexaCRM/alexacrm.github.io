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
<div
  role="note"
  aria-label="Product note"
  style={{
    borderLeft: '4px solid #2f81f7',
    background: '#f0f7ff',
    padding: '12px 16px',
    borderRadius: '6px',
    margin: '1em 0',
    color: '#0b2e59',
  }}
>
  <div style={{ color: '#0b63d1', fontWeight: 600, marginBottom: '6px' }}>Note</div>
  <p style={{ margin: '0 0 6px 0' }}>
    The plugin previously known as <em>Dataverse Integration</em> has been renamed to <strong>DataPress</strong>.
  </p>
  <p style={{ margin: '0 0 6px 0' }}>
    This change reflects our commitment to enhancing user experience and aligning with our product vision.
  </p>
  <p style={{ margin: 0 }}>
    All references to Dataverse Integration in the documentation and UI will be updated to DataPress.
  </p>
</div>

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