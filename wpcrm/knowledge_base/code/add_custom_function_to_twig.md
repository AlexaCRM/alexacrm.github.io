---
title: Add custom functions and variables to Twig
sidebar_position: 23
tags:
    - Knowledge base
    - Code
    - Dynamics 365 Integration
---

To add a custom Twig function use following action:

```
function translate_twig( $twigEnv ) {
  $translateFunction = new \Twig\TwigFunction(
    'translate', function( $text ) {
      return __($text);
  } );
 
  $twigEnv->addFunction( $translateFunction );
 
  return $twigEnv;
}
 
add_action('wordpresscrm_after_twig_ready', 'translate_twig', 10, 1);
```

Usage:

```
{{ translate('Hello') }}
```

To add a custom variable use following action:

```
add_action( 'wordpresscrm_after_twig_ready', 
   function ( $twigEnvironment ) {
      $twigEnvironment->addGlobal( 'today', date( 'm/d/Y' ) );
   } );
```

Usage:

```
{{ today }}
```