'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard, { Product } from '@/app/components/ProductCard';

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
        hasBackPrint: row.has_back_print,
        stock: row.stock,
        description: row.description,
      }));

      setProducts(mapped);
      setLoading(false);
    };

    fetchProducts();
  }, []);

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
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}