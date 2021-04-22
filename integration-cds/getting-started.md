---
title: Getting Started
permalink: /integration-cds/getting-started/
redirect_from:
 - /integration-dynamics/getting-started/
typora-root-url: ../
---

<p class="lead">Get acquainted with the plugin, learn how to install and configure it properly and learn about its features and capabilities.</p>

## Get your CDS / Dynamics 365 organization ready

CDS Integration is a WordPress plugin that makes WordPress and CDS / Dynamics 365 work together. It is not a stand-alone CRM solution.

If you don't have a CDS / Dynamics 365 organization yet, you can sign up for a free trial at [trials.dynamics.com](https://trials.dynamics.com/).

## Get the plugin

Enter your WordPress Admin Area and go to *Plugins > Add New*. Enter *"CDS Integration"* into the search box, hit Enter. Locate the plugin, click *Install Now*, then *Activate*. Alternatively, go to [WordPress.org](https://wordpress.org/plugins/integration-cds/) and download the latest version of the plugin and install it manually.

Install the AlexaCRM solution for WordPress integration, as well as the premium add-on, *CDS Integration Premium,* to access features described in this walkthrough.

## Get credentials

> Dynamics 365 supports several deployment and authentication scenarios. This tutorial assumes Dynamics 365 Online and Server-to-Server authentication with an application user.

Connecting to CDS or Dynamics 365 Online Web API means several things:

1. Creating an app registration in Azure Active Directory and client secret (application password), granting it permissions
2. Creating an application user in CRM and associating it with the newly created app registration
3. Using app registration ID and client secret to get a token from Azure Active Directory

Create a new app registration in Azure Active Directory, go to app registration *API permissions.* Add a new permission, *Access Common Data Service as organization users.* Then go to *Certificates & secrets* and create a new client secret. **On Save, copy the displayed key for further use -- it will only be shown once.**

Copy the Application ID as well. This, and the password created moments before, comprise the credentials required for successful authentication

Next step is to create an application user in CRM. Go to the [Admin center](https://admin.powerplatform.microsoft.com/), navigate to your environment's Settings / Users. Switch to the *Application Users* view, hit **New**, switch to the *"Application User"* form, as can be seen [here](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/use-multi-tenant-server-server-authentication#manually-create-a--application-user). Fill in the *Application ID* which you saved before, as well as *Full Name* and *Primary Email* fields, then save the user. Associate the user with relevant security roles, for example "System Administrator" and "Delegate". Feel free to create custom security roles which suit your use case best.

## Set authentication keys

By default, Integration CDS use a Wordpress `AUTH_KEY` constant for encryption purposes. To ensure maximum security you may want to create specific authentication constants to use by the plugin:
- `ICDS_AUTH_KEY` - Used to encrypt sensitive data such as application secret.
- `ICDS_FORM_AUTH_KEY` - Used for safe forms processing.

These constants can be defined in your `wp-config.php` file, for example
```
define('ICDS_AUTH_KEY', 'TfsFu)- pF\"6KNx@VT,FV@*`lM;Ls(nRy0/e:h^TnJ6/Ee$-cm@o2o;6U{#;;n+R');
define('ICDS_FORM_AUTH_KEY', 'ny%:T/j@I>/sMm8Unyi{+~oS/]PQKp3 XIXb/)iLU|V]Q7gh^e4!fmka3xz[zpgN');
```
To generate a suitable keys you may use an online generator provided by Wordpress at https://api.wordpress.org/secret-key/1.0/

## Connect the plugin

Once you got required credentials, it's time to connect the plugin to CRM.

Go to your WordPress Admin  Area and access the *Integration CDS* menu. Switch to the *Connection* tab. Then follow these steps:

1. Enter the *Organization URL* -- for example, `https://contoso.crm.dynamics.com`
2. Select the *Deployment Type* -- **Online**
3. Select the *Authentication Method* -- **OAuth 2.0 / Shared Secret**
4. Enter the *Application ID* and *Client Secret* which you retrieved before
5. Check whether the credentials are OK by hitting the **Verify Connection** button
6. Upon successful test, click **Save settings** to establish a connection to CRM

Now the plugin is connected to CRM, and you can start building the integration.

## Create a Contact Us form

The plugin provides a Gutenberg block, "ICDS Plain". It accepts Twig code and renders it as HTML at front-end. To create your first form, you can use the [custom form syntax](/integration-cds/custom-forms/). It allows creating HTML forms and capturing submissions into your CDS or Dynamics 365 organization.

Custom forms allow creating new CDS / Dynamics 365 records, as well as updating existing records. reCAPTCHA is supported to protect your forms from spam.

{% raw %}
``` twig
{% form entity="lead" mode="create" recaptcha=true %}
<form>
    <div class="form-group">
        <label>
            First Name:
            <input class="form-control" name="firstname">
        </label>
    </div>
    <div class="form-group">
        <label>
            Last Name:
            <input class="form-control" name="lastname">
        </label>
    </div>
    <div class="form-group">
        <label>
            Email:
            <input class="form-control" name="emailaddress1">
        </label>
    </div>
    <div class="form-group">
        <recaptcha>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>
{% endform %}
```
{% endraw %}

The {% raw %}`{% form %}`{% endraw %} Twig tag lets you configure the form settings, such as target entity, submission mode (create or update), etc. See [custom forms documentation](/integration-cds/custom-forms/).

Form control `name` attributes refer to the corresponding entity attributes, such as `firstname`, `lastname` and `emailaddress1`. Put the `<recaptcha>` placeholder where you want to put reCAPTCHA control if you enable reCAPTCHA on your form. Before you use reCAPTCHA, please configure it in plugin settings.
