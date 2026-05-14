import packageMetadata from "../../package.json";
import authorContent from "../../content/author.json";

function requirePackageField(
  value: unknown,
  fieldName: "author" | "description" | "homepage"
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing required SEO field in package.json: ${fieldName}`);
  }

  return value;
}

type AuthorSocial = {
  name?: unknown;
  url?: unknown;
};

function requireAuthorSocialLinks(value: unknown): string[] {
  if (!Array.isArray(value)) {
    throw new Error("Missing required author socials in content/author.json");
  }

  const socialLinks = value
    .map((social: AuthorSocial) => (typeof social?.url === "string" ? social.url.trim() : ""))
    .filter((url) => url.length > 0);

  if (socialLinks.length === 0) {
    throw new Error("content/author.json must include at least one social url");
  }

  return socialLinks;
}

function requireXHandle(value: unknown): string {
  if (!Array.isArray(value)) {
    throw new Error("Missing required X social profile in content/author.json");
  }

  for (const social of value as AuthorSocial[]) {
    if (typeof social?.url !== "string") continue;

    try {
      const url = new URL(social.url);
      const hostname = url.hostname.replace(/^www\./, "");
      if (hostname !== "x.com" && hostname !== "twitter.com") continue;

      const [handle] = url.pathname.split("/").filter(Boolean);
      if (!handle) break;

      return `@${handle}`;
    } catch {
      continue;
    }
  }

  throw new Error("content/author.json must include a valid X or Twitter profile url");
}

export const SITE_URL = requirePackageField(packageMetadata.homepage, "homepage");
export const SITE_NAME = requirePackageField(packageMetadata.author, "author");
export const DEFAULT_TITLE = `${SITE_NAME} | Full Stack Software Engineer`;
export const DEFAULT_DESCRIPTION = requirePackageField(
  packageMetadata.description,
  "description"
);
export const DEFAULT_OG_IMAGE = "/images/icons/website-logo.jpeg";
export const SOCIAL_LINKS = requireAuthorSocialLinks(authorContent.socials);
export const X_HANDLE = requireXHandle(authorContent.socials);
