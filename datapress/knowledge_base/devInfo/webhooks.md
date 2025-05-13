---
title: Webhooks
sidebar_position: 1
slug: /webhooks
tags:
    - DataPress
---

Webhooks play a crucial role in **automating workflows** and **enabling seamless communication** between systems. Within WordPress, webhooks allow you to **trigger events** and **share information** with external services whenever specific actions occur.

This guide will help you understand webhooks, their importance, and how to configure them in forms.

### **Why Use Webhooks?**

- **Automation of Processes**: Webhooks enable automated workflows by notifying other systems when events happen.

- **Real-Time Communication**: Unlike traditional APIs that require periodic polling for updates, webhooks provide instant notifications. This saves resources and ensures faster synchronization between platforms.

- **Enhanced Integration**: Webhooks make it easy to integrate with third-party services like email marketing platforms, payment gateways, analytics tools, and more.

---

### **Configuring Webhooks**

To set up webhooks for form submissions, follow these steps:

1. Navigate to **Dataverse Admin Area** → **Webhooks** tab.

2. Click **Add new**.

<div class="text--center"> 
<img src="/images/webhook-form.png" alt="Add webhooks" width="700" />
</div>

Follow these steps:

1. Enter a webhook name.
2. Add a description
3. Provide the target URL (where the webhook will send data).
4. Choose an action: **form/created**, **form/updated**, **user/created**, **user/updated**, **user/deleted**.

<div class="text--center"> 
<img src="/images/topics.png" alt="Topics" width="400" />
</div>

5. For **form-related actions**, select the form type:

- **Gravity Forms**
- **Elementor**
- **Premium Forms**
- **Custom Forms**

6. Choose the specific **form name** from the dropdown menu.

Once configured, you can manage webhooks, including options to **update**, **remove** or **disable** them.

<div class="text--center"> 
<img src="/images/manage-webhooks.png" alt="Manage webhooks" width="750" />
</div>

:::note
**File Upload Considerations**:
- If a form includes a file upload, the page settings define the file size limit in kilobytes (KB).

- If the file size exceeds the limit, the webhook sends a link to the file instead of embedding it.

- If the file is within the allowed size, it is base64-encoded and included in the request body.

- Limits are approximate—ensure that your system supports necessary encoding
:::

### API Parameters for Webhooks

**Creating a Webhook** (Example for Gravity Forms) <br></br>

**Request Type**: POST <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/webhooks` <br></br>

**Parameters**:

`form_id`: Specify the form ID or use 'all' to target all forms.

`topic`: Choose the event type: "form/created", "form/updated".

`form_type`: Define the form type: 'gravity', 'premium', 'elementor', 'custom', 'all'.

**Request Body Example**:

```json
{
  "name": "Name",
  "description": "Description",
  "topic": "form/created",
  "target": "http://localhost",
  "form_type": "gravity",
  "form_id": "235"
}
```

Upon successful creation, the response includes a **webhookId**, which can be used for updates or deletion.

**Updating a Webhook** (Example for Gravity Forms) <br></br>

**Request Type**: PATCH <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/webhooks/{webhookId}` <br></br>

**Parameters**:

`form_id`: Specify the form ID or use 'all' to target all forms.

`topic`: Choose the event type: "form/created", "form/updated".

`form_type`: Define the form type: 'gravity', 'premium', 'elementor', 'custom', 'all'.

**Request Body Example**:

```json
{
  "name": "Updated Webhook",
  "description": "Triggers on form update",
  "topic": "form/updated",
  "target": "http://localhost",
  "form_type": "gravity",
  "form_id": "235"
}
```

**Deleting a Webhook**

**Request Type**: DELETE <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/webhooks/{webhookId}`<br></br>


**Retrieving Webhooks** <br></br>
**Request Type**: GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/webhooks`<br></br>

**Retrieving Available Forms**
**Gravity Form List**<br></br>
**Request Type:** GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/gravity_forms` <br></br>

**Elementor Form List** <br></br>
**Request Type**: GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/elementor_forms` <br></br>

**Premium Form List** <br></br>
**Request Type**: GET <br></br>
**Endpoint**: `/wp-json/integration-cds/v1/form_registrations` <br></br>
