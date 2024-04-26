---
title: Create app id and secret for OAuth authentication
permalink: /wpcrm/configuration/auth
sidebar_position: 17
tags:
    - Knowledge base
    - Configuration
    - Dynamics 365 Integration
---

IMPORTANT! To complete the steps below you need to have one of the following roles in Azure Active Directory: Dynamics 365 Administrator, Power Platform Administrator, or Global Administrator.

**Register application in Azure Active Directory**<br></br>
1. Navigate to https://portal.azure.com in your browser.
2. Select Azure Active Directory. If it is not available on the screen, select search bar and type azure active directory then select it from the search results.

![image1](../img/azure1.png)

3. Select App Registrations then press + New Registration.

![image2](../img/azure2.png)

4. Enter app name, for example WordPress App and press Register.

![image3](../img/azure-3.png)

5. After the app registration has been created, copy Application (client) ID value, and set it aside.

![image4](../img/azure-4.png)

6. Select `Certificates & Secrets`, then press `+ New client secret`.

![image5](../img/azure-5.png)

7. In the Add a client secret side panel enter a human-readable name for the secret, select appropriate expiration period, and press Add.

![image6](../img/azure-6.png)

8. After the secret is created, copy the secret value, and set it aside. `Important`: this value is displayed only once, it’s important to copy it. If you navigate away from that screen without copying the value, new secret will have to be created.

![image7](../img/azure-7.png)

By now you should have app id and secret values set aside. These are the values to be used on the Connection tab of the plugin.

**Create application user in Dataverse**


1. Navigate to [Power Platform admin center](https://admin.powerplatform.microsoft.com/).
2. Select target environment.
3. On the settings screen select `S2S Apps > See all`.

![image8](../img/azure-8.png)

4. On the `Application users` screen select `+ New app user`.

![image9](../img/azure-9.png)

5. In the `Create a new app user` side panel do the following:
  - Press pencil next to `App` and select app registration created earlier
  - Select business unit. Usually it’s the root business unit providing access to the entire organization.
  - Select security roles. We recommend selecting `Basic User` role providing access to metadata and base tables + additional role to satisfy specific access requirements. For example, if the web site needs to display cases then at least read access to Cases table should be included in that role.
  - Press `Create` button.

![image10](../img/azure-10.png)

6. Confirm that the app user was successfully added to the environment.

![image11](../img/azure-11.png)

You can now use app id and client secret created earlier in the plugin configuration dialog.