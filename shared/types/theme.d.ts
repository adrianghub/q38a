export type ThemeMode = "light" | "dark" | "system";

export type Theme = {
  [key: string]: {
    value: ThemeMode;
    label: string;
    icon: string;
  };
};
