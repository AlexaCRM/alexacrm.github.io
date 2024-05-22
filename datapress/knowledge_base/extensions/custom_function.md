---
title: Add custom functions and variables to Twig
sidebar_position: 17
slug: /knowledge-base/custom-function-to-twig
tags:
    - Knowledge base
    - Twig
    - DataPress
---

To add a custom function use following filter:

```php
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

```php
{{ translate('Hello') }}
```

To add a custom variable use following action:

```php
add_action( 'integration-cds/twig/after-globals', function ( $twigEnvironment ) {
    $twigEnvironment->addGlobal( 'today', date( 'm/d/Y' ) );
} );
```

Usage:

```php
{{ today }}
```