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

<p class="lead">Link your WordPress users to Dataverse records to provide customized experiences, user data synchronization and extra sign-in authorization.</p>

## How to disable a user in the WordPress Admin Area

As an administrator, you can disable user in WordPress Admin Area. Go to the Users menu point and find the user, which you want to disable. Check the box before the appropriate username.

Choose Disable action in the left upper corner drop-down list and click Apply. Now this user can’t login in the WordPress Admin Area.

To enable this user you need to find this user again, tick this username, choose Enable action in the left upper corner dropdown and click Apply. And again this user can login and work in WordPress Admin Area.

## How to disable a user in Maker portal

Dataverse Integration provides capability to associate WordPress users with Dataverse Integration records to provide more opportunities to build self-service customer portals.

When a bound user signs in, your website receives data from the bound record. To bind user manually, you should go to Users -> All Users in WordPress Admin Area and fond this user. Then hover the mouse cursor over the username and click 'Dataverse Binding', choose 'Manual' mode and find necessary record from the Contact table. Click Add and Apply to save settings.  

You can also disable a user via Maker portal. You just need to find the record in the Contact table, that is binded with the user from WordPress. This user must have the data in the Wordpress section (Username on Default Site, Login Enabled). Then click Deactivate. Now this user can’t login in the WordPress Admin Area. To give opportunity this user to login you need to click Activate. 

Also if you set the Login Enabled column as 'Yes' for the user, this user will be able to login. If you set 'No' - the user will be disabled. 

:::note

[How to bind a user using WP API](/binding/user-binding/#how-to-bind-a-user-using-wp-api) 

:::

## How to get last login date for a user

To see the last login date, you need to get the user by ID (send a GET request).

```text
https://{url}/wp-json/wp/v2/users/{id}
```

Pay attention to the meta fields in the response.

```twig
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
    "icds_meta": "{"icds_binding":3,"icds_locale":"en_US","icds_timezone":"+00:00","icds_disabled":0,"icds_last_login":"2023-03-20T08:30:14+00:00"}",
    "icds_binding_ref": {
        "Name": "Chaunce Perrie",
        "Id": "4fc12b21-686a-ed11-81ac-00224892b4a1",
        "LogicalName": "contact",
        "KeyAttributes": null
}
}
```

`icds_last_login` shows the last login date. It can be empty if the user hasn’t signed in.

## How to filter users

To get users filtered by conditions, you need to send a GET request with the following encoded part:

```twig
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

You need to encode this body using URL-encoded format (you can use any tool).

Then add this encoded part in the URL. See the example below.

<div class="text--center"> 
<img src="/images/filter-user.png" alt="Filter users via API" width="800" />
</div>