---
title: Controlling Twig Access with ICDS_TWIG_USE_PRIVILEGES
sidebar_position: 18
slug: /knowledge-base/icds-twig-privileges
tags:
    - Knowledge base
    - DataPress
    - Twig
    - security
    - permissions
---

# Controlling Twig Access Using `ICDS_TWIG_USE_PRIVILEGES`

The [`ICDS_TWIG_USE_PRIVILEGES`](/administration/troubleshooting/#advanced-settings) flag is designed to enhance security and editorial control over pages that utilize **Twig-based integrations with Dataverse**, including elements like `<view>` and `<fetchxml>`.

This feature ensures that only authorized administrator users can edit pages that display or process **Dataverse data** through embedded Twig code.

To enable the flag, go to the Dataverse Admin Area, open the **Settings** tab, scroll to the **Advanced Settings** section, and turn on `ICDS_TWIG_USE_PRIVILEGES`.

## What This Flag Does

When `ICDS_TWIG_USE_PRIVILEGES` is enabled:

- **Editors and Contributors** will **no longer be able to edit** pages that contain Twig tags accessing Dataverse (`<view>`, `<fetchxml>`, etc.).
- **Administrators** retain full access and can edit these pages freely.
- **Existing view permissions for visitors and editors remain unchanged.** This flag only affects *edit* permissions, not *read* access.

## How It Works

Access control is enforced using a custom WordPress capability: `icds_edit_twig`.

- By default, this capability is assigned to **administrator** users only.
- Users without this capability will be blocked from editing any post or page containing Twig-based Dataverse queries.

You can review and modify user roles and capabilities using a plugin like **Members** or **User Role Editor** if additional customization is needed.
