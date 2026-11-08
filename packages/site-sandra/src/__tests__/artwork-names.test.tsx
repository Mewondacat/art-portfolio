import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { siteConfig } from '../config';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { CommissionInfoPage } from '../pages/CommissionInfoPage';

const CurrentPath = () => <output data-testid="current-path">{useLocation().pathname}</output>;

describe('standard artwork naming', () => {
  it('uses sequential, unique names and URLs in every section', () => {
    const names: Record<string, [string, string]> = {
      illustrations: ['illustration', 'Illustration'],
      commissions: ['comms', 'Commission'],
      concepts: ['concept', 'Concept'],
      sketchbook: ['sketchbook', 'Sketchbook'],
      sculptures: ['sculpture', 'Sculpture'],
      animation: ['animation', 'Animation']
    };
    for (const [category, [prefix, label]] of Object.entries(names)) {
      siteConfig.projects.filter((project) => project.category === category).forEach((project, index) => {
        expect(project.title).toBe(label + ' ' + (index + 1));
        expect(project.path).toBe('/project/' + prefix + (index + 1));
      });
    }
    expect(new Set(siteConfig.projects.map((project) => project.path)).size).toBe(siteConfig.projects.length);
  });

  it.each(siteConfig.projects)('opens the canonical URL for $title', (project) => {
    render(
      <MemoryRouter initialEntries={[project.path]}>
        <CurrentPath />
        <Routes><Route path="/project/:id" element={<ProjectDetailPage />} /></Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('current-path')).toHaveTextContent(project.path);
    expect(screen.getByRole('img')).toHaveAttribute('src', project.image);
    expect(screen.getByRole('link', { name: 'prev' }).getAttribute('href'))
      .toMatch(/^\/project\/(?:illustration|comms|concept|sketchbook|sculpture|animation)\d+$/);
    expect(screen.getByRole('link', { name: 'next' }).getAttribute('href'))
      .toMatch(/^\/project\/(?:illustration|comms|concept|sketchbook|sculpture|animation)\d+$/);
  });

  it.each(siteConfig.projects)('preserves the old link for $id', (project) => {
    render(
      <MemoryRouter initialEntries={['/project/' + project.id]}>
        <CurrentPath />
        <Routes><Route path="/project/:id" element={<ProjectDetailPage />} /></Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('current-path')).toHaveTextContent(project.path);
    expect(screen.getByRole('img')).toHaveAttribute('src', project.image);
  });
});

describe('Commission Info pricing', () => {
  it('shows the confirmed services, prices, examples, and contact links', () => {
    render(<MemoryRouter><CommissionInfoPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Commission Info' })).toBeInTheDocument();
    for (const heading of ['Surprise Illustration', 'Sketch', 'Chibi']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
    for (const price of ['$50', '$80', '$90', 'From $40', '$20']) {
      expect(screen.getByText(price)).toBeInTheDocument();
    }
    expect(screen.queryByText(/Draft template/)).not.toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /Request on VGen/ })).toHaveLength(3);
    expect(screen.getByRole('link', { name: /Visit VGen/ })).toHaveAttribute('href', 'https://vgen.co/mewondacat');
    expect(screen.getByRole('link', { name: 'mewondacat@gmail.com' })).toHaveAttribute('href', 'mailto:mewondacat@gmail.com');
    expect(screen.getByRole('link', { name: /View commission art/ })).toHaveAttribute('href', '/category/commissions');
  });
});
