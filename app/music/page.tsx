export default function MusicPage() {
  return (
    <main style={{ textAlign: 'center' }}>
      <h1 className="display-heading brand-logo page-title">Music</h1>
      <p className="hero__tagline">
        Stream The TripAdvisor wherever you listen.
      </p>

      <section className="coming-soon">
        <span className="coming-soon__badge">
          <span className="coming-soon__dot" aria-hidden="true" />
          In the studio
        </span>
        <h2 className="coming-soon__title">New music coming soon</h2>
        <p className="coming-soon__text">
          Fresh tracks are on the way. Follow along so you&apos;re first to hear them.
        </p>
        <div className="coming-soon__links">
          <a
            href="https://www.instagram.com/ogtripadvisor"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-button--outline"
          >
            Follow on Instagram
          </a>
          <a
            href="https://www.tiktok.com/@ogtripadvisor"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-button--outline"
          >
            Follow on TikTok
          </a>
        </div>
      </section>

      <div className="spotify-embed-wrap">
        <iframe
          style={{ borderRadius: '16px' }}
          src="https://open.spotify.com/embed/artist/0KXL7WvfCrx6WH76y20uJU?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <div className="streaming-links">
        <a
          href="https://open.spotify.com/artist/0KXL7WvfCrx6WH76y20uJU"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button cta-button--primary"
        >
          Open in Spotify
        </a>

        <a
          href="https://music.youtube.com/@ogtripadvisor"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button cta-button--outline"
        >
          YouTube Music
        </a>
        <a
          href="https://music.apple.com/us/artist/thetripadvisor/1834560972"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button cta-button--outline"
        >
          Apple Music
        </a>
      </div>
    </main>
  );
}