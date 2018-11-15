---
title: Quickstart
---

This quickstart guide tells in brief how to install the plugin and start capturing leads from you site directly into Dynamics 365.

## Installation

Go to **Plugins > Add New** in your WordPress administration panel. Type *"Dynamics 365 Integration"* into the "Search Plugins..." text field. After the plugin is found, click "Install Now", then click "Activate" after the plugin is installed.

![Dynamics 365 Installation](/img/wpcrm/quickstart-install.png)

Once the plugin is activated, go to **Dynamics 365 > Connection** and configure the connection to your Dynamics 365 instance. Choose the appropriate deployment type, *CRM Online* or *On-premises.* Enter the URL of your Dynamics 365 organization, and specify user name and password to access your Dynamics 365 instance.

![Dynamics 365 Connection settings](/img/wpcrm/quickstart-connect.png)

After connecting to Dynamics 365 you should see the message "Connected to &lt;Your Organization Name&gt;".

You can find more information about connection settings at the [Configuration documentation page](/wpcrm/configuration/#connection)

## Surface a Dynamics 365 form in WordPress

Let's surface a form from your Dynamics 365 organization using the Dynamics 365 Integration plugin.

### Creating a form in Dynamics 365

You can create a new custom form in Dynamics 365 or use an existing one. If you want to use an existing form you can skip this section.

To create a new form first open the Solution Explorer window with you desired solution or the default solution.
For more information about solutions please refer to [Dynamics 365 Solutions documentation](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/customize/solutions-overview).

![Create a new form using Solution Explorer](/img/wpcrm/createform-solutionexplorer.png)

In Solution Explorer navigate to **Components > Entities** section and choose the desired entity, for example, *Contact*. Expand the selected entity node and select *Forms*. Click the *New* button and select the desired form type.
For more information about form types please see [Create and design forms](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/customize/create-design-forms).

![Form editor](/img/wpcrm/createform-editor.png)

Now you can create and save the new form using the form editor.
For more information about the form editor please see [Form editor documentation](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/customize/form-editor-user-interface-legacy).

Please don't forget to specify the name of your custom form and publish it.

### Adding a form to a page

Create a new page in your WordPress administration panel by navigating to **Pages &gt; Add new** or open an existing one from **Pages &gt; All pages** menu section. Don't forget to enter page title if it's a new page.

Switch the content editor mode to plain text by clicking on the *Text* tab. Finally insert the following code into the editor:

{% raw %}
```twig
[msdyncrm_twig]
{% form entity="contact" name="WordPress Example Form" mode="create" %}{% endform %}
[/msdyncrm_twig]
```
{% endraw %}

In `create` mode the form will create a new record in CRM.

![Dynamics 365 Advanced Find window.](/img/wpcrm/quickstart-form-add.png)

Click *Publish* button on the right sidebar to publish your new page or *Update* button if you are editing an existing page.

Now you should see your form on a website page. This form will submit new contacts directly to Dynamics 365.

![Dynamics 365 Advanced Find window.](/img/wpcrm/quickstart-form-show.png)

You can find more information about creating forms at the [Twig Templates documentation page](/wpcrm/twig/#forms)

## Surface Dynamics 365 records in WordPress

TBD.

### Views

TBD.

### FetchXML

TBD.

### Entity Binding

TBD.
