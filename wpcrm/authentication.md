---
title: Authentication
---

{% include wpcrm_premium.html %}

**Dynamics CRM Integration Premium** lets you create a membership system with Microsoft Dynamics CRM and WordPress.

With Dynamics CRM Integration, an authenticated WordPress user can be associated with a CRM entity record. The plugin allows to choose any type of entity to associate users with.

Our plugin offers two types of authentication: CRM-managed users and WordPress-managed users.

Regardless of the authentication type that you choose, *AlexaCRM WordPress Integration* must be installed in Dynamics CRM in order to enable this feature.

## CRM-managed users

If you have a large contact base (or accounts and other CRM entities) - you can easily allow them to log in on your site.

Users will use custom registration, login and password reset forms. We call these users **identity users**.

An identity user is comprised of:

1. Entity record in Dynamics CRM (e.g. contact, account, lead).
2. Special *Identity* record in Dynamics CRM that is associated with that entity record.
3. WordPress user linked to the identity record.

### Login

Login is facilitated by the shortcode `[msdyncrm_login]`.

```
[msdyncrm_login newpassword_url="" redirect_url=""]
```

This shortcode renders a form with login and password inputs, remember me checkbox and a link to recover forgotten password.

#### Attributes

newpassword_url
: **String**{:.tag.tag-primary} URL to the page that contains `[msdyncrm_reset_password]` shortcode. If the *change password on next login* flag is set to true in CRM, user will be navigated to the page that contains password change shortcode in order to change old password to the new one.

redirect_url
: **String**{:.tag.tag-primary} URL of the page to redirect to after the user logs in.

### Registration

Registration shortcode allows users to enter their credentials.

```
[msdyncrm_registration redirect_url="" mailsent_redirect_url="" activation_url=""]
```

#### Attributes

redirect_url
: **String**{:.tag.tag-primary} URL of the page to redirect to after email is confirmed, new password is set and user logged in at the registration page. 

mailsent_redirect_url
: **String**{:.tag.tag-primary} URL of the page to redirect to after the user has entered email or submitted registration form, usually used to redirect identity user to the “thank you” page.

activation_url
: **String**{:.tag.tag-primary} URL that will be used for the activation link in the confirm email, default is registration page, but can be changed if you want to process registration at a different page that contains invitation or registration shortcode.

### Invitations

Invitation shortcode allows users to ask for an invite on your site.

```
[msdyncrm_invitation redirect_url=""]
```

#### Attributes

redirect_url
: **String**{:.tag.tag-primary} URL of the page to redirect to after email confirmed, new password is set and user logged in at the invitation page.

### Password recovery

Password recovery shortcode allows users to change password of their identity user.

```
[msdyncrm_change_password newpassword=""]
```

##### Attributes

: **Boolean**{:.tag.tag-primary} Can be *true* of *false*. Attribute defines how the form will work. If `newpassword` is true then the user doesn't need to enter the old password. Default is *false*. 

## WordPress-managed users

If you already have a substantial number of WordPress users and want to continue managing them via WordPress (e.g. changing passwords, roles, display names, etc.), choose this type of authentication.

Users will use default WordPress screens for creating account, logging in and out, changing passwords.
