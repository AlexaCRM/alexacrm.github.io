---
title: Accessing Choice columns metadata
sidebar_position: 18
slug: /knowledge-base/metadata
tags:
    - Knowledge base
    - Twig
    - DataPress
---

When custom forms include a choice column (previously known as an optionset or a picklist), access to the metadata is required to include all possible values as part of the markup, usually as a SELECT HTML tag.

Dataverse plugin includes global metadata object which is an array of [entity metadata objects](https://learn.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.metadata.entitymetadata?view=dataverse-sdk-latest) indexed by the table name. This objects include attribute metadata including localized labels for all choice column values. For example, the following twig fragment creates a SELECT tag for Gender column using labels in the default language.

```html
<select>
{% for optionMeta in metadata['contact'].Attributes['gendercode'].OptionSet.Options %}
   <option value="{{ optionMeta.Value }}">
      {{ optionMeta.Label.UserLocalizedLabel.Label }}
   </option>
{% endfor %}
</select>
```

In this example metadata['contact'].Attributes['gendercode'] is an [OptionSetMetadata object](https://learn.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.metadata.optionsetmetadata?view=dataverse-sdk-latest) and twig has full access to its properties.