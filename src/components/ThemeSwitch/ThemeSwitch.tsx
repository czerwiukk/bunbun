import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import { Component, createEffect, createSignal } from "solid-js";

const DARK_THEME_KEY = "bunbun_dark_theme";

const isDarkThemeInLocalStorage =
  window.localStorage.getItem(DARK_THEME_KEY) === "1";

const isDefaultThemeDark = window.matchMedia?.(
  "(prefers-color-scheme: dark)"
).matches;

const [isDarkTheme, setIsDarkTheme] = createSignal(
  isDarkThemeInLocalStorage || isDefaultThemeDark
);

createEffect(() => {
  if (isDarkTheme()) {
    window.localStorage.setItem(DARK_THEME_KEY, "1");
    document.documentElement.classList.add("dark");
  } else {
    window.localStorage.removeItem(DARK_THEME_KEY);
    document.documentElement.classList.remove("dark");
  }
});

export const ThemeSwitch: Component = () => (
  <button
    class="swap swap-rotate"
    classList={{ "swap-active": isDarkTheme() }}
    onClick={() => setIsDarkTheme((v) => !v)}
  >
    <div class="swap-on text-white">
      <Fa size="2x" icon={faMoon} />
    </div>

    <div class="swap-off text-amber-400">
      <Fa size="2x" icon={faSun} />
    </div>
  </button>
);
