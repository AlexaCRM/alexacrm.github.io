---
title: Getting Started
slug: /getting-started
sidebar_position: 1
tags:
    - How to start
    - Connection
    - DataPress
keywords: [DataPress how to start]  
---

:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">Get acquainted with the plugin, learn how to install and configure it properly and learn about its features and capabilities.</p>

## Get your Dataverse / Dynamics 365 organization ready

**DataPress (Dataverse Integration)** is a WordPress plugin that makes WordPress and Dataverse / Dynamics 365 work together. It is not a stand-alone solution.

If you don't have a Dataverse / Dynamics 365 organization yet, you can sign up for a free trial at [powerapps.microsoft.com](https://powerapps.microsoft.com/) for Dataverse or at [trials.dynamics.com](https://trials.dynamics.com/) for Dynamics 365 trial.

## Get the plugin

Enter your WordPress Admin Area and go to *Plugins > Add New*. Enter *"Dataverse Integration"* into the search box, hit Enter. Locate the plugin, click *Install Now*, then *Activate*. Alternatively, go to [WordPress.org](https://wordpress.org/plugins/integration-cds/) and download the latest version of the plugin and install it manually.

## Get credentials

:::note

Dataverse / Dynamics 365 supports several deployment and authentication scenarios. This tutorial assumes Dataverse / Dynamics 365 Online and Server-to-Server authentication with an application user.

::: 

To create application id and client secret or certificate you need to complete the following steps:

1. [Register an app](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app?tabs=certificate#register-an-application) in Microsoft Entra ID. During the registration select **Accounts in this organizational directory only** as Supported account types. Stop the walkthrough after the step when the app is registered, do not add redirect URI or change platform settings. Copy Application (client) ID and set it aside.
2. [Add client secret credentials](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app?tabs=certificate#add-credentials). You can use either client secret or certificate. If using the secret make sure to copy and set it aside. If using certificate, make sure you have a certificate file (.cer) and its password protected copy (.pfx).
3. Create an application user in Dataverse by following [these instructions](https://docs.microsoft.com/power-platform/admin/manage-application-users#create-an-application-user). Make sure to [assign security roles](https://docs.microsoft.com/power-platform/admin/manage-application-users#manage-roles-for-an-application-user) to the user. We recommend assigning **Basis User** built-in role or another role with same or wider privileges. If you have the WordPress solution installed in your Dataverse instance, assign **WordPress App User** role to the app user. This security role provides access to additional tables included with the solution, for example **WordPress Sites**.
4. If you have the WordPress solution installed, add the app user to **WordPress Site Password** column security profile. This [column level security](https://learn.microsoft.com/power-platform/admin/field-level-security) ensures that the app user has access to the secure columns included with the solution, even without system administrator privileges.  

You can also use [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) (command line interface) to create app user and secret. 

1. `az login --user <myAlias@myCompany.com> --password <myPassword>` to login to Microsoft Azure. 

   For example, `az login --user myUsername@company.com --password SecretPassword@1`  

2. `az ad app create --display-name <appName>` to create an app. 

   For example, `az ad app create --display-name mytestapp2`

3. `az ad app credential reset --id <app id>` to add client secret to this app registration. 

   For example, `az ad app credential reset --id b4d8eb36-5431-4a7a-b32c-647dbb1b568d`

4. `az ad app delete --id <app id>` to delete the app.

   For example, `az ad app delete --id b4d8eb36-5431-4a7a-b32c-647dbb1b568d`

:::warning

Do not change the timezone for your app user. If you do, you may encounter undefined results when working with a Date Time column that has User Local behavior.

:::

## Set authentication keys

By default, DataPress (Dataverse Integration) use a Wordpress `AUTH_KEY` constant for encryption purposes. To ensure maximum security you may want to create specific authentication constants to use by the plugin:
- `ICDS_AUTH_KEY` - Used to encrypt sensitive data such as application secret.
- `ICDS_FORM_AUTH_KEY` - Used for safe forms processing.

<div class="text--center"> 
<img src="/images/keys.png" width="700" />
</div>

These constants can be defined in your `wp-config.php` file, for example

```php
define('ICDS_AUTH_KEY', 'TfsFu)- pF\"6KNx@VT,FV@*`lM;Ls(nRy0/e:h^TnJ6/Ee$-cm@o2o;6U{#;;n+R');
define('ICDS_FORM_AUTH_KEY', 'ny%:T/j@I>/sMm8Unyi{+~oS/]PQKp3ZXIXb/)iLU|V]Q7gh^e4!fmka3xz[zpgN');
```

To generate a suitable key you can use an online generator provided by Wordpress at https://api.wordpress.org/secret-key/1.0/. If you generate key this way you should save this key (go to Dataverse -> Settings tab -> at the end of the page Advanced Settings, paste the key here, one of key - ICDS_AUTH_KEY, when you reload link and get key one more time - ICDS_FORM_AUTH_KEY). 

:::note

If you did not set the **ICDS_AUTH_KEY**, it will be generated automarically. However, you must set the **ICDS_FORM_AUTH_KEY** yourself. You can also change either of these keys without disconnecting. The keys should be at least 32 characters long. 
If you define them in your **wp-config.php** file, these file values will take precedence.

:::

## Connect the plugin

Once you got required credentials, it's time to connect the plugin to CRM.

Go to your WordPress Admin  Area and access the *Dataverse* menu. Switch to the *Connection* tab and choose the authentication method. Then follow these steps:

`For OAuth 2.0 / Shared Secret authentication method`
1. Enter the *Organization URL* -- for example, `https://contoso.crm.dynamics.com`
2. Select the *Deployment Type* -- **Online**
3. Select the *Authentication Method* -- **OAuth 2.0 / Shared Secret**
4. Enter the *Application ID* and *Client Secret* (from client secret value column) which you set aside previously
5. Check whether the credentials are OK by hitting the **Verify Connection** button
6. Upon successful test, click **Save settings** to establish a connection to CRM

<div class="text--center"> 
<img src="/images/connection.png" width="700" />
</div>

`For OAuth 2.0 / Certificate authentication method`
1. Enter the *Organization URL* -- for example, `https://contoso.crm.dynamics.com`
2. Select the *Authentication Method* -- **OAuth 2.0 / Certificate**
3. Enter the *Application ID* and *Client Secret* which you set aside before
4. Upload or manually specify the path to the `.pfx` certificate on your hosting server
5. Enter the passphrase of the certificate
6. Check whether the credentials are OK by hitting the **Verify Connection** button
7. Upon successful test, click **Save settings** to establish a connection to CRM

Now the plugin is connected to CRM, and you can start building the integration.

:::note Important Information for site migration

If you are planning to migrate your website between deployments, make sure to set ICDS_AUTH_KEY in Advanced Settings before connecting the plugin to Dataverse. This key is used to encrypt sensitive information stored in the plugin configuration. If it is not present, the plugin will not be able to automatically reconnect to Dataverse after the migration.

After the site migration, ensure you re-register the site in Dataverse. Multiple site registrations are supported, allowing connections from both the original site and the copy at the same time.
:::

## Create a form

The plugin provides a Gutenberg block, "Dataverse Plain". To create your first form, you can use the [custom form syntax](/datapress/Forms/custom-forms.md).

## Install Premium Features

:::info

Premium feature! This feature is available in the premium extension.

:::

### Create Application Password

1. Sign in into your WordPress site.
2. Select a user with admin privileges (user with the role System Administrator) or create a new one for Dataverse to connect back to the site.
3. Click Edit Profile.
4. Type password name in New Application Password Name text box and click the Add New Application Password button. It will be *application password*.

<div class="text--center"> 
<img src="/images/password.png" width="700" />
</div>

### Configure Dataverse Solution

1. Download latest [Dataverse solution](https://wpab.alexacrm.com/release/WordPressIntegration_managed.zip). 
2. Sign in into https://make.powerapps.com.
3. Select **Solutions** then click **Import solution** and import downloaded solution(from step 1) into your Dataverse / Dynamics 365 instance.
4. Select **Apps** then select **WordPress**.
5. In the app, from lhe left menu select **WordPress Sites** tab.
6. Select **+ New** and enter the following information:
   - **Name**: &lt;your WordPress site name&gt;. 
   - **URL**: &lt;your WordPress site URL&gt;.
   - **Is Default?**: Yes.
   - **Login**: login name or email of the admin WordPress user you selected earlier.
   - **Password**: application password you created earlier.
7. Save the record (at the top of the page you will see "Successfully connected to the site" message).

<div class="text--center"> 
<img src="/images/wp-site.png" width="700" />
</div>

### Install WordPress Premium Solution

1. Sign in into WordPress as admin user.
2. Select **Dataverse** in the left-hand side navigation.
3. Go to the **Addons** tab 
4. Download **Dataverse Integration Premium**
5. Click **Back to WordPress** 
6. Click **Plugins** -> **Add New Plugin** and upload the downloaded .zip file.

:::note

The minimum required PHP version is 8.2.
The minimum required WordPress version is 5.4. 

Here are the recommended and mandatory PHP extensions for the plugin:

```php
RECOMMENDED_EXTENSIONS = [
  'mbstring',
]

MANDATORY_EXTENSIONS = [
  'curl',
  'dom',
  'intl',
]
```
:::
