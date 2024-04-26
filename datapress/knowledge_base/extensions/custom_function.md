---
title: Add custom functions and variables to Twig
permalink: /datapress/extensions/custom_function
sidebar_position: 17
tags:
    - Knowledge base
    - Twig
    - Datapress
---

To add a custom function use following filter:

```
add_filter( 'integration-cds/twig/functions', function( $functions ) {
    $functions['translate'] = new \Twig\TwigFunction(
        'translate',
        function ( $text ) {
            return __( $text );
        }
    );

    return $functions;
}, 10, 1 );
```

Usage:

```
{{ translate('Hello') }}
```

To add a custom variable use following action:

```
add_action( 'integration-cds/twig/after-globals', function ( $twigEnvironment ) {
    $twigEnvironment->addGlobal( 'today', date( 'm/d/Y' ) );
} );
```

Usage:

```
{{ today }}
```