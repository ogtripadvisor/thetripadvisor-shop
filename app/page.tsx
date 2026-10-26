'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard, { Product } from '@/app/components/ProductCard';

// T-shirts shown in "Coming soon" instead of the shop.
// To release one, just delete its name from this list.
const COMING_SOON = [
  'Gelato',
  'Grapefruit Diesel',
  '50 Shades of Grade Mandem Edition',
];

// Little floating question marks around the big one
const FLOATING_MARKS = [
  { x: '8%',  y: '10%', size: 1.4, rotate: -18, dur: 4.2, delay: 0,   color: '#ffd700' },
  { x: '78%', y: '8%',  size: 1.1, rotate: 14,  dur: 5.0, delay: 0.6, color: '#ffffff' },
  { x: '86%', y: '42%', size: 1.6, rotate: -10, dur: 3.8, delay: 1.2, color: '#6fe39a' },
  { x: '12%', y: '55%', size: 1.0, rotate: 22,  dur: 4.6, delay: 0.3, color: '#ffffff' },
  { x: '20%', y: '82%', size: 1.5, rotate: -25, dur: 5.2, delay: 1.8, color: '#ffd700' },
  { x: '70%', y: '80%', size: 1.2, rotate: 16,  dur: 4.0, delay: 0.9, color: '#6fe39a' },
  { x: '45%', y: '6%',  size: 0.9, rotate: -6,  dur: 4.8, delay: 1.5, color: '#ffffff' },
  { x: '50%', y: '88%', size: 0.9, rotate: 30,  dur: 3.6, delay: 2.1, color: '#ffd700' },
];

type ProductRow = {
  id: string;
  name: string;
  design: string;
  color: 'Black' | 'White';
  size: string;
  price: number;
  image_url: string | null;
  back_image_url: string | null;
  tag_image_url: string | null;
  has_back_print: boolean;
  stock: number;
  description: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('design', { ascending: true })
        .order('color', { ascending: true });

      if (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
        return;
      }

      const mapped: Product[] = (data as ProductRow[] || []).map((row) => ({
        id: row.id,
        name: row.name,
        design: row.design,
        color: row.color,
        size: row.size,
        price: row.price,
        imageUrl: row.image_url,
        backImageUrl: row.back_image_url,
        tagImageUrl: row.tag_image_url,
        hasBackPrint: row.has_back_print,
        stock: row.stock,
        description: row.description,
      }));

      setProducts(mapped);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const available = products.filter((p) => !COMING_SOON.includes(p.design));

  return (
    <main>
      <h1 className="display-heading brand-logo page-title">Shop</h1>

      {loading && <p className="status-text">Loading drops...</p>}

      {error && (
        <p className="status-text status-text--error">
          Couldn&apos;t load products: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="product-grid">
            {available.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <section className="soon">
            <span className="soon__label">Next drop</span>
            <h2 className="display-heading soon__title">Coming soon</h2>

            <div className="soon__grid">
              {COMING_SOON.map((name, cardIndex) => (
                <div key={name} className="soon__card">
                  <div className="soon__image-wrap">
                    <div className="soon__mystery" aria-hidden="true">
                      {FLOATING_MARKS.map((m, i) => (
                        <span
                          key={i}
                          className="soon__mark"
                          style={{
                            left: m.x,
                            top: m.y,
                            fontSize: `${m.size}rem`,
                            color: m.color,
                            animationDuration: `${m.dur}s`,
                            animationDelay: `${m.delay + cardIndex * 0.7}s`,
                            '--r': `${m.rotate}deg`,
                          } as CSSProperties}
                        >
                          ?
                        </span>
                      ))}
                      <span className="soon__mark-main">?</span>
                    </div>
                    <span className="soon__ribbon">Coming soon</span>
                  </div>
                  <p className="soon__name">{name}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}