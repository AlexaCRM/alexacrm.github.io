---
title: Dynamics 365 Integration Plugin (On-Premises)
sidebar_position: 1
slug: /
omit_title: true
tags:
    - Dynamics 365 Integration
---

:::note

Use Dynamics 365 Integration for on-premises versions. For other scenarios, we recommend using DataPress (Dataverse Integration).

:::

Nothing gets between your web site and your CRM. No more iframes, no more third-party services, no more moving parts. Built using [CRM Toolkit for PHP](https://github.com/AlexaCRM/php-crm-toolkit), the plugin connects directly to Dynamics CRM without the need to add anything else.

This documentation assumes that you're using both free and premium plugins. Features available to premium users only are marked appropriately. 

## IMPORTANT!

As [communicated by Microsoft](https://docs.microsoft.com/power-platform/important-changes-coming#deprecation-of-office365-authentication-type-and-organizationserviceproxy-class-for-connecting-to-dataverse), effective **April 04, 2022,** Microsoft Dataverse will be retiring the WS-Trust authentication protocol that is used by custom clients to connect to Microsoft Dataverse. Dynamics 365 Integration plugin uses WS-Trust protocol when authenticating to Dataverse / Dynamics 365 using username and password. Beginning from version 1.2.32, the plugin includes app id / secret authentication method. This method uses OAuth protocol and will continue to operate as normal.

### How does this affect me?

On **April 04, 2022**, any instance of Dynamics 365 Integration plugin that uses username / password authentication will no longer connect to Microsoft Dataverse after this retirement.

### What action do I need to take?

To avoid impact to your operations when this is enforced, please switch your authentication method from username / password to app id / secret. This can be done by changing authentication method on plugin’s Connection tab. If you do not have app id / secret ready, follow [this knowledge base article](https://alexacrm.com/kb/plugin/config/oauth-setup/) to create application registration, connect it to Dataverse / Dynamics 365, and obtain app id and secret required to configure the plugin.
