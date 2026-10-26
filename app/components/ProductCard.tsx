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
  tagImageUrl?: string | null;
  hasBackPrint: boolean;
  stock: number;
  description: string;
};

type View = { key: string; label: string; url: string };

export default function ProductCard({ product }: { product: Product }) {
  const [activeView, setActiveView] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isSmoking, setIsSmoking] = useState(false);

  // Build the list of photos this shirt has: front, back (if it has a back print), tag
  const views: View[] = [];
  if (product.imageUrl) {
    views.push({ key: "front", label: "Front", url: product.imageUrl });
  }
  if (product.hasBackPrint && product.backImageUrl) {
    views.push({ key: "back", label: "Back", url: product.backImageUrl });
  }
  if (product.tagImageUrl) {
    views.push({ key: "tag", label: "Tag", url: product.tagImageUrl });
  }

  const current = views[activeView] ?? views[0];
  const displayedImage = current ? current.url : null;
  const soldOut = product.stock <= 0;

  // Hover doesn't exist on touchscreens, so tapping the card also
  // triggers the smoke puffs directly (in addition to :hover, which
  // still covers desktop mouse users).
  const triggerSmoke = () => {
    setIsSmoking(true);
    window.setTimeout(() => setIsSmoking(false), 1400);
  };

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
      <div
        className={`product-card__image-wrap${isSmoking ? " is-smoking" : ""}`}
        onClick={triggerSmoke}
      >
        <SmokeLayer count={6} minSize={40} maxSize={78} travel={140} />

        {displayedImage ? (
          <img
            className="product-card__image"
            src={displayedImage}
            loading="lazy"
            decoding="async"
            alt={`${product.design} T-shirt (${product.color}) — ${current?.label ?? "Front"}`}
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
      </div>

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

        {views.length > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {views.map((view, i) => (
              <button
                key={view.key}
                type="button"
                className="view-back-toggle"
                aria-pressed={i === activeView}
                style={{ opacity: i === activeView ? 1 : 0.55 }}
                onClick={() => setActiveView(i)}
              >
                {view.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}