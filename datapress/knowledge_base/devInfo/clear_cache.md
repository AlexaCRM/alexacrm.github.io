---
title: Clearing the Cache
sidebar_position: 18
slug: /knowledge-base/clear-cache
tags:
    - Knowledge base
    - DataPress
---

#### Cache Tab

You can clear the cache by going to the **Cache** tab in the plugin’s admin area. There, you can clear all cache or select specific cache pools to clear.

#### DELETE API Request

To clear the cache through a **DELETE** API request, you need to add basic authentication to your request. Basic authentication involves sending a verified username and password with your request. The user must have the **Administrator** role. To set a password for the user, edit the user and add a new application password.

### API Endpoints

#### Forms

| Endpoint                                      | Description                        |
|-----------------------------------------------|------------------------------------|
| `wp-json/integration-cds/v1/cache/forms`      | Clear cache for all forms          |
| `wp-json/integration-cds/v1/cache/forms/{formId}` | Clear cache for a specific form by ID |
| `wp-json/integration-cds/v1/cache/forms/{formGuid}` | Clear cache for a specific form by GUID |

**Examples:**

| Example Endpoint                                      |
|-------------------------------------------------------|
| `wp-json/integration-cds/v1/cache/forms/2`            |
| `wp-json/integration-cds/v1/cache/forms/7a3eabfa-94ea-eb11-bacb-000d3acc54f0` |

#### Views

| Endpoint                                              | Description                        |
|-------------------------------------------------------|------------------------------------|
| `wp-json/integration-cds/v1/cache/views`              | Clear cache for all views          |
| `wp-json/integration-cds/v1/cache/views/{tableName}/{viewTitle}` | Clear cache for a specific view by table name and view title |
| `wp-json/integration-cds/v1/cache/views/{viewGuid}`   | Clear cache for a specific view by GUID |

**Examples:**

| Example Endpoint                                      |
|-------------------------------------------------------|
| `wp-json/integration-cds/v1/cache/views/account/All Accounts` |
| `wp-json/integration-cds/v1/cache/views/6a1eabfa-94ea-eb11-bacb-000d3acc54f0` |

#### FetchXML

| Endpoint                                              | Description                        |
|-------------------------------------------------------|------------------------------------|
| `wp-json/integration-cds/v1/cache/fetchxml`           | Clear cache for all FetchXML       |
| `wp-json/integration-cds/v1/cache/fetchxml/{tableName}` | Clear cache for a specific table by name |
| `wp-json/integration-cds/v1/cache/fetchxml/contact`   | Clear cache for the contact table  |

#### Entity

| Endpoint                                              | Description                        |
|-------------------------------------------------------|------------------------------------|
| `wp-json/integration-cds/v1/cache/entity`             | Clear cache for all tables         |
| `wp-json/integration-cds/v1/cache/entity/{tableName}` | Clear cache for a specific table by name |
| `wp-json/integration-cds/v1/cache/entity/contact`     | Clear cache for the contact table  |