---
title: Configure Solution and App  
sidebar_position: 3
slug: /configure_solution_and_app
tags:
    - Event Ticketing
    - DataPress
    - Configure Solution and App
keywords: [DataPress Event Ticketing Configure Sulution]  
--- 

## Install Solution
Download the [DataPress Event Ticketing solution](https://github.com/georged/datapress/blob/main/templates/ci-j/event-portal-solution.zip) and install it to your environment with Dynamics 365 Customer Insights.

:::note
Dynamics 365 Customer Insights – Journeys provides real-time marketing capabilities to help organizations orchestrate personalized customer journeys across multiple touchpoints. 

Previously known as Dynamics 365 Marketing, some customers may still encounter references to 'Marketing' in their environment.
:::

# Solution and App Configuration 
**DataPress Event Ticketing** is an unmanaged solution you can modify after importing.

## Environment Variable 
The **CI-J Settings** environment variable is used for the administrator to decide whether to automatically create a new WordPress user when the customer is registering for an event. A new WordPress user will only be created if one does not already exist.

By default, new users are not created. To enable this, go to the solution and change the **CI-J Settings** environment variable value to true:
  
`{"AllowWpUserCreation": true}`  

:::note
The contact email field is used as the WordPress username. This can be changed in the **[Events] Form Submitted** Power Automate flow
:::

## Registration Form  
Our solution includes a ready-made custom registration form for convenient data processing.  

If the customer is a logged-in WordPress user and has a bound contact, the form is automatically populated. It fills in details such as the contact's FirstName, LastName, Email, and other required data. In this case, the customer does not interact with the form fields. Instead, a message confirms their registration details:
"You are registering as FirstName LastName (email@example.com)"

To complete the registration, the customer simply clicks the submit button.

<div class="text--center">
<img src="/images/form-logged.jpg" alt="Registration Form User Logged In" width="800" />
</div>
<br></br>
If logged in but not bound to a contact, the form pre-fills with WordPress data, allowing review and edits before submission.

<div class="text--center">
<img src="/images/form-notbound.jpg" alt="Registration Form Contact not bound" width="800" />
</div>
<br></br>
If the WordPress user is not logged in or the contact is not bound, they see a standard form with all fields available for manual input.

<div class="text--center">
<img src="/images/form-standard.jpg" alt="Registration Form Standard View" width="800" />
</div>

### Form Settings

You need to use a customized event registration form with some hidden fields.  

To create an event registration form, go to the [Website and form tab of your event](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/set-up-event#the-website-and-form-tab).

When you create a new event, a **Default registration form** is bound to it.

<div class="text--center">
<img src="/images/cji-registration-default-form.jpg" alt="Default Registration Form" width="800" />
</div>
<br></br>

To create a new custom form go to Real-time Journeys area → Forms, Click shevron and choose Registration Forms. Click '+ New' to create a new form.

<div class="text--center">
<img src="/images/cij-register-new-form.jpg" alt="Create a new Registration Form" width="800" />
</div>
<br></br>

Copy the raw file [registration-form.html](https://github.com/georged/datapress/blob/main/templates/ci-j/registration_form.html) from GitHub. Click &lt;/&gt; HTML to open the editor, paste the code there, then close the editor and save the form with a name you prefer.

Come back to Event Planning area → Events → Website and Form tab, and change the Default registration form to your new form.

If you wish to customize your own form, you need to add the code below into your form's HTML body to ensure proper form submission and smooth functioning of the 'Event Registration' journey.

The WordPress site passes some data during a client's registration, which is collected as a Form Submission record. These parameters must be defined in HTML as hidden fields. 

To find all forms, go to the Customer Insights - Journeys app, navigate to the Real-time Journeys area → Forms, Click shevron and choose Registration Forms. Start editing your form. In the ribbon, click the icon &lt;/&gt; HTML to open the HTML editor and add 2 fields - WordPress User Id and Bound Contact Id - using the code below.

```html
<div class="textFormFieldBlock" data-editorblocktype="TextFormField" data-prefill="false" data-hide="hide">
    <label title="Field label" for="wp-userid">WordPress User Id</label>
    <input id="wp-userid" type="text" name="wp-userid" placeholder="wp-userid" title="WordPress User Id" maxlength="256">
</div>                                                              
<div class="textFormFieldBlock" data-editorblocktype="TextFormField" data-prefill="false" data-hide="hide">
    <label title="Field label" for="wp-contactid">Bound Contact Id</label>
    <input id="wp-contactid" type="text" name="wp-contactid" placeholder="wp-contactid" title="Field label" maxlength="256">
</div>
```

<div class="text--center">
<img src="/images/form-hidden-fields.jpg" alt="Registration Form hidden fields" width="1000" />
</div>

Add this script inside the body tag.

```html
<script>
document.addEventListener("d365mkt-afterformload", updateReturnUrl);
document.addEventListener("d365mkt-afterformload", processHiddenParams);

function updateReturnUrl() {
    if (window.location.search) {
        const formElement = document.querySelector("form[data-redirecturl]");
        if (formElement) {
            // Get the current value of the data-redirecturl attribute
            const currentRedirectUrl = formElement.getAttribute("data-redirecturl");
            // Append the query parameter value to the redirect URL
            const newRedirectUrl = `${currentRedirectUrl}${window.location.search}`;
            // Update the data-redirecturl attribute with the new URL
            formElement.setAttribute("data-redirecturl", newRedirectUrl);
        } else {
            console.warn("Form with data-redirecturl attribute not found.");
        }
    }
}
function prefillHideElement(name, value, hide) {
    const element = document.getElementsByName(name)[0];
    if (!!element) {
        element.value = value;
        if (hide) {
            element.style.display = 'none';
            const container = document.querySelector(`[data-targetproperty="${name}"]`);
            if (!!container) {
                container.style.display = 'none';
            }
        }
    }
}
function processHiddenParams(event) {
    console.log("processContactIdAfterLoad");

    // Retrieve attributes from the event target
    const wpUserId = event?.target?.getAttribute('data-wp-userid') || '';
    const contactId = event?.target?.getAttribute('data-wp-contactid') || '';

    console.log(`wpUserId: ${wpUserId}`);
    console.log(`contactId: ${contactId}`);

    const contactEmail = event?.target?.getAttribute('data-wp-email') || '';
    const contactFirstName = event?.target?.getAttribute('data-wp-firstname') || '';
    const contactLastName = event?.target?.getAttribute('data-wp-lastname') || '';
    
    //Set hidden fields for WP user Id and contact Id
    const wpUserInput = document.getElementsByName('wp-userid')[0];
    if (!!wpUserInput) {
        wpUserInput.value = wpUserId;
    }
    const contactInput = document.getElementsByName('wp-contactid')[0];
    if (!!contactInput) {
        contactInput.value = contactId;
    }
    
    const hide = wpUserId && contactId; // hide if user signed in and bound to a contact        
    prefillHideElement('emailaddress1',  contactEmail, hide);
    prefillHideElement('firstname', contactFirstName, hide);
    prefillHideElement('lastname', contactLastName, hide);      
}          
</script>
```
You can also find tips on styling the form in the [Modifying the Look and Feel: Registration Form](//overview_and_supported_features/#registration-form-1) section.

## Event Registration Settings

In the Event Planning area → Events → Website and Form tab, under the drop-down **Where do you want attendees to register for this event?**, select **On your own website**. 

Below fill in **Registration page URL** with `https://{your-site-url}/register/{readable-event-id}`. You can find Readable Event ID in the Event Planning area → Events → [DataPress tab](/configure_solution_and_app/#datapress-settings-panel-in-customer-insights---journeys).

<div class="text--center">
<img src="/images/cij-register-url.jpg" alt="Registration URL Settings" width="800" />
</div>
<br></br>

### Registration limit control

Maximum event capacity is set in the Customer Insights – Journeys app in the Event planning area → Events → General → Capacity.

<div class="text--center">
<img src="/images/cij-registration-limit.jpg" alt="Maximum Event Capacity" width="800" />
</div>
<br></br>

### Waitlist
To let your customers enroll in a waitlist, switch the toggle **Enable waitlist** in the Customer Insights – Journeys app under Event Planning → Events → General → Capacity. 

<div class="text--center">
<img src="/images/cij-waitlist-enable.jpg" alt="Maximum Event Capacity" width="800" />
</div>
<br></br>
Read more about [how up and manage an event waitlist](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/set-up-and-manage-waitlist) in Microsoft documentation. 

## Custom Trigger
Form submission triggers the **[Events] Form Submitted** Power Automate flow, which invokes the **Event Registration** custom trigger via an HTTP request. 

A custom trigger need to be used to understand whether a new WordPress user was created and whether a password reset link needs to be sent. It also helps prevent duplicate event registrations if the contact is already registered for the event.

Parameters passed to the trigger by the flow:

* Customer Data - Contact reference.
* Event Registration Id – Entity reference that points to a specific event registration and defines related attributes.
* New Registration – Type: boolean. Defines whether it is a newly created registration or a duplicate.
* New WordPress User – Type: boolean. Defines whether a new WordPress user was created.
* WordPress Site Url – WordPress site URL.
* Password Reset Link – Link for a newly created WordPress user to reset their password.

## Journey
The trigger starts two separate journeys: **Event Registration Journey** and **Registration Exists Journey**. The **Event Registration Journey** is the primary process that guides the client through the entire registration experience, ensuring they receive relevant confirmations and updates. The **Registration Exists Journey** notifies clients if they attempt to register for the same event more than once, ensuring they are informed that their registration is already recorded.

Follow the instructions below - [How to create a Journey](https://github.com/georged/datapress/wiki/Configure-Solution-and-App#how-to-create-a-journey) - to create a basic Journey using the parameters passed by the **Event Registration** trigger. You can customize it as needed to align with your business requirements.

If [waitlist registrations](/configure_solution_and_app/#waitlist) are not supported, the final structure of the **Event Registration Journey** should look like this.

<div class="text--center">
<img src="/images/journey.jpg" alt="Journey" width="1000" />
</div>
<br></br>

If you choose to support [waitlist registrations](/configure_solution_and_app/#waitlist), the Event Registration Journey will need to be extended with additional conditions and actions to handle the waitlist logic. 

<div class="text--center">
<img src="/images/cij-journey-reg-wait.jpg" alt="Journey" width="1200" />
</div>
<br></br>


For **Registration Exists Journey**, the final result should appear as follows.

<div class="text--center">
<img src="/images/journey-reg-exists.jpg" alt="Journey Registration Exists" width="520" />
</div>


### How to create a Journey

First let's create **Event Registration Journey**
1. Create a new Journey from blank. Choose the type Trigger-based and select the **Event Registration**  trigger.

<div class="text--center">
<img src="/images/journey-create-base.jpg" alt="Create Journey Trigger-based" width="520" />
</div>
<br></br>

2. Attribute *New WordPress user registered*. Add a condition Attribute branch. Find the trigger parameter **NewWordPressUser** and set it to **Yes**.

<div class="text--center">
<img src="/images/journey-create-new-wp.jpg" alt="Create Journey. Attribute NewWordPressUser" width="300" />
</div>
<br></br>

3. Left branch *New WordPress user registered*. Add the Email **WP user registered**.

4. Attribute *New event registration*. Add a condition **Attribute branch**. Find the trigger parameter **NewRegistration** and set it equal to **Yes**.

<div class="text--center">
<img src="/images/journey-create-new-reg.jpg" alt="Create Journey. Attribute New event registration." width="300" />
</div>
<br></br>

5. Left branch *New Event Registration*. Add the Email **Event registration**.

6. Continue on the Left branch *New Event Registration*. Attribute **Eligible for 7 days before reminder**. Add a condition **Attribute branch** and apply a condition to the trigger attribute Event start day, setting it to on or after 7 days from now.

<div class="text--center">
<img src="/images/journey-create-condition-7days.jpg" alt="Create Journey. AttributeEligible for 7 days before reminder" width="300" />
</div>
<br></br>

7. Left branch *Event start day is on or after 7 days from now*. Add a **Wait time** condition and set it to 7 days before the event start day.

<div class="text--center">
<img src="/images/journey-create-wait-7days.jpg" alt="Create Journey. Event start day is on or after 7 days from now" width="300" />
</div>
<br></br>

8. Continue on the same branch *Event start day is on or after 7 days from now*. Add the Email **7-day reminder email**.

9. Left Branch *New event registration*. Attribute **Eligible for 1 day before reminder**. Add a condition **Attribute branch** and apply a condition to the trigger attribute Event start day, setting it to on or after 1 day from now. 

<div class="text--center">
<img src="/images/journey-create-condition-1day.jpg" alt="Create Journey. Eligible for 1 day before reminder" width="300" />
</div>
<br></br>

10. Left branch *Event start day is on or after 1 day before reminder*. Add a **Wait time** condition and set it to 1 days before the event start day.

11. Continue on the same branch *Event start day is on or after 1 days from now*. Add the Email **1-day reminder email**.

:::warning
Use the left branch (New Event Registration) of the **New event registration** condition if you want to add any other post-registration actions to your Journey. Actions that you add after the conditional branches will trigger unconditionally. For example, a client can register twice for the same event, and performing post-registration activities twice due to an accidental duplicate registration might result in poor customer experience.

<div class="text--center">
<img src="/images/journey-create-use-left-branch.jpg" alt="Create Journey. Use left branch" width="620" />
</div>
:::

Now let's take a look at the **Registration Exists Journey** creation process.

1. Simply create another journey from blank and select the same **Event Registration** trigger again.

2. Attribute *Registration Exists*. Add a condition **Attribute branch**. Find the trigger parameter **NewRegistration** and set it equal to **No**.

<div class="text--center">
<img src="/images/journey2-create-condition-new-reg.jpg" alt="Create Journey Registration Exists. Trigger parameter" width="300" />
</div>
<br></br>

3. Left branch *Duplicated Registration*. Add the Email **Registration Exists**.

<div class="text--center">
<img src="/images/journey2-create-email-reg-exists.jpg" alt="Create Journey Registration Exists. Email" width="300" />
</div>

## Payments 

To be completed

## Event Cancellation 

To be completed

## Emails

The solution includes five email templates to illustrate how you can configure your communication. You can edit them both from the solution and from the Customer Insights – Journeys application under the Real-time Journeys area → Assets → Templates → Email.

Please feel free to modify these templates to include details specific to your events and align them with your company’s brand style for a more personalized and professional experience.

### Email Templates

1. **Event Registration Template**  
   This template is used to create the email sent when a new customer successfully registers for an event. It includes event details in the email body.

2. **Registration Exists Template**  
   It is used to create the email sent if a customer has already registered for the event. The condition is checked by a contact email. Provides a notification along with the event details.

3. **WP User Registered Template**  
   It is used to create the email sent to customers with information about their WordPress account. Includes:  
   - Site URL  
   - Username  
   - Password reset link

4. **7-Day Reminder Template** – For a reminder email one week before the event.

5. **1-Day Reminder Template**  – For a final reminder email the day before the event.  

### Default Configuration

By default, the coordinator's email address is set to the **Event Owner's Primary Email**.  
If you need to specify a different email address for the coordinator:  
- Add a custom field to define the coordinator's contact information.   
- Edit the email, go to the Personalize tab on the right, and change the CoordinatorEmail value.

## Event Portal Management Table
The solution contains the Event Portal Management table, where you can define options to configure event display settings and data mapping.

In the Events table in Customer Insights - Journey app, some useful fields are hidden. For example, `msevtmgt_description` is used for the event description, and `msevtmgt_eventimage` is the event image. You can still use these fields or create your own custom fields instead. 

If you prefer to add your own fields, please change the values of `template/event/columns/description` and `template/event/columns/image` accordingly in the Event Portal Management table to match your field names.

Read more about table settings affecting the site style in the [Modifying the Look and Feel. Event Portal Management Table](/configure_solution_and_app/#event-portal-management-table-1)

# Modifying the Look and Feel
This section provides some basic guidelines on how you can adjust the visual style of your website to match your branding and design preferences

## Registration Form
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

## Event Portal Management Table
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
