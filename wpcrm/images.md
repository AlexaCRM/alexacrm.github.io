---
title: Images
---

Integration Dynamics provides means to show images stored in Dynamics 365, including entity images and annotation images.

## Annotation images

Annotation images are exposed via a crafted URL, which includes GUID of the annotation that holds the image.

Original image is downloaded, and you may request a downsized copy (a thumbnail) by specifying the optional `width` argument -- the image will be scaled proportionally.

```
/wp-admin/admin-ajax.php?action=msdyncrm_image&id=dfa55463-a9b1-4180-a8ff-e2967c6bc3a4&width=300
```

## Images from custom entities

If you store Dynamics 365 images inside custom entities, you can refer to `src/Image/AnnotationImage.php` in order to write a similar image retrieval endpoint with caching and scaling capabilities.
