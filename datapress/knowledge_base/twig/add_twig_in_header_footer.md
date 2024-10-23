---
title: Add twig in header/footer
slug: /knowledge-base/add-twig-in-header-footer
sidebar_position: 20
tags:
    - Knowledge base
    - Code
    - Twig
    - Datapress
---

To inject dynamic data outside of the page content, you can use direct code in **header.php** or **footer.php** to render the dynamic content:

```php

<?php echo \AlexaCRM\Nextgen\TwigProvider::instance()->renderString('Hello, {{ user.record["fullname"] }}'); ?>

```