document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const STORAGE_KEY = "darkMode";

  const safeGet = (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  };
  const safeSet = (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
      /* ignore */
    }
  };

  // Apply initial theme: stored preference -> system preference -> default
  const stored = safeGet(STORAGE_KEY);
  if (stored === "enabled") {
    document.body.classList.add("dark-mode");
  } else if (stored === "disabled") {
    document.body.classList.remove("dark-mode");
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classList.add("dark-mode");
  }

  if (!darkModeToggle) {
    console.warn(
      "Dark Mode Toggle button not found; continuing without toggle."
    );
  } else {
    // set initial aria state/icon
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    darkModeToggle.textContent = isDark ? "🌙" : "🌓";

    darkModeToggle.addEventListener("click", () => {
      const enabled = document.body.classList.toggle("dark-mode");
      safeSet(STORAGE_KEY, enabled ? "enabled" : "disabled");
      darkModeToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      darkModeToggle.textContent = enabled ? "🌙" : "🌓";
    });
  }

  // Scroll Animations with IntersectionObserver fallback
  const sections = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // stop observing once visible
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    // fallback: reveal all
    sections.forEach((section) => section.classList.add("visible"));
  }
});
