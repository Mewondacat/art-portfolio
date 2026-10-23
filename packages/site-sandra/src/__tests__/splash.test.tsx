import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Footer } from '@portfolio/shared';
import { App } from '../App';
import { siteConfig } from '../config';

const expectSocialLinks = () => {
  for (const [label, href] of [
    ['Bluesky', 'https://bsky.app/profile/mewondacat.bsky.social'],
    ['VGen', 'https://vgen.co/mewondacat']
  ]) {
    const link = screen.getByRole('link', { name: label });
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  expect(screen.getByRole('link', { name: 'Email' }))
    .toHaveAttribute('href', 'mailto:mewondacat@gmail.com');
  expect(screen.queryByRole('link', { name: 'Instagram' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Twitter / X' })).not.toBeInTheDocument();
};

describe('opening screen and social links', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('uses the new artwork only on the opening screen', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: 'Sandra Suh' });
    expect(title.parentElement?.parentElement)
      .toHaveStyle({ backgroundImage: 'url(/assets/homepage-splash.png)' });
    expect(screen.getByRole('button', { name: 'ENTER' })).toBeInTheDocument();
    expect(siteConfig.projects.find((project) => project.id === 'concept-merow')?.image)
      .toBe('/assets/merow.png');
  });

  it('shows only Bluesky, VGen, and email on the opening screen', () => {
    render(<App />);
    expectSocialLinks();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('shows the same social links in the portfolio footer', () => {
    render(<Footer config={siteConfig} />);
    expectSocialLinks();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('keeps the existing galleries and artwork after entering', () => {
    vi.useFakeTimers();
    try {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: 'ENTER' }));
      act(() => vi.advanceTimersByTime(400));

      expect(sessionStorage.getItem('has_entered_portfolio')).toBe('true');
      expect(screen.getByRole('link', { name: 'Explore Concepts' }))
        .toHaveAttribute('href', '/category/concepts');
      expect(screen.getByRole('img', { name: /characters debating sushi/i }))
        .toHaveAttribute('src', '/assets/merow.png');
      expect(screen.getByRole('link', { name: 'Explore Illustration' }))
        .toHaveAttribute('href', '/category/illustrations');
    } finally {
      vi.useRealTimers();
    }
  });
});
