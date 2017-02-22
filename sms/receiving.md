---
title: Receiving
---

When inbound SMS message is received on one of the associated numbers, the solution will create a new SMS Message and set the content according to the [settings](../settings/).

![Inbound SMS message](/img/sms/inbound.png "Inbound SMS message")

* **Sender** field (1) will be determined using smart number matching. If more than one match is found in the system, [ambiguity settings](../ambiguity/) are used to resolve the sender (2).
* **Mobile** field (3) is set to the sending number as received from the SMS provider. This number is usually in the international format including the country and the area codes.

### Manual resolution
If sender cannot be determined, system will set **Unresolved** status for the inbound message. This status allows manual resolution of the sender field and, once resolved and saved, SMS message activity will be locked and status will change to **Received**.

### Reply
One of the most convenient shortcuts for quick message exchange is ability to use **Reply** button available for the received messages. Pressing this button will create an outbound message to the sender, using the sending number as a destination, and with the **Regarding** field set to the same record as the inbound message.