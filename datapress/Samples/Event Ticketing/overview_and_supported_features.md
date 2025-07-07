---
title: Overview and Supported Features
sidebar_position: 1
slug: /overview_and_supported_features
tags:
    - Overview and Supported Features
    - DataPress
keywords: [DataPress Event Ticketing Overview and Supported Features]  
---

Event Ticketing is a comprehensive, ready-made integration that connects your Event Ticketing WordPress site with Dynamics 365 Customer Insights – Journeys, powered by DataPress.

This solution provides a structured and user-friendly way to explore upcoming and past events and ensures a seamless registration experience for your customers while giving you enhanced control over managing event registration journeys efficiently.

The diagram below illustrates the complete flow of the event registration process in our solution.

<div class="text--center">
<img src="/images/diagram.jpg" alt="Registration process diagram" width="700" />
</div>

### List of events
The site displays a complete list of events, helping users easily find and register for relevant opportunities. 

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

For details on configuring the registration form, click [here](/configure_solution_and_app/#form-settings).

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

### DataPress Settings Panel in Customer Insights - Journeys

The **DataPress** tab is part of the Event form in Customer Insights - Journeys. It allows you to view key details such as the Readable Event ID, change the event image,control the public visibility of live events on your WordPress site and manage associated passes. All of these fields are hidden by default.

<div class="text--center">
<img src="/images/cij-datapress-panel.jpg" alt="DataPress Settings Panel" width="1000" />
</div>

#### Readable Event ID
A human-readable string (e.g. `DynamicsMinds2025`) that identifies the event. You need it for use in registration URLs.

#### Event Image
Allows uploading or selecting an image that represents the event. This image appears in event listings, on the event details page, and in registration forms.

#### Event Registration Access
This dropdown lets you choose whether the event is publicly available for registration on the WordPress site.
- **Public** – Event is visible in the listing. This is the default option.
- **Unlisted** – Event is not shown in the listing, but registration is accessible via a direct registration link.
- **None** – Event is not publicly visible, and registration is not available.

<div class="text--center">
<img src="/images/cij-datapress-panel-visibility.jpg" alt="Live Event Visibility choice dropdown" width="600" />
</div>

### Passes Overview

Below the visibility settings, the Passes list displays available access options for the event.

Each pass represents ticket options tied to the event. These can define different access levels or pricing categories.

### Event cancellation

To be completed

### Email Notifications
When [configuring a journey](/configure_solution_and_app/#journey), you have the flexibility to define which emails users will receive. Our solution includes five pre-configured [email templates](/configure_solution_and_app/#emails) that you can incorporate into your journey:

* Event Registration Template – Confirms a successful registration.

<div class="text--center">
<img src="/images/template-email-event-registration.jpg" alt="Successful Event Registration Email Template" width="600" />
</div>
<br></br>
* Registration Exists Template – Notifies users if they have already registered.
* WP User Registered Template – Confirms the creation of a WordPress user account.
* 7-Day Reminder Template – Sends a reminder one week before the event.
* 1-Day Reminder Template – Sends a final reminder the day before the event.


### Waitlist
To be completed

### Payments
To be completed

### User Profile Page

Registered users have the ability to update their profile information, such as their first and last name. However, the email address field is read-only. To update the email address, users are required to contact support directly, as the email is used for matching with the contact information in the system.

Additionally, the profile page displays a list of all events the user is registered for, providing a convenient overview of their registrations.

<div class="text--center">
<img src="/images/cij-page-profile.jpg" alt="User Profile Page" width="800" />
</div>
<br></br>