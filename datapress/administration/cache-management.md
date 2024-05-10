---
title: Cache Management
sidebar_position: 1
slug: /administration/cache
tags:
    - Cache
    - Datapress
---

<p class="lead">This page describes how to manage caching, including force disabling caching, configuring cache storage, and clearing the cache.</p>

### Manage state of caching
By default, our plugin caches almost all data received from crm, but you can turn it off.

To do this, you need to navigate to plugin's admin area and go to the `Status` tab.

There at the bottom of the `Status` panel, click on `Advanced settings`

Look for the `ICDS_DISABLE_CACHE` option and enable it to disable caching.

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

By enabling this option, your site may slow down. Therefore, use it only for debugging purposes.

### Manage cache storage
You can force Dataverse Integration to use specified storage by changing `ICDS_CACHE_STORAGE` option in `Advanced settings`.

For optimal performance of the cache clearing function, it is crucial to configure the settings in the Dataverse Admin Area under the Status menu. Follow these steps to ensure stable operation:
1. Access the Advanced settings in the Dataverse Admin Area.
2. Double-check that the value of the ICDS_CACHE_STORAGE option is set to `Files`.
By paying attention to these settings, you can guarantee the smooth functioning of the cache clearing feature.

To set cache settings, navigate to the `Cache` section in the Dataverse Admin Area. Here, you have the option to clear all cache or clear cache by type.

Additionally, there are `Entity Cache Settings` where you can create cache settings for specific tables. Simply choose a table and set the cache duration using the [ISO 8601 Cache duration](https://en.wikipedia.org/wiki/ISO_8601#Durations), such as PT36H (`P<date>T<time>`).

You can also set cache settings for a form or view at the moment of page creation by including the cache parameter:

```twig
{% form id=42 cache='P1DT10H' %}
```
   
To set a cache duration of 1 day and 12 hours for a view:

```twig
{% view entity="contact" name="Active Contacts" cache="P1DT12H" %}{% endview %}
```

To configure cache settings for fetchXML, refer to the following example:

```twig
{% fetchxml collection="customers" cache="PT30M" %}
<fetch mapping='logical' returntotalrecordcount='true'>  
   <entity name='account'>
      <attribute name='accountid'/>
      <attribute name='name'/>
   </entity>
</fetch>
{% endfetchxml %}
```

### Clearing the cache

You can clear the cache by going to the `Cache` tab in the plugin's admin area

There you can clear all cache or select specific cache pools to clear.

Also you can clear cache through API request.

Form examples:

```html
wp-json/integration-cds/v1/cache/forms
wp-json/integration-cds/v1/cache/forms/{formId}
wp-json/integration-cds/v1/cache/forms/{formGuid}
```

```html
wp-json/integration-cds/v1/cache/forms/2
wp-json/integration-cds/v1/cache/forms/7a3eabfa-94ea-eb11-bacb-000d3acc54f0
```

To clear cache for views:

```html
wp-json/integration-cds/v1/cache/views
wp-json/integration-cds/v1/cache/views/{tableName}/{viewTitle}
wp-json/integration-cds/v1/cache/views/{viewGuid}
```

```html
wp-json/integration-cds/v1/cache/views/account/All Accounts
wp-json/integration-cds/v1/cache/views/6a1eabfa-94ea-eb11-bacb-000d3acc54f0
```

To clear cache for FetchXML you have several options:

```html
wp-json/integration-cds/v1/cache/fetchxml
wp-json/integration-cds/v1/cache/fetchxml/{tableName}
wp-json/integration-cds/v1/cache/fetchxml/contact
```

To clear cache for all tables:

```html
wp-json/integration-cds/v1/cache/entity
```

To clear cache for a specific table:

```html
wp-json/integration-cds/v1/cache/entity/{tableName}
wp-json/integration-cds/v1/cache/entity/contact
```
