---
title: User administration
sidebar_position: 2
permalink: /datapress/administration/user-administration/
premium: true
---

<p class="lead">Link your WordPress users to Dataverse records to provide customized experiences, user data synchronization and extra sign-in authorization.</p>

## How to disable a user in the WordPress Admin Area

As an administrator, you can disable user in WordPress Admin Area. Go to the Users menu point and find the user, which you want to disable. Check the box before the appropriate username.

Choose Disable action in the left upper corner drop-down list and click Apply. Now this user can’t login in the WordPress Admin Area.

To enable this user you need to find this user again, tick this username, choose Enable action in the left upper corner dropdown and click Apply. And again this user can login and work in WordPress Admin Area.

## How to disable a user in Maker portal

Dataverse Integration provides capability to associate WordPress users with Dataverse Integration records to provide more opportunities to build self-service customer portals.

When a bound user signs in, your website receives data from the bound record. To bind user manually, you should go to Users -> All Users in WordPress Admin Area and fond this user. Then hover the mouse cursor over the username and click 'Dataverse Binding', choose 'Manual' mode and find necessary record from the Contact table. Click Add and Apply to save settings.  

You can also disable a user via Maker portal. You just need to find the record in the Contact table, that is binded with the user from WordPress. This user must have the data in the Wordpress section (Username on Default Site, Login Enabled). Then click Deactivate. Now this user can’t login in the WordPress Admin Area. To give opportunity this user to login you need to click Activate. 

Also if you set the Login Enabled column as 'Yes' for the user, this user will be able to login. If you set 'No' - the user will be disabled. 

