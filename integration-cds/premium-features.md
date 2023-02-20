---
title: Premium features
permalink: /integration-cds/premium-features/
redirect_from:
 - /integration-dynamics/premium-features/
typora-root-url: ../
---

## Premium features

Our premium plugin allows you:
- to work with forms and manage crm tables. You can add required fields or, on the contrary, make required fields optional, set default value for fields, add filters, configure binding, change fields or buttons language and so on. 
- to create General settings for all forms or several forms.
- to make integration with form plugins. Create beautiful forms with Gravity Forms, Ninja Forms, Contact Form 7, and capture leads, contacts and any other Dynamics 365 entities. Edit your records with Gravity Forms and Ninja Forms.
- to edit a form with the Elementor plugin.
- to create views and manage these views (like change language, add pagination, add parameters).
- to add fetchXML template(to filter records) or twig template(to change fields behavior or the whole form) to manage forms or views. 

To edit page using Elementor you need to download, install and activate `Dataverse Integration Elementor Extension` from Dataverse Admin Area, Addons page.

## Install Premium Features

{% include wpcrm_premium.html %}

### Create Application Password

1. Sign in into your WordPress site.
2. Select a user with admin privileges (user with the Administrator role) or create a new one for Dataverse to connect back to the site.
3. Click Edit Profile.
4. Type password name in New Application Password Name text box and click the Add New Application Password button. It will be *application password*.

### Configure Dataverse Solution

When the plugin is connected to CRM, and you can start building the integration.
Then you will see that you have been connected to your environment.
The `Site Registration in Dataverse` paragraph will appeare at the bottom of the page.
Click `Add registration`. In that case you will see `Site Registration in Dataverse: Registered` status and can open Connection details.
If you click the `Add registration` button at the moment of plugin connection you can skip `Configure Dataverse Solution` paragraph. Or anyway you can configure Dataverse Solution instead of clicking `Add registration`.

You can skip this paragraph if you click the `Add registration` button at the moment of plugin connection.

1. Download latest [Dataverse solution](https://wpab.alexacrm.com/release/WordPressIntegration_latest_managed.zip). 
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

### Install WordPress Premium Solution

1. Sign in into WordPress as admin user.
2. Select **Dataverse** in the left-hand side navigation.
3. You should see the message about the premium plugin being available. Click **Download & install** link.
4. Activate the plugin once it's installed. 

Or you can use these steps:
1.  Sign in into WordPress as admin user.
2. Select **Dataverse** in the left-hand side navigation.
3. Select **Addons** in the left-hand side navigation.
4. Download **Dataverse Integration Premium**.
5. Select **Back to WordPress** in the left-hand side navigation.
6. Navigate to **Plugins** > **Add New** > **Upload Plugin**.
7. Activate the plugin once it's installed. 


## Rollback process

If you need to revert to the old free plugin version you can download it [here](https://wordpress.org/plugins/integration-cds/advanced/) or use plugin like `WP Rollback`.

If you need to roll back to an old premium plugin version, first of all Deactivate premium plugin and then download an old version.

