---
title: Installation
sidebar_position: 3
permalink: /wpcrm/installation/
tags:
    - Installation
    - Configuration
    - Dynamics 365 Integration
---

Using the WordPress Admin to install plugins is the most straightforward option, as it handles the file transfer without you needing to leave the Web browser.

Please refer to [Configuration](configuration.md) to configure the plugin successfully. 

## Install Dynamics CRM Integration (preferred)

1. **Log in** to your WordPress Admin panel.
1. In your Admin, go to menu **Plugins > Add New.**
1. **Type** *Dynamics CRM Integration* into the "Search Plugins" text input.
1. **Click** "Install Now".
1. After the plugin is installed, **click** "Activate" to activate the plugin.

A new settings section called "Dynamics CRM" will appear in the Admin panel.

## Install WordPress CRM

1. **Download** the plugin (.zip file) from [WordPress.org](https://wordpress.org/plugins/integration-dynamics/).
1. **Log in** to your WordPress Admin panel.
1. In your Admin, go to menu **Plugins > Add New.**
1. **Select** the tab "Upload plugin".
1. **Upload** the .zip file you just downloaded.
1. **Activate** the plugin.

A new settings section called "Dynamics CRM" will appear in the Admin panel.

## FTP Setup (the old way)

It is possible at this stage that you'll be taken to a page requesting FTP details of your web server. This happens if you've not installed a plugin on this particular installation of WordPress. If that's the case, fill in your details to complete installation.

1. Download the plugin (.zip file) from [WordPress.org](https://wordpress.org/plugins/integration-dynamics/).
1. Unzip the folder and Upload `integration-dynamics` folder to the `/wp-content/plugins/` directory.
1. Activate the plugin through the "Plugin" menu in WordPress.

A new settings section called "Dynamics CRM" will appear in the Admin panel.
