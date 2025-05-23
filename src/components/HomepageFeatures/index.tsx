import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Multiple Providers',
    Svg: require('@site/static/img/1.svg').default,
    description: (
      <>
        Access almost all streaming providers on aniworld.to.
      </>
    ),
  },
  {
    title: 'Syncplay Support',
    Svg: require('@site/static/img/2.svg').default,
    description: (
      <>
        Enjoy synchronized anime viewing with friends using our seamless Syncplay integration.
      </>
    ),
  },
  {
    title: 'Aniskip Support',
    Svg: require('@site/static/img/3.svg').default,
    description: (
      <>
        Effortlessly skip anime intros and outros with Aniskip integration.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
