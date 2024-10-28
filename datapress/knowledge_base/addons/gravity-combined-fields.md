---
title: How to combine values from multiple Gravity Forms fields into one other column
sidebar_position: 20
slug: /knowledge-base/gravity-combined-fields
tags:
    - Knowledge base
    - DataPress
    - Gravity Forms
---

If you need to combine values from multiple Gravity Forms fields into one other column, follow these steps:

**Create the Fields:**

- Create three fields, for example, **line1**, **line2**, and **line3**.
- Create another field, such as **Multiple lines**, and make this field hidden in **Fields settings** -> **Appearance** -> **Advanced**.

**Map the Combined Field:**

- When creating a Dataverse Feed, map the **Multiple lines** field to the necessary column to get the combined value.

**Add this code example to your `functions.php` file:**
```php
add_action( 'gform_pre_submission_{your_Gravity_Form_id}', function ( $form ) {
    $_POST['input_{Multiple_line_Id}'] = rgpost( 'input_{line1_Id}' ).'; '.rgpost( 'input_{line2_Id}' ).'; '.rgpost( 'input_{line3_Id}' );
});
```

```php
add_action( 'gform_pre_submission_2', function ( $form ) {
    $_POST['input_5'] = rgpost( 'input_1' ).'; '.rgpost( 'input_2' ).'; '.rgpost( 'input_3' );
});
```

Explanation:

- Replace `{line1_Id}`, `{line2_Id}`, and `{line3_Id}` with the actual field IDs from your Gravity Form (you can find these in Fields settings).
- Replace `{your_Gravity_Form_id}` with the actual Gravity Form ID.
- The `rgpost` function retrieves the values from the specified fields.
- The combined value is then assigned to the target field using the `$_POST` superglobal.

[Read more](https://docs.gravityforms.com/gform_pre_submission/)