---
title: Understanding DataPress Integration
sidebar_position: 1
slug: /knowledge-base/passthrough-mechanism
tags:
    - Knowledge base
    - DataPress
---

# DataPress Integration Overview

**DataPress Integration** is designed as a passthrough mechanism—it doesn't store or replicate data but provides a dynamic layer between **WordPress** and **Microsoft Dataverse**. It enables seamless display and interaction with external data without persisting it locally.

## How It Works

Instead of maintaining its own data store, the integration acts as a **real-time bridge**:

- **From WordPress**: It accesses metadata, page content, user roles, or layout components that are defined in the WordPress environment.
- **From Dataverse**: It retrieves and renders structured business data stored in Microsoft Dataverse using features like `fetchxml`, views, or direct table queries.

DataPress renders this information dynamically on page load, ensuring the freshest possible content while respecting user roles and access controls.

## Example Use Case

Suppose you have a list of contacts in Dataverse and a WordPress page that displays them using a `<view>` tag. When a user visits that page:

1. DataPress reads the Twig template from WordPress.
2. It executes a real-time request to Dataverse to fetch the latest contact list.
3. The data is rendered server-side or client-side—depending on the configuration—and displayed to the user.

## Benefits of Passthrough Architecture

- **Real-Time Accuracy**: Always retrieves the latest data from the source.
- **No Sync Needed**: Eliminates complexity around data duplication or sync jobs.
- **Security Forward**: Honors existing permission layers in both WordPress and Dataverse.
- **Lightweight and Maintainable**: Since no storage is involved, the integration stays lean and performance-oriented.

## Security Considerations

Although DataPress doesn’t store data, it respects the security models of both connected systems:

- Users must have appropriate permissions in WordPress to view pages.
- Data returned from Dataverse adheres to user-level or service principal access permissions.

When needed, administrators can apply additional access controls using Twig flags like `ICDS_TWIG_USE_PRIVILEGES`.
