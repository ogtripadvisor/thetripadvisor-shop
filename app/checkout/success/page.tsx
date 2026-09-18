import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main>
      <div className="checkout-result">
        <span className="checkout-result__emoji">✅</span>
        <h1 className="display-heading brand-logo page-title">
          You&apos;re in the trip
        </h1>
        <p className="hero__tagline">
          Payment confirmed — your shirt is on its way. Check your email for
          the receipt.
        </p>
        <Link href="/shop" className="cta-button cta-button--primary">
          Keep shopping
        </Link>
      </div>
    </main>
  );
}