---
title: Add current WordPress user to Twig
sidebar_position: 19
slug: /knowledge-base/add-user-to-twig
tags:
    - Knowledge base
    - Twig
    - DataPress
---

To add WordPress user as an object to Twig, use the following code:

```php
add_action( 'integration-cds/twig/ready', function( $twigEnv ) { 
   $twigEnv->addGlobal( 
      'wpuser', 
      get_user_by( 'id', get_current_user_id() ) 
   );
});
```

After that you should be able to use wpuser object

```php
<p>Hello, {{wpuser.first_name}}</p>
<p>Your roles: {{wpuser.roles | join (', ') }}</p>
```
