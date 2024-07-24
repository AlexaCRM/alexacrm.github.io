---
title: Troubleshooting
sidebar_position: 3
slug: /administration/troubleshooting
tags:
    - Logs
    - Settings
    - DataPress
keywords: [DataPress troubleshooting]
---

<p class="lead">This page describes how to set up logs.</p>

### Setting up logs
Dataverse Integration stores in the logs some information about received and transmitted data, logical handlers, and so on. Thus, you can easily get data and analyze it.

#### Log Storage
By default, collected data is stored in log files. You can change it to use database as a storage by enabling the `ICDS_DB_LOGS` option in the `Advanced settings`.

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#000000',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<Highlight color="#FDDA0D">Warning</Highlight>

 By enabling this feature, the logs will fill up your database very quickly. Therefore, use it only for troubleshooting purposes. For example, when your hosting has some restrictions on writing files.
#### QM support
Dataverse Integration supports the QueryMonitor plugin. So you can control this feature by toggling the `ICDS_QM_LOGS` option in the `Advanced settings`.

When this feature is enabled, Dataverse Integration logs will be duplicated in QueryMonitor.
#### Reading logs
Some recent logs are displayed on the `Status` tab in the plugin's admin area. You can view them by clicking on the `Show recent logs` link.

For a more detailed analysis, you can download the logs by clicking `Download Logs`.

You can delete saved logs by clicking `Remove logs`.

### Advanced settings`
To configure advanced settings, navigate to the Dataverse Admin Area and open the `Settings` tab. At the bottom of the page, you will find `Advanced settings`.

Here are some key flags to take note of:
`ICDS_ADVANCED_USER_BINDING` - If set to true, the legacy advanced editor will be used to configure user binding. You can see changes in `Bindings` -> `User Binding`;
`ICDS_DISABLE_CACHE` - Use this flag to prevent the caching of any Dataverse-related data.;
`ICDS_AUTH_KEY`, `ICDS_FORM_AUTH_KEY` - Before connecting the plugin, make sure to set these keys. You can generate suitable keys using the online generator provided by WordPress at https://api.wordpress.org/secret-key/1.0/;
`ICDS_DISABLE_MONACO` - If set to true, the Monaco editor will not be used on admin pages for editing, resulting in the absence of syntax hints. Instead, the `Twig Plain` area will be used. Conversely, if false, enjoy the `Dataverse Twig` area with its hints. 
`ICDS_TWIG_DEBUG` - When this flag is set to true, the dump() function can be used to print information about Twig objects using PHP’s var_dump(). This feature aids in identifying errors in your Twig code, enabling quicker troubleshooting and resolution.