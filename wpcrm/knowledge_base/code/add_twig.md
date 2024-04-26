---
title: Add twig in header/footer
permalink: /wpcrm/code/add-twig-in-header
sidebar_position: 18
tags:
    - Knowledge base
    - Code
    - Twig
    - Dynamics 365 Integration
---

Inside the page content inserting twig content is as easy as

```
[msdyncrm_twig]
   You template
[/msdyncrm_twig]
```

But if we need to inject dynamic data outside of the page content we are out of luck because shortcodes do not work inside the widgets.

Instead, direct code can be used in header.php/footer.php to render dynamic content:

```
<?php
$sh = new \AlexaCRM\WordpressCRM\Shortcode\Twig();
try {
   echo $sh->shortcode( [], 'Hello {{user.fullname}}', 'msdyncrm_twig' );
} catch ( \Exception $e ) {
  echo $e->getMessage();
}
?>
```