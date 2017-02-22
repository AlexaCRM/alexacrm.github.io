---
title: SMS Number
---

**SMS Number** entity defines authorization for outbound messages and default inbound message processing. To access the records:

1. Click **Settings > SMS Numbers**
2. Click the record to open

### Fields and settings

Number
: This is SMS number stored using full international format including the country code. The number must match one of the purchased numbers as defined in the [Account Settings](../settings/).

User
: Default recipient on the inbound messages. Depending on [settings](../settings/), the recipient can be overwritten with another user account during the message processing.

Queue
: Inbound queue for the received messages. All messages received on that number are placed in the queue regardless of the recipient.

Authorized Senders
: List of users who are authorized to send SMS messages using that number. This list of associated users is built using new field `SMS Number` available for the user record (following the phone numbers section). When user creates an SMS message, solution checks the user record, and use the number from the `SMS Number` field as a sending number. If no SMS number is associated with the user record, sending SMS message will fail.