---
title: Install WordPress Components  
sidebar_position: 2
slug: /rs_install_wordpress_components
tags:
    - RapidStart Customer Service
    - DataPress
    - Install WordPress Components
keywords: [DataPress RapidStart Customer Service Install]  
--- 

To set up the solution on your website, you will first need to install the necessary WordPress components.
To start with, go to the admin section of your WordPress site. If you don't have one, refer to the WordPress article [Build Your Website in Five Steps](https://wordpress.com/support/five-step-website-setup/) for guidance.  

### DataPress plugin
Go to the Plugins tab and click Add New Plugin. Search for Dataverse Integration (currently renamed to DataPress).  

You require the Premium DataPress plugin extension. Follow the instructions how to [Install Premium Features](https://docs.alexacrm.com/premium-features/#install-premium-features) to enable it. 

<div class="text--center">
<img src="/images/plugin-datapress.jpg" alt="DataPress Plugin" width="600" />
</div>

### Other plugins

Breeze is a WordPress Caching Plugin developed by Cloudways. Breeze uses advance caching systems to improve WordPress loading times.

<div class="text--center">
<img src="/images/plugin-breeze.jpg" alt="Breeze Plugin" width="600" />
</div>
<br></br>

The use of this plugin is optional and depends on your specific requirements.

:::warning
If your caching provider allows varying cache by query string parameters, pp and past should be added to the list of parameters.
:::

The Profile Builder plugin is used to customize the site's basic color scheme.
<div class="text--center">
<img src="//Users/hannaselitskene/Desktop/rs_plugin_profile_builder.jpg" alt="Profile Builder Plugin" width="600" />
</div>


### Templates

After setting up the plugin, download the [Twig templates](https://github.com/georged/datapress/blob/main/templates/rapid-start/rs_twig_templates.json) from GitHub and install them in the Twig Templates section of your WordPress site. 

Go to Dataverse in the side menu → Settings. Find the **Import Configuration Settings** section, browse for the file you just downloaded, and click the **Import** button.

:::warning 
Before performing this step, make sure you don’t have any custom templates you need to keep. The import action will overwrite all existing Twig templates.
:::

The twig templates are stored under Dataverse → Templates → Twig Templates.

<div class="text--center">
<img src="/images/templates-twig-storage.jpg" alt="Twig templates Storage" width="600" />
</div>

### WordPress Pages
Add required pages **Access Restricted**, **Cases**, **Case Details**, **Create Case**, **Profile**, and **Settings**

<div class="text--center">
<img src="/images/rs_wp-pages.jpg" alt="WordPress Pages" width="600" />
</div>

Add Dataverse Twig block and include twig templates using the next code.
 
In the **Access Restricted** page: 
```twig
{% include 'styles' %}
```
Then add Paragraph block and add text 

"We're sorry, but access to this area is limited to registered customers only.

If you’re a customer, please log in to continue. If you believe you’ve received this message in error, feel free to contact our support team for assistance.

Thank you for your understanding!"

Add link to your login page on 'log in' words.

In the **Cases** page: 
```twig
{{ include('styles') }}
{% if not user.is_bound %}
    <script>
        window.location.href = "https://<your-site-url>/access-restricted";
    </script>
{% else %}
{{ include('my_profile') }}
{% endif %}
```

In the **Case Details** page:

```twig
{{ include('styles') }}
{% if not user.is_bound %}
    <script>
        window.location.href = "https://<your-site-url>/access-restricted";
    </script>
{% else %}
{{ include('case_details') }}
{% endif %}
```

In the **Create Case** page:

```twig
{{ include('styles') }}
{% if not user.is_bound %}
    <script>
        window.location.href = "https://<your-site-url>/access-restricted";
    </script>
{% else %}
{{ include('create_case') }}
{% endif %}
```

In the **Profile** page: 
```twig
{{ include('styles') }}
{% if not user.is_bound %}
    <script>
        window.location.href = "https://<your-site-url>/access-restricted";
    </script>
{% else %}
{{ include('my_profile') }}
{% endif %}
```

In the **Settings** page: 
```twig
{{ include('styles') }}
{% if not user.is_bound %}
    <script>
        window.location.href = "https://<your-site-url>/access-restricted";
    </script>
{% else %}
[wppb-edit-profile]
{% endif %}
```

#### Page Binding
When you hover over the page name, a menu appears where you should click **Configure Binding**.

For the **Case Details** page, set the parameters below and click Save afterward.

Settings:
1. Choose an entity to bind to: 'Case (wf_case)'
2. Choose how to bind the post: Via GUID in query string

Then, return to the Dataverse Admin area and go to Binding → Page Binding. Under Choose post types to allow binding, check **Pages**. For the Case label, choose the **Case Details** page.

<div class="text--center">
<img src="/images/rs_binding_page.jpg" alt="DataPress Page Binding" width="800" />
</div>

Read more about binding WordPress pages to Dataverse tables using the DataPress plugin [here](https://docs.alexacrm.com/binding/table-binding/).
