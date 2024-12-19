---
title: Manage users
sidebar_position: 20
slug: /knowledge-base/manage-users
tags:
    - Knowledge base
    - DataPress
---

:::note 
All API requests below require Basic Authentication. 
:::

## Get Last Login Date for a User

**Definition:**

```
GET  /wp-json/wp/v2/users/{id}
```

**Example Request**

```text
https://{url}/wp-json/wp/v2/users/{id}
```

**Note**

Pay attention to the meta fields in the response.

```json
{
  "meta": {
    "persisted_preferences": {
      "core/edit-post": {
        "isComplementaryAreaVisible": true,
        "welcomeGuide": false,
        "openPanels": ["post-status", "page-attributes", "featured-image"]
      },
      "_modified": "2024-03-09T08:18:09.934Z"
    },
    "icds_binding": 3,
    "icds_timezone": "+00:00",
    "icds_locale": "en_US",
    "icds_disabled": 0,
    "icds_last_login": "2024-03-20T08:30:14+00:00",
    "icds_meta": {
      "icds_binding": 3,
      "icds_locale": "en_US",
      "icds_timezone": "+00:00",
      "icds_disabled": 0,
      "icds_last_login": "2023-03-20T08:30:14+00:00"
    },
    "icds_binding_ref": {
      "Name": "Chaunce Perrie",
      "Id": "4fc12b21-686a-ed11-81ac-00224892b4a1",
      "LogicalName": "contact",
      "KeyAttributes": null
    }
  }
}
```

The icds_last_login field shows the last login date. It can be empty if the user hasn’t signed in.

## How to Filter Users

**Definition:**

```
GET  /wp-json/wp/v2/users/context=edit&isds_filter={encodedPart}
```

**Example**

<div class="text--center"> <img src="/images/filter-user.png" alt="Filter users via API" width="800" /> </div>

**Parameter**: `isds_filter={encodedPart}`. Add the following encoded part:

```json
[
  {
    "Field": "icds_binding",
    "Operator": "eq",
    "Value": "1"
  },
  {
    "Field": "icds_binding_ref",
    "Operator": "ne",
    "Value": null
  }
]
```

You can add as many elements as you want. Operators can be: `eq, ne, gt, lt, ge, le, =, !=, >, <, >=, <=, LIKE, IN, BETWEEN, REGEXP, EXISTS`.

Encode this body using URL-encoded format (you can use any tool).


Another way to filter users is to use the **X-Icds-Filter** header.

**Definition:**

```
GET  /wp-json/wp/v2/users/context=edit&isds_filter_header=1
```

**Example**

```
https://{your-wordpress-site}/wp-json/wp/v2/users?context=edit&icds_filter_header=1
```

**Parameter**: icds_filter_header=1.

**Header**: The value of the header can be:

```json
[
  {
    "Field": "icds_binding",
    "Operator": "eq",
    "Value": "1"
  },
  {
    "Field": "icds_binding_ref",
    "Operator": "ne",
    "Value": null
  }
]
```

In this example, you should not encode this text.

## How to Get Only Necessary User Fields in Response

**Definition**

```
GET /wp-json/wp/v2/users?context=edit&icds_select_header=1
```

**Example**

```
https://{your-wordpress-site}/wp-json/wp/v2/users?context=edit&icds_select_header=1
```
**Parameter**: `icds_select_header=1 `.

**Header**: use the `X-Icds-Select` header. Here you can specify any fields you want to see for users, for example, `id, email, description, url`.

In this example, you will see only the id, email, description, and url fields for the WordPress users.

## How to Sort Users by Fields in Response

**Definition**

```
GET  /wp-json/wp/v2/users?context=edit&icds_order_header=1
```

**Example**

```
https://{your-wordpress-site}/wp-json/wp/v2/users?context=edit&icds_order_header=1
```

**Parameter**: `icds_order_header=1`.

**Header**: 
Add the **X-Icds-Order** header. Here you can specify the field name to sort users, for example, *url* or *username*.


## How to Send a Password Reset Message

To send a password reset message to a user, you can use one of the following:

**Definition**

```
POST /wp-json/integration-cds/v1/reset_password?email={userEmail}&id={userId}&login={userLogin}
```

**Example**

```
https://{your-wordpress-site}/wp-json/integration-cds/v1/reset_password?email={userEmail}&id={userId}&login={userLogin}
```

To identify the user, the request should contain **one of the following parameters**:

- **id**: WordPress user ID
- **email**: User email
- **login**: User login for the WordPress site

The parameters priority is: `id`, `email`, `login`.

This request will send a password reset link to the user and return an empty body (204 response). In case of an error, it will return a 500 response with the error description:

```json
{
    "code": 3,
    "message": "User not found.",
    "data": null
}
```

**Generate a password reset link.**

**Definition**

```
GET  /wp-json/integration-cds/v1/reset_password_link?email={userEmail}
```

**Example**

```
https://{your-wordpress-site}/wp-json/integration-cds/v1/reset_password_link?email=user@example.com
```

To identify the user, the request should contain **one of the following parameters**:

- **id**: WordPress user ID
- **email**: User email
- **login**: User login for the WordPress site

It will return a JSON response with a password reset link or an error description in case of an error:

```json
{
    "link": "https://your-wordpress-site.com/wp-login.php?action=rp&key=HEA7wLLCEvtnV3Ick1bQ&login={username}&wp_lang=en_US"
}
```