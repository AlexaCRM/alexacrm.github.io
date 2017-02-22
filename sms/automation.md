---
title: Automation
---

SMS messages are designed as standard Dynamics CRM activities. That means there are no restrictions how you can automate your solution. 

## Send message automation
To send message from a workflow or custom activity, simply follow these two steps:

1. Create a new **SMS Message** record, provide the destination number and message content (data slugs can be used to create dynamic content).
2. Set status reason for the created activity record to `Pending Send`.

The system will automatically pick up any message with that status and submit it for delivery.

## Receive message automation
To automate processing of received messages, add a new workflow triggered by the **Create** event on the **SMS Message** activity. If status reason for the new activity record is `Unresolved` or `Received`, that indicates that the message has been received. Message sender and content are available to create process automations based on who sent it and what's in the message.

## Automation Ideas
Here is some ideas to help you get started with the message processing automation using workflows and custom actions.

### Inbound processing
* Automatic inbound message routing
* Place messages on any queue for effective processing by teams
* Take actions based on message content (e.g. mark appointment as confirmed if replayed **Yes**)

### Outbound
* Distribute message to multiple recipients
* Create SMS templates to individualise messages
* Automate reminders e.g. send message 24 hours before the scheduled appointment
* Two-factor authentication processing, i.e. generate and send the code to the contact's mobile/cell number and ask them to verify the code.


