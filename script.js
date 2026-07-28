document.documentElement.classList.add("js-enabled");

function initSiteFooter() {
  if (!document.body || document.querySelector(".site-footer")) {
    return;
  }

  const currentYear = new Date().getFullYear();

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <div class="footer-top">
          <div class="footer-brand-block">
            <span class="eyebrow">Sanjivani Spirits</span>
            <h2>Built In Kopargaon. Trusted Across Generations.</h2>
            <p>Sanjivani Spirits combines a 64-year legacy, a recognised country liquor portfolio, and modern infrastructure designed to support quality, consistency, and long-term growth.</p>
            <div class="footer-actions">
              <a class="cta-link" href="contact.html">Contact Us</a>
              <a class="ghost-button" href="products.html">Explore Products</a>
            </div>
          </div>
          <div class="footer-grid">
            <article class="footer-card">
              <h3>Quick Links</h3>
              <ul class="footer-link-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="pillars.html">Core Pillars</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="infrastructure.html">Infrastructure</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </article>
            <article class="footer-card">
              <h3>Contact Info</h3>
              <ul class="footer-meta-list">
                <li>
                  <strong>Address</strong>
                  <span>Sahajanandnagar, P.O. Shinganapur, Taluka Kopargaon, District Ahmednagar - 423603, Maharashtra, India</span>
                </li>
                <li>
                  <strong>Phone</strong>
                  <span><a href="tel:+912423224132">+91 2423 224132</a></span>
                </li>
                <li>
                  <strong>Directions</strong>
                  <span><a href="https://www.google.com/maps/search/?api=1&query=Sahakar%20Maharshi%20Shankarrao%20Kolhe%20Sahakari%20Sakhar%20Karkhana%20Limited%2C%20Sahajanandnagar%2C%20P.O.%20Shinganapur%2C%20Taluka%20Kopargaon%2C%20District%20Ahmednagar%20423603" target="_blank" rel="noreferrer">Open Google Maps</a></span>
                </li>
              </ul>
            </article>
            <article class="footer-card">
              <h3>Working Hours</h3>
              <ul class="footer-meta-list">
                <li>
                  <strong>Support Window</strong>
                  <span>Monday to Saturday, 8:30 AM to 5:30 PM</span>
                </li>
                <li>
                  <strong>Best For</strong>
                  <span>Dealer enquiries, product questions, business meetings, and factory visit coordination.</span>
                </li>
                <li>
                  <strong>Portfolio</strong>
                  <span>Orange-led, saunf-led, and punch-led spirits built for strong local consumer relevance.</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Copyright ${currentYear} Sanjivani Spirits. All rights reserved.</span>
          <span>Drink responsibly. For sales and business enquiries, use the <a href="contact.html">contact page</a>.</span>
        </div>
      </div>
    </footer>
  `);
}

initSiteFooter();

const mobileMenu = document.querySelector("#mobile_menu");
const menuToggles = document.querySelectorAll("[data-menu-toggle]");
const menuCloseButtons = document.querySelectorAll("[data-menu-close]");

function setMenuState(isOpen) {
  if (!mobileMenu) {
    return;
  }

  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("menu-open", isOpen);

  menuToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

menuToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.contains("is-open");
    setMenuState(!isOpen);
  });
});

menuCloseButtons.forEach((button) => {
  button.addEventListener("click", () => setMenuState(false));
});

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      setMenuState(false);
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

function initHomeAnimations() {
  if (!document.querySelector("#main") || !window.gsap || !window.ScrollTrigger || !window.LocomotiveScroll) {
    return;
  }

  function show(){
      gsap.registerPlugin(ScrollTrigger);
      const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
      });
      locoScroll.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
      });
      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
      ScrollTrigger.refresh();}

      show()

      gsap.to("#bottle", {
        rotate: -15,
        scrollTrigger: {
          trigger: "#bottle",
          scroller: "#main",
          start: "top 5%",
          end: "top -416%",
          scrub: true,
          pin: true

        }
      })

      gsap.to("#bottle", {
       scale: 0.5,
       scrollTrigger: {
        trigger: "#page5 h1",
        scroller: "#main",
        start: "top 430%",
        end: "top -430%",
        scrub: true,
        pin: true

      }
      })

      let t1 = gsap.timeline()
      t1.from("#main #page1_dog_image", {
        opacity: 0,
        duration: 1,
        scale: 0.1,
      })

      t1.from("#bottle", {
        opacity: 0,
        duration: 1,
        scale: 0.2,
      })

      t1.from("#nav_top>button", {
        xPrecent:200,
      })

      gsap.from("#page2_part1>button",{
        scrollTrigger: {
          trigger: ("#page2_part1>button"),
          scroller: ("#main"),
          start: "top 70%",
        },
        xPrecent:-300,
        duration:1,
      })


      gsap.from("#page6_part6>button",{
        scrollTrigger: {
          trigger: ("#page6_part2>button"),
          scroller: ("#main"),
          start: "top 70%",
        },
        xPrecent:600,
        duration:1,
      })
}

initHomeAnimations();

function initRevealAnimations() {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!revealItems.length) {
    return;
  }

  const activateItem = (item) => {
    item.classList.add("is-visible");
  };

  const revealIfInView = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    revealItems.forEach((item) => {
      if (item.classList.contains("is-visible")) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const visibleThreshold = viewportHeight * 0.9;

      if (rect.top <= visibleThreshold && rect.bottom >= 0) {
        activateItem(item);
      }
    });
  };

  if (!("IntersectionObserver" in window)) {
    revealIfInView();
    window.addEventListener("scroll", revealIfInView, { passive: true });
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      activateItem(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -2% 0px"
  });

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

  revealIfInView();
  window.addEventListener("load", revealIfInView, { once: true });
  window.addEventListener("scroll", revealIfInView, { passive: true });
}

function initCountAnimations() {
  const counterItems = document.querySelectorAll("[data-count-to]");

  if (!counterItems.length) {
    return;
  }

  const formatValue = (value) => new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(value);

  const animateCounter = (element) => {
    const target = Number(element.getAttribute("data-count-to"));
    const suffix = element.getAttribute("data-count-suffix") || "";

    if (!Number.isFinite(target)) {
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(target * easedProgress);

      element.textContent = `${formatValue(currentValue)}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(updateValue);
      }
    };

    window.requestAnimationFrame(updateValue);
  };

  if (!("IntersectionObserver" in window)) {
    counterItems.forEach(animateCounter);
    return;
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.2
  });

  counterItems.forEach((item) => {
    counterObserver.observe(item);
  });
}

function initHashScroll() {
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  if (!hashLinks.length) {
    return;
  }

  const getOffset = () => {
    const stickyNav = document.querySelector("#nav_top");
    return (stickyNav ? stickyNav.offsetHeight : 0) + 24;
  };

  hashLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - getOffset();

      window.history.replaceState(null, "", targetId);
      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth"
      });
    });
  });
}

initRevealAnimations();
initCountAnimations();
initHashScroll();
