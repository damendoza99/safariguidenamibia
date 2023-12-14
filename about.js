// ------------------------
// --- About Page ---
// ------------------------

// Page Load Animation
const loadElement = document.querySelector(".load");

if (loadElement) {
  window.addEventListener("load", pageLoad);

  function pageLoad() {
    gsap.set(".load, [text-split], [load-title], [load-hero-bg]", {
      autoAlpha: 1,
    });

    $(".load").css("display", "flex");
    document.body.style.cssText = "overflow: hidden; height: 100%;";
    lenis.stop();

    const loadTimeline = gsap.timeline({
      onComplete: function () {
        const headingWrap = document.querySelector("[load-hero-heading-wrap]");
        const loadNav = document.querySelector("[load-nav]");
        const loadHeroScroll = document.querySelector("[load-hero-scroll]");

        if (headingWrap && loadNav && loadHeroScroll) {
          gsap.set([headingWrap, loadNav, loadHeroScroll], {
            autoAlpha: 1,
          });
        }

        gsap
          .timeline()
          .fromTo(
            "[load-heading] .char",
            { yPercent: 120 },
            {
              yPercent: 0,
              stagger: { amount: 0.8 },
              duration: 1,
              ease: "power3.out",
            },
            0.2,
          )
          .from(
            "[load-subtitle]",
            { opacity: 0, duration: 1, ease: "power3.out" },
            1.5,
          )
          .from(
            "[load-hero-scroll]",
            { opacity: 0, duration: 0.8, ease: "power3.inOut" },
            1.5,
          )
          .fromTo(
            "[load-nav]",
            { yPercent: -100 },
            { yPercent: 0, duration: 1, ease: "power3.inOut" },
            0.8,
          );

        setTimeout(function () {
          document.body.style.cssText = "overflow: auto;";
          lenis.start();
        }, 1500);
      },
    });

    loadTimeline
      .from("[load-loading]", {
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
      })
      .from(
        "[load-title1] .load-hero_span",
        { y: "100%", stagger: 0.05, duration: 0.6, ease: "power2.out" },
        ">",
      )
      .from(
        "[load-title2] .load-hero_span",
        { y: "100%", stagger: 0.05, duration: 1, ease: "power2.out" },
        ">-.7",
      )
      .from(
        "[load-title3] .load-hero_span",
        { y: "100%", stagger: 0.06, duration: 1, ease: "power2.out" },
        ">-1.125",
      )
      .from(
        ".load-img_container .load-img",
        {
          opacity: 0,
          stagger: { each: 0.4 },
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            const state = Flip.getState(".load-img.is-6", {
              props: "backgroundPosition",
            });

            const heroBgWrap = document.querySelector(".hero-bg_wrap");

            if (heroBgWrap) {
              Flip.from(state, {
                targets: heroBgWrap,
                duration: 1.25,
                toggleClass: "flipping",
                absolute: true,
                ease: "power3.inOut",
              });
            }
          },
        },
        ">",
      )
      .to(".load", { opacity: 0, display: "none" });

    if (sessionStorage.getItem("visited") !== null) {
      const loadElement = document.querySelector(".load");
      if (loadElement) {
        loadElement.remove();
      }

      loadTimeline.paused(true);
      setTimeout(function () {
        document.body.style.cssText = "overflow: auto; height: auto";
      }, 300);

      document.body.style.cssText = "overflow: auto;";
      lenis.start();

      const heroElements = document.querySelectorAll(
        "[load-hero-heading-wrap], [load-nav], [load-hero-scroll], [load-hero-bg], [load-hero-paragraph], [load-hero-panel]",
      );

      heroElements.forEach((element) => {
        gsap.set(element, { autoAlpha: 1 });
      });

      gsap
        .timeline()
        .from("[load-hero-bg]", {
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .fromTo(
          "[load-heading] .char",
          { yPercent: 120 },
          {
            yPercent: 0,
            stagger: { amount: 0.8 },
            duration: 1,
            ease: "power3.out",
          },
          ">-.2",
        )
        .from(
          "[load-subtitle]",
          { opacity: 0, duration: 1, ease: "power3.out" },
          ">-.4",
        )
        .from(
          "[load-hero-scroll]",
          { opacity: 0, duration: 0.8, ease: "power3.inOut" },
          "<-.2",
        )
        .fromTo(
          "[load-nav]",
          { yPercent: -100 },
          { yPercent: 0, duration: 1.2, ease: "power3.inOut" },
          0.6,
        )
        .fromTo(
          "[load-hero-paragraph]",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power3.inOut" },
          ">-.6",
        )
        .fromTo(
          "[load-hero-panel]",
          { height: "-100%" },
          { height: "0%", duration: 1.2, ease: "power3.inOut" },
          ">-.6",
        );
    }

    sessionStorage.setItem("visited", "true");
  }
}

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Text Highlight
  function revealSplit() {
    new SplitType("[text-highlight]", { types: "words" });
  }
  revealSplit();

  // Scroll-triggered text animation
  function textLight() {
    const textHighlight = document.querySelectorAll("[text-highlight]");
    textHighlight.forEach(function (textHighlightInstance) {
      gsap.from(textHighlightInstance.querySelectorAll(".word"), {
        opacity: 0.2,
        stagger: 0.03,
        ease: "power3.out",
        duration: 0.6,
        scrollTrigger: {
          trigger: textHighlightInstance,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    });
  }
  textLight();

  // Resize CSS
  let windowWidth = window.innerWidth;

  window.addEventListener("resize", function () {
    if (windowWidth !== window.innerWidth) {
      windowWidth = window.innerWidth;
      revealSplit(); // Assuming this function handles the resizing for SplitType
    }
  });

  // Initialize SplitType
  function initSplitType() {
    const splitTypeElement = document.getElementById("splitType");

    if (splitTypeElement) {
      new SplitType("#splitType", {
        types: "words,chars",
        tagName: "span",
      });
    } else {
      console.warn("Element with id 'splitType' not found. Code not executed.");
    }
  }

  initSplitType();
});


// Debounce Function for Resize
window.addEventListener("resize", function () {
  debounce(initSplitType, 200);
});

function debounce(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// Parallax Effect Images
const images = document.querySelectorAll(".paralax");
new Ukiyo(images);

// About Span Elements
$(".luke-small.is-about-hero--fc4").each(function (index) {
  let relatedEl = $(".span-element.is-about-hero").eq(index);
  relatedEl.appendTo($(this));
});

$(".who-we-are-span").each(function (index) {
  let relatedEl = $(".span-element.is-who-we-are-title").eq(index);
  relatedEl.appendTo($(this));
});

$(".why-about-span").each(function (index) {
  let relatedEl = $(".span-element.is-why-about-section").eq(index);
  relatedEl.appendTo($(this));
});

$(".stack-heading-span.is-1").each(function (index) {
  let relatedEl = $(".span-element.is-stack-heading-span.is-1").eq(index);
  relatedEl.appendTo($(this));
});

$(".stack-heading-span.is-2").each(function (index) {
  let relatedEl = $(".span-element.is-stack-heading-span.is-2").eq(index);
  relatedEl.appendTo($(this));
});

$(".footer-span").each(function (index) {
  let relatedEl = $(".span-element.is-footer").eq(index);
  relatedEl.appendTo($(this));
});

/* SPLIT TEXT ON SCROLL ANIMATION - Starts */
document.addEventListener("DOMContentLoaded", () => {
  // Split text into spans
  const typeSplit = new SplitType("[text-split], [text-reveal]", {
    types: "words, chars",
    tagName: "span",
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0).pause();
      },
    });

    // Play tl when scrolled into view (20% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 95%",
      onEnter: () => timeline.play(),
    });
  }

  // Letters Slide Up Animation
  $("[letters-slide-up]").each(function () {
    const tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 130,
      duration: 1.2,
      ease: "power4.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger(this, tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

/* SPLIT TEXT ON SCROLL ANIMATION - Ends */

/* FADE IN TEXT ON SCROLL ANIMATION - Starts */
document.addEventListener("DOMContentLoaded", () => {
  // Link timeline to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0).pause();
      },
    });

    // Play tl when scrolled into view (20% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 85%",
      onEnter: () => timeline.play(),
    });
  }

  // Fade In Text Animation
  $("[fade-in-text]").each(function () {
    const tl = gsap.timeline({ paused: true });
    tl.from(this, { opacity: 0, duration: 1, ease: "power4.out" });
    createScrollTrigger(this, tl);
  });
});

/* FADE IN TEXT ON SCROLL ANIMATION - Ends */

// Opacity Fade - Starts
document.addEventListener("DOMContentLoaded", () => {
  // Function to create a scroll trigger for fade-in elements
  function createFadeInScrollTrigger(element) {
    const tl = gsap.timeline({ paused: true });
    tl.from(element, {
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.6,
    });

    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.progress(0).pause(),
    });
  }

  // Find all elements with the fade-in attribute
  const fadeInElements = document.querySelectorAll("[fade-in]");

  // Loop through each element and create a scroll trigger
  fadeInElements.forEach((element) => {
    createFadeInScrollTrigger(element);
  });
});
// Opacity Fade - Ends
