import Countdown from '@/app/components/Countdown';

// ---------- Fill these in ----------
// Paste your Halloween Special Spotify link between the quotes:
const HALLOWEEN_SPOTIFY_URL = '';

// Nova Vita release time (midnight UK, Thursday 19 November)
const NOVA_VITA_RELEASE = '2026-11-19T00:00:00Z';
// After Nova Vita is out, paste its Spotify link between the quotes:
const NOVA_VITA_URL = 'https://open.spotify.com/track/2U3a5qa3mhIImJhwSlLMM3?si=f33e1d140ae84a13';
// -----------------------------------

const ARTIST_SPOTIFY_URL = 'https://open.spotify.com/artist/0KXL7WvfCrx6WH76y20uJU';

const ALBUM_TRACKS = ['S.W.R', 'Nova Vita', 'Halloween Special'];

// Turns a normal Spotify song link into the playable embed version
function toSpotifyEmbed(url: string) {
  const clean = url.split('?')[0];
  return clean.replace(/open\.spotify\.com\/(intl-[a-z]+\/)?/, 'open.spotify.com/embed/');
}

export default function MusicPage() {
  return (
    <main style={{ textAlign: 'center' }}>
      <h1 className="display-heading brand-logo page-title">Music</h1>
      <p className="hero__tagline">
        Stream The TripAdvisor wherever you listen.
      </p>

      {/* Nova Vita: International Men's Day single */}
      <section className="nova">
        <span className="nova__badge">
          <span className="nova__dot" aria-hidden="true" />
          New single · Thursday 19 November
        </span>
        <h2 className="display-heading nova__title">Nova Vita</h2>
        <p className="nova__latin">Latin for &ldquo;new life&rdquo;</p>

        <p className="nova__text">
          You don&apos;t need to wait for New Year to turn over a new leaf.
          Nova Vita is about new beginnings, whenever you need one.
        </p>
        <p className="nova__text">
          Released for International Men&apos;s Day to get people talking about
          men&apos;s mental health. Check in on your mates. It&apos;s okay not to be okay.
        </p>

        <Countdown target={NOVA_VITA_RELEASE} />

        <div className="nova__links">
          {NOVA_VITA_URL ? (
            <a
              href={NOVA_VITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button cta-button--primary"
            >
              Listen to Nova Vita
            </a>
          ) : (
            <a
              href={ARTIST_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button cta-button--primary"
            >
              Follow on Spotify
            </a>
          )}
        </div>

        <div className="nova__support">
          <p className="nova__support-title">Struggling? You&apos;re not alone.</p>
          <p>
            Samaritans: <a href="tel:116123">116 123</a> (free, 24/7)
          </p>
          <p>
            CALM: <a href="tel:0800585858">0800 58 58 58</a> (5pm to midnight, every day)
          </p>
          <p>Or text SHOUT to 85258</p>
        </div>
      </section>

      {/* Halloween Special: out now */}
      <section className="halloween">
        <span className="halloween__badge">
          <span className="halloween__dot" aria-hidden="true" />
          Out now
        </span>
        <h2 className="display-heading halloween__title">Halloween Special</h2>
        <p className="halloween__sub">The new single from The TripAdvisor</p>

        {HALLOWEEN_SPOTIFY_URL && (
          <div className="halloween__embed">
            <iframe
              style={{ borderRadius: '12px' }}
              src={toSpotifyEmbed(HALLOWEEN_SPOTIFY_URL)}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}

        <div className="halloween__links">
          <a
            href={HALLOWEEN_SPOTIFY_URL || ARTIST_SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button cta-button--primary"
          >
            Listen on Spotify
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
          href={ARTIST_SPOTIFY_URL}
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