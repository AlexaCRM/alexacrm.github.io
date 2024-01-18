---
title: Elementor Support
permalink: /integration-cds/elementor/
premium: true
---

<p class="lead">Build your forms and write custom twig code using Elementor!</p>

## Introduction

Our plugin supports Elementor. We provide several widgets to work with Elementor (including Elementor Pro). To edit form with Elementor you need to install and activate the `Dataverse Integration Elementor Extension` plugin. This functionality is available only for premium plugin version.

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

Description: To use it you need just to choose a table and a column from this table, which you want to display.

## Dynamic tags

One of the simplest ways to display a field value for any record is to use dynamic tags. 
You need to configure binding for the page (choose a table and a way how to bind). Then go back to the page editing and in the Elementor Text Editor widget, click the Dynamic Tags button (coins icon). Here you need to choose the `Dynamic field` option and click the settings button. Now you can choose any field to display a record value.

## Default record in editing mode

You can enter a record GUID to be used as the default record in the page editing context. Simply find the page, click `Configure Binding`, select a table and enter an id in the `Default record` textbox.
