---
title: Elementor
sidebar_label: Elementor
slug: /forms/elementor
sidebar_position: 5
---

import React from 'react';
import {useHistory} from '@docusaurus/router';

export default function Redirect() {
  const history = useHistory();
  React.useEffect(() => {
    history.replace('/addons/elementor/');
  }, []);
  return null;
}