---
title: For developers
sidebar_position: 16
tags:
    - Dynamics 365 Integration
---

The page describes aspects of the plugin that are useful for developers.


## Constants

### Free

- #### `WPCRM_KEY`
  default: '' (empty)<br></br>
  Key to encrypt connection passwords. If not present AUTH_KEY is used instead.

- #### `WPCRM_CACHE_METHOD`
  default: 'auto'<br></br>
  Forces the specific caching method. Valid values are `off`, `wpcache`, `files`, `auto`.

- #### `WPCRM_REMOVE_DISCOVERY`
  default: false<br></br>
  If set to `true` discovery service is bypassed for on-premises instances. **Note:** online instances no longer use discovery services and this setting is ignored.

- #### `WPCRM_SDK_VERSION` 
  default: '' (empty)<br></br>
  Specifies client SDK version to pass in every SOAP call, e.g. `8.1`. Passing the version is required if new data types like _Choices_, _File_, or _Image_ are used (consult SDK documentation for the minimum version required for a specific data type).

### Premium

- #### `WPCRM_DISABLE_USER_CACHE`
  default: false <br></br>
  If set to `true` disables caching CRM record for the linked site user.

- #### `WPCRM_MANUAL_AUTH`
  default: false <br></br>
  If set to `true` disables WordPress managed login system.

- #### `WPCRM_FORCE_CRM_USER_ROLES`
  default: true<br></br>
  If set to `true` replaces WordPress user roles with the roles defined in **WP Identity Role** records when a user linked to CRM signs in. If set to `false` the WordPress user roles remain unchanged. This option is only valid for WordPress-managed users; for CRM-managed users the roles defined in CRM are always enforced.
