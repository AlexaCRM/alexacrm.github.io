---
title: Add current WordPress user to Twig
slug: /knowledge-base/add-wp-user-to-twig
sidebar_position: 29
tags:
    - Knowledge base
    - Twig
    - Dynamics 365 Integration
---

To add WordPress user as an object to Twig, use the following code:

```php
add_action( 'wordpresscrm_after_twig_ready', function( $twigEnv ) { 
   $twigEnv->addGlobal( 
      'wpuser', 
      get_user_by( 'id', get_current_user_id() ) 
   );
});
```

After that you should be able to use wpuser object

```
<p>Hello, <strong>{{wpuser.first_name}}</strong></p>
```