---
title: Using Power Automate HTTP Webhook Trigger
slug: /knowledge-base/http-webhook-trigger
sidebar_position: 2
tags:
  - Power Automate
  - Webhooks
  - Integration
---

# Using Power Automate HTTP Webhook Trigger

Power Automate supports **HTTP Webhook triggers** through custom connectors, allowing flows to be triggered by external systems in real time. This article outlines two common scenarios:

- Creating a **dynamic webhook** on the fly
- Registering a **fixed webhook** for known endpoints

## Scenario 1: Creating a Webhook on the Fly

In this approach, a webhook is **created dynamically** each time a request comes in. This is useful when the target site is not known in advance or changes frequently.

### How It Works

1. Power Automate receives a request (e.g., from a form or API).
2. It extracts the **site URL** from the request body or headers.
3. It sends a **POST** request to that site to register a webhook.
4. Once the event is received and processed, the webhook is **deleted** (either automatically or manually).

## Scenario 2: Creating a Fixed Webhook
If the target site is known in advance, you can configure a static webhook during connector setup. This is ideal for stable integrations with a single WordPress instance or API.
This setup registers the webhook once and listens for events continuously until the flow is disabled or removed.

## Example Flow

- **Subscribe Method:** `POST`  
- **Subscribe URI:** `https://{dynamic-site}/wp-json/integration-cds/v1/webhooks`  
- **Subscribe Body:**

```json
{
  "name": "Power Automate Create",
  "description": "Description",
  "topic": "form/create",
  "target": "@{listCallbackUrl()}",
  "form_type": "gravity",
  "form_id": "all"
}
```

- **Unsubscribe Method**: DELETE (optional, depending on the external system)

 Power Automate will automatically attempt to unregister the webhook when the flow is disabled or deleted. However, we recommend verifying that the webhook has been removed manually.

## Best Practices

Always validate the callback URL `(@{listCallbackUrl()})` is correctly passed to the external system.

Use authentication (e.g., basic auth or API keys) when registering webhooks to prevent unauthorized access.

Monitor webhook lifecycle events and clean up unused registrations to avoid clutter or duplicate triggers.