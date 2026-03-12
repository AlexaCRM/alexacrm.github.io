---
title: User Administration
sidebar_position: 2
slug: /administration/disable-user
premium: true
tags:
    - User
    - DataPress
keywords: [DataPress user, WordPress user]    
description: Link your WordPress users to Dataverse records to provide customized experiences, seamless data synchronization, and advanced sign-in authorization.
---

<div
  role="note"
  aria-label="Product note"
  style={{
    borderLeft: '4px solid #2f81f7',
    background: '#f0f7ff',
    padding: '12px 16px',
    borderRadius: '6px',
    margin: '1em 0',
    color: '#0b2e59',
  }}
>
  <div style={{ color: '#0b63d1', fontWeight: 600, marginBottom: '6px' }}>Note</div>
  <p style={{ margin: '0 0 6px 0' }}>
    The plugin previously known as <em>Dataverse Integration</em> has been renamed to <strong>DataPress</strong>.
  </p>
  <p style={{ margin: '0 0 6px 0' }}>
    This change reflects our commitment to enhancing user experience and aligning with our product vision.
  </p>
  <p style={{ margin: 0 }}>
    All references to Dataverse Integration in the documentation and UI will be updated to DataPress.
  </p>
</div>

<p class="lead">Link your WordPress users to Dataverse records to provide customized experiences, seamless data synchronization, and advanced sign-in authorization.</p>

# User Administration & Automation

DataPress enables deep integration between WordPress identity management and Microsoft Dataverse using **Virtual Tables** and automated mapping.

## 1. Automation and Virtual Users

The **Users** entity in DataPress functions as a **virtual table** within Dataverse. This architecture allows you to manage WordPress users as native Dataverse records without duplicating the entire database schema.

### Contact Mapping
By associating a **WordPress User** with a **Dataverse Contact**, you can:
*   **Trigger Workflows:** Initiate Dataverse processes when a WordPress profile is updated.
*   **Permissions Management:** Control WordPress access levels based on real-time CRM data.
*   **Activity Tracking:** Monitor user interactions directly within Dynamics 365.

:::danger Mandatory: Site Registration
To utilize the **WordPress Users** table and Automation features, **Site Registration is mandatory**. 
Without a valid registration:
1. Mapping between WordPress Users and Dataverse Contacts will not function.
2. The virtual table will remain inaccessible for automated workflows.
:::

[Read more about automation](/datapress-solution/user-management-in-powerapps)
---

## 2. Managing User Access

You can control user access through the WordPress Admin Area, the Power Apps Maker Portal, or via manual binding.

### A. WordPress Admin Area

To disable a user directly in WordPress:
1. Navigate to **Users > All Users**.
2. Select the checkbox next to the target user.
3. Select **Disable** from the bulk actions dropdown and click **Apply**.

> Now this user can’t login in the WordPress Admin Area.
To enable this user you need to find this user again, tick this username, choose **Enable** action in the left upper corner dropdown and click **Apply**. And again this user can login and work in WordPress Admin Area.

### B. Manual Dataverse Binding
To manually link a user:
1. Go to **Users > All Users** in the WordPress Admin Area.
2. Hover over the username and click **Dataverse Binding**.
3. Choose **Manual** mode, select the required record from the **Contact** table, and click **Add & Apply**.

[Read more about user binding](/binding/user-binding/)

### C. Maker Portal (Dataverse)
If a user is bound to a Contact record, you can manage their status directly from the CRM:
1. Locate the **Contact** record bound to the WordPress user.
2. Navigate to the **WordPress** section (ensure *Username on Default Site* is populated).
3. Click **Deactivate** to block access, or **Activate** to restore it.
4. Alternatively, toggle the **Login Enabled** column: set to **Yes** for access or **No** to disable the account.

---

## 3. Developer Resources & Security

:::tip Documentation Links
*   [How to bind a user using WP API](/knowledge-base/bind-user-via-api)
*   [Users API Reference](/knowledge-base/manage-users)
*   [Accessing bound user contact details](/knowledge-base/bound-user-details/)
:::

:::info Security Configuration: ICDS_TWIG_USE_PRIVILEGES
Use the `ICDS_TWIG_USE_PRIVILEGES` flag to prevent Editors and Contributors from modifying pages that access Dataverse data via Twig (e.g., `view` or `fetchxml` tags). This ensures that data-sensitive layouts can only be modified by authorized administrators.
:::
