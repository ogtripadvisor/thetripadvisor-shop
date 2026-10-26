import Countdown from '@/app/components/Countdown';

// Change this if the Halloween Special drops at a different time
const HALLOWEEN_RELEASE = '2026-10-31T00:00:00Z';

const ALBUM_TRACKS = ['S.W.R', 'Hurricane', 'Halloween Special'];

export default function MusicPage() {
  return (
    <main style={{ textAlign: 'center' }}>
      <h1 className="display-heading brand-logo page-title">Music</h1>
      <p className="hero__tagline">
        Stream The TripAdvisor wherever you listen.
      </p>

      {/* Halloween Special feature */}
      <section className="halloween">
        <span className="halloween__badge">
          <span className="halloween__dot" aria-hidden="true" />
          New single
        </span>
        <h2 className="display-heading halloween__title">Halloween Special</h2>
        <p className="halloween__sub">Dropping this Halloween</p>

        <Countdown target={HALLOWEEN_RELEASE} />

        <div className="halloween__links">
          <a
            href="https://www.instagram.com/ogtripadvisor"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-button--primary"
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

      {/* Mr. Medicinal album showcase */}
      <section className="album">
        <span className="album__label">Debut album · Coming soon</span>
        <h2 className="display-heading album__title">Mr. Medicinal</h2>
        <p className="album__text">
          The full project from The TripAdvisor. A first taste of what&apos;s on it:
        </p>

        <ol className="album__tracks">
          {ALBUM_TRACKS.map((track, i) => (
            <li
              key={track}
              className={`album__track${track === 'Halloween Special' ? ' album__track--featured' : ''}`}
            >
              <span className="album__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="album__name">{track}</span>
            </li>
          ))}
          <li className="album__track album__track--more">
            <span className="album__num">··</span>
            <span className="album__name">More to be revealed</span>
          </li>
        </ol>
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