---
title: Privacy Policy
slug: /legal/privacy
sidebar_position: 2
---

# Privacy Policy

We respect your privacy and are committed to protecting your personal information.

## 1. What We Collect

The **DataPress Integration** plugin does not store or replicate data on its own. It acts as a passthrough layer between **WordPress** and **Microsoft Dataverse**, retrieving and rendering data in real time.

However, depending on your configuration, the plugin may process:

- **Personally Identifiable Information (PII)** such as names, emails, and contact details
- **Protected Health Information (PHI)** if your Dataverse environment contains such data
- **Customer metadata** for rendering views, forms, and dynamic content

This data is not stored by the plugin itself but may be visible in logs or browser memory during runtime.

## 2. How It Works

Instead of maintaining its own data store, the integration acts as a **real-time bridge**:

- **From WordPress**: It accesses metadata, page content, user roles, or layout components that are defined in the WordPress environment.
- **From Dataverse**: It retrieves and renders structured business data stored in Microsoft Dataverse using features like `fetchxml`, views, or direct table queries.

DataPress Integration renders this information dynamically on page load, ensuring the freshest possible content while respecting user roles and access controls.

## 3. How We Use It

We do not collect or transmit any data to our servers. All data remains within your WordPress and Dataverse environments. Any customer information processed by the plugin is used solely for rendering content and executing configured logic.

## 4. Your Responsibility

As a site administrator, you are responsible for ensuring that your use of the plugin complies with applicable data protection laws, including GDPR, HIPAA, or other regional regulations.

## 5. Updates

We may update this Privacy Policy from time to time. Please review it periodically for changes.
