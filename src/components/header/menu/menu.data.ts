interface IMenuItem {
  link: string;
  title: string;
  icon: string;
}

export const menuLinks: IMenuItem[] = [
  {
    link: "/",
    title: "Dashboard",
    icon: "mdi-view-dashboard",
  },
  {
    link: "/projects",
    title: "Projects",
    icon: "mdi-folder",
  },
  {
    link: "/team_page",
    title: "Team",
    icon: "mdi-account",
  },
];
