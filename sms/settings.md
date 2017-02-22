---
title: Settings
---

To access settings for the AlexaCRM SMS solution:

1. In your Dynamics 365 or Dynamics CRM instance, click **Settings > Solutions**.
1. Click on the Display Name **AlexaCRM SMS Integration** to open the solution.
1. If configuration page is not loaded automatically, click **Configuration** link
1. Account Settings window is displayed:

![AlexaCRM SMS Settings](/img/sms/account-settings.png "AlexaCRM SMS Account Settings") 

## Account Settings
If account is in a trial, the words **Trial Mode** are displayed. The account is automatically given a credit sufficient to send/receive between 20 and 40 SMS messages approximately where sender and recipient are both located in US/Canada.

The trial mode stops when the account is topped up for the first time. 

E-mail Address
: E-mail address associated with account for identification and notifications. Press **Change** button to modify the email address

CRM User
: Service account used by the solution to access Dynamics 365 or Dynamics CRM organization. To change the account and/or password, press **Change** button to display a logon dialog. **Note**: For Dynamics 365 Online it's recommended to use [non-interactive account](https://technet.microsoft.com/en-us/library/jj191623.aspx#BKMK_noninteractiveuser). This account must have the role **SMS Service User** assigned to it. There are no any other security requirements for the service account.

Current Balance
: Current balance of the account in USD. When the balance becomes negative, the SMS message processing stops. However, all pending messages are queued up and not discarded. As soon as the positive balance is restored, the SMS message processing resumes.

Top-up Amount
: To increase the current balance, enter the desired top-up amount and press **Top Up** button then follow on-screen instructions to complete the payment.

### Numbers section
This section contains the list of SMS-enabled numbers associated with the account.

**Note** Each listed number needs to be defined as [SMS Number record](../smsnumber/) to enable outbound number security and to allow inbound message processing.

Number
: Allocated number including the country code

Last Charged
: Date of the last charge processed for the account 

Country
: Name of the country associated with the number. **Note**: per message charges depend on the sender and receiver countries and the length of the message. 

Price/Month
: Amount in USD charged for the number on the monthly basis. Date of the charge is determined by the date when the number was first purchased (it's the same day of the month as in **Last Charged** column)

+
: Press `+` button to add a new number to the account. In the trial mode numbers are restricted to US and Canada only. **Note** the charge for the new number is processed instantly and the account balance is reduced accordingly.

![Delete button](/img/sms/alex_delete.png "Delete the number")
: Press this button to remove the number from the account. **WARNING**: This operation is irreversible and, most likely, it would not be possible to get the old number back.

If number from a specific region is required, e.g. designated state in the United States, please [contact&nbsp;us](https://alexacrm.com/contact-us).

## Settings
Pressing **Settings** button displays various solution settings that define SMS processing:

![Processing settings](/img/sms/processing-settings.png "Processing settings")

### Entities and fields
This table contains the entities and their attributes that hold mobile numbers. The numbers in these entities and attributes are automatically processed and prepared for smart matching when SMS message is received by the system. 

**WARNING** In earlier versions of the solution some manual processing is required if these settings are changed. If your solution has the version **1.0.11.61** or lower, please [contact&nbsp;us](https://alexacrm.com/contact-us) if you would like to change any of the entities or fields. 

Default country code
: Country code used when number is incomplete and only contains valid local part. This is useful when processing and matching SMS messages received from the numbers recorded in the system as local. (SMS providers *always* include a country code for the sending number)

Ambiguity behaviour
: This setting defines the logic matching the sender's number with a record in the system. See [ambiguity behavior](../ambiguity/) for more information.

Assign incoming to sender's owner
: When the flag is set *and* sender record has been uniquely identified, the system will automatically set the owner of the matching sender record to be a recipient of the message. This is a simple yet effective way to ensure that users can immediately see and access the SMS messages sent by their contacts or accounts.

Set regarding for incoming
: When the flag is set *and* sender record has been uniquely identified, system will set `Regarding` field to the sender's record. This can simplify querying related records and performing activities rollups.