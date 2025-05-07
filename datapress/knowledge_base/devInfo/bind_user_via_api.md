---
title: How to bind a user using WP API
sidebar_position: 6
slug: /knowledge-base/bind-user-via-api
tags:
    - Knowledge base
    - DataPress
---

:::note 
All API requests below require Basic Authentication. 
:::

**Definition:**

```
POST  /wp-json/wp/v2/users/{id}
```

**Example Request**

```text
https://{site-url}/wp-json/wp/v2/users/10
```

**Body:**

Request body should contain json body with the meta property and the fields `icds_binding` and `icds_binding_ref`.

```json
{
    "meta": {
        "icds_binding": 3,
        "icds_binding_ref": {
            "Name": "ContactFirstName ContactLastName",
            "Id": "11fa11e8-34bc-ed11-81ff-0011189804cd",
            "LogicalName": "contact",
            "KeyAttributes": null
        }
    }
}
```