---
title: Twig Templates
---

{% include wpcrm_premium.html %}

**Twig templates** give you a powerful tool to create a custom experience for your users.

With [Twig](http://twig.sensiolabs.org/), a flexible, fast, and secure template engine, implemented in Dynamics CRM Integration Premium you can use custom FetchXML queries to fetch data from Dynamics, and print them on the page the way you want.

Twig syntax is explained in [Twig documentation](http://twig.sensiolabs.org/doc/2.x/templates.html).

## Available objects

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

## Example

{% gist wizardist/f93d83c0c67bc7f46814a97d30a345fa %}

The plugin can process two types of blocks: `fetchxml` and `template`.

`fetchxml` block contains a FetchXML query which populates the `records` object with retrieved records. `template` block contains the template which will be rendered on the page.
