import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { AboutPage } from '../pages/AboutPage';
import { ComingSoonPage } from '../pages/ComingSoonPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { selectedWorkProjectIds, siteConfig } from '../config';

describe('art portfolio gallery pages', () => {
  it('combines the selected portrait and contact form on the About page', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Portrait of Sandra Suh' }))
      .toHaveAttribute('src', '/assets/about-sandra.jpg');
    expect(screen.getByText(/currently studying Illustration & Animation at California State University/i))
      .toBeInTheDocument();
    expect(screen.getByText(/pushing my limits as an artist and challenging myself/i))
      .toBeInTheDocument();
    expect(screen.getByText(/For inquiries, collaborations, or freelance projects/i))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('provides an unlisted Coming Soon page with a way back and the contact form', () => {
    render(
      <MemoryRouter>
        <ComingSoonPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Coming Soon!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('leads with selected artwork and keeps all category galleries easy to reach', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const selected = screen.getByRole('region', { name: 'Selected Work' });
    expect(within(selected).getByRole('heading', { level: 1, name: 'Selected Work' })).toBeInTheDocument();
    expect(screen.queryByText(/A curated selection of my illustrations/i)).not.toBeInTheDocument();
    expect(within(selected).getAllByRole('img')).toHaveLength(8);
    expect(within(selected).getAllByRole('link').map((link) => link.getAttribute('href')))
      .toEqual(selectedWorkProjectIds.map((id) => siteConfig.projects.find((project) => project.id === id)?.path));
    expect(within(selected).getByRole('img', { name: /FFXIV original character/i }))
      .toHaveAttribute('src', '/assets/ffxiv_oc.jpg');
    expect(within(selected).getByRole('img', { name: /golden spiral eyes/i }))
      .toHaveAttribute('src', '/assets/na.png');
    expect(within(selected).getByRole('img', { name: /Black-and-white close-up portrait/i }))
      .toHaveAttribute('src', '/assets/aa.png');
    expect(screen.queryByText('Figure Drawing / Nudity')).not.toBeInTheDocument();

    const collections = screen.getByRole('region', { name: 'Portfolio categories' });
    expect(within(collections).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/category/illustrations',
      '/category/sketchbook',
      '/category/sculptures',
      '/category/animation',
      '/category/concepts',
      '/category/commissions'
    ]);
    expect(screen.queryByRole('link', { name: 'Explore work' })).not.toBeInTheDocument();
  });

  it('rotates the carousel every five seconds and clears its timer when leaving', () => {
    vi.useFakeTimers();
    try {
      const { unmount } = render(<MemoryRouter><HomePage /></MemoryRouter>);
      const carousel = screen.getByRole('group', { name: 'Selected artwork carousel' });
      const scrollTo = vi.fn();
      Object.defineProperty(carousel, 'scrollTo', { value: scrollTo });
      Object.defineProperty(carousel, 'clientWidth', { value: 500 });
      Object.defineProperty(carousel, 'scrollWidth', { value: 4500 });
      act(() => vi.advanceTimersByTime(5000));
      expect(scrollTo).toHaveBeenCalledWith({ left: expect.any(Number), behavior: 'smooth' });
      unmount();
      act(() => vi.advanceTimersByTime(5000));
      expect(scrollTo).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('opens a selected artwork and returns to Selected Work with the viewer back button', () => {
    vi.useFakeTimers();
    try {
      render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      const selected = screen.getByRole('region', { name: 'Selected Work' });
      fireEvent.click(within(selected).getByRole('img', { name: /Winged celestial character/i }).closest('a')!);
      expect(screen.getByRole('button', { name: /back/ })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /Winged celestial character/i }))
        .toHaveAttribute('src', '/assets/athena.png');

      fireEvent.click(screen.getByRole('button', { name: /back/ }));
      act(() => vi.advanceTimersByTime(300));
      expect(screen.getByRole('heading', { name: 'Selected Work' })).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('shows the physical studies together in the Sketchbook gallery', () => {
    render(
      <MemoryRouter initialEntries={['/category/sketchbook']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'SKETCHBOOK' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /skull topped by a butterfly/i }))
      .toHaveAttribute('src', '/assets/sketch-skull-butterfly.jpg');
    expect(screen.getByRole('img', { name: /close view of a pair of eyes/i }))
      .toHaveAttribute('src', '/assets/sketch-animal-study.jpg');
    expect(screen.getByRole('img', { name: /photographic reference used for the study/i }))
      .toHaveAttribute('src', '/assets/traditional-cat-reference.jpg');
    expect(screen.getByRole('img', { name: /fantasy sword surrounded by green leaves/i }))
      .toHaveAttribute('src', '/assets/traditional-sword.jpg');
    expect(screen.getByRole('img', { name: /Adventure Time-inspired style/i }))
      .toHaveAttribute('src', '/assets/traditional-adventure-time-style.jpg');
    expect(screen.getByRole('img', { name: /Pencil figure study of a seated woman/i }))
      .toHaveAttribute('src', '/assets/sketchbook-seated-figure-study.png');
    expect(screen.getByRole('img', { name: /nude standing male figure/i }))
      .toHaveAttribute('src', '/assets/sketchbook-standing-male-figure-study.png');
    expect(screen.getByRole('img', { name: /nude standing figure and two detailed feet/i }))
      .toHaveAttribute('src', '/assets/sketchbook-figure-foot-anatomy-study.png');
    expect(screen.getAllByText('Figure Drawing / Nudity')).toHaveLength(3);

    const seatedStudy = screen.getByRole('img', { name: /Pencil figure study of a seated woman/i });
    fireEvent.click(seatedStudy.closest('a')!);

    expect(screen.getAllByText('Figure Drawing / Nudity')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'SKETCHBOOK' })).toBeInTheDocument();
  });

  it('places the Axel fan art in Illustration', () => {
    render(
      <MemoryRouter initialEntries={['/category/illustrations']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'ILLUSTRATIONS' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Axel from Kingdom Hearts/i }))
      .toHaveAttribute('src', '/assets/axel-fanart.png');
    expect(screen.getByRole('img', { name: /dark-haired character wearing pink sunglasses/i }))
      .toHaveAttribute('src', '/assets/illustration-10.png');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/illustration1',
      '/project/illustration2',
      '/project/illustration3',
      '/project/illustration4',
      '/project/illustration5',
      '/project/illustration6',
      '/project/illustration7',
      '/project/illustration8'
    ]);
    expect(screen.queryByRole('img', { name: /skull topped by a butterfly/i })).not.toBeInTheDocument();
  });

  it('shows the sculpture work only in the Sculptures gallery', () => {
    render(
      <MemoryRouter initialEntries={['/category/sculptures']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'SCULPTURES' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Front view of a wearable cardboard creature/i }))
      .toHaveAttribute('src', '/assets/sculpture-creature-front.jpg');
    expect(screen.getByRole('img', { name: /Profile view of a wearable cardboard creature/i }))
      .toHaveAttribute('src', '/assets/sculpture-creature-profile.jpg');
    expect(screen.getByRole('img', { name: /white swan standing over a pond/i }))
      .toHaveAttribute('src', '/assets/sculpture-swan-koi-relief.png');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/sculpture1',
      '/project/sculpture2',
      '/project/sculpture3'
    ]);
    expect(screen.queryByText('Wearable Cardboard Creature — Front View')).not.toBeInTheDocument();
    expect(screen.queryByText('Wearable Cardboard Creature — Profile View')).not.toBeInTheDocument();
  });

  it('shows the three style pieces and the landing artwork in Concepts', () => {
    render(
      <MemoryRouter initialEntries={['/category/concepts']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'CONCEPTS' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /debating sushi over the phone/i }))
      .toHaveAttribute('src', '/assets/merow.png');
    expect(screen.getByRole('img', { name: /posing with drinks and a cat/i }))
      .toHaveAttribute('src', '/assets/concept-example.png');
    expect(screen.getByRole('img', { name: /standing together in front of an arched window/i }))
      .toHaveAttribute('src', '/assets/concept-window-portrait.png');
    expect(screen.getByRole('img', { name: /posed beside a television/i }))
      .toHaveAttribute('src', '/assets/concept.jpg');
    expect(screen.getByRole('img', { name: /dark purple-toned scene/i }))
      .toHaveAttribute('src', '/assets/concept2.png');
    expect(screen.getByRole('img', { name: /dark teal game-inspired scene/i }))
      .toHaveAttribute('src', '/assets/concept3.jpg');
    expect(screen.getByRole('img', { name: /Adventures of Bingus cover/i }))
      .toHaveAttribute('src', '/assets/concept-adventures-of-bingus.jpg');
    expect(screen.getByRole('img', { name: /cowboy character wearing two stacked hats/i }))
      .toHaveAttribute('src', '/assets/concept-cowboy-character.png');
    expect(screen.getByRole('img', { name: /Cat-eared maid posing with Mudkip/i }))
      .toHaveAttribute('src', '/assets/commission-tenko.png');
    expect(screen.getByRole('img', { name: /standing beneath gothic arches on a moonlit balcony/i }))
      .toHaveAttribute('src', '/assets/illustration-va.png');
    expect(screen.getByRole('img', { name: /black dress on a beach/i }))
      .toHaveAttribute('src', '/assets/concept-beach-help.jpg');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/concept1',
      '/project/concept2',
      '/project/concept3',
      '/project/concept4',
      '/project/concept5',
      '/project/concept6',
      '/project/concept7',
      '/project/concept8',
      '/project/concept9',
      '/project/concept10',
      '/project/concept11',
      '/project/concept12',
      '/project/concept13',
      '/project/concept14'
    ]);
  });

  it('keeps the Tenko artwork out of Commissions', () => {
    render(
      <MemoryRouter initialEntries={['/category/commissions']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'COMMISSIONS' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Cat-eared maid posing with Mudkip/i }))
      .not.toBeInTheDocument();
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/comms1',
      '/project/comms2',
      '/project/comms3',
      '/project/comms4',
      '/project/comms5',
      '/project/comms6',
      '/project/comms7',
      '/project/comms8',
      '/project/comms9'
    ]);
  });

  it('shows the new portraits only in Illustrations', () => {
    render(
      <MemoryRouter initialEntries={['/category/illustrations']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /golden spiral eyes/i }))
      .toHaveAttribute('src', '/assets/na.png');
    expect(screen.getByRole('img', { name: /Black-and-white close-up portrait/i }))
      .toHaveAttribute('src', '/assets/aa.png');
    expect(screen.queryByRole('img', { name: /FFXIV original character/i }))
      .not.toBeInTheDocument();
  });

  it('shows the new FFXIV original character only in Commissions', () => {
    render(
      <MemoryRouter initialEntries={['/category/commissions']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /FFXIV original character/i }))
      .toHaveAttribute('src', '/assets/ffxiv_oc.jpg');
    expect(screen.queryByRole('img', { name: /golden spiral eyes/i }))
      .not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Black-and-white close-up portrait/i }))
      .not.toBeInTheDocument();
  });

  it('shows the pendulum GIF as the only Animation example', () => {
    render(
      <MemoryRouter initialEntries={['/category/animation']}>
        <Routes>
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'ANIMATION' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pendulum character swinging/i }))
      .toHaveAttribute('src', '/assets/pendulum_finalized.gif');
    expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/project/animation1'
    ]);
  });
});
