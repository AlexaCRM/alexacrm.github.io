---
title: Editing user profile
slug: /knowledge-base/edit-user-profile
sidebar_position: 19
tags:
    - Knowledge base
    - Code
    - User
    - Dynamics 365 Integration
---

If a page is bound to a contact table then passing contact identifier in the query string will set the currentrecord object and allow record editing using, for example a Gravity form that relies on the record binding.

Allowing user to edit their own Dynamics 365/Dataverse record is slightly different. Firstly, we already know the contact id and shouldn’t need to pass it via the query string. Secondly, user record is cached so we need somehow to refresh the cache after editing is complete.

**Binding page to the current user**

This can be used, for example, to build a page that uses Gravity Form for user profile editing.

```
add_filter( 'wordpresscrm_data_binding_entity', 
  function( $record, $post ) {​     
    if ( $post->ID !== 16814 ) {​ // page id of the profile page
      return $record;     
    }

    return \AlexaCRM\WordpressCRM\Identity::auto()->getEntity();
}​, 10, 2 );
```

**Cache refresh**

The challenge is that the user record updated via the form does not refresh the cached information. The solution is to drop the current user cache as the record is updated. The approach is slightly different depending on what’s used to edit the record.

**Gravity Form**

```
add_action( 'gform_pre_handle_confirmation', 
  function( $lead, $form ) {​​​​​​​
    if ( (int)$form['id'] !== 42 ) { // Gravity Form id
      return;
    }
​​​​    
    ACRM()->getCache()->delete( 'wpcrm_user_mapping_' . get_current_user_id() ); 
}​​​​​​​, 10, 2 );
```

**Twig**

If `{​​​​​​​​​​% form %}`​​​​​​​​​​ is used then

```
add_action( 'wordpresscrm_twig_form_submit_success', 
  function() {
​​​​​​​​    if ( get_the_ID() !== 42 ) {​​​​​​​​​​ // WordPress post ID.         return;     
    }

​​​​​​​​    ACRM()->getCache()->delete( 'wpcrm_user_mapping_' . get_current_user_id() );
}​​​​​​​​​​ );
```