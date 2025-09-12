---
title: Check if WordPress user with given email exists
description: Add a custom Twig function to verify if user with given email already exists.
sidebar_position: 4
slug: /knowledge-base/wp-email-exists-twig
tags:
    - Knowledge base
    - Twig
    - DataPress
---

## Overview

When building custom forms or integrations in DataPress, you may need to quickly check whether a specific email address already belongs to a registered WordPress user. This is especially useful for conditional rendering, validation, or preventing duplicate registrations.

This guide shows how to expose a custom Twig function called `wp_email_exists` that performs this check using WordPress internals.

---

## Add the Function to Twig

Add the following PHP code to your theme’s `functions.php` file or a custom plugin:

```php
add_filter('integration-cds/twig/functions', function (array $fns) {
    $fns['wp_email_exists'] = new Twig\TwigFunction('wp_email_exists', function (string $email): bool {
        $email = sanitize_email($email);
        return is_email($email) && (bool) email_exists($email);
    });
    return $fns;
}, 10, 1);
```

This registers a new Twig function `wp_email_exists` that:

- Sanitizes the input email
- Validates its format
- Checks if the email exists in the WordPress user database

### Usage in Twig Template

Once registered, you can use the function directly in your form or template logic:

```twig
{% if wp_email_exists('test@example.com') %}
  <div class="alert">This user already exists!</div>
{% endif %}
```

This will conditionally render the alert only if the email is already associated with a WordPress user.

:::note

This is server-side functionality. It can only be used to validate data already submitted.

:::
