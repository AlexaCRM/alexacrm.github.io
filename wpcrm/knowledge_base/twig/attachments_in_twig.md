---
title: Attachments in twig
slug: /knowledge-base/attachments-in-twig
sidebar_position: 25
tags:
    - Knowledge base
    - Twig
    - Attachment
    - Dynamics 365 Integration
---

The attachments stored in annotation entity are accessible using a special purpose-built URL:

```http
https://www.yoursite.com/wp-admin/admin-ajax.php?action=msdyncrm_attachment&id=annotationid​​​​
```

where `annotationid` contains the record id of the record containing the attachment. For example

```http
https://www.yoursite.com/wp-admin/admin-ajax.php?action=msdyncrm_attachment
&id=92e12768-1077-495b-9116-f6095f567ba4
```

The following twig fragment displays a list of attachments for the current record (defined via entity binding):

```twig
{​​​​​% fetchxml collection="files" cache="PT30M" %}​​​​​
<fetch mapping="logical">
  <entity name="annotation" >
    <attribute name="annotationid" />
    <attribute name="filename" />
    <attribute name="mimetype" />
    <filter>
      <condition attribute="isdocument" operator="eq" value="1" />
<!- - optional condition filtering on entity typecode
      <condition attribute="objecttypecodename" operator="eq" value="salesorder" /> 
-->
      <condition attribute="objectid" operator="eq" value="{​​​​​{​​​​​currentrecord.id}​​​​​}​​​​​" />
    </filter>
  </entity>
</fetch>
{​​​​​% endfetchxml %}​​​​​
<ul>
{​​​​​% for file in files.results.entities %}​​​​​
<li>
  <a 
href="/wp-admin/admin-ajax.php?action=msdyncrm_attachment&id={​​​​​{​​​​​file.annotationid}​​​​​}​​​​​">{​​​​​{​​​​​file.filename}​​​​​}
  ​​​​​</a>
</li>
{​​​​​% endfor %}​​​​​
</ul>
```