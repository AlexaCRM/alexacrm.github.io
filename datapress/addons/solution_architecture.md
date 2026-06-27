---
title: DataPress Solution Architecture
sidebar_position: 2
slug: /solution-architecture
tags:
  - Solution
  - Architecture
  - DataPress
keywords: [DataPress Solution, Solution Components, Architecture]
description: Understand the high-level components of the DataPress Solution and how they enable WordPress-Dataverse integration.
---

# DataPress Solution Architecture

## Overview

The DataPress Solution is a managed solution package that extends Microsoft Power Platform to enable deep integration between WordPress and Dataverse. It provides the essential backend components required for all premium functionality and advanced portal scenarios.

---

## High-Level Solution Components

The DataPress Solution consists of four key component categories that work together to enable seamless WordPress-Dataverse integration:

### 1. Tables for WordPress-Specific Functionality

The solution includes custom tables that store WordPress-related configuration and metadata in Dataverse:

- **WordPress Site Registration** — Stores information about connected WordPress sites, including site URLs, credentials, and connection status
- **WordPress User Mappings** — Maintains the relationship between WordPress users and Dataverse contacts for user binding scenarios
- **Site Configuration Data** — Persists settings and preferences specific to each WordPress site integration
- **Integration Audit Tables** — Tracks integration events for troubleshooting and compliance purposes

These tables ensure that all WordPress-related data and configuration remain organized and accessible within your Dataverse environment.

### 2. Plugins Providing Virtualization, Messaging, and Eventing Features

The solution includes specialized plugins that extend Dataverse capabilities:

- **Virtual Table Adapters** — Enable real-time access to WordPress data from within Dataverse without data duplication
- **Message Processing Plugins** — Handle asynchronous communication between WordPress and Dataverse, ensuring reliable data synchronization
- **Event Subscription Handlers** — Automatically respond to Dataverse events and trigger corresponding actions in WordPress (e.g., when a contact is created, updated, or deleted)
- **Custom Messaging Framework** — Manages bidirectional communication patterns for advanced integration scenarios

These plugins create a responsive ecosystem where changes in either system are automatically reflected in the other.

### 3. Helper Actions for Automation Tasks

The solution provides reusable automation actions that developers can leverage:

- **Data Synchronization Actions** — Automate record creation, updates, and deletions between systems
- **Validation and Enrichment Actions** — Automatically validate data quality and enrich records with additional information
- **Notification Actions** — Trigger WordPress notifications based on Dataverse events
- **Integration Helper Functions** — Provide common utility operations needed for WordPress-Dataverse scenarios
- **Error Handling and Logging Actions** — Capture and log integration errors for diagnostics and compliance

These actions can be used in Power Automate flows, custom plugins, or other automation scenarios to extend your integration capabilities.

### 4. Baseline Security Role for WordPress Connection

The solution includes a security role designed specifically for the WordPress application user:

- **Least-Privilege Access Model** — Grants only the minimum permissions necessary for WordPress to function
- **Table-Level Security** — Defines access rights to WordPress-specific tables and related business tables
- **Column-Level Security** — Restricts access to sensitive columns within tables
- **Entity Privileges** — Specifies which create, read, update, and delete operations are allowed
- **Role Assignment** — Automatically applied to the WordPress application user during solution installation

This security role ensures that the WordPress integration operates with appropriate access controls while maintaining the security and integrity of your Dataverse environment.

:::info 
Technical Details
The WordPress security role is composed of multiple role layers including base permissions and extension roles to provide comprehensive yet restrictive access. For advanced configuration, administrators can customize these roles in Power Platform admin center.
:::

---

## How These Components Work Together

The DataPress Solution creates an integrated ecosystem where all components work in harmony:

### Data Flow Architecture

**Layer 1: WordPress Site**
- Forms & Views
- Custom Templates (Twig)
- User Binding & Authentication

↓ Web API Calls (OAuth 2.0)

**Layer 2: Business Tables (Dataverse)**
- Contacts, Accounts, Leads, Orders
- Custom Tables & All Dataverse Data

↑ Read / Write / Delete Operations ↓

**Layer 3: Security & Access Control**
- WordPress Application User Security Role
- Table-Level Permissions
- Column-Level Security
- Least-Privilege Access Model

↑ Enforces Access ↓

**Layer 4: Integration Logic**
- Plugins & Event Handlers
- Event Subscriptions & Triggers
- Message Processing & Routing
- Virtual Table Adapters
- Bidirectional Messaging Framework

↑ Trigger & Route ↓

**Layer 5: Automation & Actions**
- Helper Actions & Workflows
- Data Synchronization
- Validation & Enrichment
- Notifications & Logging
- Error Handling & Recovery

↑ Execute ↓

**Layer 6: Configuration & Metadata**
- WordPress-Specific Tables
- Site Registration & Connection Status
- User Mappings (WP Users ↔ Contacts)
- Configuration & Settings
- Integration Audit & Activity Logs

### Data Flow Summary

| # | Component | Function |
|---|-----------|----------|
| 1 | WordPress Plugin | Initiates Web API calls |
| 2 | Business Tables | Store Dataverse records |
| 3 | Security Role | Controls access permissions |
| 4 | Plugins & Events | Processes triggers and routes messages |
| 5 | Helper Actions | Executes automation and transformations |
| 6 | Config Tables | Maintains integration metadata |

### Communication Patterns

### Communication Patterns

**Synchronous Pattern**

WordPress initiates a request → Web API call sent to Dataverse → 
Dataverse processes immediately → Response returned to WordPress → 
Data displayed or form submitted

**Asynchronous Pattern**

Dataverse event occurs (create/update/delete) → Event handler triggered → 
Plugin queues the action → Helper action executes in background → 
Notification sent to WordPress → User receives update

**Bidirectional Sync Pattern**

WordPress user makes changes
       ↓
Message Framework captures change
       ↓
Dataverse updated via Web API
       ↓
Event Handler detects change
       ↓
Audit logs recorded
       ↓
Notifications sent back to WordPress
       ↓
Both systems remain in sync

---
