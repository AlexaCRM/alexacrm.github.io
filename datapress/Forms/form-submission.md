---
title: Form Submission
sidebar_position: 5
slug: /forms/form-submission
tags:
  - Form Submission
  - DataPress
keywords: [DataPress form submission, capture form data]
description: Configure how form submissions are captured and processed in Dataverse.
---

<div
  role="note"
  aria-label="Product note"
  style={{
    borderLeft: '4px solid #2f81f7',
    background: '#f0f7ff',
    padding: '12px 16px',
    borderRadius: '6px',
    margin: '1em 0',
    color: '#0b2e59',
  }}
>
  <div style={{ color: '#0b63d1', fontWeight: 600, marginBottom: '6px' }}>Note</div>
  <p style={{ margin: '0 0 6px 0' }}>
    The plugin previously known as <em>Dataverse Integration</em> has been renamed to <strong>DataPress</strong>.
  </p>
  <p style={{ margin: '0 0 6px 0' }}>
    This change reflects our commitment to enhancing user experience and aligning with our product vision.
  </p>
  <p style={{ margin: 0 }}>
    All references to Dataverse Integration in the documentation and UI will be updated to DataPress.
  </p>
</div>

<p class="lead">Manage user submitted data collecting for supported forms.</p>

# Form Submission Configuration

The Form Submission settings allow you to capture and manage form submission data from various form types in DataPress.

## Enable Universal Forms Capture

The primary toggle to enable form submitted data capturing for all supported form types.

### Options

#### 1. **Send Asynchronously**
Submission data is processed in Dataverse in the background, and errors don't affect the form. When off, the form waits for processing to finish.

#### 2. **Capture before form submission processing**
Capture form data before the form plugin saves it and runs its actions. When off, data is captured after processing, as saved.

#### 3. **Include file contents**
Upload submitted files to Dataverse with the captured data. When off, files stay on the WordPress server and Dataverse receives a private download link.

## Select Form Types to Capture

Choose which form types should have their submissions captured:

- **HTML Forms** - Forms built with HTML and Twig
- **Dataverse Forms** - Power Apps model-driven forms
- **Elementor Forms** - Forms created with Elementor
- **Gravity Forms** - Forms created with Gravity Forms plugin

Each form type can be independently enabled or disabled for submission capture.
