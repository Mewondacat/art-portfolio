import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { selectedWorkProjectIds, siteConfig } from '../config';
import styles from './HomePage.module.css';

const categoryCovers = [
  { projectId: 'project-1', label: 'Illustration', path: '/category/illustrations', layout: 'illustration' },
  { projectId: 'sketch-animal-study', label: 'Sketchbook', path: '/category/sketchbook', layout: 'sketchbook' },
  { projectId: 'sculpture-swan-koi-relief', label: 'Sculpture', path: '/category/sculptures', layout: 'sculpture' },
  { projectId: 'animation-pendulum', label: 'Animation', path: '/category/animation', layout: 'animation' },
  { projectId: 'concept-merow', label: 'Concepts', path: '/category/concepts', layout: 'concepts' },
  { projectId: 'project-8', label: 'Commissions', path: '/category/commissions', layout: 'commissions' }
];

const selectedProjects = selectedWorkProjectIds.flatMap((id) => {
  const project = siteConfig.projects.find((item) => item.id === id);
  return project?.image && !project.contentWarning ? [project] : [];
});

export const HomePage: React.FC = () => {
  const location = useLocation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const covers = categoryCovers.flatMap((cover) => {
    const project = siteConfig.projects.find((item) => item.id === cover.projectId);
    return project?.image ? [{ ...cover, image: project.image, imageAlt: project.imageAlt || cover.label }] : [];
  });

  useEffect(() => {
    let currentIndex = 0;
    const timer = window.setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel || document.hidden || carousel.matches(':focus-within')) return;
      const slides = carousel.querySelectorAll<HTMLAnchorElement>('a');
      if (slides.length < 2) return;
      const atEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 2;
      currentIndex = atEnd ? 0 : (currentIndex + 1) % slides.length;
      const slide = slides[currentIndex];
      const left = slide.getBoundingClientRect().left - carousel.getBoundingClientRect().left
        + carousel.scrollLeft;
      carousel.scrollTo({ left: Math.max(0, left), behavior: currentIndex === 0 ? 'instant' : 'smooth' });
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const rememberArtworkPosition = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const image = event.currentTarget.querySelector('img');
    if (!image) return;
    const { top, left, width, height } = image.getBoundingClientRect();
    sessionStorage.setItem('last_card_rect', JSON.stringify({ top, left, width, height }));
  };

  return (
    <div className={styles.page}>
      <section className={styles.selectedWork} aria-labelledby="selected-work-title" aria-roledescription="carousel">
        <h1 id="selected-work-title" className={styles.selectedTitle}>Gallery</h1>
        <div
          ref={carouselRef}
          className={styles.carousel}
          role="group"
          aria-label="Selected artwork carousel"
          aria-live="off"
        >
          {selectedProjects.map((project, index) => (
            <Link
              key={project.id}
              to={project.path}
              state={{ backgroundLocation: location }}
              onClick={rememberArtworkPosition}
              className={styles.slide}
            >
              <img
                src={project.image}
                alt={project.imageAlt || project.title}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </Link>
          ))}
        </div>
      </section>

      <section id="work" className={styles.workSection} aria-label="Portfolio categories">
        <div className={styles.categoryGrid}>
          {covers.map((cover) => (
            <Link
              key={cover.projectId}
              className={styles.categoryCard + ' ' + styles[cover.layout]}
              to={cover.path}
              aria-label={'Explore ' + cover.label}
            >
              <img src={cover.image} alt={cover.imageAlt} loading="lazy" />
              <span className={styles.categoryShade} />
              <span className={styles.categoryLabel}>
                <strong>{cover.label}</strong>
                <span>View collection <span aria-hidden="true">↗</span></span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
