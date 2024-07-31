---
title: Adding a Registration - Handling 403 Errors
sidebar_position: 14
slug: /knowledge-base/add-registration
tags:
    - Knowledge base
    - Configuration
    - DataPress
---

When adding a registration, you may encounter a 403 error. This typically occurs if your app user hasn’t been added to the security profile.

## Solution

:::info

You must have System Administrator privileges to perform this operation

:::


1. Open [Power Platform admin center](https://admin.powerplatform.microsoft.com/). 
2. Select **Environments** then select the target environment.
3. Select **Settings**.
4. Expand **Users + permissions** section then select **Column security profiles**.
5. Select **WordPress Site Password** profile then select **Users**.
6. Add the app user to the profile.
