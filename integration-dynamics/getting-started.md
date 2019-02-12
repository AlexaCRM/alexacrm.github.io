---
title: Getting Started
permalink: /integration-dynamics/getting-started/
---

On this page, you can get acquainted with the plugin, learn how to install and configure it properly and learn about its features and capabilities.

## Get your Dynamics 365 organization ready

Dynamics 365 Integration is a WordPress plugin that lets WordPress and Dynamics 365 work together. It is not a stand-alone CRM solution.

If you don't have a Dynamics 365 organization yet, you can sign up for a free trial at [trials.dynamics.com](https://trials.dynamics.com/).

## Get the plugin

Enter your WordPress Admin Area and go to *Plugins > Add New*. Enter *"Dynamics 365 Integration"* into the search box, hit Enter. Locate the plugin, click *Install Now*, then *Activate*. Alternatively, go to [WordPress.org](https://wordpress.org/plugins/integration-dynamics/) and download the latest version of the plugin and install it manually.

## Get credentials

> Dynamics 365 supports several deployment and authentication scenarios. This tutorial assumes Dynamics 365 Online and Server-to-Server authentication with an application user.

Connecting to Dynamics 365 Online Web API means several things:

1. Creating an app registration in Azure Active Directory and client secret (application password), granting it permissions
2. Creating an application user in CRM and associating it with the newly created app registration
3. Using app registration ID and client secret to get a token from Azure Active Directory

Create a new app registration in Azure Active Directory, go to app registration *Settings / Required permissions.* Add a new permission, *Dynamics 365 Online / Access Dynamics 365 as organization users.* Then go to *Settings / Keys* and create a new password (client secret, or application password). **On Save, copy the displayed key for further use -- it will only be shown once.**

Copy the Application ID as well. This, and the password created moments before, comprise the credentials required for successful authentication

Next step is to create an application user in CRM. Go to the [Admin center](https://admin.powerplatform.microsoft.com/), navigate to your environment's Settings / Users. Switch to the *Application Users* view, hit **New**, switch to the *"Application User"* form, as can be seen [here](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/use-multi-tenant-server-server-authentication#manually-create-a--application-user). Fill in the *Application ID* which you saved before, as well as *Full Name* and *Primary Email* fields, then save the user. Associate the user with relevant security roles, for example "System Administrator" and "Delegate". Feel free to create custom security roles which suit your use case best.

## Connect the plugin

Once you got required credentials, it's time to connect the plugin to CRM.

Go to your WordPress Admin  Area and access the *Dynamics 365* menu. Switch to the *Connection* tab. Then follow these steps:

1. Enter the *Organization URL* -- for example, `https://contoso.crm.dynamics.com`
2. Select the *Deployment Type* -- **Online**
3. Select the *Authentication Method* -- **OAuth 2.0 / Shared Secret**
4. Enter the *Application ID* and *Client Secret* which you retrieved before
5. Check whether the credentials are OK by hitting the **Verify Connection** button
6. Upon successful test, click **Save settings** to establish a connection to CRM

Now the plugin is connected to CRM and you can start building the integration.