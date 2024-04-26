---
title: Filters and Actions
sidebar_position: 13
permalink: /wpcrm/hooks/
tags:
    - Hooks
    - Dynamics 365 Integration
---

**Dynamics** provides a number of WordPress *filters* and *actions* that allow you to extend the plugin and augment its behaviour.

## Filters

---

##### `wordpresscrm_before_{$filter_key}_parse_args`

---

##### `wordpresscrm_after_{$filter_key}_parse_args`

---

##### `wordpresscrm_tabs`

Filters the list of available tabs in the Settings UI.

```php
<?php
$filteredTabs = apply_filters( 'wordpresscrm_tabs', $tabs );
```

`$tabs` is an `array` of available tabs implementations. The default is:

```php
<?php
$tabs = [
        'general' => [ '\AlexaCRM\WordpressCRM\Admin\Tab\General', 10 ],
        'forms' => [ '\AlexaCRM\WordpressCRM\Admin\Tab\Forms', 20 ],
        'views' => [ '\AlexaCRM\WordpressCRM\Admin\Tab\Views', 30 ],
        'attachments' => [ '\AlexaCRM\WordpressCRM\Admin\Tab\Attachments', 40 ],
        'messages' => [ '\AlexaCRM\WordpressCRM\Admin\Tab\Messages', 50 ],
        'about' => [ '\AlexaCRM\WordpressCRM\Admin\Tab\About', 60 ],
    ];
```

Array key is the tab slug, `value[0]` is a FQCN for the tab implementation (must be instance of `AlexaCRM\WordpressCRM\Admin\Tab`, i.e. inherited from it). `value[1]` is tab priority -- used for sorting tabs in the UI.

---

##### `wordpresscrm_data_binding_404`

---

##### `wordpresscrm_enqueue_styles`

---

##### `wordpresscrm_template_path`

---

##### `wordpresscrm_shortcodes`

---

##### `wordpresscrm_get_template`

---

##### `wordpresscrm_locate_template`

---

##### `wordpresscrm_upload_dir`

---

##### `wordpresscrm_default_options`

---

##### `wordpresscrm_messages`

---

##### `wordpresscrm_messages_schema`

---

##### `wordpresscrm_field_missing`

---

##### `wordpresscrm_field_wrapper`

---

##### `wordpresscrm_view_construct_fetch`

---

##### `wordpresscrm_view_entities`

---

##### `wordpresscrm_form_errors`

---

##### `wordpresscrm_form_print_form`

---

##### `wordpresscrm_form_posted_data`

---

##### `wordpresscrm_form_{$formName}_control_{$controlName}`

---

##### `wordpresscrm_setup_form_controls`

---

##### `wordpresscrm_setup_form_columns`

---

##### `wordpresscrm_form_template_errors`

---

##### `wordpresscrm_form_template_notices`

---

##### `wordpresscrm_form_submit_button`

---

##### `wordpresscrm_no_results_view`

---

##### `wordpresscrm_view_images_boolean`

---

##### `wordpresscrm_view_images_boolean_true`

---

##### `wordpresscrm_view_images_boolean_false`

---

## Actions

##### `wordpresscrm_before_load`

##### `wordpresscrm_loaded`

##### `wordpresscrm_widgets_init`

##### `wordpresscrm_extended_includes`

##### `wordpresscrm_before_template_part`

##### `wordpresscrm_after_template_part`

##### `wordpresscrm_after_settings_about`

##### `wordpresscrm_after_settings_general`

##### `wordpresscrm_before_form_start`

##### `wordpresscrm_before_form_fields`

##### `wordpresscrm_after_form_fields`

##### `wordpresscrm_after_form_end`

##### `wordpresscrm_before_form_errors`

##### `wordpresscrm_after_form_errors`

##### `wordpresscrm_before_form_notices`

##### `wordpresscrm_after_form_notices`
