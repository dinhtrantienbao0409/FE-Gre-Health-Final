import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const HomeData = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Health Record", path: "/record" },
  { name: "Profile", path: "/" },
];

export const SidebarData = [
  { name: "Dashboard", path: "/dashboard", icon: ChevronDownIcon },
  { name: "Health Record", path: "/record", icon: ChevronDownIcon },
  { name: "Profile", path: "/", icon: ChevronDownIcon },
];

export const DropdownData = [
  { name: "Account Settings", path: "//setting" },
  { name: "Support", path: "/support" },
  { name: "Log out", path: "/logout" },
];
