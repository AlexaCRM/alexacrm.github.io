---
title: WordPress Hooks
sidebar_position: 2
slug: /api-hooks
tags:
    - API
    - DataPress
keywords: [DataPress API]  
---

:::note
The plugin previously known as Dataverse Integration has been renamed to DataPress. This change reflects our commitment to enhancing user experience and aligning with our evolving product vision.
All references to Dataverse Integration in the documentation, user interface will be updated to DataPress.
:::

<p class="lead"><b>DataPress (Dataverse Integration)</b> provides a number of WordPress hooks that allow you to extend the plugin and augment its behaviour.</p>

## Actions

`integration-cds/forms/submit-error`

Fires if error occurs while submitting custom form.

`$this` (CustomFormModel) \
`$record` (Table) \
`$e` (\Exception)

---

`integration-cds/forms/submit-success`

Fires after custom form was successfully submitted.

`$this` (CustomFormModel) \
`$record` (Table)

---

`integration-cds/initialized`

Fires after DataPress (Dataverse Integration) has been initialized.

---

`integration-cds/settings/updated`

Fires after a Settings object has been persisted in the database.

`$settings` (Settings) \
`$hasChanged` (bool) - Whether the new settings differ from what's been stored in the database.

---

`integration-cds/twig/add-loaders`

Allows extending the list of available Twig template loaders.

`$chainLoader` (ChainLoader)

---

`integration-cds/twig/after-globals`

Triggered after default global variables are set up.

`$twigEnv` (Environment)

---

`integration-cds/twig/ready`

Fired when Twig environment has been set up in the shortcode.

Allows to further extend the Twig environment with new features.

`$twigEnv` (Environment)

---

`integration-cds/user-binding/set-reference`

Fires after updating user binding reference for the bound user.

`$userId` (int) \
`$us` (UserService)

---

## Filters

`integration-cds/addons`

Filters the collection of plugin add-ons.

`$addons` (Addon[])

---

`integration-cds/admin/gutenberg-notice`

Filters the list of notice which should be shown at Gutenberg editor page.

`$notices` (GutenbergBlockNotice[])

---

`integration-cds/admin/js-variables`

Filters the list Javascript variable to be registered in admin area.

`$globals` (array) - Associative array of variables.

---

`integration-cds/admin/scripts`

Filters the list of Javascript files to be registered in admin area.

`$scripts` (array) - Associative array of files.

---

`integration-cds/admin/settings`

Filters the list of available settings.

`$settingsMap` (\AlexaCRM\Nextgen\Settings[]) - Associative array of settings.

---

`integration-cds/admin/styles`

Filters the list of CSS files to be registered in admin area.

`$styles` (array) - Associative array of files.

---

`integration-cds/api/endpoints`

Filters the collection of available API endpoints.

`$endpoints` (array) - Collection of FQCNs implementing API endpoints.

---

`integration-cds/binding/authorize-binding`

Filters the authorization flag for table binding.

This filter allows establishing conditional access to certain table raws on a given WordPress page.

`$isAuthorized` (bool) - Whether requesting services may access the bound raw.\
`$postId` (int) \
`$binding` (TableBinding)

---

`integration-cds/binding/custom/target-${postId}`

Filters the bound raw for the post.

`$record` (Table|null) \
`$target` (string) - Target table logical name.

---

`integration-cds/binding/custom/targetref-${postId}`

Filters the bound raw reference for the post.

`$ref` (TableReference|null) \
`$target` (string) - Target table logical name.

---

`integration-cds/binding/custom/url-${postId}`

Filters the URL to the bound post.

`$url` (string|null) - URL to the bound post which allows to display a Dataverse row.\
`$post` (\WP_Post) - Bound WordPress post object.\
`$ref` (TableReference) - Table reference which is the target of the filtered URL.

---

`integration-cds/binding/methods`

Table binding methods.

Enumerates implementations of table binding.

`$methods` (array) - A map of table binding implementations.

---

`integration-cds/cache/pools`

Filters the registered cache pools.

`$pools` (string[])

---

`integration-cds/cache/warmup-entities`

Filters the list of tables which must be pre-cached.

`$entities` (array)

---

`integration-cds/forms/authorize-delete`

Filters the “Allow Deletion” flag for the form registration.

`$isAuthorized` (bool) - Whether to allow deletion.\
`$reg` (FormRegistration) - Form registration which initiated deletion.\
`$target` (TableReference|null) - Raw(record) that is being deleted.

---

`integration-cds/forms/error-message`

Filters error message for form submission.

`$message` (string) - Error message to display.\
`$e` (Exception) - Original exception object.\
`$registration` (FormRegistration) - Form registration being processed.\
`$formData` (array) - Form registration being processed.

---

`integration-cds/forms/fields`

Allows altering the list of accepted columns.

`$keys` (array) - List of form columns.

---

`integration-cds/forms/validate`

Filters the default form validation.

`$validationResult` (bool) \
`$data` (array) - map of columns received from the form.\
`$this` (CustomFormModel)

---

`integration-cds/forms/validate`

Filters the default form validation.

`$validationResult` (bool) \
`$data` (array) - map of columns received from the form.\
`$this` (CustomFormModel)

---

`integration-cds/js/api-defaults`

Filters the data required for api.js.

`$defaults` (array)

---

`integration-cds/logging/level`

Filters the effective logging verbosity.

`$logLevel` (int)

---

`integration-cds/proxy`

Allows modifying connection proxy settings.

`$proxyString` (string)

---

`integration-cds/public/scripts`

Filters the list of Javascript files to be registered in frontend pages.

`$scripts` (array) - Associative array of files.

---

`integration-cds/public/styles`

Filters the list of CSS files to be registered in frontend pages.

`$styles` (array) - Associative array of files.

---

`integration-cds/recaptcha/settings/adapters`

Filters the list of available adapters for reCAPTCHA settings.

`$adapters` (array) - Associative array of reCAPTCHA settings adapters classes.

---

`integration-cds/settings/map`

Filters the list of registered settings.

`$settingsMap` (SettingsType[])

---

`integration-cds/shortcode/implementations`

Filters the list of supported shortcodes and their respective implementations

Every item key is the non-prefixed name of the shortcode, the value designates
a fully qualified class name that implements AlexaCRM\Nextgen\ShortcodeInterface
and implements a public method Shortcode::shortcode()

`$shortcodes` (array) - List of supported shortcodes

---

`integration-cds/twig/filters`

Filters the collection of Twig filters for inclusion into Twig via extension.

`Maps` (TwigFilter[]) - filter names to TwigFilter objects.

---

`integration-cds/twig/functions`

Filters the collection of Twig functions for inclusion into Twig via extension.

`Maps` (TwigFunction[]) - function names to TwigFunction objects.

---

`integration-cds/twig/templates`

Filters the collection of Twig template paths.

`$templatePaths` (array)

---

`integration-cds/twig/token-parsers`

Filters the collection of token parser implementations.

`Array` (array) - of FQCNs.

---

`integration-cds/twig/token-parsers-ext`

Filters the collection of token parser implementations for inclusion into Twig via extension.

`Maps` (TokenParserInterface[]) - tags (opening tags) to TokenParserInterface-compatible objects.

---

`integration-cds/user-binding/authorize`

Allows modifying user authorization mode using user binding feature.

`$authMode` (int) - Selected authorization mode.\
`WP_User` (false|WP_User) - object if present, false otherwise.

---

`integration-cds/user-binding/bind-custom`

Allows using alternative means to bind users to Dataverse rows.

`$ref` (TableReference|null) \
`$userId` (int) \
`$userService` (UserService)

---

`integration-cds/user-binding/default-binding-mode`

Allows filtering the default mode during UserService::bind() if the user hasn't been bound before.

`$newMode` (int) \
`$userId` (int) \
`$userService` (UserService)

---

`integration-cds/user-binding/manual-entities`

Filters the list of tables displayed in the lookup dialog during manual user binding.

`$targets` (string[])

---

`integration-cds/user-binding/manual-entities`

Filters the list of tables displayed in the lookup dialog during manual user binding.

`$targets` (string[])

---

