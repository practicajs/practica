import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Generate a Node.js app that is packed with best practices AND simplicty in mind. Based on our repo <a href="https://github.com/goldbergyoni/nodebestpractices">Node.js best practices</a> (77,000 stars)
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Practica.js lets you focus on your functionality, we&apos;ll handle everything around it
      </>
    ),
  },
  {
    title: 'Understand our choices',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Every decision we make is fully documented and provides full transparency on our decision making process
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
