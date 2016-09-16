# alexacrm.github.io

AlexaCRM products documentation.

## Contributing

### Adding pages to an existing section:

1. Create a new page, e. g. `/wpcrm/test.md`.
2. Add the page to `navigation` in `_config.yml`

```yml
navigation:
  wpcrm:
    Introduction: "/wpcrm/" # Existing
    Installation: "/wpcrm/installation/" # Existing
    Test: "/wpcrm/test/" # New
```
Commint & push afterwards.

### Creating a new section

1. Create a new scoped defaults section.

```yml
defaults:
  - scope:
      path: "test"
      type: "pages"
    values:
      layout: documentation
      group: test
      navigation: test
      jumbo_title: "Jumbotron title"
      jumbo_lead: "Jumbotron lead text."
```

Then to add new pages to the section, please refer to [Adding pages to an existing section](#adding-pages-to-an-existing-section). Please update the navigation in the layout as well. As for now it is not generated automatically.
