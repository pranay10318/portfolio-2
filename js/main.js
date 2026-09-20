(function () {
  const TALLY_URL =
    "https://tally.yuki.sh/hits/pranay10318/portfolio-varsha-nextgen.json";
  const C = window.NGD_CONTACT || {
    email: "pothugantivarsha101@gmail.com",
    phoneE164: "918790084139",
    phoneDisplay: "+91 87900 84139",
    whatsappUrl: "https://wa.me/918790084139",
    telUrl: "tel:+918790084139",
    mailtoUrl: "mailto:pothugantivarsha101@gmail.com",
  };

  function applyContactLinks() {
    document.querySelectorAll(".ngd-whatsapp").forEach((el) => {
      el.href = C.whatsappUrl;
    });
    document.querySelectorAll(".ngd-tel").forEach((el) => {
      el.href = C.telUrl;
    });
    document.querySelectorAll(".ngd-mailto").forEach((el) => {
      el.href = C.mailtoUrl;
    });
    document.querySelectorAll(".ngd-phone-display").forEach((el) => {
      el.textContent = C.phoneDisplay;
    });
    const emailText = document.getElementById("email-text");
    if (emailText) emailText.textContent = C.email;
  }
  applyContactLinks();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  document.body.classList.add("has-mobile-dock");

  function showToast(message) {
    const region = document.getElementById("toast-region");
    if (!region) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    region.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    } catch {
      showToast("Could not copy — try manually");
    }
  }

  const copyEmailBtn = document.getElementById("copy-email");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => copyText(C.email));
  }

  const shareBtn = document.getElementById("share-site");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: "Varsha Pothuganti | Digital Marketer",
        text: "Check out this Next Gen Digital marketing portfolio",
        url: window.location.href,
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== "AbortError") copyText(window.location.href);
        }
      } else {
        copyText(window.location.href);
      }
    });
  }

  async function loadVisitorStats() {
    const heroCopy = document.getElementById("visitor-copy");
    const footer = document.getElementById("footer-visitors");
    if (window.location.protocol === "file:") {
      const preview = "Live on GitHub Pages — visitor stats appear there";
      if (heroCopy) heroCopy.textContent = preview;
      if (footer) footer.textContent = "";
      return;
    }
    try {
      const res = await fetch(TALLY_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("bad status");
      const data = await res.json();
      const visits = data.visit ?? "—";
      const uniques = data.visitor ?? "—";
      const line = `${visits} page views · ${uniques} unique visitors`;
      if (heroCopy) heroCopy.textContent = line;
      if (footer) footer.textContent = line;
    } catch {
      if (heroCopy) heroCopy.textContent = "Welcome to my portfolio";
      if (footer) footer.textContent = "";
    }
  }
  loadVisitorStats();

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.classList.toggle("open", !open);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.classList.remove("open");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  const skillBars = document.querySelector(".skill-bars");
  if (skillBars && "IntersectionObserver" in window) {
    const skillObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            skillObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    skillObs.observe(skillBars);
  } else if (skillBars) {
    skillBars.classList.add("is-visible");
  }

  const progress = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");
  const header = document.querySelector(".site-header");

  const sectionIds = ["home", "about", "process", "services", "projects", "why-me", "faq", "contact"];
  const navLinks = document.querySelectorAll(".nav-links a[data-nav]");

  function onScroll() {
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && docH > 0) {
      progress.style.width = `${Math.min(100, (y / docH) * 100)}%`;
    }
    if (header) {
      header.style.boxShadow = y > 40 ? "0 8px 32px rgba(0,0,0,0.35)" : "none";
    }
    if (backToTop) {
      backToTop.classList.toggle("is-visible", y > 480);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if ("IntersectionObserver" in window && navLinks.length) {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.dataset.nav === id);
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((sec) => navObs.observe(sec));
  }

  const filterChips = document.querySelectorAll(".filter-chip");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      filterChips.forEach((c) => c.classList.toggle("is-active", c === chip));
      projectCards.forEach((card) => {
        const cat = card.dataset.category;
        const show = filter === "all" || cat === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
})();
