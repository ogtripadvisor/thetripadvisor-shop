import Link from "next/link";

export default function Nav() {
  return (
    <nav className="site-nav">
      <Link href="/" className="site-nav__logo">
        The TripAdvisor
      </Link>
      <div className="site-nav__links">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/music">Music</Link>
      </div>
    </nav>
  );
}