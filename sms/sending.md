---
title: Sending
---

A new outbound SMS Message can be created using **Other Activities > SMS Message** command available on either **All Activities** view or when a recipient record is opened (e.g. contact or account)

![Send SMS message](/img/sms/outbound.png "Sending SMS Message")

When sending a message, only two fields are required to be completed:

* **Mobile** The recipient mobile/cell number (2). It is recommended to enter the full number including the country code, however the solution will try to resolve the number using default system settings. If message is created from the known record, e.g. contact, the solution will try to determine and pre-populate the destination number based on the recipient record (1).
* **Message** Message to send (3). The system allows up to 620 characters per record, however, messages exceeding 160 characters will be sent in segments each up to 160 characters long. The number of segments defines the final cost of the message. **Note** using Unicode characters such as Kanji,  Cyrillic, and other languages, *may* decrease the number of characters available in each segment to 80 (and therefore potentially increasing the cost of the message).

Once message is submitted for delivery using **Send** button, *System* tab of the message record will contain additional information about message processing.

![SMS message status](/img/sms/status.png "SMS Message status")

1. Some service providers send a notification when message is delivered to the recipient. In these instances message status will say `Delivered`.
2. If it is possible to determine the charge associated with the message, the **Charge** field will contain the information.
3. Use **Session ID** field when asked by support when troubleshooting delivery of an individual message.
