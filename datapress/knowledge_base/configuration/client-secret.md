---
title: Client secret has expired
sidebar_position: 15
slug: /knowledge-base/change-client-secret
tags:
    - Knowledge base
    - Configuration
    - DataPress
    - Registration
---

Your client secret can expire. In that case, you need to create a new client secret [See more details](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate#add-credentials)

1. Go to the **Connection** tab in the Dataverse Admin Area.
2. Fill in a new client secret.
3. Click **Verify connection** and **Save settings**.

:::warning

You can see that the registration has been added. However, the registration is cached. You need to go back to WordPress, then return to the Dataverse Admin Area and open the Connection tab again. Now click Add registration. You can now use all premium features again.

:::
