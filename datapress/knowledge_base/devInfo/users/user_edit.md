---
title: Editing user profile
sidebar_position: 27
slug: /knowledge-base/user-editing
tags:
    - Knowledge base
    - DataPress
    - Binding
    - User
---

If a page is bound to a contact table then passing contact identifier in the query string will set the `binding` object and allow record editing using, for example, a Gravity form that relies on the record binding.

Allowing user to edit their own Dataverse record is slightly different. We already know the contact id and shouldn’t pass it via the query string.

This can be used, for example, to build a page that uses Gravity Form for user profile editing.

```php
// Let's assume that profile page ID is 42 
add_filter( 'integration-cds/binding/bound-record', function( $record, $post ) {     
    if ( $post->ID !== 42 ) {
      return $record;     
    }

    return \AlexaCRM\Nextgen\UserService\UserService::instance()->getBoundRecord();
}, 10, 2 );
```
