/** Set on <html> on a visitor's first load in a session; the entrance sheet covers the page until the logo has played. */
export const INTRO_CLASS = "intro";

const INTRO_SEEN_KEY = "intro-seen";

// Hard stop so the page can never stay hidden, even if the client bundle fails to load.
const INTRO_FAILSAFE_MS = 8000;

/**
 * Runs before the first paint, so the page never flashes before the entrance.
 * Plays once per browser session and never for visitors who prefer reduced motion.
 */
export const introScript = `(function () {
  try {
    var root = document.documentElement;
    if (sessionStorage.getItem("${INTRO_SEEN_KEY}")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("${INTRO_SEEN_KEY}", "1");
    root.classList.add("${INTRO_CLASS}");
    setTimeout(function () { root.classList.remove("${INTRO_CLASS}"); }, ${INTRO_FAILSAFE_MS});
  } catch (error) {}
})();`;
