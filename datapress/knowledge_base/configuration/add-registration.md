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

1. Go to `Advanced settings` on Power Apps.
2. Click `Settings` -> `Security`.
3. Open `Field security profiles`.
4. Navigate to `WordPress Site Password`.
5. In the Members section, choose Users.
6. Add the created app user:
- Click `Add`.
- Find the app user.
- Click `Select` and then `Add`.
