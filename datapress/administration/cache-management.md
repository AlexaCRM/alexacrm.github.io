---
title: Cache Management
sidebar_position: 1
slug: /administration/cache
tags:
    - Cache
    - DataPress
keywords: [DataPress cache]    
---
:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead">This page describes how to manage caching, including force disabling caching, configuring cache storage, and clearing the cache.</p>

### Manage state of caching
By default, our plugin caches almost all data received from crm, but you can turn it off.

To do this, you need to navigate to plugin's admin area and go to the `Status` tab.

There at the bottom of the `Status` panel, click on `Advanced settings`

Look for the `ICDS_DISABLE_CACHE` option and enable it to disable caching.

:::warning

By enabling this option, your site may slow down. Therefore, use it only for debugging purposes.

:::

### Manage cache storage
You can force DataPress (Dataverse Integration) to use specified storage by changing `ICDS_CACHE_STORAGE` option in `Advanced settings`.

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

:::tip
[Cache API documentation](/knowledge-base/clear-cache)
:::