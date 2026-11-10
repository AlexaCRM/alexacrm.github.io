---
title: Forms Overview
sidebar_position: 1
premium: true
slug: /forms/forms-general
tags:
  - Form
  - DataPress
---

## Form Submission Methods

DataPress provides **two form submission methods**, each optimized for different scenarios. Choose the one that best fits your business needs:

### Universal Capture

Universal Capture is the **most reliable** method for comprehensive data collection and automation:

- **Asynchronous processing** — submissions are processed in the background without blocking the user
- **Dedicated storage** — all records are sent to a separate dedicated table, ensuring data integrity
- **Multi-table data aggregation** — collects and aggregates data from different tables seamlessly
- **Best for**: Full automation scenarios and complex data workflows
- **Note**: Less suitable for direct record updates, as it routes data through an intermediary table

### Send To Dataverse

Send To Dataverse is a **synchronous** method optimized for direct table interactions:

- **Synchronous processing** — records are written directly and immediately to their respective tables
- **Direct table mapping** — data goes directly into the designated Dataverse tables
- **Best for**: Record editing, updates, and workflows where immediate data availability is critical
- **Advantage**: Simplified editing workflows with real-time data persistence

---