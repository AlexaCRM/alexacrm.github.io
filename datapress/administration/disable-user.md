---
title: User administration
sidebar_position: 2
slug: /administration/disable-user
premium: true
tags:
    - User
    - DataPress
keywords: [DataPress user, WordPress user]    
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Link your WordPress users to Dataverse records to provide customized experiences, user data synchronization and extra sign-in authorization.</p>

## How to disable a user in the WordPress Admin Area

As an administrator, you can disable user in WordPress Admin Area. Go to the Users menu point and find the user, which you want to disable. Check the box before the appropriate username.

Choose Disable action in the left upper corner drop-down list and click Apply. Now this user can’t login in the WordPress Admin Area.

To enable this user you need to find this user again, tick this username, choose Enable action in the left upper corner dropdown and click Apply. And again this user can login and work in WordPress Admin Area.

## How to disable a user in Maker portal

DataPress (Dataverse Integration) provides capability to associate WordPress users with DataPress (Dataverse Integration) records to provide more opportunities to build self-service customer portals.

When a bound user signs in, your website receives data from the bound record. To bind user manually, you should go to Users -> All Users in WordPress Admin Area and fond this user. Then hover the mouse cursor over the username and click 'Dataverse Binding', choose 'Manual' mode and find necessary record from the Contact table. Click Add and Apply to save settings.  

You can also disable a user via Maker portal. You just need to find the record in the Contact table, that is binded with the user from WordPress. This user must have the data in the Wordpress section (Username on Default Site, Login Enabled). Then click Deactivate. Now this user can’t login in the WordPress Admin Area. To give opportunity this user to login you need to click Activate. 

Also if you set the Login Enabled column as 'Yes' for the user, this user will be able to login. If you set 'No' - the user will be disabled. 

:::note

[How to bind a user using WP API](/binding/user-binding/#how-to-bind-a-user-using-wp-api) 

:::

## How to get last login date for a user

To see the last login date, you need to get the user by ID by sending a GET request:

```text
https://{url}/wp-json/wp/v2/users/{id}
```

Pay attention to the meta fields in the response.

```json
"meta": {
    "persisted_preferences": {
        "core/edit-post": {
            "isComplementaryAreaVisible": true,
            "welcomeGuide": false,
            "openPanels": [
                "post-status",
                "page-attributes",
                "featured-image"
            ]
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
```

The **icds_last_login** field shows the last login date. It can be empty if the user hasn’t signed in.

## How to filter users

To get users filtered by conditions, send a GET request with the following encoded part:

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

You can add as many elements as you want. Operators can be: `eq, ne, gt, lt, ge, le, - =, !=, >, <, >=, <=, LIKE, IN, BETWEEN, REGEXP, EXISTS`.

Encode this body using URL-encoded format (you can use any tool).

Then add this encoded part in the URL. See the example below:

<div class="text--center"> 
<img src="/images/filter-user.png" alt="Filter users via API" width="800" />
</div>

Another way to filter users is to use the **X-Icds-Filter** header. The value of the header can be:

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

Also, add **icds_filter_header=1** in your request URL: 

```
https://{your-wordpress-site}/wp-json/wp/v2/users?context=edit&icds_filter_header=1
```

## How to get only necessary user fields in response

Add **icds_select_header=1** in your request URL: 

```
https://{your-wordpress-site}/wp-json/wp/v2/users?context=edit&icds_select_header=1
```
Also, use the **X-Icds-Select** header. Here you can specify any fields you want to see for users, for example, `id, email, description, url`.

In this example, you will see only the **id, email, description, and url** fields for the WordPress users.

## How to sort users by fields in response

Add **icds_order_header=1** in your request URL: 

```
https://{your-wordpress-site}/wp-json/wp/v2/users?context=edit&icds_order_header=1
```

Also use the **X-Icds-Order** header. Here you can specify the field name to sort users, for, example **url** or **username**.

## How to send a password reset message 

:::note
All API requests below require Basic Authentication.
:::

To send a password reset message to a user, you can use one of the following:

1. Send a password reset email using WordPress. Send a **POST** request to:

    ```
    https://{your-wordpress-site}/wp-json/integration-cds/v1/reset_password?email={userEmail}&id={userId}&login={userLogin} 
    ```
    
    To identify the user, the request should contain **one** of the following parameters:
    
    - **id**: WordPress user ID
    - **email**: User email
    - **login**: User login for the WordPress site
    
    The parameters priority is: id, email, login.
    
    This request will send a password reset link to the user and return an empty body (204 response). In case of an error, it will return a 500 response with the error description:
    
    ```json
    {
        "code": 3,
        "message": "User not found.",
        "data": null
    }
    ```
2. Generate a password reset link. Send a **GET** request to:

    ```
    https://{your-wordpress-site}/wp-json/integration-cds/v1/reset_password_link?email=user@example.com 
    ```
    
    To identify the user, the request should contain **one** of the following parameters:
    
    - **id**: WordPress user ID
    - **email**: User email
    - **login**: User login for the WordPress site
    
    It will return a JSON response with a password reset link or an error description in case of an error:
    
    ```json
    {
        "link": "https://your-wordpress-site.com/wp-login.php?action=rp&key=HEA7wLLCEvtnV3Ick1bQ&login={username}&wp_lang=en_US"
    }
    ```
