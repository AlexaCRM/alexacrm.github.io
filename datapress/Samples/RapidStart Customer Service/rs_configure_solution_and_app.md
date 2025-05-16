---
title: Configure Solution and App  
sidebar_position: 3
slug: /rs_configure_solution_and_app
tags:
    - Rapid Start Customer Service
    - DataPress
    - Configure Solution and App
keywords: [Rapid Start Customer Service Configure Sulution]  
--- 

## Install Solution
Download the [Rapid Start Portal solution](https://github.com/georged/datapress/blob/main/templates/rapid-start/RapidStartPortal.zip) and install it to your Dynamics 365 environment.

<div class="text--center">
<img src="/images/rs_solution.jpg" alt="Solution" width="800" />
</div>

## Solution and App Configuration 
**Rapid Start Portal** is an unmanaged solution you can modify after importing.

### Environment Variable 
The **Environment URL and App ID** contains 2 keys - environment name and app id.
They are is used by 'WordPress User Manager' canvas app to open a WordPress User form. 

### Cloud Flow Update CaseNotes From Field

This flow automatically populates the From field in the Case Notes table based on the source of the note. If the note is created from within CRM, the field is filled with the ID of the user who owns the related case. If the note is submitted from the WordPress site, the contact ID of the client is used instead. This ensures that each note is accurately attributed to either the responsible user or the client's contact.

## Modifying the Look and Feel
The Rapid Start Customer Service portal includes a settings page that allows basic customization of the site’s color scheme. This feature enables you to tailor the look and feel of the portal to better align with your brand or visual preferences.

You can configure the following color options:

**Primary Color** – Used for primary interface elements such as menu highlights and confirmation buttons.

**Secondary Color** – Applied to secondary elements like cancellation buttons.

**Link Color** – Defines the color of hyperlinks throughout the site.

Each of these values can be set using either standard color names (e.g., blue, darkred) or HEX codes (e.g., #1A73E8). These settings provide a lightweight yet effective way to visually personalize the customer experience.

<div class="text--center">
<img src="/images/rs_settings.jpg" alt="Settings" width="800" />
</div>
