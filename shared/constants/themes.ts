import { Theme } from "../types/theme";

export const themes: Theme = {
  light: {
    value: "light",
    label: "Light",
    icon: "/assets/icons/sun.svg",
  },
  dark: {
    value: "dark",
    label: "Dark",
    icon: "/assets/icons/moon.svg",
  },
  system: {
    value: "system",
    label: "System",
    icon: "/assets/icons/computer.svg",
  },
} as const;
