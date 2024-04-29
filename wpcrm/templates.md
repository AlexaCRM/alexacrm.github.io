---
title: Templates
sidebar_position: 7
tags:
    - Templates
    - Dynamics 365 Integration
---

*Dynamics CRM Integration* template files contain the markup and template structure for the front-end of your site. If you open these files, you will notice that they all contain hooks that allow you to add/move content without editing the template files themselves. Plugin template files shouldn't be touched because changes would be lost during the next plugin update.

Template files can be found in the `templates` directory inside the plugin (e.g. `/wp-content/plugins/integration-dynamics/templates`). You can edit these files in an upgrade-safe way using overrides. Copy the contents of this directory into a directory within your theme named `wordpress-crm`, keeping the same file structure: `/wp-content/themes/theme-name/wordpress-crm/`. The copied files will now override default template files.

## Using custom templates

There are two ways to add custom templates:

1. Create a directory `wordpress-crm` in your active theme directory and add the templates you need.
2. Use `wordpresscrm_locate_template` [filter](./hooks.md) to add a custom template path. Filter handler would look like this:

```twig
{% gist wizardist/f5af58b315616699dc275306d1fecffe %}
```
