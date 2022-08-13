---
title: Getting Started
permalink: /integration-cds/getting-started/
redirect_from:
 - /integration-dynamics/getting-started/
typora-root-url: ../
---

<p class="lead">Get acquainted with the plugin, learn how to install and configure it properly and learn about its features and capabilities.</p>

## Get your Dataverse / Dynamics 365 organization ready

Dataverse Integration is a WordPress plugin that makes WordPress and Dataverse / Dynamics 365 work together. It is not a stand-alone solution.

If you don't have a Dataverse / Dynamics 365 organization yet, you can sign up for a free trial at [powerapps.microsoft.com](https://powerapps.microsoft.com/) for Dataverse or at [trials.dynamics.com](https://trials.dynamics.com/) for Dynamics 365 trial.

## Get the plugin

Enter your WordPress Admin Area and go to *Plugins > Add New*. Enter *"Dataverse Integration"* into the search box, hit Enter. Locate the plugin, click *Install Now*, then *Activate*. Alternatively, go to [WordPress.org](https://wordpress.org/plugins/integration-cds/) and download the latest version of the plugin and install it manually.

## Get credentials

> Dataverse / Dynamics 365 supports several deployment and authentication scenarios. This tutorial assumes Dataverse / Dynamics 365 Online and Server-to-Server authentication with an application user.

To create application id and client secret or certificate you need to complete the following steps:

1. [Register an app](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app#register-an-application) in Azure Active Directory. During the registration select **Accounts in this organizational directory only** as Supported account types. Stop the walkthrough after the step when the app is registered, do not add redirect URI or change platform settings. Copy Application (client) ID and set it aside.
2. [Add client secret credentials](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app#add-credentials). You can use either client secret or certificate. If using the secret make sure to copy and set it aside. If using certificate, make sure you have a certificate file (.cer) and its password protected copy (.pfx).
3. Create an application user in Dataverse by following [these instructions](https://docs.microsoft.com/power-platform/admin/manage-application-users#create-an-application-user). Make sure to [assign roles](https://docs.microsoft.com/power-platform/admin/manage-application-users#manage-roles-for-an-application-user) to the user.

## Set authentication keys

By default, Dataverse Integration use a Wordpress `AUTH_KEY` constant for encryption purposes. To ensure maximum security you may want to create specific authentication constants to use by the plugin:
- `ICDS_AUTH_KEY` - Used to encrypt sensitive data such as application secret.
- `ICDS_FORM_AUTH_KEY` - Used for safe forms processing.

These constants can be defined in your `wp-config.php` file, for example
```
define('ICDS_AUTH_KEY', 'TfsFu)- pF\"6KNx@VT,FV@*`lM;Ls(nRy0/e:h^TnJ6/Ee$-cm@o2o;6U{#;;n+R');
define('ICDS_FORM_AUTH_KEY', 'ny%:T/j@I>/sMm8Unyi{+~oS/]PQKp3ZXIXb/)iLU|V]Q7gh^e4!fmka3xz[zpgN');
```
To generate a suitable keys you may use an online generator provided by Wordpress at https://api.wordpress.org/secret-key/1.0/

## Connect the plugin

Once you got required credentials, it's time to connect the plugin to CRM.

Go to your WordPress Admin  Area and access the *Integration Dataverse* menu. Switch to the *Connection* tab and choose the authentication method. Then follow these steps:

`For OAuth 2.0 / Shared Secret authentication method`
1. Enter the *Organization URL* -- for example, `https://contoso.crm.dynamics.com`
2. Select the *Deployment Type* -- **Online**
3. Select the *Authentication Method* -- **OAuth 2.0 / Shared Secret**
4. Enter the *Application ID* and *Client Secret* which you set aside previously
5. Check whether the credentials are OK by hitting the **Verify Connection** button
6. Upon successful test, click **Save settings** to establish a connection to CRM

`For OAuth 2.0 / Certificate authentication method`
1. Enter the *Organization URL* -- for example, `https://contoso.crm.dynamics.com`
2. Select the *Authentication Method* -- **OAuth 2.0 / Certificate**
3. Enter the *Application ID* and *Client Secret* which you set aside before
4. Upload or manually specify the path to the `.pfx` certificate on your hosting server
5. Enter the passphrase of the certificate
6. Check whether the credentials are OK by hitting the **Verify Connection** button
7. Upon successful test, click **Save settings** to establish a connection to CRM

Now the plugin is connected to CRM, and you can start building the integration.

## Create a Contact Us form

The plugin provides a Gutenberg block, "Dataverse Plain". It accepts Twig code and renders it as HTML at front-end. To create your first form, you can use the [custom form syntax](/integration-cds/custom-forms/). It allows creating HTML forms and capturing submissions into your Dataverse or Dynamics 365 organization.

Custom forms allow creating new Dataverse / Dynamics 365 records, as well as updating existing records. reCAPTCHA is supported to protect your forms from spam.

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

## Install Premium Features

{% include wpcrm_premium.html %}

### Create Application Password

1. Sign in into your WordPress site.
2. Select a user with admin privileges or create a new one for Dataverse to connect back to the site.
3. Edit their profile and create *application password*.

### Configure Dataverse Solution

1. Download latest [Dataverse solution](https://wpab.alexacrm.com/release/WordPressIntegration_latest_managed.zip). 
2. Sign in into https://make.powerapps.com and import downloaded solution into your Dataverse / Dynamics 365 instance.
3. Select **Apps** then select **WordPress**.
4. In the app, select **WordPress Sites**.
5. Select **+ New** and enter the following information:
   - **Name**: &lt;your WordPress site name&gt;. 
   - **URL**: &lt;your WordPress site URL&gt;.
   - **Is Default?**: Yes.
   - **Login**: login name or email of the admin WordPress user you selected earlier.
   - **Password**: application password you created earlier.
6. Save the record.

### Install WordPress Premium Solution

1.  Sign in into WordPress as admin user.
2. Select **Dataverse** in the left-hand side navigation.
3. You should see the message about the premium plugin being available. Click **Download & install** link.
4. Activate the plugin once it's installed. 
