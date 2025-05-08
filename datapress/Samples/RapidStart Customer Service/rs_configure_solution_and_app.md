---
title: Configure Solution and App  
sidebar_position: 3
slug: /rs_configure_solution_and_app
tags:
    - Rapid Start Customer Service
    - DataPress
    - Configure Solution and App
keywords: [Rapid Start Customer Service Configure Sulution]  
--- 

## Install Solution
Download the [Rapid Start Portal solution](https://github.com/georged/datapress/blob/main/templates/rapid-start/RapidStartPortal.zip) and install it to your Dynamics 365 environment.

## Solution and App Configuration 
**Rapid Start Portal** is an unmanaged solution you can modify after importing.

### Environment Variable 
The **Environment URL and App ID** contains 2 keys - environment name and app id.
They are is used by 'WordPress User Manager' canvas app to open a WordPress User form. 

### Cloud Flow Update CaseNotes From Field

This flow automatically populates the From field in the Case Notes table based on the source of the note. If the note is created from within CRM, the field is filled with the ID of the user who owns the related case. If the note is submitted from the WordPress site, the contact ID of the client is used instead. This ensures that each note is accurately attributed to either the responsible user or the client's contact.

-----
### Event Portal Management Table
The solution contains the Event Portal Management table, where you can define options to configure event display settings and data mapping.

In the Events table in Customer Insights - Journey app, some useful fields are hidden. For example, `msevtmgt_description` is used for the event description, and `msevtmgt_eventimage` is the event image. You can still use these fields or create your own custom fields instead. 

If you prefer to add your own fields, please change the values of `template/event/columns/description` and `template/event/columns/image` accordingly in the Event Portal Management table to match your field names.

Read more about table settings affecting the site style in the [Modifying the Look and Feel. Event Portal Management Table](/configure_solution_and_app/#event-portal-management-table-1)

## Modifying the Look and Feel
This section provides some basic guidelines on how you can adjust the visual style of your website to match your branding and design preferences

### Registration Form
The default success notification after form submission has been updated, and you can customize it with your company logo.

<div class="text--center">
<img src="/images/modify-notification.jpg" alt="Modify default notification picture" width="600" />
</div>
<br></br>

Follow these steps to add your logo:

1. Add your logo to WordPress, for example, to the `public_html/wp-content/uploads/2025/1`

2. Go to the Customer Insights - Journeys application Real-time Journeys area -> Forms

3. Open the **Anonymous Event Sign-Up Form** and edit it. In the ribbon, click the icon &lt;/&gt; HTML to open the HTML editor. Under the `<style>` tag, find the code below.

```
div[data-cached-form-url] .onFormSubmittedFeedback .onFormSubmittedFeedbackInternalContainer {
            padding: 30px 0px 30px 1px;
            background: url(/wp-content/uploads/2025/01/site-logo.png) no-repeat center calc(100% - 50px);
            background-size: contain;
            margin: auto;git
        }
```
4. Replace the URL in `background: url(/wp-content/uploads/2025/01/site-logo.png) no-repeat center calc(100% - 50px);` with the URL of your logo.

### Event Portal Management Table
The solution includes the Event Portal Management table, where you can configure options to modify the look of the site.

Set `template/event/formats/date` and `template/event/formats/time` to the required format. By default, the date is set to `d.m.Y`, which represents **24.11.2024**, and the time is set to `H:i`, which displays **18:30**. Set it, for example, to `F j, Y` to display **November 24, 2024**.

The `template/event/formats/single_date` field defines the format for a single-day event. For example, you can set it to display as **25.12.2024 at 11:53–17:00** using the `%startDate% at %startTime%–%endTime%` value, or as **25.12.2024, time: 11:53–17:00** using the `%startDate%, time: %startTime%–%endTime%` value, or any other format.

The `template/event/formats/range_date` field is used to define the format for multi-day events. For example, you can configure how customers see it — **24.11.2024 at 18:30 — 26.11.2024 at 20:30**, **November 24, 2024, 18:30 – November 26, 2024, 20:30**, or another variation — by adjusting the combination of `date`, `time`, and `range_date`.

Some examples of date formatting can be found [here](https://www.php.net/manual/en/function.date.php).
 
  
The next three fields are for keeping placeholder images when the actual picture is missing.  
* `template/event/placeholders/event_image` – placeholder for an event picture  
* `template/event/placeholders/speaker_image` – placeholder for a session speaker's profile image  
* `template/event/placeholders/sponsor_image` – placeholder for a sponsor's company logo image  
  
All of them are file-type fields, and you can upload images directly to them.  
  
Setting `template/event/view/pagination_limit` defines the maximum number of events displayed per page in event listings.  
  
To change any of these settings, go to the Event Portal Management model-driven app and edit the record. For example, to change the speaker's image placeholder to your own:  
1. Open the Event Portal Management model-driven app from the DataPress Event Ticketing solution. 
 
2. Edit the `template/event/placeholders/speaker_image` record.  

3. Delete the existing file. 

<div class="text--center">
<img src="/images/modify-placeholder.jpg" alt="Modify placeholders" width="600" />
</div>
<br></br>

4. Click **Choose File** and upload your own placeholder. 
 
5. Save the record.
