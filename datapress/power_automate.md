---
title: Power Automate Integration Examples
sidebar_position: 9
slug: /power-automate
tags:
    - Power Automate
    - WordPress
    - Automation
    - Custom API
---

# Power Automate Integration Examples

This page provides examples of using Power Automate with WordPress through custom APIs for automation purposes.

## Available Custom APIs

The following custom APIs are available for WordPress automation:

- **When WordPress User Signs In or Out**: Triggers based on user authentication events.
- **WordPress Generate Password Reset Link**: Generates a password reset link for a user.
- **WordPress Get Role List**: Retrieves the list of user roles in WordPress.
- **WordPress Get User ID and Site**: Gets the user ID and associated site information.
- **WordPress User ID to Guid**: Converts a WordPress user ID to a GUID.
- **WordPress User ID to User**: Retrieves user details from a user ID.

Actions:

- **Perform an Unbound Action**
This executes a custom API or action that is not tied to a specific record. It operates at the entity level (e.g., performing a global operation like recalculating something across all records in a table, or calling a custom unbound API like generating a site-wide report). It doesn't require a record ID as input, making it useful for bulk or system-wide tasks in CRM.

- **Perform a Bound Action**
This executes a custom API or action that is bound to a specific record. It requires a record ID (GUID) as input and performs operations on that individual record (e.g., updating or processing a single contact or opportunity). This is ideal for record-specific workflows, such as triggering an approval process or sending a personalized email based on a WordPress user event.

## Power Automate Scenarios

### Scenario 1: User Registration and Contact Creation

Use the trigger "When a row is added, modified or deleted" in Power Automate.

- **Trigger**: When a row is added, modified or deleted (in the WordPress User table).
- **Action**: Create a contact and link the user to this contact.
Posible steps:
- Use `WordPress User ID to Guid` (unbound action) to convert the user ID to a CRM GUID.
- Use `Add a new row` to create a contact record in CRM, linking it to the user. Select the table, map the required fields (e.g., name, email from WordPress), and it will insert the record automatically. This is essential for scenarios like syncing new WordPress users to CRM contacts.

This automates the process of syncing WordPress user registrations with CRM contacts.

### Scenario 2: User Sign In/Out Events

Use the action performed trigger for the WordPress User table.

- **Trigger**: When an action is performed (Table name: `WordPress User`, Action name: `When WordPress User Signs In or Out`).
- **Actions**:
  - Generate password reset link.
  - Send an email from the CRM.
  - Convert user ID to GUID (quick action that doesn't require WordPress communication).
  - Update records connected to sign in/out events.

This allows for real-time responses to user authentication events in WordPress.

## Usage Tips

- Use GUID conversions for quick lookups without additional API calls to WordPress.
- Combine triggers with CRM actions to automate workflows based on WordPress events.
- Ensure proper authentication and permissions are set in both WordPress and Power Automate.