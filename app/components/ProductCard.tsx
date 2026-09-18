"use client";

import { useState } from "react";
import SmokeLayer from "./SmokeLayer";

export type Product = {
  id: string;
  name: string;
  design: string;
  color: "Black" | "White";
  size: string;
  price: number;
  imageUrl: string | null;
  backImageUrl: string | null;
  hasBackPrint: boolean;
  stock: number;
  description: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [showingBack, setShowingBack] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const canToggle = product.hasBackPrint && product.imageUrl && product.backImageUrl;
  const displayedImage = showingBack && canToggle ? product.backImageUrl : product.imageUrl;
  const soldOut = product.stock <= 0;

  const handleBuyNow = async () => {
    setCheckoutError(null);
    setIsCheckingOut(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Checkout failed');
      }

      window.location.href = data.url;
    } catch (err) {
      console.error('Buy now error:', err);
      setCheckoutError('Something went wrong — try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="product-card">
      <SmokeLayer />

      {displayedImage ? (
        <img
          className="product-card__image"
          src={displayedImage}
          alt={`${product.design} T-shirt (${product.color})${showingBack ? " — back" : ""}`}
        />
      ) : (
        <div
          className="product-card__image"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.06)",
            fontSize: "0.85rem",
            opacity: 0.6,
          }}
        >
          Artwork coming soon
        </div>
      )}

      <div className="product-card__body">
        {product.hasBackPrint && (
          <span className="back-print-badge">Chest logo + back print</span>
        )}

        <p className="product-card__name">
          {product.design} — {product.color}
        </p>
        <p className="product-card__meta">
          {product.size} · Slim fit ·{" "}
          {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
        </p>
        <span className="price-tag">£{product.price.toFixed(2)}</span>

        <button
          type="button"
          className="buy-now-button"
          onClick={handleBuyNow}
          disabled={soldOut || isCheckingOut}
        >
          {soldOut ? 'Sold out' : isCheckingOut ? 'Redirecting...' : 'Buy now'}
        </button>

        {checkoutError && (
          <p className="checkout-error-text">{checkoutError}</p>
        )}

        {canToggle && (
          <button
            type="button"
            className="view-back-toggle"
            onClick={() => setShowingBack((v) => !v)}
          >
            {showingBack ? "View front" : "View back"}
          </button>
        )}
      </div>
    </div>
  );
}