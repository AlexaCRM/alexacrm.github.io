import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';

import styles from './HomepageHeader.module.css';

export default function HomepageHeader(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3> DataPress</h3>
            <p>Cloud-native integration for WordPress and Dataverse.</p>
            <Link className="button button--primary button--sm" to="/getting-started">
              Read Documentation
            </Link>
          </div>

          <div className={styles.card}>
            <h3> On-Premises (v1)</h3>
            <p>Legacy integration for self-hosted WordPress and Dynamics CRM.</p>
            <Link className="button button--primary button--sm" to="/wpcrm/quickstart">
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
