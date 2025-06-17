---
title: Webhooks in Power Automate
sidebar_position: 2
slug: /knowledge-base/webhooks-in-power-automate
tags:
  - DataPress
---

# Webhooks in Power Automate

Webhooks are a powerful way to trigger Power Automate flows from external systems in real time. This guide walks you through how to configure and use them effectively.

## 🔗 Setting Up a Webhook Trigger

Follow these steps to set up a webhook using the **"When an HTTP request is received"** trigger:

1. **Create a New Flow**
   - Go to Power Automate and select **Create → Instant cloud flow**.
   - Choose **"When an HTTP request is received"** as the trigger.

2. **Define the JSON Schema**
   - Click **Use sample payload to generate schema**.
   - Paste a sample JSON payload that your external service will send.

3. **Add Actions**
   - Use the output from the trigger to add further actions—such as sending an email, storing data, or calling another API.

4. **Save and Copy the URL**
   - Save the flow to generate a unique webhook URL.
   - Use this URL in your external system to send HTTP POST requests.

5. **Test the Webhook**
   - Use Postman, curl, or your external system to send a test request.
   - The flow should trigger and execute your defined steps.

6. **Configure Webhook in DataPress Admin Area** 
   - Navigate to the DataPress admin interface.
   - Create a new webhook following this [instruction](/knowledge-base/webhooks/#configuring-webhooks)
   - Set the webhook target URL using the address obtained in Step 4.

## 🚀 Using HTTP Webhook Trigger – Summary

Setting up the webhook trigger is a five-step process:

- Create a flow using the **"When an HTTP request is received"** trigger.
- Define a JSON schema based on expected data.
- Build out actions within the flow.
- Copy the generated HTTP POST endpoint.
- Test it using tools or actual services.


For advanced scenarios, refer to [Microsoft’s official documentation on webhook connectors](https://learn.microsoft.com/en-us/connectors/custom-connectors/create-webhook-trigger).

