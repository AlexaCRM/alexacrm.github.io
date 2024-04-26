---
title: Add current WordPress user to Twig
permalink: /datapress/twig/user-to-twig
sidebar_position: 19
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