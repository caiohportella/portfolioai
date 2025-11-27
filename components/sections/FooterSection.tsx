import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import {
  SiGithub,
  SiLinkedin,
  SiMedium,
  SiDevdotto,
  SiYoutube,
} from "react-icons/si";
import { Globe } from "lucide-react";

const FOOTER_SITE_SETTINGS_QUERY =
  defineQuery(`*[_id == "singleton-siteSettings"][0]{
  siteTitle,
  footer{
    text,
    copyrightText,
    links[]{
      title,
      url,
      _key
    }
  }
}`);

const FOOTER_PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  socialLinks
}`);

export async function FooterSection() {
  const [{ data: settings }, { data: profile }] = await Promise.all([
    sanityFetch({ query: FOOTER_SITE_SETTINGS_QUERY }),
    sanityFetch({ query: FOOTER_PROFILE_QUERY }),
  ]);

  const footer = settings?.footer;
  const siteTitle = settings?.siteTitle || "Portfolio";

  // Se não houver configuração de footer, não renderiza nada
  if (!footer && !profile?.socialLinks) {
    return null;
  }

  const hasSocialLinks =
    profile?.socialLinks &&
    Object.values(profile.socialLinks).some((link) => link);

  return (
    <footer className="relative border-t border-border/50 bg-background">
      <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-12 items-start">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">
              {siteTitle}
            </h3>
            {footer?.text && (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                {footer.text}
              </p>
            )}
          </div>

          {/* Navigation Links */}
          {footer?.links && footer.links.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wider">
                Navegação
              </h4>
              <nav className="flex flex-col space-y-3">
                {footer.links.map(
                  (link: {
                    title: string | null;
                    url: string | null;
                    _key: string;
                  }) => {
                    if (!link.title || !link.url) return null;
                    return (
                      <Link
                        key={link._key}
                        href={link.url}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 w-fit"
                      >
                        {link.title}
                      </Link>
                    );
                  },
                )}
              </nav>
            </div>
          )}

          {/* Social Links */}
          {hasSocialLinks && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wider">
                Conecte-se
              </h4>
              <div className="flex flex-wrap gap-3">
                {profile?.socialLinks?.github && (
                  <Link
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-accent/50 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <SiGithub className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                )}
                {profile?.socialLinks?.linkedin && (
                  <Link
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-accent/50 transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <SiLinkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                )}
                {profile?.socialLinks?.website && (
                  <Link
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-accent/50 transition-all duration-200"
                    aria-label="Website"
                  >
                    <Globe className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                )}
                {profile?.socialLinks?.medium && (
                  <Link
                    href={profile.socialLinks.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-accent/50 transition-all duration-200"
                    aria-label="Medium"
                  >
                    <SiMedium className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                )}
                {profile?.socialLinks?.devto && (
                  <Link
                    href={profile.socialLinks.devto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-accent/50 transition-all duration-200"
                    aria-label="Dev.to"
                  >
                    <SiDevdotto className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                )}
                {profile?.socialLinks?.youtube && (
                  <Link
                    href={profile.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-accent/50 transition-all duration-200"
                    aria-label="YouTube"
                  >
                    <SiYoutube className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {footer?.copyrightText ? (
                <p>{footer.copyrightText}</p>
              ) : (
                <p>
                  © {new Date().getFullYear()} {siteTitle}. Todos os direitos
                  reservados.
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground/70">
              Feito com <span className="inline-block animate-pulse">❤️</span>{" "}
              por <span className="font-medium">Caio Henrique Portella</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
