---
title: Upload attachments in twig forms
sidebar_position: 24
tags:
    - Knowledge base
    - Code
    - Attachment
    - Dynamics 365 Integration
---

To add attachment uploads to Twig forms, you need to build a custom form layout with an input file control and an upload handler.

**Template**

Default plugin template is called `form.twig` and is located in the `plugins/integration-dynamics/templates/twig` folder. Copy the content of that file and paste it between `{% form %}` and `{% endform %}` tags so that the twig code looks like the following (for the plugin version 1.3.2 or lower):

```
[msdyncrm_twig]
{% form %}
{% spaceless %}
{% if form.submission and form.status %}
<div class="row">
  <div class="col-12">
    <div class="alert alert-success">

... more lines here ...

{% endspaceless %}
{% endform %}
[/msdyncrm_twig]
```

Or like the following for the plugin version 1.3.3 or higher:

```
[msdyncrm_twig]
{% form %}
{% apply spaceless %}
{% if form.submission and form.status %}
<div class="row">
  <div class="col-12">
    <div class="alert alert-success">

... more lines here ...

{% endapply %}
{% endform %}
[/msdyncrm_twig]
```

Alternatively, create your custom form layout (works great for small forms). In either case don’t forget to add enctype=`"multipart/form-data"` to `<form>` tag so that it works with the file uploads:

```
<form method="post" id="form-{{ form.id }}" enctype="multipart/form-data">
```

Add input file controls and give them distinct names

```
<input type="file" name="file-1">
<input type="file" name="file-2">
```

It is also a good idea to add a hidden control to identify the form in case you have multiple forms on your site or even on the same page:

```
<input type="hidden" name="__formid" value="1234-6789">
```

**Code handler**

Add the following code to your `functions.php` file. This code will create an annotation record for each of the uploaded files and attach the file content to it.

```
add_action( 'wordpresscrm_twig_form_submit_success', function( 
            \AlexaCRM\WordpressCRM\Form\Model $model,
            \AlexaCRM\CRMToolkit\Entity $record ) {​​​​
    $files = ACRM()->request->files;
    $fields = ACRM()->request->request;
    $sdk = ACRM()->getSdk();
    if ( $fields->get( '__formid' ) !== '1234-6789' ) {​​​​
        return;
    }​​​​
    $subjectLines = [
        'file-1' => 'File name 1',
        'file-2' => 'File name 2'
    ];
    foreach ( [ 'file-1', 'file-2' ] as $field ) {​​​​
        $file = $files->get( $field );
        if ( !( $file instanceof \Symfony\Component\HttpFoundation\File\UploadedFile ) ) {​​​​
            continue;
        }​​​​
        $annotation = $sdk->entity( 'annotation' );
        $annotation->objectid = $record;
        $annotation->subject = $subjectLines[$field];
        $annotation->documentbody = base64_encode( file_get_contents( $file->getRealPath() ) );
        $annotation->mimetype = $file->getMimeType();
        $annotation->filename = $file->getClientOriginalName();
        $sdk->create( $annotation );
    }​​​​
}​​​​, 10, 2 );
```

