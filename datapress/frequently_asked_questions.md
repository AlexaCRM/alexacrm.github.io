---
title: Frequently Asked Questions
sidebar_position: 15
slug: /frequently-asked-questions
tags:
    - DataPress
---

## What is a Dataverse instance?

A Dataverse instance is a cloud-based database environment provided by Microsoft Dataverse. It allows you to securely store and manage data used by business applications. Here are some key points about a Dataverse instance:

**Data Storage**: Data is stored in tables, which are collections of rows and columns. You can use standard tables provided by Dataverse or create custom tables to fit your specific needs1.
**Security**: Dataverse uses Azure Active Directory for identity and access management, ensuring that only authorized users can access the data2.
**Integration**: It integrates seamlessly with other Microsoft services like Dynamics 365, Power Apps, and Power Automate, allowing you to build comprehensive business solutions3.
Customization: You can customize tables, columns, and relationships to reflect your business processes and rules4.

## Does it work with Developer instance?

Yes, you can use Developer instance

## Can I use username/password for connection?

No, you should register an app in Microsoft Entra admin center and add client secret credentials. [See more details](/datapress/getting-started.md)

## What's the difference between DataPress (Dataverse Integration) and Dynamics 365 Integration?

*Key Features*

**DataPress (Dataverse Integration):**
- Uses 100% Web API-based communication, ensuring a future-proof investment.
- Secure server-to-server authentication, eliminating the need for usernames and passwords.
- Allows creation of custom forms in WordPress that map to Dataverse tables and columns.
- Extensible through WordPress actions and filters.

**Dynamics 365 Integration:**
- Initially used WS-Trust protocol for authentication, but now supports app ID/secret authentication.
- Directly integrates with Dynamics 365 applications, providing access to Dynamics 365 data.
- Suitable for users who primarily work within the Dynamics 365 ecosystem.

*Use Cases*

**DataPress (Dataverse Integration):**
- Ideal for businesses that use Dataverse as a central data repository and want to extend its capabilities to WordPress.
- Suitable for creating custom forms, collecting leads, and displaying data from Dataverse without coding.

**Dynamics 365 Integration:**
- Best for organizations that rely heavily on Dynamics 365 and need direct integration with WordPress.
- Useful for accessing and displaying Dynamics 365 data within WordPress.

*Extensibility*

**DataPress (Dataverse Integration):**
- Highly extensible through WordPress actions and filters.
- Supports custom layouts using the Twig template engine.

**Dynamics 365 Integration:**
- Extensible within the Dynamics 365 framework.
- Primarily focused on direct data integration and display.

