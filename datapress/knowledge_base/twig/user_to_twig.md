---
title: Add current WordPress user to Twig
sidebar_position: 19
tags:
    - Knowledge base
    - Twig
    - Datapress
---

To add WordPress user as an object to Twig, use the following code:

```
add_action( 'integration-cds/twig/ready', function( $twigEnv ) { 
   $twigEnv->addGlobal( 
      'wpuser', 
      get_user_by( 'id', get_current_user_id() ) 
   );
});
```

After that you should be able to use wpuser object

```
<p>Hello, {{wpuser.first_name}}</p>
<p>Your roles: {{wpuser.roles | join (', ') }}</p>
```