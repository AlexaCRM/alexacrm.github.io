---
title: Custom Forms examples
sidebar_position: 9
slug: /forms/custom-forms-example
tags:
  - Form
  - DataPress
keywords: [DataPress custom form]
---

:::note
The plugin previously known as **Dataverse Integration** has been renamed to **DataPress**. All references in documentation and UI are being updated accordingly. [1](https://docs.alexacrm.com/forms/custom-forms/)
:::

## Custom form examples

### 1. Update a Contact

```
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

```
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

```
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

```
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