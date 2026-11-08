import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import styles from './CommissionInfoPage.module.css';

const services = [
  {
    title: 'Surprise Illustration',
    image: siteConfig.projects.find((project) => project.path === '/project/comms1')?.image,
    alt: 'Cat-eared character with golden eyes against a warm yellow background',
    prices: [['Icon', '$50'], ['Bust', '$80'], ['Waist-up', '$90']],
    href: 'https://vgen.co/Mewondacat/service/surprise-illustration/0a1d3d2e-a7d6-48a3-917d-5e45c886b24e'
  },
  {
    title: 'Sketch',
    image: `${import.meta.env.BASE_URL}assets/na.png`,
    alt: 'Red-toned character portrait with golden spiral eyes',
    prices: [['Starting price', 'From $40']],
    href: 'https://vgen.co/Mewondacat/service/surprise-me-sketch/fcd38ca0-84f8-4154-b792-1556b893fe55'
  },
  {
    title: 'Chibi',
    image: `${import.meta.env.BASE_URL}assets/chibi222.png`,
    alt: 'Pink-finned chibi character hugging a white creature',
    prices: [['Chibi', '$20']],
    href: 'https://vgen.co/mewondacat'
  }
];

export const CommissionInfoPage: React.FC = () => (
  <section className={styles.page} aria-labelledby="commission-info-title">
    <header className={styles.intro}>
      <h1 id="commission-info-title">Commission Info</h1>
    </header>
    <div className={styles.sections}>
      {services.map((service) => (
        <section key={service.title} className={styles.service} aria-label={service.title}>
          <img className={styles.example} src={service.image} alt={service.alt} />
          <h2>{service.title}</h2>
          <dl className={styles.prices}>
            {service.prices.map(([label, price]) => (
              <div key={label}><dt>{label}</dt><dd>{price}</dd></div>
            ))}
          </dl>
          <a className={styles.requestLink} href={service.href} target="_blank" rel="noopener noreferrer">Request on VGen ↗</a>
        </section>
      ))}
    </div>
    <section className={styles.contact} aria-labelledby="commission-contact-title">
      <h2 id="commission-contact-title">Contact</h2>
      <div className={styles.contactLinks}>
        {siteConfig.socialLinks?.vgen && (
          <a href={siteConfig.socialLinks.vgen} target="_blank" rel="noopener noreferrer">Visit VGen ↗</a>
        )}
        {siteConfig.socialLinks?.email && (
          <a href={`mailto:${siteConfig.socialLinks.email}`}>{siteConfig.socialLinks.email}</a>
        )}
      </div>
      <Link className={styles.artLink} to="/category/commissions">View commission art ↗</Link>
    </section>
  </section>
);
