import { InstagramIcon, TikTokIcon, YouTubeIcon } from "./SocialIcons";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/ogtripadvisor",
    Icon: InstagramIcon,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@ogtripadvisor",
    Icon: TikTokIcon,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@chocolateteapotter",
    Icon: YouTubeIcon,
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__tagline">Follow the trip</p>
      <div className="site-footer__socials">
        {SOCIAL_LINKS.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__icon-link"
            aria-label={name}
          >
            <Icon className="site-footer__icon" />
          </a>
        ))}
      </div>
      <p className="site-footer__copyright">
        © {new Date().getFullYear()} The TripAdvisor
      </p>
    </footer>
  );
}