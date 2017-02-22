---
title: Ambiguity behavior
---

This setting defines the logic matching the sender's number with a record in the system and setting the sender record for the SMS Message activity.

* **First match only** - first record with the matching number will be set as a sender of the message, regardless of the other matching records from the same entity or other entities. This setting is recommended when duplicate numbers are likely across the entities (e.g. contacts and accounts) as well as withing the entity itself (e.g. recording mobile/cell number in **Business phone** field as well as **Mobile phone** field.
* **First entity only** - if the first matching entity contains one and only one matching number, this record will be used as a sender regardless of any other entities containing the matching number. This setting is recommended if duplicates are possible across the different entities (e.g. same number is recorded for a contact and an account), however there are no duplicate numbers within a single entity (enforced by duplicate detection rules)
* **All entities** - the system will search all defined entities and attributes for the matching record. If one and only one record is found then it will be set as a sender of the SMS Message activity. This setting is recommended if mobile/cell numbers are geniunly unique within the implementation across the entities and fields.