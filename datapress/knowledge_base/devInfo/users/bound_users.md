---
title: How to display a list of bound users in WordPress
sidebar_position: 5
slug: /knowledge-base/bound-users
tags:
    - Knowledge base
    - DataPress
---

Here is a description of our metadata for a WordPress user record.

```php
<?php
global $wpdb;

// Query users with non-null icds_binding_ref metadata and additional fields
$query = "
    SELECT u.ID, u.user_login, 
           meta_binding.meta_value AS icds_binding_ref, 
           meta_lastlogin.meta_value AS icds_last_login,
           meta_disabled.meta_value AS icds_disabled,
           meta_timezone.meta_value AS icds_timezone,
           meta_locale.meta_value AS icds_locale
    FROM {$wpdb->users} u
    INNER JOIN {$wpdb->usermeta} meta_binding ON u.ID = meta_binding.user_id
    INNER JOIN {$wpdb->usermeta} meta_lastlogin ON u.ID = meta_lastlogin.user_id
    LEFT JOIN {$wpdb->usermeta} meta_disabled ON u.ID = meta_disabled.user_id AND meta_disabled.meta_key = 'icds_disabled'
    LEFT JOIN {$wpdb->usermeta} meta_timezone ON u.ID = meta_timezone.user_id AND meta_timezone.meta_key = 'icds_timezone'
    LEFT JOIN {$wpdb->usermeta} meta_locale ON u.ID = meta_locale.user_id AND meta_locale.meta_key = 'icds_locale'
    WHERE meta_binding.meta_key = 'icds_binding_ref'
    AND meta_binding.meta_value IS NOT NULL
    AND meta_lastlogin.meta_key = 'icds_last_login'
";

$results = $wpdb->get_results($query);

// Display the results
if (!empty($results)) {
    echo "<table border='1'>";
    echo "<tr><th>User ID</th><th>Username</th><th>ICDS Binding Reference (Name)</th><th>Last Login</th><th>Disabled</th><th>Timezone</th><th>Locale</th></tr>";
    foreach ($results as $user) {
        // Unserialize the icds_binding_ref to access the Name property
        $binding_ref = unserialize($user->icds_binding_ref);
        $name = $binding_ref->Name ?? 'N/A';  // Get the Name property, or 'N/A' if not set

        // Format last login date to a human-readable format
        $last_login = new DateTime($user->icds_last_login);
        $formatted_last_login = $last_login->format('F j, Y, g:i a'); // e.g., April 19, 2023, 12:24 pm

        // Convert icds_disabled to human-readable (Yes/No)
        $disabled = ($user->icds_disabled == '1') ? 'Yes' : 'No';

        // Display the results
        echo "<tr>";
        echo "<td>{$user->ID}</td>";
        echo "<td>{$user->user_login}</td>";
        echo "<td>{$name}</td>";
        echo "<td>{$formatted_last_login}</td>";
        echo "<td>{$disabled}</td>";
        echo "<td>{$user->icds_timezone}</td>";
        echo "<td>{$user->icds_locale}</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No users found with non-null icds_binding_ref metadata.</p>";
}
?>
```

In this example, you can see all currently available metadata.