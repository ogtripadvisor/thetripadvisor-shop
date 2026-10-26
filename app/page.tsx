'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard, { Product } from '@/app/components/ProductCard';

// T-shirts shown in "Coming soon" instead of the shop.
// To release one, just delete its name from this list.
const COMING_SOON = [
  'Gelato',
  'Grapefruit Diesel',
  '50 Shades of Grade Family T-Shirt',
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
              {COMING_SOON.map((name) => {
                const teaser = products.find(
                  (p) => p.design === name && p.imageUrl,
                )?.imageUrl;

                return (
                  <div key={name} className="soon__card">
                    <div className="soon__image-wrap">
                      {teaser ? (
                        <img
                          className="soon__image"
                          src={teaser}
                          alt={`${name} T-shirt, coming soon`}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="soon__mystery" aria-hidden="true">?</div>
                      )}
                      <span className="soon__ribbon">Coming soon</span>
                    </div>
                    <p className="soon__name">{name}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}