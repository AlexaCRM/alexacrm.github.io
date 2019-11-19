---
title: User Binding
permalink: /integration-cds/user-binding/
---

<p class="lead">Link your WordPress users to CDS records to provide customized experiences, user data synchronization and extra sign-in authorization.</p>

## Introduction

CDS Integration provides capability to associate WordPress users with CDS records to provide more opportunities to build self-service customer portals.

When a bound user signs in, your website receives data from the bound record. You can use current user data to parameterize [FetchXML queries](../fetchxml/) and [views](../views/#prepare-the-view-for-use), [specify default values](../forms/#default-values) in forms or even [implement custom entity binding](../entity-binding/#implement-custom-binding) using current user data.

You can enable extra sign-in authorization which allows disabling sign-in for select users in CDS / Dynamics 365.

Synchronization between WordPress user and CDS record data is supported in both directions.

## Understand user binding modes

CDS Integration can bind a user to a CDS record in several different ways which are referred to as "binding modes".

By default, a WordPress user is **not bound** to a CDS record. That means, whatever the global options are, the current user object is not populated, no authorization against CDS is performed, no data synchronization is performed, and so on. In some integration scenarios the user may be implicitly switched to the *Default mode* programmatically.

In **Default mode,** CDS Integration binds the user to a Contact record. AlexaCRM solution creates a few new attributes in the Contact entity, including Username `alexacrm_wordpress_username`. When any plugin service or 3rd party integration requests to resolve the binding into a reference to a record or an Entity object, the plugin looks up a Contact record by the `alexacrm_wordpress_username` attribute, comparing it to the WordPress user's username (login). To associate a CDS record with a different WordPress user, change the value of the Contact record.

In **Custom mode,** you must implement the `integration-cds/user-binding/bind-custom` filter to produce an [EntityReference](https://github.com/AlexaCRM/dynamics-webapi-toolkit/blob/master/src/Xrm/EntityReference.php) for the given user. 

In **Manual mode,** the user is associated with a CDS record via user interface.

In **Disabled mode,** the user is essentially *not bound*, but the mode cannot be implicitly switched to *Default* programmatically -- explicit `setMode()` call is still allowed.

## Configure global binding settings

Go to **Settings UI > User Binding** to configure global user binding settings.

### Configure sign-in authorization for bound users

Check *"Authorize users against Common Data Service during sign-in"* to add an extra step to the standard WordPress authentication flow.

To disable sign-in for a chosen user, set the Contact *"User Enabled"* field to **No**.

### Enable auto binding for new WordPress users

Check *"Bind new users to a corresponding CDS record automatically"* to enable the feature. Choose among *Default* and *Custom* modes for new users.

If you choose *Default* mode, you need to provide WordPress user/usermeta field to CDS Contact field for initial matching. CDS Integration will locate the contact record using this mapping and set `alexacrm_wordpress_username` to the user's username.

### Enable field synchronization for bound users

When a WordPress user is bound to a CDS record, you may want to synchronize some of their data between the systems. That data may include Email *(user_email)*, First Name *(first_name)*, Last Name *(last_name)* and Display Name *(display_name).* You can map these WordPress user and usermeta fields to CDS entity fields. Leave the mapping field empty if you don't want to synchronize that particular WordPress user field.

You can only choose one synchronization direction: WordPress → Common Data Service *(Push)* or Common Data Service → WordPress *(Pull)*. Data pushes happen after registration (if auto binding is enabled), after sign-in, and after user data/metadata change. Data pulls happen after user registration and sign-in events.

If you mix Default and Custom binding modes on one website, CDS Integration will apply the synchronization mapping to any entity -- missing fields will be skipped.

## Use user binding UI to bind users to CDS

User binding for individual users is set up in the **WordPress Admin > Users**. Hover over the user row and click **Configure binding** to reveal the configuration panel.

You can change the binding mode of the selected user. In *Manual mode* you can select the user via lookup dialog.
