import { DEFAULT_THEME } from "@/constants";
import type { Theme } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStoreState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
    }),
    {
      name: "theme",
    }
  )
);

export default useThemeStore;
