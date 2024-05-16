---
title: Elementor
sidebar_position: 2
premium: true
slug: /addons/elementor
tags:
    - Elementor
    - Datapress
---

<p class="lead">Build your forms and write custom twig code using Elementor!</p>

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

<Highlight color="#25c2a0">Premium feature! This feature is available in the addon to the premium extension.</Highlight>

## Introduction

Our plugin supports Elementor. We offer several widgets that are compatible with Elementor (including Elementor Pro). To edit a form using Elementor, you need to install and activate the 'Dataverse Integration Elementor Extension' plugin. Please note that this functionality is available only with the premium version of our plugin.

<Highlight color="#FDDA0D">*Note:* You may also need to install and activate Elementor Pro.</Highlight>

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

Description: To use this feature, simply select a table and then choose a column from that table which you wish to display.

## Dynamic tags

One of the simplest methods to display a field value for any record is by using dynamic tags. First, configure the binding for the page by selecting a table and the binding method. Then, return to page editing and, in the Elementor Text Editor widget, click the Dynamic Tags button (symbolized by a coins icon). Next, select the 'Dynamic field' option and click the settings button. Now, you can choose any field from which to display a record value.

## Default record in editing mode

You can enter a record GUID to be used as the default record in the page editing context. Simply find the page, click `Configure Binding`, select a table and enter an id in the `Default record` textbox.

