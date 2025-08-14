---
title: Enabling Detailed Error Display in Browser Console for Forms
sidebar_position: 5
slug: /knowledge-base/error-log-configuration
tags:
    - Knowledge base
    - Configuration
    - DataPress
---

When working with premium or custom forms in DataPress, rendering issues may occur due to misconfigurations or JavaScript errors. To assist with debugging, you can enable more detailed error output in your browser’s developer console.

1. **Enable WordPress Debug Mode**

To allow WordPress to surface more meaningful error messages during form rendering:
- Open your site’s wp-config.php file.
- Add or modify the following line:

```php
define('WP_DEBUG', true);
```

:::note
⚠️ This setting should only be used in development environments. Avoid enabling it on production sites unless necessary.
:::

2. **Enable Source Maps in Your Browser**
Source maps allow the browser to display original source code (e.g., unminified JavaScript) in the console, making it easier to trace errors.

**Firefox**

Go to Settings → Developer Tools → Advanced Settings

Enable **Show original sources** or **Enable Source Maps**

**Chrome**

Open DevTools (F12 or Ctrl+Shift+I)

Click the gear icon ⚙️ in the top-right corner

Under **Sources**, check **JavaScript source maps**

**Microsoft Edge**

Open DevTools

Click ⚙️ Settings → Preferences

Enable **Enable source maps** under Sources

**Safari**

Go to Safari → Preferences → Advanced

Enable **Show Develop menu in menu bar**

Then go to Develop → Show JavaScript Console

Source maps are enabled by default in Safari’s DevTools

3. **Inspect the Console Tab**

Once debugging is enabled:

- Open the Console tab in your browser’s DevTools
- Reload the page with the premium or custom form
- Look for errors related to:
Missing form fields
Invalid configuration
JavaScript exceptions
Network requests to /wp-json/integration-cds/...

These messages will help you pinpoint the root cause of rendering issues.

## ✅ Summary

| Step             | Purpose                                         |
|------------------|-------------------------------------------------|
| `WP_DEBUG = true`| Enables WordPress-level error reporting         |
| Source Maps      | Shows original JS sources for better debugging  |
| Console Tab      | Displays runtime errors and failed requests     |
