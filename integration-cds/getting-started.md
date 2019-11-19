---
title: Getting Started
permalink: /integration-cds/getting-started/
redirect_from:
 - /integration-dynamics/getting-started/
typora-root-url: ../
---

<p class="lead">Get acquainted with the plugin, learn how to install and configure it properly and learn about its features and capabilities.</p>

## Get your CDS / Dynamics 365 organization ready

CDS Integration is a WordPress plugin that makes WordPress and CDS / Dynamics 365 work together. It is not a stand-alone CRM solution.

If you don't have a CDS / Dynamics 365 organization yet, you can sign up for a free trial at [trials.dynamics.com](https://trials.dynamics.com/).

## Get the plugin

Enter your WordPress Admin Area and go to *Plugins > Add New*. Enter *"CDS Integration"* into the search box, hit Enter. Locate the plugin, click *Install Now*, then *Activate*. Alternatively, go to [WordPress.org](https://wordpress.org/plugins/integration-cds/) and download the latest version of the plugin and install it manually.

Install the AlexaCRM solution for WordPress integration, as well as the premium add-on, *CDS Integration Premium,* to access features described in this walkthrough.

## Get credentials

> Dynamics 365 supports several deployment and authentication scenarios. This tutorial assumes Dynamics 365 Online and Server-to-Server authentication with an application user.

Connecting to CDS or Dynamics 365 Online Web API means several things:

1. Creating an app registration in Azure Active Directory and client secret (application password), granting it permissions
2. Creating an application user in CRM and associating it with the newly created app registration
3. Using app registration ID and client secret to get a token from Azure Active Directory

Create a new app registration in Azure Active Directory, go to app registration *API permissions.* Add a new permission, *Access Common Data Service as organization users.* Then go to *Certificates & secrets* and create a new client secret. **On Save, copy the displayed key for further use -- it will only be shown once.**

Copy the Application ID as well. This, and the password created moments before, comprise the credentials required for successful authentication

Next step is to create an application user in CRM. Go to the [Admin center](https://admin.powerplatform.microsoft.com/), navigate to your environment's Settings / Users. Switch to the *Application Users* view, hit **New**, switch to the *"Application User"* form, as can be seen [here](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/use-multi-tenant-server-server-authentication#manually-create-a--application-user). Fill in the *Application ID* which you saved before, as well as *Full Name* and *Primary Email* fields, then save the user. Associate the user with relevant security roles, for example "System Administrator" and "Delegate". Feel free to create custom security roles which suit your use case best.

## Connect the plugin

Once you got required credentials, it's time to connect the plugin to CRM.

Go to your WordPress Admin  Area and access the *Integration CDS* menu. Switch to the *Connection* tab. Then follow these steps:

1. Enter the *Organization URL* -- for example, `https://contoso.crm.dynamics.com`
2. Select the *Deployment Type* -- **Online**
3. Select the *Authentication Method* -- **OAuth 2.0 / Shared Secret**
4. Enter the *Application ID* and *Client Secret* which you retrieved before
5. Check whether the credentials are OK by hitting the **Verify Connection** button
6. Upon successful test, click **Save settings** to establish a connection to CRM

Now the plugin is connected to CRM and you can start building the integration.

## Design your first integration

To kickstart your integration, let's arrange a Contact Us form, a table with a list of contacts, and a page with information about a company (Account entity). These three items correspond to three basic things the plugin can do:

- rendering CRM forms in WordPress and capturing submissions back to CRM to create new records and update existing ones,
- displaying CRM views in WordPress,
- and, last but not least, displaying data from CRM records in WordPress.

"Records" are your leads, cases, contacts, accounts and virtually any OOB or custom entity. You are not restricted to only leads or contacts by any means.

### Contact Us form

The plugin introduces a concept of *"form registrations"*, a proxy layer between WordPress and a CRM form. It specifies among other things which CRM form to work with, how to handle submissions, which fields to make required or optional. With the power of Twig you can also define default values for fields.

Browse to the CDS Integration settings and switch to the *Forms* tab. Click *Create new* to create a new form registration. Fill in the **Form Name**, click the looking glass button in the **CRM Form** field, pick the entity and corresponding form. Select **Create a new record** to create new a Lead record every time someone submits your form.

![CRM form designer with the custom Lead form.](/img/integration-cds/getting-started/crm-form.png)

We picked a custom form for the Lead entity. It has the **Topic** field marked as required. But we want to require users to fill **Email** too. To accomplish that, you've got the section that reads "Make some fields required or optional". In the first column you have all attributes of the given entity. Pick the field you want to make required and click **Required &rarr;** to add it to the Required column. The same technique allows you to make some required fields optional.

![Form registration screen with the new form registration.](/img/integration-cds/getting-started/form-registration.png)

Scroll down to the end of the form and click **Create**. You've got a form registration. You will see the newly created form registration is now displayed on the left. You will also see that it has been assigned an ID which you will use to reference it in Twig templates to add the form to pages on your website.

Create a new page, add a "Custom HTML" block to it, write a Twig template inside the `[ngd_twig][/ngd_twig]` shortcode.

```twig
{% raw %}
{% form id=3 %} {# Number 3 is the ID of your form registration we mentioned before. #}
{% endraw %}
```

Publish the page and check it out! Now your website can generate leads into your CRM.

![Registration settings screen](/img/integration-cds/getting-started/contact-us.png)

### A table with contacts

Views are how you retrieve data in a table from the Common Data service. With a piece of Twig code you can add a table with the list of contacts on your website. Most of organizations have lots of contacts -- that is why pagination matters.

```twig
{% raw %}
{% view entity="contact" name="Active Contacts" count=5 %}{% endview %}
{% endraw %}
```

![A paged table with active contacts.](/img/integration-cds/getting-started/view.png)

### Company information

Create a third page. Twig has a number of objects, `record` is one of them -- it provides access to the record bound to the page at the moment.

```twig
{% raw %}
<h3>{{record.name}}</h3>
<p>Primary contact: {{record|formatted_value("primarycontactid")}}</p>
<p>Address:</p>
<address>{{record.address1_composite|nl2br}}</address>
{% endraw %}
```

Save the new page, then go to the list of all pages and locate it. Hover your mouse over the row and click **Configure Binding**, then **Setup Binding**. Choose the Contact entity from the dropdown, and select the method to bind **Via GUID in query string**. Hit Save. You can now see a small Dynamics 365 icon next to the page title. This icon indicates that the page is bound to a certain CDS entity. Read [entity binding documentation](../entity-binding/).

![Entity binding configuration.](/img/integration-cds/getting-started/page-binding.png)

If you look at the screenshot with the table, you can see that each account name is a link. To achieve that, you need to go to the plugin settings and choose the default page for Contact entity on the **Binding** tab.

![Binding configuration screen.](/img/integration-cds/getting-started/binding-settings.png)

Click **Save settings** and go to the page with the table of contacts to see all accounts being linked to the company information page.

![A page with information about a specific account.](/img/integration-cds/getting-started/bound-page.png)
