---
title: 3rd-party Plugins
sidebar_position: 12
slug: /3rd-party-plugins
tags:
    - Gravity Forms
    - Contact form 7
    - Ninja
    - Dynamics 365 Integration
---


export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<Highlight color="#25c2a0">Premium feature! This feature is available in the premium extension.</Highlight>

**Dynamics 365 Integration Premium** provides a few extensions for other WordPress plugins and enables them to integrate with Dynamics 365.

## Contact Form 7

[Contact From 7](https://wordpress.org/plugins/contact-form-7/) allows you to capture form data on the website. Dynamics 365 Integration Premium extends upon that and allows sending this data straight to the CRM.

### Usage

After installing and activating the plugin, the Contact Form 7 tag generator will have 2 new tag types: "CRM field" and "CRM Lookup field". Most of the options will be familiar to Contact Form 7 users.

![CRM fields in the CF7 tag generator](./img/3rd-party_cf7-fields.jpg)

The newly added tags are:

- *CRM Field* -- represents a CRM field
- *CRM Lookup Field* -- represents a CRM lookup field

Before you start adding CRM fields to the form, you must first specify which entity this form belongs to.

1. Go to the **Additional Settings** tab.
1. Add `entity: <EntityName>` to the end of the field, where `<EntityName>` is the logical name of a CRM entity, no brackets (e.g. `contact`, `account`, `lead`, etc.)

After the form entity is configured, you can go back to the **Form** tab to add tags to the form.

#### CRM Field
 
This tag allows you to map a CF7 form control to a CRM field. Data entered in this field will end up in the corresponding CRM field.
 
 ![CRM field in the CF7 tag generator](./img/3rd-party_cf7-crm-field.png)

Both `msdyncrm` and `msdyncrm*` are used as CRM fields. By CF7's convention, the asterisk means that the field is required.

**id**<br></br>
`id` attribute value of the form control (`input`, `textarea`, etc.)<br></br>
Example: `id:foo`

**class**<br></br>
`class` attribute value of the form control. To set two or more classes, you may use this option multiple times.<br></br>
Example: `class:bar class:baz`

**field**<br></br>
Attribute name of the specified entity.<br></br>
Example: `field:emailaddress1`

**placeholder**<br></br>
[Placeholder text](https://contactform7.com/setting-placeholder-text/) of the form control.

**wpcrm-boolean**<br></br>
Type of control for boolean CRM attributes. `radio` (default) and `checkbox` are supported as values.

**default**<br></br>
Default value of the form control.<br></br>
Examples:
`querystring.parameter` -- will fill the control with the URL query argument "parameter".
`currentuser` -- will fill the control with the current user ID. See [Authentication](./authentication.md).
`currentuser.emailaddress1` -- will fill the control with the e-mail address for the current user. See [Authentication](./authentication.md).

The full example would look like this:

```php
[msdyncrm* msdyncrm-77 id:emailaddress1 class:email field:emailaddress1 placeholder "test@example.com"]

[msdyncrm* msdyncrm-78 field:donotemail wpcrm-boolean:checkbox]
```

#### CRM Lookup Field

This tag allows you to add entity lookup controls to a CF7 form. Lookup input will be displayed as a dropdown control with values specified either explicitly or via a CRM view.
 
`msdyncrm_lookup` and `msdyncrm_lookup*` are the tags that represent the CRM lookup field. By CF7's convention, the asterisk means that the field is required.

![CRM lookup field in the CF7 tag generator](./img/3rd-party_cf7-crm-lookup-field.jpg)

**id**<br></br>
`id` attribute value of the form control (`input`, `textarea`, etc.)<br></br>
Example: `id:foo`

**class**<br></br>
`class` attribute value of the form control. To set two or more classes, you may use this option multiple times.<br></br>
Example: `class:bar class:baz`

**field**<br></br>
Lookup attribute name of the specified entity.<br></br>
Example: `field:transactioncurrencyid`

**view**<br></br>
Name of the view that will populate values in the dropdown.<br></br>
Example: `view:Currency Lookup View`

**values**<br></br>
Map of ID/label if no view has been specified.<br></br>
Examples:
`":none"` (empty label, i.e. default)
`"0D9140A8-265D-E511-80E9-C4346BC516E8:Australian Dollar"`

**lookuptype**<br></br>
Used to restrict lookup types to a single entity.<br></br>
Example: `lookuptype:transactioncurrency`

The full example would look like this:

```php
[msdyncrm_lookup msdyncrm_lookup-161 field:transactioncurrencyid view:Currency Lookup View lookuptype:transactioncurrency]
[msdyncrm_lookup msdyncrm_lookup-846 field:transactioncurrencyid ":none" "0D9140A8-265D-E511-80E9-C4346BC516E8:Australian Dollar"]
```

### Additional settings

You can specify additional settings for each contact form by adding code snippets in the specific format into the Additional Settings field in the contact form's edit screen.

**entity**<br></br>
Specifies the entity to create new records for.<br></br> 
Example: `entity: lead`

**crm_error_message**<br></br>
Message text if record creation failed.<br></br>
Example: `crm_error_message: Houston, we have a problem`

**commonfield**<br></br>
Field that will receive aggregated values from all form fields not bound to CRM, e.g. default CF7 tags.<br></br>
Example: `commonfield: description`

**fields_map**<br></br>
Allows to map non-CRM CF7 tags to CRM attributes.<br></br> 
Example: `fields_map: {your-name:firstname1}{your-email:emailaddress1}`

## Gravity Forms

[Gravity Forms](https://www.gravityforms.com/) plugin provides custom forms with a robust UI. **Dynamics 365 Integration Premium** enables Gravity Forms to create new records in CRM easily.

### Usage

1. Create a new Gravity Form or choose an existing one.
1. Navigate to the form editor.
1. Point to **Form Settings** and click **Dynamics 365 Plugin**

   ![Dynamics 365 Integration in the Gravity Forms settings menu](./img/3rd-party_gf-menu.png)

1. Click **Add New** to create a new feed to Dynamics 365.

   ![List of feeds in the Gravity Forms settings](./img/3rd-party_gf-new-feed.png)

1. Enter the **Feed Name**, select an action (create or update), and choose the entity.

   ![Dynamics 365 Integration settings for a Gravity Forms form](./img/3rd-party_gf-feed-settings1.png)

1. In the next section, you need to map CRM fields (on the left) to corresponding form fields (on the right).

   ![Dynamics 365 field mapping for a Gravity Forms form](./img/3rd-party_gf-feed-settings2.png)

1. Click **Update Settings**.

### Lookup Selects

Lookup Select controls allow to capture and surface lookup attributes on your form.

1. Drag&drop a **Lookup Select** control from the **Advanced** collection of Gravity Forms controls onto the form.
1. Reveal the **Advanced** tab of the control settings, select the entity name of the corresponding CRM lookup attribute, enter the view name which will be used to populate the select options.
1. Go to the Dynamics 365 feed settings to map the added control to the corresponding CRM attribute. (See *Usage* section above.)

To specify a default value, enter the GUID of the desired record into the **Default Value** field on the Advanced tab.

![Configuring a lookup select control in Gravity Forms.](./img/3rd-party_gf-lookup.png)

### Capture attachments

If you would like to capture files submitted via Gravity Forms into record notes follow the steps.

1. Add a **File Upload** control to the form. (Placed in the "Advanced Fields" tab.)
1. In the Dynamics 365 Feed settings, add a new row to the **Map Fields** section, in the dropdown on the left pick the last item, **Add Custom Key**. The key must start with `_attachment` (e.g. `_attachment1`) and must be unique among other attachment fields. Hence the possibility to upload multiple files to CRM simultaneously.

The attachments will be uploaded to CRM as notes for the newly created record.

## Ninja Forms

Ninja Forms integration is provided with Dynamics 365 Premium.

1. Add Ninja Forms controls to the form.
   - *Lookup Select* control allows to add a dropdown with Dynamics 365 records. Default value is set via the *Default record ID* field, e.g. `contact,1900bd7a-c6b8-e711-8112-5065f38a1b01`.
   - Hidden field may be used to preset a CRM field. 
1. Add the *Send to Dynamics 365* action. Pick the entity and the action (create / update).
   - If you choose the *update* action, [Entity Binding](./binding.md) record is chosen for update. Existing record field values are pulled into mapped fields. 
1. Configure the field map in the action. Ninja Forms fields are in the left column. Dynamics 365 fields are in the right column.

### Lookup Select records source

Two options exist for the Lookup Select records source: View and Twig.

View is simple -- pick the entity and corresponding view to populate the dropdown.

Choose the Twig option for more advanced scenarios. For example, you could parameterize the dropdown. For example:

```php
{% fetchxml collection="records" %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" >
  <entity name="account" >
    <attribute name="name" ></attribute>
    <attribute name="accountid" ></attribute>
    <order attribute="name" ></order>
    <filter>
      <condition attribute="address1_city" operator="eq" value="{{params.city}}" ></condition>
    </filter>
  </entity>
</fetch>
{% endfetchxml %}
{% set result = [] %}
{% for account in records.results.entities %}
{% set result = result|merge( [ { LogicalName: "account", Id: account.id, DisplayName: account.name } ] ) %}
{% endfor %}
{{ result|json_encode|raw }}
```

The *for-in* loop populates the `result` collection with entity references, and then a JSON is returned. You can use a different FetchXML query or even construct a JSON manually with hard-coded references.
