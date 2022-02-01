---
title: Gravity Forms
permalink: /integration-cds/gravity-forms/
premium: true
---

<p class="lead">Use gravity forms to manage your organization data</p>

## Introduction

Our plugin supports Gravity Forms. So you can use it instead of our Custom or PowerApps forms

## Dynamic field population

If you want to populate fields using the form's field_values attribute, you must follow the instructions below.

1. Add a new field and check the `Allow field to be populated dynamically` checkbox.
2. Specify a parameter name just below the `Allow field to be populated dynamically` checkbox.
3. Map the field to one of the Dataverse fields in the `Dataverse feed` settings.

<strong>Note: </strong> The parameter name in the `field_values` attribute must be the same as specified in the `2nd` point.

<strong>Note: </strong> When populate a lookup parameter, use the following syntax: parameter_name=`entity_name`:`record_id`. 

Example for `companyid` parameter name (actual is `parentcustomerid` attribute of the `contact` Dataverse table): 
<br/>
`field_values="companyid=account:{{account.accountid}}"`
