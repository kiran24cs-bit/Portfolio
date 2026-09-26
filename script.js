
const projects = [
  {
  title: "AI-Powered Women Safety (Ongoing)",
  description: "An AI-powered women safety system designed to detect potential emergency situations and provide quick assistance through intelligent alerts and safety features.",
  technologies: ["Python", "AI", "Machine Learning", "Computer Vision", "JavaScript", "Node.js"],
  url: "",
  github: ""
},
  {
  title: "CNN Handwritten Digit Recognition",
  description: "A machine learning project for recognizing handwritten digits using a Perceptron, Artificial Neural Network (ANN), and Convolutional Neural Network (CNN). The project includes image preprocessing, model training, evaluation, and real-time digit prediction from uploaded images.",
  technologies: ["Python", "Machine Learning", "Deep Learning", "OpenCV", "TensorFlow", "Keras"],
  url: "https://github.com/kiran24cs-bit/AI-CNN-DIGIT-RECOGNITION",
  github: "https://github.com/kiran24cs-bit/AI-CNN-DIGIT-RECOGNITION"
}
,
  {
    title: "My Timetable AI",
    description: "An AI-powered study planning tool that generates a personalized weekly timetable based on your subjects and free hours.",
    image: "images/project1.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Python"],
    url: "",
    github: "https://github.com/kiran24cs-bit/AI-study-planner"
  },
  {
    title: "Library Management System",
    description: "A full-stack system with student and manager logins, book borrow/return tracking, and a live dashboard with usage stats.",
    // image: "images/project2.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
    url: "https://github.com/kiran24cs-bit/library-management-system",
    github: "https://github.com/kiran24cs-bit/library-management-system"
  },
  {
  title: "Sentiment Analysis",
  description: "An NLP-based sentiment analysis system that processes text and classifies user opinions into positive, negative, or neutral sentiments.",
  // image: "images/project4.jpg",
  technologies: ["Python", "NLP", "Machine Learning", "Scikit-learn", "Pandas", "NumPy"],
  url: "https://github.com/kiran24cs-bit/sentiment-analysis",
  github: "https://github.com/kiran24cs-bit/sentiment-analysis"
},
  {
    title: "Smart Medical  (Ongoing)",
    description: "A smart medical system that allows users to check the availability of specific medicines quickly and conveniently.",
    // image: "images/project4.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "REST API","Node.js","MySQL"],
    url: "https://github.com/kiran24cs-bit/Smart-Medical",
    github: "https://github.com/kiran24cs-bit/Smart-Medical"
  }
];

(function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("kiran-portfolio-theme");
  const theme = stored === "light" ? "light" : "dark";

  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  }

  const toggleBtn = document.getElementById("themeToggle");

  function applyTheme(next) {
    if (next === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("kiran-portfolio-theme", next);
    toggleBtn.setAttribute("aria-pressed", String(next === "light"));
  }

  toggleBtn.setAttribute("aria-pressed", String(theme === "light"));

  toggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  });
})();

(function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

(function initActiveLink() {
  const sections = document.querySelectorAll("main > section, .hero");
  const navLinkMap = new Map();

  document.querySelectorAll(".nav-link").forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    navLinkMap.set(id, link);
  });

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinkMap.forEach((link) => link.classList.remove("active-link"));
          const activeLink = navLinkMap.get(id);
          if (activeLink) activeLink.classList.add("active-link");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();

(function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in-view"), index * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

(function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
})();

(function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute(
      "aria-label",
      `Open ${project.title} project in a new tab`
    );

    const techTags = project.technologies
      .map((tech) => `<span class="tech-tag">${escapeHTML(tech)}</span>`)
      .join("");

    const githubButton = project.github
      ? `<a href="${escapeAttr(project.github)}"
          class="project-github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View ${escapeAttr(project.title)} source on GitHub"
          onclick="event.stopPropagation();">
          <i class="fa-brands fa-github"></i>
        </a>`
      : "";

    card.innerHTML = `
      <div class="project-body">
        <div class="project-title-row">
          <h3>${escapeHTML(project.title)}</h3>
          <span class="project-arrow">
            <i class="fa-solid fa-arrow-up-right"></i>
          </span>
        </div>

        <p class="project-desc">
          ${escapeHTML(project.description)}
        </p>

        <div class="project-tech">
          ${techTags}
        </div>

        <div class="project-footer-row">
          <span class="project-view-label">view_project()</span>
          ${githubButton}
        </div>
      </div>
    `;

    function openProject() {
      if (project.url) {
        window.open(project.url, "_blank", "noopener,noreferrer");
      }
    }

    card.addEventListener("click", openProject);

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProject();
      }
    });

    grid.appendChild(card);
  });
})();

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

(function initScrollUI() {
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 8px 30px -20px rgba(0,0,0,0.5)";
    } else {
      navbar.style.boxShadow = "none";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

document.getElementById("year").textContent = new Date().getFullYear();
