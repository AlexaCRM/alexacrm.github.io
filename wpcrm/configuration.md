---
title: Configuration
---

Configuration of the plugin is performed in the WordPress Administration panel. The plugin provides a separate section for that, which is called "Dynamics CRM". You can locate it in the main navigation menu on the left side of the screen.
 
## Connection

Microsoft Dynamics CRM supports two security models for authentication: claims-based authentication and Active Directory authentication. The type of authentication used depends on the type of deployment your application is accessing: Microsoft Dynamics 365 or Microsoft Dynamics CRM. CRM Plugin supports both CRM Online (Deployment type: Office 365) and CRM on-premises deployment (Internet-Facing Deployment).

![Connection settings screen](/img/wpcrm/configuration_fig1.png)

Deployment type
: Internet Facing (On-premises) or CRM Online (Office 365). If your CRM domain is `*.dynamics.com` then you are using **CRM Online.** Otherwise choose **On-premises.**

Dynamics CRM Address
: Absolute URL to your Microsoft Dynamics CRM, e. g. `https://contoso.crm.dynamics.com` for CRM Online, or `https://crm.example.net` for the on-premises deployment.

User Name
: CRM *systemuser* login name. This user will be used to authenticate and access the CRM data, please ensure that the user has sufficient permissions to access Dynamics CRM.

Password
: CRM *systemuser* password, required to authenticate in Dynamics CRM.

## Portal
{% include wpcrm_premium.html %}

Check **Authenticate new users against Dynamics CRM by default** if you want newly created WordPress users to be automatically authenticated against Dynamics CRM.

## Forms

## Views

## Images

## Search
{% include wpcrm_premium.html %}

## Messages

In the Messages section you can configure various messages that the plugin prints out on the web site.
