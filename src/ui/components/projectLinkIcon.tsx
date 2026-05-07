import type { IconType } from "react-icons";
import { FiGlobe, FiLink2 } from "react-icons/fi";
import { SiGithub, SiNpm } from "react-icons/si";
import type { ProjectLink } from "../../common/index.ts";

function resolveProjectLinkIcon(link: ProjectLink): IconType {
  const normalizedName = link.name.trim().toLowerCase();

  if (normalizedName === "github" || link.url.includes("github.com")) {
    return SiGithub;
  }

  if (normalizedName === "npm" || link.url.includes("npmjs.com")) {
    return SiNpm;
  }

  if (normalizedName === "website") {
    return FiGlobe;
  }

  return FiLink2;
}

export function ProjectLinkIcon({ link, className = "" }: ProjectLinkIconOptions) {
  const Icon = resolveProjectLinkIcon(link);

  return <Icon className={className} aria-hidden="true" focusable="false" />;
}

type ProjectLinkIconOptions = {
  link: ProjectLink
  className?: string
}
