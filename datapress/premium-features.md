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

## Install Premium Features

### Create Application Password

1. Sign in into your WordPress site.
2. Select a user with admin privileges (user with the Administrator role) or create a new one for Dataverse to connect back to the site.
3. Click Edit Profile.
4. Type password name in New Application Password Name text box and click the Add New Application Password button. It will be *application password*.

### Configure Dataverse Solution

When the plugin is connected to CRM, and you can start building the integration.
Then you will see that you have been connected to your environment.
The `Site Registration in DataPress` paragraph will appeare at the bottom of the page.
Click `Add registration`. In that case you will see `Site Registration in DataPress: Registered` status and can open Connection details.
If you click the `Add registration` button at the moment of plugin connection you can skip `Configure DataPress Solution` paragraph. Or anyway you can configure Dataverse Solution instead of clicking `Add registration`.

You can skip this paragraph if you click the `Add registration` button at the moment of plugin connection.

:::tip

When adding a registration, you may encounter a 403 error. Follow [these steps](/knowledge-base/add-registration) to resolve the permissions issue.

:::

1. Download latest [DataPress solution](https://wpab.alexacrm.com/release/WordPressIntegration_latest_managed.zip). 
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

1. Sign in into WordPress as an administrator.
2. In the left-hand navigation menu, select **DataPress**.
3. Navigate to the **Extensions** tab.
4. Locate and download the **DataPress Integration Premium** package.
5. Click **Back to WordPress** to return to the main dashboard.
6. Go to **Plugins** → **Add New Plugin**, then upload the downloaded `.zip` file.

:::note
Important Notice about **DataPress 2.85** and Later

Starting from version 2.85, the DataPress admin interface has been significantly updated. To ensure your experience matches the instructions in this documentation, please make sure you have updated the DataPress plugin to version **2.85 or higher**.

If you are using an older version, the interface and available features may differ, resulting in a mismatch with the documented steps.

For backward compatibility, we continue to provide links to previously used addons in the **Extensions** tab. However, please note:

These addons are **deprecated** and should not be used with DataPress 2.85 or later.

<div class="text--center"> 
<img src="/images/deprecated_addons.png" width="600" />
</div>

**All addon functionality is now built into the premium plugin.**

Use of deprecated addons is at your own risk.

You can manage all extensions directly in the Extensions tab. From the Registered extensions section, you can enable or disable individual addons as needed.

<div class="text--center"> 
<img src="/images/extensions-list.png" width="700" />
</div>
:::

## Rollback process

If you need to revert to the old free plugin version you can download it [here](https://wordpress.org/plugins/integration-cds/advanced/) or use plugin like `WP Rollback`.

If you need to roll back to an old premium plugin version, first of all Deactivate premium plugin and then download an old version.
