---
title: Webhooks
sidebar_position: 5
slug: /webhooks
tags:
    - DataPress
---

Webhooks play a vital role in automating workflows and enabling seamless communication between systems. In the context of WordPress, they allow you to trigger events or share information with external services whenever specific actions occur within your WordPress website. This article will guide you through the concept of webhooks, their importance, and how to work with them in forms.

### **Why You Need Webhooks**

- **Automation of Processes**: Webhooks enable automated workflows by notifying other systems when events happen.

- **Real-Time Communication**: Unlike traditional APIs that require periodic polling for updates, webhooks provide instant notifications. This saves resources and ensures faster synchronization between platforms.

- **Enhanced Integration**: Webhooks make it easy to integrate with third-party services like email marketing platforms, payment gateways, analytics tools, and more.

---

### **How to Add Webhooks**

To configure webhooks after form submission, navigate to the **Dataverse Admin Area**, open the **Webhooks** tab, and click the `Add new` button.

<div class="text--center"> 
<img src="/images/webhook-form.png" alt="Add webhooks" width="700" />
</div>

Follow these steps:

1. Enter a webhook name.
2. Add a description
3. Paste the URL provided by the external service where data will be sent.
4. Choose an action: **form/created**, **form/updated**, **user/created**, **user/updated**, **user/deleted**.

<div class="text--center"> 
<img src="/images/topics.png" alt="Topics" width="400" />
</div>

5. For **form/created** or **form/updated**, choose a form type: **Gravity Forms**, **Elementor**, **Premium Forms** or **custom forms**.
6. Choose a form name from the dropdown menu.

Below you can manage webhooks, including options to remove or disable them.

<div class="text--center"> 
<img src="/images/manage-webhooks.png" alt="Manage webhooks" width="750" />
</div>

:::note
If you upload a file through the form, please note:
- The page will have a setting with file size in kilobytes (kb). If the file size is larger than specified in the settings, a link to the file will be sent when submitting the form. If the file size is smaller, it will be base64 encoded and sent in the body of the message.
- The limits are approximate. Ensure that your system can handle the encoding.
:::

### API Parameters for Webhooks

**Webhook Create** (Example for Gravity Forms)

**Request Type**: POST 
**Endpoint**: `/wp-json/integration-cds/v1/webhooks`

**Parameters**:

`form_id`: Specify the form ID or use 'all' to target all forms.

`topic`: Choose the event type: "form/create", "form/update".

`form_type`: Define the form type: 'gravity', 'premium', 'elementor', 'custom', 'all'.

**Request Body Example**:

```json
{
  "name": "Name",
  "description": "Description",
  "topic": "form/create",
  "target": "http://localhost",
  "form_type": "gravity",
  "form_id": "235"
}
```

**Webhook List** <br></br>
**Request Type**: GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/webhooks`<br></br>

**Gravity Form List**<br></br>
**Request Type:** GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/gravity_forms` <br></br>

**Elementor Form List** <br></br>
**Request Type**: GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/elementor_forms` <br></br>

**Premium Form List** <br></br>
**Request Type**: GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/form_registrations` <br></br>
