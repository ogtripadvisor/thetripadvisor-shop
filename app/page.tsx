'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import ProductCard, { Product } from '@/app/components/ProductCard';
import SmokeLayer from '@/app/components/SmokeLayer';
import CannabisLeaf from '@/app/components/CannabisLeaf';

type ProductRow = {
  id: string;
  name: string;
  design: string;
  color: 'Black' | 'White';
  size: string;
  price: number;
  image_url: string | null;
  back_image_url: string | null;
  has_back_print: boolean;
  stock: number;
  description: string;
};

const TICKER_PHRASES = [
  'SPREAD POSITIVITY',
  '50 SHADES OF GRADE',
  'NEW MUSIC OUT NOW',
  'HIGH VIBES ONLY',
  'THE TRIPADVISOR',
];

export default function Home() {
  const [spotlightProduct, setSpotlightProduct] = useState<Product | null>(null);
  const [gridProducts, setGridProducts] = useState<Product[]>([]);
  const [isSpotlightSmoking, setIsSpotlightSmoking] = useState(false);

  // Hover doesn't exist on touchscreens, so tapping the spotlight image
  // also triggers the smoke puffs directly (alongside :hover for desktop).
  const triggerSpotlightSmoke = () => {
    setIsSpotlightSmoking(true);
    window.setTimeout(() => setIsSpotlightSmoking(false), 1400);
  };

  useEffect(() => {
    const toProduct = (row: ProductRow): Product => ({
      id: row.id,
      name: row.name,
      design: row.design,
      color: row.color,
      size: row.size,
      price: row.price,
      imageUrl: row.image_url,
      backImageUrl: row.back_image_url,
      hasBackPrint: row.has_back_print,
      stock: row.stock,
      description: row.description,
    });

    const fetchHomeData = async () => {
      // Spotlight: always Pineapple Express, black colourway.
      const { data: spotlightRow, error: spotlightError } = await supabase
        .from('products')
        .select('*')
        .eq('design', 'Pineapple Express')
        .eq('color', 'Black')
        .maybeSingle();

      if (spotlightError) {
        console.error('Error fetching spotlight product:', spotlightError);
      } else if (spotlightRow) {
        setSpotlightProduct(toProduct(spotlightRow as ProductRow));
      }

      // Grid: every remaining design (all different strains), shown once
      // each — alternating Black/White as you go down the list, rather
      // than showing the same design twice in both colours.
      const { data: allRows, error: gridError } = await supabase
        .from('products')
        .select('*')
        .neq('design', 'Pineapple Express')
        .order('design', { ascending: true })
        .order('color', { ascending: true });

      if (gridError) {
        console.error('Error fetching grid products:', gridError);
        return;
      }

      const rows = (allRows as ProductRow[]) || [];
      const seenDesigns = new Set<string>();
      const alternating: Product[] = [];

      rows.forEach((row) => {
        if (seenDesigns.has(row.design)) return;
        const wantColor: 'Black' | 'White' =
          seenDesigns.size % 2 === 0 ? 'Black' : 'White';
        // Prefer the alternating colour for this position; fall back to
        // whatever's available if that exact colour is missing for some reason.
        const match =
          rows.find((r) => r.design === row.design && r.color === wantColor) ||
          row;
        seenDesigns.add(row.design);
        alternating.push(toProduct(match));
      });

      setGridProducts(alternating);
    };

    fetchHomeData();
  }, []);

  return (
    <main>
      <section className="hero">
        <h1 className="display-heading brand-logo hero__title">
          The TripAdvisor
        </h1>
        <p className="hero__tagline">
          Music, merch, and good vibes only. Home of the 50 Shades of Grade
          clothing line and sounds built for the same trip — grab a shirt,
          press play, and spread the positivity.
        </p>
        <div className="hero__actions">
          <Link href="/shop" className="cta-button cta-button--primary">
            Shop the collection
          </Link>
          <Link href="/music" className="cta-button cta-button--secondary">
            Listen to the music
          </Link>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...TICKER_PHRASES, ...TICKER_PHRASES].map((phrase, i) => (
            <span className="ticker__item" key={i}>
              {phrase} <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      {spotlightProduct && (
        <section className="home-section">
          <div className="spotlight">
            {spotlightProduct.imageUrl ? (
              <div
                className={`spotlight-image-wrap${isSpotlightSmoking ? " is-smoking" : ""}`}
                onClick={triggerSpotlightSmoke}
              >
                <SmokeLayer count={10} minSize={70} maxSize={150} travel={220} />
                <img
                  src={spotlightProduct.imageUrl}
                  alt={spotlightProduct.design}
                  className="spotlight-image-wrap__img"
                />
              </div>
            ) : (
              <div className="product-card__image" />
            )}
            <div>
              <span className="spotlight__badge">Fresh drop</span>
              <h2 className="spotlight__name">{spotlightProduct.design}</h2>
              <p className="spotlight__desc">{spotlightProduct.description}</p>
              <span className="price-tag" style={{ display: 'block', marginBottom: '1.25rem' }}>
                £{spotlightProduct.price.toFixed(2)}
              </span>
              <Link href="/shop" className="cta-button cta-button--primary">
                Shop this design
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="home-section">
        <div className="collection-title">
          <CannabisLeaf className="collection-title__leaf collection-title__leaf--left" />
          <h2 className="collection-title__text">50 Shades of Grade</h2>
          <CannabisLeaf className="collection-title__leaf collection-title__leaf--right" />
        </div>
        <div className="product-grid product-grid--preview">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="home-section__cta">
          <Link href="/shop" className="cta-button cta-button--outline">
            View all 11 designs
          </Link>
        </div>
      </section>

      <section className="home-section home-section--music-teaser">
        <h2 className="section-heading">On repeat</h2>
        <p className="hero__tagline">
          New music from The TripAdvisor — out now on Spotify.
        </p>
        <Link href="/music" className="cta-button cta-button--primary">
          Go to the music page
        </Link>
      </section>
    </main>
  );
}