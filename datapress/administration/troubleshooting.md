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

<p class="lead">This page describes how to set up logs.</p>

### Setting up logs
DataPress (Dataverse Integration) stores in the logs some information about received and transmitted data, logical handlers, and so on. Thus, you can easily get data and analyze it.

#### Log Storage
By default, collected data is stored in log files. You can change it to use database as a storage by enabling the `ICDS_DB_LOGS` option in the `Advanced settings`.

:::warning

 By enabling this feature, the logs will fill up your database very quickly. Therefore, use it only for troubleshooting purposes. For example, when your hosting has some restrictions on writing files.

:::

#### QM support
DataPress (Dataverse Integration) supports the QueryMonitor plugin. So you can control this feature by toggling the `ICDS_QM_LOGS` option in the `Advanced settings`.

When this feature is enabled, DataPress (Dataverse Integration) logs will be duplicated in QueryMonitor.
#### Reading logs
Some recent logs are displayed on the `Status` tab in the plugin's admin area. You can view them by clicking on the `Show recent logs` link.

For a more detailed analysis, you can download the logs by clicking `Download Logs`.

You can delete saved logs by clicking `Remove logs`.

### Advanced settings
To configure advanced settings, navigate to the Dataverse Admin Area and open the `Settings` tab. At the bottom of the page, you will find `Advanced settings`.

Here are some of the key flags:

- `ICDS_ADVANCED_USER_BINDING` - If set to true, the legacy advanced editor will be used to configure user binding. You can see changes in `Bindings` -> `User Binding`;

- `ICDS_AUTH_KEY`, `ICDS_FORM_AUTH_KEY` - Before connecting the plugin, make sure to set these keys. You can generate suitable keys using the online generator provided by WordPress at https://api.wordpress.org/secret-key/1.0/;

- `ICDS_DISABLE_MONACO` - When editing page content, `Dataverse Twig` block uses the Monaco editor that provides syntax highlighting and intellisense. If `ICDS_DISABLE_MONACO` flag is set to true, the Monaco editor will be disabled and the plain text editor will be used instead. 

- `ICDS_TWIG_DEBUG` - When this flag is not set, Twig compile and runtime errors generate a short error message with the details available in the logs. When this flag is set, detailed error information is generated in the output. In addition, the `dump()` Twig function can be used to display object content, for example `{{ dump(contact) }}`. 

- `ICDS_TWIG_USE_PRIVILEGES`- Use this flag to prevent editors and contributors from editing pages that access Dataverse data using twig code including but not limited to `view` and `fetchxml` tags. Existing page view permissions are preserved.

- `ICDS_TWIG_SUPPRESS_ERRORS` - If this flag is set to true, twig templates failing to compile or generating runtime errors will produce empty output.

- `ICDS_DISABLE_FETCHXML_LINKED_TABLES_EXPANSION` - If the  flag is set to true, it is disable access to linked columns is via dotted notation, e.g. `contact.account.name`.

- `ICDS_DATETIME_VALUE` - Options to choose: **Legacy**, **UTC**, **Local**. Change behavior of User Local fields.

**Examples**:
 
|                 | Legacy     |  UTC              | Local  |
|-----------------|--------------|----------------|-----------|
| twig            | UTC | UTC | convert the date and time to the user's timezone |
|views            | UTC | UTC | convert the date and time to the user's timezone |
|custom forms |  UTC | UTC | convert the date and time to the user's timezone |
|premium forms | convert the date and time to the user's timezone | UTC | convert the date and time to the user's timezone |

[Usage Scenarios](/date-and-time/#usage-scenarios)

[More details for twig](/twig/examples/#using-twig-to-display-the-value-of-separate-columns)

[More details for view](/views)

[More details for custom forms](/forms/custom-forms-details/#datetime-fields-in-custom-forms)

[More details for Elementor](/addons/elementor/#how-to-create-a-field-for-a-date-time-column)

[More details for Gravity forms](/forms/gravity-forms/#date-and-time-columns)