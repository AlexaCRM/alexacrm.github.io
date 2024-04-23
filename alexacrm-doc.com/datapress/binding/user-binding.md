---
title: User Binding
sidebar_position: 2
premium: true
---

<p class="lead">Link your WordPress users to Dataverse contact records to provide customized experiences, user data synchronization and extra sign-in authorization.</p>

## Introduction

Dataverse Integration provides capability to associate WordPress users with Dataverse contact records to provide more opportunities to build self-service customer portals.

When a bound user successfully signs in, your website receives data from the bound contact record. You can use current user data to parameterize [FetchXML queries](../fetchxml/) and [views](../views/#prepare-the-view-for-use), [specify default values](../forms/#default-values) in forms or even [implement custom table binding](../table-binding/#implement-custom-binding) using current user data.

You can add additional authorization step to disable sign-in for selected users in Dataverse / Dynamics 365.

## Understand user binding modes

Dataverse Integration can bind a user to a Dataverse record in several different ways which are referred to as "binding modes".

By default, a WordPress user is **not bound** to a Dataverse record. That means, whatever the global options are, the current user object is not populated, no authorization against Dataverse is performed.

In **Lookup mode** a user is bound to a Dataverse contact that is specified  explicitly. Contact can be selected using either WordPress or Dataverse user interface. This mode was previously known as Manual.

In **Username mode** Dataverse Integration binds the user to a contact record with a matching value in `alexacrm_wordpress_username` column (added to contact by AlexaCRM solution). This mode was previously known as Default or Auto. 

In **Custom mode** you must implement the `integration-cds/user-binding/bind-custom` filter to return an [EntityReference](https://github.com/AlexaCRM/dynamics-webapi-toolkit/blob/master/src/Xrm/EntityReference.php) for the given user. 

**Disabled mode** has been **deprecated.** This feature is not available in new deployment.

## Configure global binding settings

Select **Bindings > User Binding** in plugin admin interface to configure global user binding settings.

### Configure sign-in authorization for bound users

Check *"Authorize users against Dataverse during sign-in"* to add Dataverse authorization step to the standard WordPress authentication flow.

## Use user binding UI to bind users to Dataverse

User binding for individual users is set up in the **WordPress Admin > Users**. Hover over the user row and click **Configure binding** to reveal the configuration panel.

You can change the binding mode of the selected user. In *Lookup mode* you can select the user using lookup dialog.

## Deprecated functionality
The following functionality has been **deprecated** and removed from plugin interface. If this functionality is required please contact technical support.

Recommended way to auto-create user bindings and synchronize data between WordPress users and Dataverse contacts is to use Microsoft Power Automate.

### Enable username binding for new WordPress users

You can provide WordPress user/usermeta field to Dataverse Contact field for initial matching. Dataverse Integration will locate the contact record using this mapping and set `alexacrm_wordpress_username` to the user's username.

### Enable field synchronization for bound users

When a WordPress user is bound to a Dataverse record, you may want to synchronize some of their data between the systems. That data may include Email *(user_email)*, First Name *(first_name)*, Last Name *(last_name)* and Display Name *(display_name).* You can map these WordPress user and usermeta fields to Dataverse table columns. Leave the mapping field empty if you don't want to synchronize that particular WordPress user field.

## Information for developers

### How to bind a user using WP API

To create a lookup bind, send a POST request to

```
https://{site-url}/wp-json/wp/v2/users/{wordpress-user-id}
```

Request body should contain json body with the meta property and the fields `icds_binding` and `icds_binding_ref`.

```
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
}```

### Important to remember

When using the User Binding functionality, it is essential to leave at least one user without binding. Therefore, it is recommended that you create a new user as soon as possible and without any binding. This will help ensure that you can continue to manage and administer the system should any issues arise with the users who have binding.

In summary, always have at least one user without binding to guarantee the smooth running and administration of the system.
