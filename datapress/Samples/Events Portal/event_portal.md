---
title: Events Portal Overview and Supported Features
sidebar_position: 1
slug: /events_portal_overview
tags:
    - Events Portal Overview and Supported Features
    - DataPress
keywords: [DataPress Events Portal Overview and Supported Features]  
---

Event Portal is a comprehensive, ready-made integration that connects your Event Registration WordPress site with Dynamics 365 Customer Insights – Journeys, powered by DataPress.

This solution provides a structured and user-friendly way to explore upcoming and past events and ensures a seamless registration experience for your customers while giving you enhanced control over managing event registration journeys efficiently.

The diagram below illustrates the complete flow of the event registration process in our solution.

<div class="text--center">
<img src="/images/diagram.jpg" alt="Registration process diagram" width="700" />
</div>

### List of events
The portal displays a complete list of events, helping users easily find and register for relevant opportunities. 

By default, only future events are shown, but a toggle option allows past events to be included in the list as well.

<div class="text--center">
<img src="/images/page-event-list.jpg" alt="Page Events list" width="800" />
</div>

### Individual event details view
The event details page provides information about a specific event, including its name, date, time, location, and description, as well as details about event sessions, speakers, passes, and sponsors. It also features a registration button for easy sign-up. 

<div class="text--center">
<img src="/images/page-event-view.jpg" alt="Page Events View" width="800" />
</div>

Switch tabs to see more information.

* **Sessions.** A list of all scheduled sessions, including their timings and speakers.

<div class="text--center">
<img src="/images/page-event-view-sessions.jpg" alt="Events' Sessions" width="800" />
</div>
<br></br>

* **Speakers.** Details about the speakers and associated sessions.

<div class="text--center">
<img src="/images/page-event-view-speakers.jpg" alt="Events' Speakers" width="800" />
</div>
<br></br>

* **Passes.** Information about event passes, including their price and associated sessions.

<div class="text--center">
<img src="/images/page-event-view-passes.jpg" alt="Events' Passes" width="800" />
</div>
<br></br>

### Event-level registration

For details on configuring the registration form, click [here](https://github.com/georged/datapress/wiki/Configure-Solution-and-App#form-settings).

The registration form, easily accessible by clicking the Register Now button on the event details page, makes the sign-up process quick and seamless.

For logged-in WordPress users with a linked contact, the form is automatically pre-filled with their details, including first name, last name, and email. Instead of manually entering data, they see a notification like:
'You are registering as Becky Knight (Becky.Knight@example.com).'

With their details already in place, they can complete the registration with just one click.

<div class="text--center">
<img src="/images/form-logged.jpg" alt="Form View for User with Bound Contact" width="800" />
</div>
<br></br>

If the WordPress user is logged in but the contact is not bound, the form will be pre-filled with the user's WordPress data. The user can review and, if necessary, correct the pre-filled information before submitting the form. 

<div class="text--center">
<img src="/images/form-corrected.jpg" alt="Form View for Logged-In WordPress User" width="800" />
</div>
<br></br>

If the WordPress user is not logged in, they will see a standard registration form with all fields available for manual input. 

<div class="text--center">
<img src="/images/form-standard.jpg" alt="Standart Form View" width="800" />
</div>

### Thank You page

After the form has been successfully submitted, the user will be redirected to a confirmation page that thanks them for their registration.

<div class="text--center">
<img src="/images/thank-you-page.jpg" alt="Thank You Page" width="800" />
</div>

### Registration limit control

Maximum event capacity is set in the Customer Insights – Journeys app in the Event planning area → Events → General → Capacity.

<div class="text--center">
<img src="/images/registration-limit.jpg" alt="Maximum Event Capacity" width="800" />
</div>
<br></br>
When the registration limit is reached, the client sees a notification that the event is full.

<div class="text--center">
<img src="/images/notification-reg-full.jpg" alt="Event is Full Notification" width="800" />
</div>


### TBD. Event cancellation
### Email Notifications
When [configuring a journey](https://github.com/georged/datapress/wiki/Configure-Solution-and-App#journey), you have the flexibility to define which emails users will receive. Our solution includes five pre-configured [email templates](https://github.com/georged/datapress/wiki/Configure-Solution-and-App#emails) that you can incorporate into your journey:

* Event Registration Template – Confirms a successful registration.

<div class="text--center">
<img src="/images/template-email-event-registration.jpg" alt="Successful Event Registration Email Template" width="600" />
</div>
<br></br>
* Registration Exists Template – Notifies users if they have already registered.
* WP User Registered Template – Confirms the creation of a WordPress user account.
* 7-Day Reminder Template – Sends a reminder one week before the event.
* 1-Day Reminder Template – Sends a final reminder the day before the event.


### TBD. Waitlist
### TBD. Payments

