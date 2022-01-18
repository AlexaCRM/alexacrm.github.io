---
title: Multilingual
---

The page describes the possibilities of multilingual support

## WPML support {% include icds_premium.html %}

Integration-cds plugin supports wpml string translations. 

To add a string to wpml you need to use `translate` twig filter.

Example: `'Your string'|translate`

After that, you should load the page with this string once. The string will be added on the wpml string translation page.

All lines with `translate` filter will be added with the `twig-translates` domain. So you can easily find those strings.
