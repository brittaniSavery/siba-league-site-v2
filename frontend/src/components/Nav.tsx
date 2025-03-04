import clsx from "clsx";
import { useState } from "react";
import LogoLight from "@assets/navbar-image_light.svg";
import LogoDark from "@assets/navbar-image_dark.svg";
import SIBAPicture from "./SIBAPicture";

const navItems = [
  { title: "About", link: "/about" },
  {
    title: "SIBA Info",
    link: "/siba",
    sublinks: [
      { title: "Rules", link: "/rules" },
      { title: "Owners", link: "/owners" },
      { title: "Rewards", link: "/rewards" },
      { title: "Downloads", link: "/downloads" },
    ],
  },
  {
    title: "SIBA Season",
    link: "/siba",
    sublinks: [
      { title: "League Standings", link: "/standings" },
      { title: "League Leaders", link: "/leaders" },
      { title: "Schedule", link: "/schedule" },
      { title: "Transactions", link: "/transactions" },
      { title: "Free Agents", link: "/free-agents" },
      { title: "Available Coaches", link: "/available-coaches" },
      { title: "Player Index", link: "/player-index" },
    ],
  },
  {
    title: "College",
    link: "/college",
    sublinks: [
      { title: "Rules", link: "/rules" },
      { title: "Schedule", link: "/schedule" },
      { title: "League Standings", link: "/standings" },
      { title: "Current Polls", link: "/polls" },
      { title: "Pre-season Tier Rankings", link: "/rankings" },
      { title: "Head Coaches", link: "/coaches" },
      { title: "Downloads", link: "/downloads" },
    ],
  },
  {
    title: "DBL",
    link: "/dbl",
    sublinks: [
      { title: "League Standings", link: "/standings" },
      { title: "League Leaders", link: "/leaders" },
    ],
  },
  {
    title: "News",
    link: "/news",
    sublinks: [
      { title: "Pro Headlines", link: "/pro" },
      { title: "College Headlines", link: "/college" },
      { title: "Articles", link: "/articles" },
    ],
  },
  { title: "Join", link: "/join" },
];

export default function Nav() {
  const [isMenuActive, setMenuActive] = useState(false);

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <section className="container is-max-widescreen">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <SIBAPicture
              light={LogoLight}
              dark={LogoDark}
              height={28}
              width={122}
            />
          </a>
          <a
            role="button"
            className={clsx("navbar-burger burger", {
              "is-active": isMenuActive,
            })}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setMenuActive(!isMenuActive)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navigation-menu"
          className={clsx("navbar-menu", isMenuActive && "is-active")}
        >
          <div className="navbar-start">
            {navItems.map((i) => {
              if (i.sublinks)
                return (
                  <NavDropdown
                    key={i.title}
                    title={i.title}
                    link={i.link}
                    sublinks={i.sublinks}
                  />
                );
              else
                return <NavLink key={i.title} title={i.title} link={i.link} />;
            })}
          </div>
        </div>
      </section>
    </nav>
  );
}

type NavLinkProps = {
  link: string;
  title: string;
};

type DropDownProps = NavLinkProps & {
  sublinks: NavLinkProps[];
};

function NavLink({ link, title }: NavLinkProps) {
  return (
    <a className="navbar-item" href={link}>
      {title}
    </a>
  );
}

function NavDropdown({ link, title, sublinks }: DropDownProps) {
  const [isActive, setActive] = useState(false);
  return (
    <div
      className="navbar-item has-dropdown is-hoverable"
      onClick={() => setActive(!isActive)}
    >
      <a className="navbar-link">{title}</a>
      <div
        className={clsx("navbar-dropdown", {
          "is-hidden-touch": !isActive,
          "is-active": isActive,
        })}
      >
        {sublinks.map((l) => (
          <NavLink
            key={`${title}-${l.title}`}
            link={`${link}${l.link}`}
            title={l.title}
          />
        ))}
      </div>
    </div>
  );
}
