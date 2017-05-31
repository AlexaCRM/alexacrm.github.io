---
title: Twig Templates
---

**Twig templates** give you a powerful tool to create a custom experience for your users.

With [Twig](http://twig.sensiolabs.org/), a flexible, fast, and secure template engine, implemented in **Dynamics 365 Integration** you can display CRM data in WordPress using CRM views, FetchXML queries, as well as sending data back to CRM via forms.

Twig syntax is explained in [Twig documentation](http://twig.sensiolabs.org/doc/2.x/templates.html).

## Features

- *entity binding* -- bind any entity to a page and display relevant record data
- *user binding* -- access record data of the the current [CRM identity](/wpcrm/authentication/)
- *views* -- render CRM views in WordPress, with customizable templates
- *inline FetchXML queries* -- query CRM data and render it in WordPress
- *forms* -- render CRM forms in WordPress, capture submissions and send data back to CRM
- *access any record by ID*
- *extensibility* -- add new tags, functions and filters to the engine with WordPress actions and filters

## Examples

### Entity binding

Configure entity binding for the page as described in [Entity binding](/wpcrm/binding). If the page is bound to an entity, and the respective entity record is found in the CRM, that record will be available as a global `currentrecord` object in Twig templates.

{% raw %}
```
{{ currentrecord.name }}
```
{% endraw %}

### User binding

{% include wpcrm_premium.html %}

Configure authentication for the site as described in [Authentication](/wpcrm/authentication/). If the current user is an identity user, then the global `user` object will be available in Twig templates.

{% raw %}
```
{{ user.emailaddress1 }}
```
{% endraw %}

### Views

### FetchXML queries

### Forms

### Access to records by ID

## Deprecated shortcode

{% include wpcrm_premium.html %}

**Twig templates** give you a powerful tool to create a custom experience for your users.

With [Twig](http://twig.sensiolabs.org/), a flexible, fast, and secure template engine, implemented in Dynamics CRM Integration Premium you can use custom FetchXML queries to fetch data from Dynamics, and print them on the page the way you want.

Twig syntax is explained in [Twig documentation](http://twig.sensiolabs.org/doc/2.x/templates.html).

### Available objects

- `request` -- stores request-related data.
  - `params` -- a collection of cookies, POST and GET values. The latter values override the former.
  - `path` -- the raw path to the page.
  - `path_and_query` -- the raw URI of the page.
  - `query` -- query string prepended with `?` character or empty if no query string.
- `params` -- see `request.params`.
- `now` -- current Unixtime.
- `currentrecord` -- current data-bound entity record. Available only if data binding is configured for the page and the record is found.
- `user` -- entity record tied to the currently logged in user.
- `records` -- collection of entity records retrieved using the FetchXML query.
- `entities` -- allows you to load any CRM entity record by ID.

### Example

The plugin can process two types of blocks: `fetchxml` and `template`.

`fetchxml` block contains a FetchXML query which populates the `records` object with retrieved records. `template` block contains the template which will be rendered on the page.

{% gist wizardist/f93d83c0c67bc7f46814a97d30a345fa %}
