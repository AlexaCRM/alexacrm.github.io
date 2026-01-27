---
title: How to bind a user using WP API
sidebar_position: 30
slug: /knowledge-base/bind-user-via-api
tags:
    - Knowledge base
    - DataPress
---

:::note 
All API requests below require Basic Authentication. 
:::

There are multiple ways to bind a user using the WordPress API.

### User binding via PUT Method

**Definition:**

```
PUT  /index.php?rest_route=/integration-cds/v1/user_binding/{userId}
```

**Example Request**

```text
https://{site-url}/index.php?rest_route=/integration-cds/v1/user_binding/10
```

**Body:**

Request body should contain json body with the meta property and the fields `mode` and `ref`.

```json
{
    "mode": 3,
    "ref": {
        "LogicalName": "contact",
        "Id": "aa84b9b7-56bc-ed11-83ff-0022489804cd",
        "Name": "Xavier Fine"
    }
}
```

:::note 
**Removing a User Binding**

To remove an existing binding, use the following request body:

```json
{
    "mode": 0,
    "ref": null
}
```
:::

### User Binding via POST Method

**Definition:**

```
POST  /wp-json/wp/v2/users/{id}
```

**Example Request**

```text
https://{site-url}/wp-json/wp/v2/users/10
```

**Body:**

The request body should contain a JSON object with the meta property and the fields `icds_binding` and `icds_binding_ref`.

```json
{
    "meta": {
        "icds_binding": 3,
        "icds_binding_ref": {
            "Name": "Xavier Fine",
            "Id": "aa84b9b7-56bc-ed11-83ff-0022489804cd",
            "LogicalName": "contact",
            "KeyAttributes": null
        }
    }
}
```

:::note 

**Binding Modes**

You can use the following binding modes:

`0` → No Binding

`3` → Lookup Binding Mode

`4` → Binding Disabled 
:::