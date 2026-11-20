export const INTRO_SEEN_KEY = "intro-seen";

/**
 * Runs before the page paints: skips the intro for visitors who have already
 * seen it this session or prefer reduced motion. Without JavaScript the
 * loader is hidden by the noscript styles in the root layout.
 */
export const INTRO_GATE_SCRIPT = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.introSeen="1"}catch(e){document.documentElement.dataset.introSeen="1"}`;
