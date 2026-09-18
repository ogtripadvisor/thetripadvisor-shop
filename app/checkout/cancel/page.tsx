import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <main>
      <div className="checkout-result">
        <span className="checkout-result__emoji">🍄</span>
        <h1 className="display-heading brand-logo page-title">
          No worries
        </h1>
        <p className="hero__tagline">
          Your payment was cancelled and nothing was charged. Your cart's
          still waiting whenever you're ready.
        </p>
        <Link href="/shop" className="cta-button cta-button--primary">
          Back to the shop
        </Link>
      </div>
    </main>
  );
}