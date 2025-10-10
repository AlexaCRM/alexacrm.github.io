---
title: WordPress Users Table
sidebar_position: 40
slug: /knowledge-base/wp-users-table
tags:
    - Knowledge base
    - DataPress
    - WordPess Users
---

### Introduction

The WordPress Users virtual table in Dataverse enables direct communication between Dataverse and WordPress, allowing seamless data synchronization. This table behaves like any Dataverse table, supporting standard events such as row creation, updates, and deletions.

**Understanding the Virtual Table**

Unlike traditional Dataverse tables that store data internally, the WordPress Users virtual table functions as a bridge to WordPress, ensuring real-time updates between the platforms. When a user is added, modified, or removed in WordPress, Dataverse recognizes these changes immediately and reflects them.

**Key Features**

- Direct integration with the WordPress user system.
- Automatic synchronization of user records.
- Supports Create, Update, and Delete operations like standard Dataverse tables.
- Maintains real-time connectivity without requiring manual imports or exports.

**Syncing Basic Information Using Power Automate**

Power Automate enables seamless synchronization of essential user details such as name, email, and roles between WordPress and Dataverse.

To automate actions based on user modifications, use the **When a row is added, modified, or deleted** trigger. This ensures that updates to WordPress users can trigger additional workflows, such as synchronizing data with Dataverse or notifying administrators.

Additionally, administrators can trigger a [password reset action](/knowledge-base/manage-users/#how-to-send-a-password-reset-message) available as a bound action in Power Automate. This allows for automatic password resets within an administrative workflow, ensuring a streamlined and secure user management process.

**Avoiding Circular References**
One of the biggest challenges in syncing data between WordPress and Dataverse is avoiding infinite loops or duplicate updates. A circular reference can occur if updates trigger back-and-forth data modifications between both platforms. To prevent this:

- Implement triggers with conditions to detect changes before executing sync actions.
- Use timestamps or version numbers to verify whether data has already been updated.
- Leverage Power Automate filters to ensure updates occur only when necessary.

**Conclusion**
The WordPress Users virtual table in DataPress allows efficient communication between WordPress and Dataverse, supporting standard data operations while maintaining real-time synchronization. When configuring automated data flows, Power Automate can streamline user data updates, provided proper safeguards are in place to avoid circular references.
