---
title: Security Role Privileges
sidebar_position: 2
slug: /knowledge-base/roles
tags:
    - API
    - DataPress
keywords: [DataPress API]  
description: Guide to extend WordPress App User role with Create, Update, and Delete permissions for specific tables in Dataverse.
---
# Extending Security Role Privileges

## Overview

The baseline **WordPress App User** role provides **read-only access** to retrieve and display records on WordPress pages. To enable WordPress to **create, update, or delete records**, you must extend the security role with additional privileges.

This guide provides step-by-step instructions and practical examples for configuring custom security roles in Power Platform.

:::note
**Baseline Role Reminder:**  
The default WordPress App User role is designed for **read-only operations**. Extending privileges should follow the **least-privilege access model** — grant only the permissions actually required for your use case.
:::

---

## When to Extend Privileges

| Feature | Required Privilege | Baseline Role | Extended Role |
|---------|---|---|---|
| **Display Records** | Read | ✅ Included | - |
| **Retrieve via API** | Read | ✅ Included | - |
| **Populate Dropdowns** | Read | ✅ Included | - |
| **Create Records (Forms)** | Create | ❌ Not included | ✅ Required |
| **Update Records (Forms)** | Write (Update) | ❌ Not included | ✅ Required |
| **Delete Records** | Delete | ❌ Not included | ✅ Required |
| **Bulk Operations** | Bulk Delete/Update | ❌ Not included | ✅ Required |

---

## Step 1: Access Security Roles

### Via Power Platform Admin Center (Recommended)

1. Navigate to: https://admin.powerplatform.microsoft.com
2. Log in with Administrator credentials
3. Select your Environment from the left menu
4. Click "Settings" (gear icon at the top)
5. Navigate to: Security → Users OR: Users + permissions → Security roles

### Via Make.powerapps.com

1. Navigate to: https://make.powerapps.com
2. Select your Environment
3. Click "Settings" (gear icon)
4. Navigate to: Users + permissions → Security roles

---

## Step 2: Create or Clone a Security Role

### Option A: Clone Existing Role (Recommended)

**Advantages:**
- ✅ Preserves all baseline read permissions
- ✅ Faster than creating from scratch
- ✅ Minimizes risk of missing critical permissions

**Steps:**

1. In Security roles list, find "WordPress App User" or "Basic User"
2. Click the role name to open it
3. Click the "Clone" button (top toolbar)
4. Provide a meaningful name: Example: "WordPress App User - Contact Form Creator"
5. Optionally, add a description: Example: "Extended role for creating and updating contacts via WordPress forms"
6. Click "Create"
7. The role editor will open automatically

### Option B: Create Custom Role from Scratch

1. Click "+ New" button in the Security roles list
2. Enter role name: Example: "Custom WordPress Editor"
3. Add description (optional): Example: "Custom role for specific WordPress integration scenarios"
4. Click "Create"
5. The role editor will open
6. Begin configuring privileges (see Step 3)

## Step 3: Edit Table Privileges

When the role editor opens, you'll see multiple tabs organizing table access:

**Security Role Editor Tabs:**

1. **Core Records** - Standard tables (Contact, Account, Case, Opportunity, etc.)
2. **Custom Entities** - Legacy custom tables created before model-driven apps
3. **Custom Tables** - Modern custom tables created with Dataverse
4. **Business Apps** - Power Apps and Power Automate access permissions

Each tab contains different groups of tables that you can configure privileges for.

### Locating Your Table

**Example: Contact (Standard Table)**

Navigation: Core Records tab → Find "Contact"

**Example: Custom Case Table**

Navigation: Custom Tables tab → Find "Case" or your custom table name

**Example: Opportunity (Standard Table)**

Navigation: Core Records tab → Find "Opportunity"

---

## Step 4: Understanding Privilege Levels

Each table privilege can be set to one of five levels:

### The Five Privilege Types

| Privilege | Purpose | Example |
|---|---|---|
| **Create** | Add new records | Form can create new contacts |
| **Read** | View/retrieve records | Display contact info on page |
| **Write** | Update existing records | Edit contact details via form |
| **Delete** | Remove records | Delete via bulk action |
| **Append** | Link/relate records | Connect contact to account |

### The Four Access Levels

**⭕ None (No Access)**

- User has NO access to this operation
- Use for: Sensitive operations you want to restrict
- Example: Delete privilege for public portal users

**🔵 User Level (Own records only)**

- User can perform operation only on records they own/created
- Use for: Personal records, user-specific data
- Example: Sales reps updating only their own opportunities

**🟢 Business Unit Level (Department-wide)**

- User can perform operation on records within their business unit
- Use for: Department-level access, team collaboration
- Example: Support team managing all cases in their unit

**🟡 Parent: Child Business Unit (Hierarchy access)**

- Access includes parent and child business units
- Use for: Multi-level organizational hierarchies
- Example: Regional manager accessing all branch offices

**🔴 Organization Level (All records)**

- User can perform operation on ANY record in organization
- Use for: Service accounts, integration users
- Example: WordPress app accessing all contacts

### Privilege Access Matrix

| Access Level | Can Access | Best For |
|---|---|---|
| ⭕ None | Nothing | Restricted operations |
| 🔵 User Level | Own records | Personal data |
| 🟢 Business Unit | Team data | Department-level access |
| 🟡 Parent/Child | Hierarchies | Multi-branch organizations |
| 🔴 Organization | All records | Integration accounts |

---

## Step 5: Configure Privileges for Common Scenarios

### Scenario 1: Contact Forms (Create Only)

**Use Case:** WordPress contact form creates new contacts in Dataverse, but doesn't update existing ones.

**Configuration:**

| Setting | Value | Reason |
|---------|-------|--------|
| Create | 🔴 Organization | Form can create contacts in any department |
| Read | 🔴 Organization | Needed to pre-fill dropdown fields |
| Write | ⭕ None | Forms should NOT update existing contacts |
| Delete | ⭕ None | Never delete via forms |
| Append | ⭕ None | Not needed for this scenario |

---

### Scenario 2: Service Portal (Read Only)

**Use Case:** Public-facing portal displays account and contact information, no modifications allowed.

**Configuration - Table: Account**

| Setting | Value |
|---------|-------|
| Create | ⭕ None |
| Read | 🔴 Organization |
| Write | ⭕ None |
| Delete | ⭕ None |
| Append | ⭕ None |

**Configuration - Table: Contact**

| Setting | Value |
|---------|-------|
| Create | ⭕ None |
| Read | 🔴 Organization |
| Write | ⭕ None |
| Delete | ⭕ None |
| Append | ⭕ None |

**When to Use:**

- Customer self-service portals
- View-only information pages
- Knowledge base access

---

### Scenario 3: Case Management (Full CRUD)

**Use Case:** WordPress portal allows users to create, view, update, and manage support cases.

**Configuration:**

| Setting | Value | Reason |
|---------|-------|--------|
| Create | 🔴 Organization | Users can create new support cases |
| Read | 🔴 Organization | Users can view all cases |
| Write | 🔴 Organization | Users can update case details, status, etc. |
| Delete | ⭕ None | Deletion through Power Automate only (safer) |
| Append | 🔴 Organization | Users can link cases to related records |

**Why Delete is Restricted:**

- Prevents accidental permanent data loss
- Maintains audit trail
- Deletion handled through controlled Power Automate flows

---

### Scenario 4: Opportunity Management (User-Owned)

**Use Case:** Sales team manages only their own opportunities; users cannot see colleagues' opportunities.

**Configuration:**

| Setting | Value | Reason |
|---------|-------|--------|
| Create | 🔵 User | Each user can only create their own opportunities |
| Read | 🔵 User | Users see only opportunities they created |
| Write | 🔵 User | Users can only update their own opportunities |
| Delete | ⭕ None | Prevent accidental deletion |
| Append | 🔵 User | Link only to their own records |

**When to Use:**

- Competitive sales environments
- Personal sales pipeline management
- Preventing unauthorized access to colleagues' deals

---

### Scenario 5: Custom Table (Full Access)

**Use Case:** WordPress integrates with custom Dataverse table; all CRUD operations needed.

**Configuration:**

| Setting | Value |
|---------|-------|
| Create | 🔴 Organization |
| Read | 🔴 Organization |
| Write | 🔴 Organization |
| Delete | 🔴 Organization |
| Append | 🔴 Organization |

**Note:** Custom tables appear in the **Custom Tables** tab, not Core Records.

---

## Step 6: Save the Security Role

1. Review all configured privileges
2. Click "Save and Close" button (usually at top-right)
3. Wait for confirmation message
4. You should return to the Security roles list

---

## Step 7: Assign the Role to Application User

After extending privileges, assign the new role to your WordPress app user:

### Steps to Assign Role:

1. Go to Power Platform Admin Center → Environments → Settings
2. Navigate to: Security → Users
3. Find your WordPress application user (Usually named "WordPress App User" or similar)
4. Click on the user to open details
5. Click "Manage roles" button
6. Check the checkbox for your new extended role (Example: "WordPress App User - Contact Form Creator")
7. Click "Save"

### Verifying Role Assignment:

- ✓ Confirm the role appears in the user's Assigned roles section
- ✓ If multiple roles assigned, check all are appropriate
- ✓ Wait a few minutes for changes to propagate

---

## Step 8: Configure Field Security Profile

Even with expanded table privileges, you must assign the user to a **Field Security Profile** to enable API access and field-level security.

### Purpose of Field Security Profile

- ✅ Grants field-level access without System Administrator role
- ✅ Restricts sensitive fields (salary, credit card, internal notes)
- ✅ Ensures compliance with data security policies
- ✅ Required for successful API calls from WordPress

### Steps:

1. Navigate to: Power Platform Admin Center → Environments → Settings
2. Go to: Security (Preview) → Column security profiles
3. Find or create a profile (Example: "WordPress App User - Data Access")
4. Click on the profile
5. Add Users/Teams section:
   - Click "Add" or "+ Add Users"
   - Select your WordPress app user
   - Click "Save"
6. Configure Field Permissions:
   - Select tables and fields
   - Assign Read ✓, Create ✓, Update ✓ as needed
   - Keep sensitive fields restricted

### Example Field Security Setup:

**Profile: "WordPress App User - Data Access"**

**Users:** WordPress App User

**Table: Contact**

- Field: FirstName → Read ✓ Create ✓ Update ✓
- Field: Email → Read ✓ Create ✓ Update ✓
- Field: Phone → Read ✓ Create ✓ Update ✓
- Field: SalaryField → Read ✗ Create ✗ Update ✗ (Restricted)
- Field: InternalNotes → Read ✗ Create ✗ Update ✗ (Restricted)

**Table: Account**

- Field: AccountNumber → Read ✓ Create ✓ Update ✓
- Field: Revenue → Read ✓ Create ✗ Update ✗ (Read-only)
- Field: Classification → Read ✓ Create ✓ Update ✓

**Table: Case**

- Field: Title → Read ✓ Create ✓ Update ✓
- Field: Description → Read ✓ Create ✓ Update ✓
- Field: SLA → Read ✓ Create ✗ Update ✗ (Admin only)

**See:** [Configure Field Security Profiles](https://learn.microsoft.com/power-platform/admin/field-level-security)

---

### Debugging Failed Operations

**If you encounter "Access Denied" errors:**

1. Verify the security role is assigned to the app user:
   - Power Platform Admin Center → Security → Users → [App User]
   - Check "Assigned roles" section

2. Verify privileges are set correctly:
   - Go back to the Security role
   - Check specific table privilege levels
   - Confirm save was successful

3. Verify Field Security Profile is assigned:
   - Column security profiles → Check app user is in the list
   - Verify field permissions allow the operation

4. Check application logs:
   - WordPress: wp-content/debug.log (if enabled)
   - Power Automate: flow runs
   - Dataverse: Application Insights or audit logs

5. Clear cache and wait for propagation:
   - Give Azure 5-10 minutes to propagate changes
   - Clear WordPress cache
   - Test again

---


## Common Privilege Combinations (Quick Reference)

### For Public Portal (Read-Only)

All public tables:

| Setting | Value |
|---------|-------|
| Create | ⭕ None |
| Read | 🔴 Organization |
| Write | ⭕ None |
| Delete | ⭕ None |
| Append | ⭕ None |

### For Contact Form (Create Only)

Contact table:

| Setting | Value |
|---------|-------|
| Create | 🔴 Organization |
| Read | 🔴 Organization |
| Write | ⭕ None |
| Delete | ⭕ None |
| Append | ⭕ None |

### For Full CRUD Service Portal

Case table:

| Setting | Value |
|---------|-------|
| Create | 🔴 Organization |
| Read | 🔴 Organization |
| Write | 🔴 Organization |
| Delete | 🔴 Organization or ⭕ None |
| Append | 🔴 Organization |

### For Personal Records Only

Opportunity table:

| Setting | Value |
|---------|-------|
| Create | 🔵 User |
| Read | 🔵 User |
| Write | 🔵 User |
| Delete | 🔵 User or ⭕ None |
| Append | 🔵 User |

---

## Security Best Practices

### Principle of Least Privilege

**✅ DO:**

- Start with read-only access
- Add specific permissions only as needed
- Restrict sensitive operations (Delete)
- Review permissions quarterly
- Document all privilege changes

**❌ DON'T:**

- Assign Organization-level Delete to all roles
- Use overly broad permissions to "fix" access issues
- Grant System Administrator role for simple read access
- Forget to review assigned roles regularly
- Skip Field Security Profile configuration

### Protecting Sensitive Fields

**Always restrict with Field Security Profile:**

- Financial data (Salary, Revenue, Costs)
- Personal information (SSN, Credit card, Passport)
- Medical/Health records
- Internal notes and assessments
- Performance reviews
- Confidential communications
- System configuration fields

### Audit and Compliance

**Enable audit trails:**

- Track who created records
- Monitor unauthorized access attempts
- Review field-level changes
- Archive historical access logs
- Schedule quarterly role reviews

---

## Related Documentation

-  [Baseline Security Role for WordPress Connection](/security/baseline-role)
-  [Field Security Profiles (Column-Level Security)](https://learn.microsoft.com/power-platform/admin/field-level-security)
-  [Create or Edit a Security Role](https://learn.microsoft.com/power-platform/admin/create-edit-security-role)
-  [Security Roles and Privileges](https://learn.microsoft.com/power-platform/admin/security-roles-privileges)
-  [Assign Security Roles to Users and Teams](https://learn.microsoft.com/power-platform/admin/assign-security-roles)
-  [Application Users](https://learn.microsoft.com/power-platform/admin/manage-application-users)

---

## Microsoft Official Resources

- [Create or Edit a Security Role](https://learn.microsoft.com/power-platform/admin/create-edit-security-role)
- [Security Roles and Privileges](https://learn.microsoft.com/power-platform/admin/security-roles-privileges)
- [Field-Level Security](https://learn.microsoft.com/power-platform/admin/field-level-security)
- [Manage Application Users](https://learn.microsoft.com/power-platform/admin/manage-application-users)
- [Assign Roles to Users and Teams](https://learn.microsoft.com/power-platform/admin/assign-security-roles)