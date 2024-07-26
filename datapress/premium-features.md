---
title: Premium plugin
sidebar_position: 2
slug: /premium-features
tags:
    - Premium
    - DataPress
keywords: [DataPress premium]  
---

## Premium features

:::info

Premium feature! This feature is available in the premium extension.

:::

**Our Premium Plugin Features.**

*Form Management and CRM Tables:*
- Customize columns (fields) by adding or making them optional.
- Set default values for columns.
- Apply filters and configure bindings.
- Adjust language for columns and buttons.<br></br>

*General Settings:*
- Create global settings for all forms or specific ones.<br></br>

*Views Management:*
- Customize views (e.g., change language, add pagination, parameters).
- Utilize fetchXML templates (for row filtering).<br></br>

*Elementor Integration:*
- Create and edit forms seamlessly using the Elementor plugin.
- Display and update records.
- Show fields value.<br></br>

*Gravity Forms:*
- Build beautiful forms with Gravity Forms.
- Edit records (rows) with additional addons.<br></br>

To edit page using Elementor you need to download, install and activate `Dataverse Integration Elementor Extension` from Dataverse Admin Area, Addons page.

## Install Premium Features

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
7. Save the row (at the top of the page you will see "Successfully connected to the site" message).

<div class="text--center"> 
<img src="/images/wp-site.png" width="700" />
</div>

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
