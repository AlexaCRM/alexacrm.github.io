---
title: For developers
---

The page describes aspects of the plugin that are useful for developers.


## Plugin constants

- #### `WPCRM_CACHE_METHOD`
  default: 'auto'
  <br/>
  Allow changing the caching method (off/wpcache/files/auto)
- #### `WPCRM_KEY`
  default: '' (empty)
  <br/>
  String to encrypt connection passwords
- #### `WPCRM_REMOVE_DISCOVERY`
  default: false
  <br/>
  Whether to use discovery service upon connection
- #### `WPCRM_SDK_VERSION` 
  default: '' (empty)
  <br/>
  Specify client SDK version
- #### `WPCRM_FORCE_CRM_USER_ROLES`
  default: true 
  <br/>
  Whether to replace user roles with roles defined in CRM record for CRM-linked users
