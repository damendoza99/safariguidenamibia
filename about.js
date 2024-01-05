// ------------------------
// --- About Page ---
// ------------------------

// Page Load Animation
window.addEventListener("load", pageLoad);

function pageLoad() {
  // Elements
  const elementsToAnimate = [
    "[load-title]",
    "[load-nav]",
    "[load-hero-heading-wrap]",
    "[load-hero-scroll]",
    "[load-hero-bg]",
    "[load-subtitle]",
  ];

  // Set initial visibility using GSAP
  gsap.set(elementsToAnimate, { visibility: "hidden" });

  // Timeline for the heading, subheading, panels, and nav animations
  const mainTimeline = gsap.timeline();
  mainTimeline
    .fromTo(
      "[load-heading] .char",
      { yPercent: 120 },
      {
        yPercent: 0,
        stagger: { amount: 0.8 },
        duration: 0.8,
        ease: "power3.out",
      },
      0.2,
    )
    .from(
      "[load-subtitle]",
      { opacity: 0, duration: 0.8, ease: "power3.out" },
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
      { yPercent: 0, duration: 0.8, ease: "power3.inOut" },
      0.8,
    )
    .from("[load-hero-bg]", {
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
    .fromTo(
      "[load-hero-paragraph]",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.inOut" },
      ">-.6",
    )
    .fromTo(
      "[load-hero-panel]",
      { height: "-100%" },
      { height: "0%", duration: 1.2, ease: "power3.inOut" },
      ">-.6",
    );

  // Reset body style
  setTimeout(() => {
    document.body.style.cssText = "overflow: auto;";
  }, 1500);

  // Additional logic (if needed)

  // Set final visibility state using GSAP
  gsap.set(elementsToAnimate, { visibility: "visible" });
}

// Page Load Animation - Ends

// Text Highlight

gsap.registerPlugin(ScrollTrigger);
function revealSplit() {
  new SplitType("[text-highlight]", { types: "words" });
}
revealSplit();

function textLight() {
  const textHighlight = document.querySelectorAll("[text-highlight]");
  textHighlight.forEach(function (textHighlightInstance) {
    const bodyHighlight = gsap.timeline({
      scrollTrigger: {
        trigger: textHighlightInstance,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
    bodyHighlight.from(textHighlightInstance.querySelectorAll(".word"), {
      opacity: 0.2,
      stagger: 0.03,
      ease: "power3.out",
      duration: 0.6,
    });
  });
}
textLight();

// Resize CSS
windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    splitType();
    typeSplit();
  }
});

// Initialize SplitType
function initSplitType() {
  var splitTypeElement = document.getElementById("splitType");

  if (splitTypeElement) {
    var splitTypeInstance = new SplitType("#splitType", {
      types: "words,chars",
      tagName: "span",
    });
  } else {
    console.warn("Element with id 'splitType' not found. Code not executed.");
  }
}

document.addEventListener("DOMContentLoaded", initSplitType);

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

