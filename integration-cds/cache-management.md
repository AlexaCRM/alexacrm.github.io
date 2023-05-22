---
title: Cache Management
permalink: /integration-cds/cache-management/
---

<p class="lead">This page describes how to manage caching, including force disabling caching, configuring cache storage, and clearing the cache.</p>

### Manage state of caching
By default, our plugin caches almost all data received from crm, but you can turn it off.
<br>
To do this, you need to navigate to plugin's admin area and go to the `Status` tab.
<br>
There at the bottom of the `Status` panel, click on `Advanced settings`
<br>
Look for the `ICDS_DISABLE_CACHE` option and enable it to disable caching.
<br>
{% include icds_warning.html %} By enabling this option, your site may slow down. Therefore, use it only for debugging purposes.

### Manage cache storage
You can force Dataverse Integration to use specified storage by changing `ICDS_CACHE_STORAGE` option in `Advanced settings`

### Clearing the cache
You can clear the cache by going to the `Status` tab `Cache storage` header in the plugin's admin area
<br>
There you can clear all cache or select specific cache pools to clear
