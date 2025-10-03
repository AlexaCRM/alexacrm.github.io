---
title: User Binding
sidebar_position: 2
premium: true
slug: /binding/user-binding
tags:
    - Binding
    - User binding
    - DataPress
keywords: [DataPress User binding, User Binding]  
---

:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Link your WordPress users to Dataverse contact records to provide customized experiences, user data synchronization and extra sign-in authorization.</p>

## Introduction

:::info

Premium feature! This feature is available in the premium extension.

:::

DataPress (Dataverse Integration) provides capability to associate WordPress users with Dataverse contact records to provide more opportunities to build self-service customer portals.

When a bound user successfully signs in, your website receives data from the bound contact record. You can use current user data to parameterize [FetchXML queries](/datapress/fetchxml.md) and [views](/datapress/views.md#prepare-the-view-for-use), [specify default values](/datapress/Forms/forms.md#default-values) in forms or even [implement custom table binding](/datapress/binding/table-binding.md#implement-custom-binding) using current user data.

You can add additional authorization step to disable sign-in for selected users in Dataverse / Dynamics 365.


## Understand user binding modes

DataPress (Dataverse Integration) can bind a user to a Dataverse record in several different ways which are referred to as "binding modes".

By default, a WordPress user is **not bound** to a Dataverse record. That means, whatever the global options are, the current user object is not populated, no authorization against Dataverse is performed.

In **Lookup mode** a user is bound to a Dataverse contact that is specified  explicitly. Contact can be selected using either WordPress or Dataverse user interface. This mode was previously known as Manual.

In **Username mode** DataPress (Dataverse Integration) binds the user to a contact record with a matching value in `alexacrm_wordpress_username` column (added to contact by AlexaCRM solution). This mode was previously known as Default or Auto. 

In **Custom mode** you must implement the `integration-cds/user-binding/bind-custom` filter to return an [EntityReference](https://github.com/AlexaCRM/dynamics-webapi-toolkit/blob/master/src/Xrm/EntityReference.php) for the given user. 

**Disabled mode** has been **deprecated.** This feature is not available in new deployment.


## Configure global binding settings

Select **Bindings > User Binding** in plugin admin interface to configure global user binding settings.

### Configure sign-in authorization for bound users

Enable "Authorize users against Dataverse during sign-in" to incorporate a Dataverse authorization step into the standard WordPress authentication flow.

This setting ensures that user authentication is validated against Dataverse. The system will only check whether login is enabled for the user, allowing seamless integration with existing WordPress authentication mechanisms.

## Use user binding UI to bind users to Dataverse

User binding for individual users is set up in the **WordPress Admin > Users**. Hover over the user row and click **Configure binding** to reveal the configuration panel.

You can change the binding mode of the selected user. In *Lookup mode* you can select the user using lookup dialog.

## Enable field synchronization for bound users

When a WordPress user is bound to a Dataverse record, you may want to synchronize some of their data between the systems. That data may include Email *(user_email)*, First Name *(first_name)*, Last Name *(last_name)* and Display Name *(display_name).* You can map these WordPress user and usermeta fields to Dataverse table columns. Leave the mapping field empty if you don't want to synchronize that particular WordPress user field.

:::tip
**Information for developers**
[How to bind a user using WP API](/knowledge-base/bind-user-via-api) 

:::

## Deprecated functionality
<details>
  <summary>Click to expand</summary>

The following functionality has been **deprecated** and removed from plugin interface. If this functionality is required please contact technical support.

Recommended way to auto-create user bindings and synchronize data between WordPress users and Dataverse contacts is to use Microsoft Power Automate.

### Enable username binding for new WordPress users

You can provide WordPress user/usermeta field to Dataverse Contact field for initial matching. DataPress (Dataverse Integration) will locate the contact record using this mapping and set `alexacrm_wordpress_username` to the user's username.
  
</details>

## Important to remember

When using the User Binding functionality, it is essential to leave at least one user without binding. Therefore, it is recommended that you create a new user as soon as possible and without any binding. This will help ensure that you can continue to manage and administer the system should any issues arise with the users who have binding.

In summary, always have at least one user without binding to guarantee the smooth running and administration of the system.

## How to bind a user in WordPress Power App

Here are the revised instructions for binding a user from the maker portal in two different ways:

1. Bind Contact Record to WordPress User:

- Open the WordPress user.
- Pay attention to the Binding section.
- In the “Contact” field, type the first or last name of the contact and select it.
- Simultaneously, the contact option will be chosen in the binding field.

<div class="text--center"> 
<img src="/images/contact-to-user.png" width="700" />
</div>

2. Bind WordPress User to Contact Record:

- Open the contact record.
- Pay attention to the WordPress section.
- In the “User (default site)” field, type the first and last name of your WordPress user and select it.
- Check the username in the “Username (default site)” field.
- Ensure that the “Login Enabled” field is set to “yes.”

<div class="text--center"> 
<img src="/images/user-to-contact.png" width="700" />
</div>

**How to use binding information in twig** 

The user object allows you to check whether the current user is bound and access their associated Dataverse record values. For more details, see [user binding](/datapress/binding/user-binding.md).

**Example Usage**

```twig
{{ user.record }} 
```

```twig
{{ user.reference }}
```
Example Output

```
Jsandye Stanbra
```

 [Read more](/twig/introduction/#access-the-current-user-record)