---
title: Form redirect is not working for twig forms
sidebar_position: 26
tags:
    - Knowledge base
    - Twig
    - Dynamics 365 Integration
---

After submitting a form, a site visitor can be redirected to any page using redirect attribute of the `{% form %}` tag

```
{% form ... redirect="https://wordpress.org" ... %}
```

In some instances this redirect may not work as expected. We are investigating the problem and will issue a fix once available. If you need a workaround ahead of the official fix:

1. Locate `core.php` file in the plugin directory
2. Add the following code at the line 287

```
wp_ob_end_flush_all();
```

3. The code for the function should now read:

```
 function wordpresscrm_javascript_redirect( $location = null ) {
     if ( !headers_sent() ) {
         wp_redirect( $location );
         exit();
     }
     wp_ob_end_flush_all(); 
 }     
```     