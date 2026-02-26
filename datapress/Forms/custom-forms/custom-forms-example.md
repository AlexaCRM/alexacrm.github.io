---
title: Custom Forms Examples
sidebar_position: 3
slug: /forms/custom-forms-example
tags:
  - Form
  - DataPress
keywords: [DataPress custom form]
description: How to create custom forms
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

## Custom form examples

### 1. Update a Contact

```twig
{% form entity="contact" mode="update" record=record|to_entity_reference %}
<form>
  <div class="form-group">
    <label>First Name:
      <input class="form-control" name="firstname" value="{{ record['firstname'] }}">
    </label>
  </div>

  <div class="form-group">
    <label>Last Name:
      <input class="form-control" name="lastname" value="{{ record['lastname'] }}">
    </label>
  </div>

  <div class="form-group">
    <label>Email:
     form-control" name="emailaddress1" value="{{ record['emailaddress1'] }}">
    </label>
  </div>

  <div class="form-group">
    <label>Phone:
      <input class="form-control" name="telephone1" value="{{ record['telephone1'] }}">
    </label>
  </div>

  <button type="submit" class="btn btn-primary">Send</button>
</form>
{% endform %}
```

### 2. Contact Us Form (Create) + reCAPTCHA

```twig
{% form entity="lead" mode="create" recaptcha=true %}
<form>
  <div class="form-group">
    <label>First Name:
      <input class="form-control" name="firstname">
    </label>
  </div>

  <div class="form-group">
    <label>Last Name:
      <input class="form-control" name="lastname">
    </label>
  </div>

  <div class="form-group">
    <label>Email:
      <input class="form-control" name="emailaddress1">
    </label>
  </div>

  <div class="form-group">
    <recaptcha></recaptcha>
  </div>

  <button type="submit" class="btn btn-primary">Send</button>
</form>
{% endform %}
```

### 3. Date Only & Date Time fields

```twig
{% form entity="contact" mode="create" %}
<form>
  <div class="form-group">
    <label>Account Name:
      <input class="form-control" name="name">
    </label>
  </div>

  <div class="form-group">
    <label>Date Only:
      <input class="vdatetime" name="cr1d1_dateonly">
    </label>
  </div>

  <div class="form-group">
    <label>Date Time:
      <input class="vdatetime" name="cr1d1_datetime">
    </label>
  </div>

  <button type="submit" class="btn btn-primary">Send</button>
</form>
{% endform %}
```

### 4. Display extracted date/time values

```twig
<div class="form-group">
  <label>UTC Date:
    <input class="form-control" name="cr1d1_datetime_utc_date" value="{{ currentRecord['cr1d1_datetime_utc_date'] }}">
  </label>
</div>

<div class="form-group">
  <label>Local Date:
    <input class="form-control" name="cr1d1_datetime_local_date" value="{{ currentRecord['cr1d1_datetime_local_date'] }}">
  </label>
</div>

<div class="form-group">
  <label>UTC Time:
    <input class="form-control" name="cr1d1_datetime_utc_time" value="{{ currentRecord['cr1d1_datetime_utc_time'] }}">
  </label>
</div>

<div class="form-group">
  <label>Local Time:
    <input class="form-control" name="cr1d1_datetime_local_time" value="{{ currentRecord['cr1d1_datetime_local_time'] }}">
  </label>
</div>
```