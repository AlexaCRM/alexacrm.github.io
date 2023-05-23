---
title: User Binding
permalink: /integration-cds/user-binding/
premium: true
---

<p class="lead">Link your WordPress users to Dataverse records to provide customized experiences, user data synchronization and extra sign-in authorization.</p>

## Deprecated

This feature is not available in new deployment.

## Introduction

Dataverse Integration provides capability to associate WordPress users with Dataverse Integration records to provide more opportunities to build self-service customer portals.

When a bound user signs in, your website receives data from the bound record. You can use current user data to parameterize [FetchXML queries](../fetchxml/) and [views](../views/#prepare-the-view-for-use), [specify default values](../forms/#default-values) in forms or even [implement custom table binding](../table-binding/#implement-custom-binding) using current user data.

You can enable extra sign-in authorization which allows disabling sign-in for select users in Dataverse / Dynamics 365.

Synchronization between WordPress user and Dataverse record is supported in both directions.

## Understand user binding modes

Dataverse Integration can bind a user to a Dataverse record in several different ways which are referred to as "binding modes".

By default, a WordPress user is **not bound** to a Dataverse record. That means, whatever the global options are, the current user object is not populated, no authorization against Dataverse is performed, no data synchronization is performed, and so on. 

In **Lookup mode,** the user is associated with a Dataverse record via user interface (previously known as manual mode).

In **Username mode,** Dataverse Integration binds the user to a Contact record (previously known as default or auto). AlexaCRM solution creates a few new attributes in the Contact table, including Username `alexacrm_wordpress_username`. When any plugin service or 3rd party integration requests to resolve the binding into a reference to a record or an Entity object, the plugin looks up a Contact record by the `alexacrm_wordpress_username` attribute, comparing it to the WordPress user's username (login). To associate a Dataverse record with a different WordPress user, change the value of the Contact record.

In **Custom mode,** you must implement the `integration-cds/user-binding/bind-custom` filter to produce an [EntityReference](https://github.com/AlexaCRM/dynamics-webapi-toolkit/blob/master/src/Xrm/EntityReference.php) for the given user. 

In **Disabled mode,** (**Deprecated.** This feature is not available in new deployment.)

The functionality to auto-bind on user creation and synchronise data is still there but removed from admin UI. 

## Configure global binding settings

Go to **Settings UI > User Binding** to configure global user binding settings.

### Configure sign-in authorization for bound users

Check *"Authorize users against Dataverse during sign-in"* to add an extra step to the standard WordPress authentication flow.

## Use user binding UI to bind users to Dataverse

User binding for individual users is set up in the **WordPress Admin > Users**. Hover over the user row and click **Configure binding** to reveal the configuration panel.

You can change the binding mode of the selected user. In *Lookup mode* you can select the user via lookup dialog.

### Enable username binding for new WordPress users

You can provide WordPress user/usermeta field to Dataverse Contact field for initial matching. Dataverse Integration will locate the contact record using this mapping and set `alexacrm_wordpress_username` to the user's username.

### Enable field synchronization for bound users

When a WordPress user is bound to a Dataverse record, you may want to synchronize some of their data between the systems. That data may include Email *(user_email)*, First Name *(first_name)*, Last Name *(last_name)* and Display Name *(display_name).* You can map these WordPress user and usermeta fields to Dataverse table columns. Leave the mapping field empty if you don't want to synchronize that particular WordPress user field.

### How to bind user through API

You need to use POST method and update user by id.

```
https://datapress.testrino.com/wp-json/wp/v2/users/10 
https://{url}/wp-json/wp/v2/users/<userId>
```

And add json body with fields, which we want to update.
There is information about the contact table record which I want to bind to user with 10 id.

```
{
"meta":{
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
