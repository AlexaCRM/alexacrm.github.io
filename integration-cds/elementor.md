---
title: Elementor Support
permalink: /integration-cds/elementor/
premium: true
---

<p class="lead">Build your forms and write custom twig code using Elementor!</p>

## Introduction

Our plugin supports Elementor. We provide several widgets to work with Elementor. To edit form with Elementor you need to install and activate the `Dataverse Integration Elementor Extension` plugin. This functionality is available only for premium plugin version.

*Note:* You also need to install and activate Elementor Pro. {% include icds_premium.html %}

## Form widget

Widget Name - `Form`

Category - `Pro`

Description: It is a native form of Elementor, but you should add `Send to Dataverse` action after submit.

All you need to do is drag the `Form` widget into the content area, create  the necessary fields and Save their ID. Next, navigate to `Actions After Submit`, click `+` and add the `Send to Dataverse` action.  Then, select the `Send to Dataverse` menu section and choose a table from the `Table` dropdown.

After selecting an action, for example `create`, you need to add `Fields Mapping`. Click `+ADD ITEM`. Here, fill in `Form field` (which is the field ID that was saved previously) and `Table column` (which is the logical name for the column) for each field.


## Twig widget

Widget Name - `Twig Template`

Category - `Dataverse`

Description: A simple and visual widget. Write your twig code and you will immediately see the generated content in the content area.


## Field widget

Widget Name - `Dataverse Field`

Category - `Dataverse`

Description: To utilize this feature, locate the page first and click on `Configure binding`. From the dropdown, select the desired table. Afterwards, while in Elementor editing page mode, you can select the specific fields from this table that you wish to display on the page.
