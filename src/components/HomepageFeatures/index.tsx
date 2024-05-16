import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '100% Web API-based',
    description: (
      <>
        The integration relies on the Dataverse Web API, ensuring a future-proof investment. 
        This approach avoids using outdated technologies and provides a more robust and reliable
        connection between your website and Dataverse.
      </>
    ),
  },
  {
    title: 'Custom Forms and Data Mapping',
    description: (
      <>
        You can create custom forms directly within WordPress.
        These forms can be mapped to Dataverse tables and columns for create or update operations.
        This flexibility allows you to seamlessly capture form submissions and interact with Dataverse data on your website.
      </>
    ),
  },
  {
    title: 'No More Iframes or Third-Party Services',
    description: (
      <>
        The plugin eliminates the need for iframes or third-party services.
        Your website communicates directly with Dataverse, streamlining the integration process.
        No more moving parts means a simpler and more efficient setup.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
