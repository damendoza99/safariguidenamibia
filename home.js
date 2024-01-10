// ------------------------
// --- Home Page ---
// ------------------------

// Home Load
const loadElement = document.querySelector(".load");
if (loadElement) {
  window.addEventListener("load", pageLoad);
}

function pageLoad() {
  gsap.set(".load, [text-split], [load-title], [load-hero-bg]", {
    autoAlpha: 1,
  });
  $(".load").css("display", "flex");
  document.body.style.cssText = "overflow: hidden; height: 100%;";
  lenis.stop();

  const loadElement = gsap.timeline({
    onComplete: function () {
      gsap.set("[load-hero-heading-wrap], [load-nav], [load-hero-scroll]", {
        autoAlpha: 1,
      });

      gsap
        .timeline()
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
          { opacity: 0, duration: 0.6, ease: "power3.inOut" },
          1.5,
        )
        .fromTo(
          "[load-nav]",
          { yPercent: -100 },
          { yPercent: 0, duration: 0.8, ease: "power3.inOut" },
          0.8,
        );

      setTimeout(function () {
        document.body.style.cssText = "overflow: auto;";
        lenis.start();
      }, 1500);
    },
  });

  loadElement
    .from("[load-loading]", { opacity: 0, duration: 1.2, ease: "power3.inOut" })
    .from(
      "[load-title1] .load-hero_span",
      { y: "100%", stagger: 0.04, duration: 0.6, ease: "power2.out" },
      ">",
    )
    .from(
      "[load-title2] .load-hero_span",
      { y: "100%", stagger: 0.05, duration: 0.8, ease: "power2.out" },
      ">-.7",
    )
    .from(
      "[load-title3] .load-hero_span",
      { y: "100%", stagger: 0.05, duration: 0.8, ease: "power2.out" },
      ">-1.125",
    )
    .from(
      ".load-img_container .load-img",
      {
        opacity: 0,
        stagger: { each: 0.4 },
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          let state = Flip.getState(".load-img.is-6", {
            props: "backgroundPosition",
          });
          Flip.from(state, {
            targets: ".hero-bg_wrap",
            duration: 1.25,
            toggleClass: "flipping",
            absolute: true,
            ease: "power3.inOut",
          });
        },
      },
      ">",
    )
    .to(".load", { opacity: 0, display: "none" });

  if (sessionStorage.getItem("visited") !== null) {
    document.querySelector(".load").remove();
    loadElement.paused(true);
    setTimeout(function () {
      document.body.style.cssText = "overflow: auto; height: auto";
    }, 300);

    document.body.style.cssText = "overflow: auto;";
    lenis.start();

    gsap.set(
      "[load-hero-heading-wrap], [load-nav], [load-hero-scroll], [load-hero-bg], [load-hero-paragraph], [load-hero-panel]",
      { autoAlpha: 1 },
    );

    gsap
      .timeline()
      .from("[load-hero-bg]", { opacity: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(
        "[load-heading] .char",
        { yPercent: 120 },
        {
          yPercent: 0,
          stagger: { amount: 0.8 },
          duration: 0.8,
          ease: "power3.out",
        },
        ">-.2",
      )
      .from(
        "[load-subtitle]",
        { opacity: 0, duration: 0.8, ease: "power3.out" },
        ">-.3",
      )
      .from(
        "[load-hero-scroll]",
        { opacity: 0, duration: 0.8, ease: "power3.inOut" },
        "<-.2",
      )
      .fromTo(
        "[load-nav]",
        { yPercent: -100 },
        { yPercent: 0, duration: 0.8, ease: "power3.inOut" },
        0.6,
      );
  }
  sessionStorage.setItem("visited", "true");
}

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

// Why text animation //
function whySection() {
  const whyContent = document.querySelectorAll(".why_item_right-content");
  const firstWhy = whyContent[0];
  const secondWhy = whyContent[1];
  const thirdWhy = whyContent[2];
  const fourthWhy = whyContent[3];

  // Why text animation //
  const runSplit = () => {
    new SplitType("[whyHead]", {
      types: "words",
    });
  };
  runSplit();

  const animateWhyHeading = (whyHead) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: whyHead,
          start: "top 85%",
          end: "bottom 75%",
          scrub: 1,
        },
      })
      .from(whyHead, {
        y: "50%",
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        duration: 1,
      });
  };

  document.querySelectorAll("[whyHead] .word").forEach(animateWhyHeading);

  const animateWhyGroup = (trigger, childSelector) => {
    gsap
      .timeline({
        defaults: { duration: 1.5 },
        scrollTrigger: {
          trigger,
          start: "top center",
          end: "bottom bottom",
          scrub: 1.5,
        },
      })
      .to(document.querySelectorAll(childSelector), {
        y: "0%",
        ease: "sine.inOut",
        stagger: 0.05,
      });
  };

  animateWhyGroup(firstWhy, ".grid_element-img-wrap.is-first-group");
  animateWhyGroup(secondWhy, ".grid_element-img-wrap.is-second-group");
  animateWhyGroup(thirdWhy, ".grid_element-img-wrap.is-third-group");
  animateWhyGroup(fourthWhy, ".grid_element-img-wrap.is-fourth-group");
}

// Home Mobile Slider - Starts
$(".slider-main_component").each(function () {
  const loopMode = $(this).attr("loop-mode") === "true";
  const sliderDuration = parseInt($(this).attr("slider-duration")) || 300;

  const swiperOptions = {
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: false,
    centeredSlides: loopMode,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    spaceBetween: "4%",
    rewind: false,
    mousewheel: {
      forceToAxis: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: "auto",
        spaceBetween: "4%",
      },
      // tablet
      768: {
        slidesPerView: "auto",
        spaceBetween: "4%",
      },
      // desktop
      992: {
        slidesPerView: "auto",
        spaceBetween: "2%",
      },
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true,
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active",
  };
  new Swiper($(this).find(".swiper")[0], swiperOptions);
});

// MARQUEE POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // marquee component
  $("[tr-marquee-element='component']").each(function (index) {
    let componentEl = $(this),
      panelEl = componentEl.find("[tr-marquee-element='panel']"),
      triggerHoverEl = componentEl.find("[tr-marquee-element='triggerhover']"),
      triggerClickEl = componentEl.find("[tr-marquee-element='triggerclick']");
    let speedSetting = attr(100, componentEl.attr("tr-marquee-speed")),
      verticalSetting = attr(false, componentEl.attr("tr-marquee-vertical")),
      reverseSetting = attr(false, componentEl.attr("tr-marquee-reverse")),
      scrollDirectionSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrolldirection"),
      ),
      scrollScrubSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrollscrub"),
      ),
      moveDistanceSetting = -100,
      timeScaleSetting = 1,
      pausedStateSetting = false;
    if (reverseSetting) moveDistanceSetting = 100;
    let marqueeTimeline = gsap.timeline({
      repeat: -1,
      onReverseComplete: () => marqueeTimeline.progress(1),
    });
    if (verticalSetting) {
      speedSetting = panelEl.first().height() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { yPercent: 0 },
        { yPercent: moveDistanceSetting, ease: "none", duration: speedSetting },
      );
    } else {
      speedSetting = panelEl.first().width() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { xPercent: 0 },
        { xPercent: moveDistanceSetting, ease: "none", duration: speedSetting },
      );
    }
    let scrubObject = { value: 1 };
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!pausedStateSetting) {
          if (scrollDirectionSetting && timeScaleSetting !== self.direction) {
            timeScaleSetting = self.direction;
            marqueeTimeline.timeScale(self.direction);
          }
          if (scrollScrubSetting) {
            let v = self.getVelocity() * 0.006;
            v = gsap.utils.clamp(-60, 60, v);
            let scrubTimeline = gsap.timeline({
              onUpdate: () => marqueeTimeline.timeScale(scrubObject.value),
            });
            scrubTimeline.fromTo(
              scrubObject,
              { value: v },
              { value: timeScaleSetting, duration: 0.5 },
            );
          }
        }
      },
    });
    function pauseMarquee(isPausing) {
      pausedStateSetting = isPausing;
      let pauseObject = { value: 1 };
      let pauseTimeline = gsap.timeline({
        onUpdate: () => marqueeTimeline.timeScale(pauseObject.value),
      });
      if (isPausing) {
        pauseTimeline.fromTo(
          pauseObject,
          { value: timeScaleSetting },
          { value: 0, duration: 0.5 },
        );
        triggerClickEl.addClass("is-paused");
      } else {
        pauseTimeline.fromTo(
          pauseObject,
          { value: 0 },
          { value: timeScaleSetting, duration: 0.5 },
        );
        triggerClickEl.removeClass("is-paused");
      }
    }
    if (window.matchMedia("(pointer: fine)").matches) {
      triggerHoverEl.on("mouseenter", () => pauseMarquee(true));
      triggerHoverEl.on("mouseleave", () => pauseMarquee(false));
    }
    triggerClickEl.on("click", function () {
      !$(this).hasClass("is-paused") ? pauseMarquee(true) : pauseMarquee(false);
    });
  });
});

/* STACK SECTION ANIMATION */
// Stack Card 1 Grows
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false,
});

$(".stack_card-bg.is-one").each(function (index) {
  let triggerElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1,
    },
  });

  tl.to(triggerElement, {
    width: "100vw",
    height: "100vh",
    borderRadius: "0rem",
    duration: 1,
  });
});

// Stack Text Movemenet
gsap.matchMedia().add("(min-width: 992px)", () => {
  // First Stack
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section.is-marquee--bg3",
      start: "top top",
      endTrigger: ".stack_card.is-1",
      end: "bottom top",
      scrub: true,
    },
  });

  // Second Stack
  tl.fromTo(".title.is-stack_card.is-first", { y: "-521px" }, { y: "0px" });

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".stack_card.is-1",
      start: "top top",
      endTrigger: ".stack_card.is-2",
      end: "top top",
      scrub: true,
    },
  });
  tl2.fromTo(".title.is-stack_card.is-second", { y: "-1042px" }, { y: "0px" });

  // Third stack
  let tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".stack_card.is-2",
      start: "top top",
      endTrigger: ".stack_card.is-3",
      end: "top top",
      scrub: true,
    },
  });
  tl3.fromTo(".title.is-stack_card.is-third", { y: "-1042px" }, { y: "0px" });
});

// Stack Title Text Movement
function createStackTimeline(trigger, start, endTrigger, end) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: start,
      endTrigger: endTrigger,
      end: end,
      scrub: true,
    },
  });
}
// First Stack
let firstStackTl = createStackTimeline(
  ".section.is-marquee--bg3",
  "top top",
  ".stack_card.is-1",
  "bottom top",
);
firstStackTl.fromTo(
  ".title.is-stack_card.is-first",
  { y: "-521px" },
  { y: "0px" },
);
// Second Stack
let secondStackTl = createStackTimeline(
  ".stack_card.is-1",
  "top top",
  ".stack_card.is-2",
  "top top",
);
secondStackTl.fromTo(
  ".title.is-stack_card.is-second",
  { y: "-1042px" },
  { y: "0px" },
);
// Third Stack
let thirdStackTl = createStackTimeline(
  ".stack_card.is-2",
  "top top",
  ".stack_card.is-3",
  "top top",
);
thirdStackTl.fromTo(
  ".title.is-stack_card.is-third",
  { y: "-1042px" },
  { y: "0px" },
);

/* Scroll Flip Power Up */
function scrollFlip() {
  $(document).ready(() => {
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "")
        return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    }

    gsap.registerPlugin(ScrollTrigger, Flip);
    ScrollTrigger.normalizeScroll(true);

    $("[tr-scrollflip-element='component']").each(function (index) {
      const componentEl = $(this),
        originEl = componentEl.find("[tr-scrollflip-element='origin']"),
        targetEl = componentEl.find("[tr-scrollflip-element='target']"),
        scrubStartEl = componentEl.find("[tr-scrollflip-scrubstart]"),
        scrubEndEl = componentEl.find("[tr-scrollflip-scrubend]");

      const startSetting = attr(
          "top top",
          scrubStartEl.attr("tr-scrollflip-scrubstart"),
        ),
        endSetting = attr(
          "bottom bottom",
          scrubEndEl.attr("tr-scrollflip-scrubend"),
        ),
        staggerSpeedSetting = attr(
          0,
          componentEl.attr("tr-scrollflip-staggerspeed"),
        ),
        staggerDirectionSetting = attr(
          "start",
          componentEl.attr("tr-scrollflip-staggerdirection"),
        ),
        scaleSetting = attr(false, componentEl.attr("tr-scrollflip-scale")),
        breakpointSetting = attr(
          0,
          componentEl.attr("tr-scrollflip-breakpoint"),
        );

      let timeline;

      originEl.each(function (index) {
        const flipId = `${index}`;
        $(this).attr("data-flip-id", flipId);
        targetEl.eq(index).attr("data-flip-id", flipId);
      });

      function createTimeline() {
        if (timeline) {
          timeline.kill();
        }

        gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, () => {
          const state = Flip.getState(originEl);
          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scrubStartEl,
              endTrigger: scrubEndEl,
              start: startSetting,
              end: endSetting,
              scrub: true,
            },
          });

          timeline.add(
            Flip.from(state, {
              targets: targetEl,
              scale: scaleSetting,
              stagger: {
                amount: staggerSpeedSetting,
                from: staggerDirectionSetting,
              },
            }),
          );
        });
      }

      createTimeline();

      $(window).on("resize", () => {
        clearTimeout(timeline);
        timeline = setTimeout(() => {
          createTimeline();
        }, 250);
      });
    });
  });
}

// Stack Card Title Text 1 Shows
$(".content-wrap.is-stack_card.is-first").each(function (index) {
  let triggerElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 20%",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  tl.to(triggerElement, {
    opacity: 1,
    duration: 0.15,
  });
});

// Stack Cards 1 & 2 Toggle Pointer Events
$(".content-child.is-programs.is-bottom").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".stack_card.is-1, .stack_card.is-2");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "bottom bottom",
      end: "bottom bottom",
      scrub: 1,
      onToggle: (self) => {
        // Toggle pointer-events based on whether the element is in view
        const isElementInView = self.isActive;
        targetElement.css("pointer-events", isElementInView ? "auto" : "none");
      },
    },
  });

  tl.to(targetElement, {
    opacity: 0,
  });
});

// Stack Card Title 3 and Stack Card 2 Hides with Pointer Events Toggle
window.addEventListener("DOMContentLoaded", () => {
  const desktopBreakpoint = 992;

  // Check if the window width is greater than the desktop breakpoint
  if (window.innerWidth > desktopBreakpoint) {
    // Stack Card Title 3 and Stack Card 2 Hides with Pointer Events Toggle - Starts
    $(".content-child.is-programs.is-bottom").each(function (index) {
      let triggerElement = $(this);
      let targetElement1 = $(
        ".content-wrap.is-stack_card.is-third, .stack_card_mobile-menu_wrap",
      );
      let targetElement2 = $(".stack_card.is-2");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "bottom bottom",
          end: "bottom bottom",
          scrub: 1,
          onToggle: (self) => {
            // Toggle pointer-events based on whether the element is in view
            const isElementInView = self.isActive;
            targetElement1.css(
              "pointer-events",
              isElementInView ? "auto" : "none",
            );
            targetElement2.css(
              "pointer-events",
              isElementInView ? "auto" : "none",
            );
          },
        },
      });

      tl.to(targetElement1, {
        opacity: 0,
      });

      // Additional animation for targetElement2
      tl.to(targetElement2, {
        opacity: 0,
      });
    });
    // Stack Card Title 3 and Stack Card 2 Hides with Pointer Events Toggle - End

    /* SCROL FLIP BORDER RADIUS (Stack Card 3)- Start */
    $(".tours-heading-h2_img").each(function (index) {
      let triggerElement = $(this);
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top top",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      tl.fromTo(
        triggerElement,
        { borderRadius: "0rem", duration: 1 },
        { borderRadius: "0.63rem", duration: 1 },
      );
    });
  }
});

/* Stack Card Title 3 Pointer Events */
$(".stack_card.is-3").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".stack_card.is-1, .stack_card.is-2, .stack_card.is-3");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top top",
      scrub: 1,
    },
  });

  tl.fromTo(
    targetElement,
    { pointerEvents: "auto" },
    { pointerEvents: "none" },
  );
});
/* Stack Section Heading Animation */
window.addEventListener("DOMContentLoaded", () => {
  // Split text into spans
  let typeSplit = new SplitType("[home-text-split]", {
    types: "words, chars",
    tagName: "span",
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    const mediaQueryLargeDesktop = window.matchMedia("(min-width: 1920px)");
    const mediaQueryDesktop = window.matchMedia(
      "(min-width: 991px) and (max-width: 1919px)",
    );
    const mediaQueryTablet = window.matchMedia(
      "(min-width: 767px) and (max-width: 990px)",
    );
    const mediaQueryMobile = window.matchMedia(
      "(min-width: 479px) and (max-width: 766px)",
    );
    const mediaQuerySmallMobile = window.matchMedia("(max-width: 478px)");

    // Play tl when scrolled into view based on breakpoints
    function setStartValue() {
      if (mediaQueryLargeDesktop.matches) {
        return "top 50%"; // Adjusted for larger desktops
      } else if (mediaQueryDesktop.matches) {
        return "top 60%";
      } else if (mediaQueryTablet.matches) {
        return "top 70%";
      } else if (mediaQueryMobile.matches) {
        return "top 80%";
      } else if (mediaQuerySmallMobile.matches) {
        return "top 90%"; // Adjusted for smaller mobile devices
      } else {
        return "top 50%"; // Default for other cases
      }
    }

    ScrollTrigger.create({
      trigger: triggerElement,
      start: setStartValue(),
      onEnter: () => timeline.play(),
      onLeaveBack: () => timeline.reverse(),
    });

    // Update the start value on resize
    window.addEventListener("resize", () => {
      ScrollTrigger.update();
    });
  }

  $("[home-letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 120,
      duration: 1.2,
      ease: "power4.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[home-text-split]", { opacity: 1 });
});

/* Tours Heading Image Animation */
$(".title.is-tours-review").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".tours-heading-h2_img-effect-wrap");

  let tourImageAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 20%",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  tourImageAnimation.fromTo(
    targetElement,
    {
      y: "110%",
      opacity: 0.5,
    },
    {
      y: "0%",
      opacity: 1,
    },
  );
});

/* Tours Heading Panel Image Animation */
window.addEventListener("DOMContentLoaded", () => {
  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play(),
      onLeaveBack: () => timeline.reverse(), // Reverse the timeline when leaving back
    });
  }

  $(".tour-img_panel").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), {
      height: "105%",
      duration: 1,
      ease: "power4.out",
    });
    createScrollTrigger($(this), tl);
  });
  // Avoid flash of unstyled content
  gsap.set(".tour-img_panel", { opacity: 1 });
});

/* Tours Heading Span Image Animation */
window.addEventListener("DOMContentLoaded", () => {
  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 50%",
      onEnter: () => timeline.play(),
      onLeaveBack: () => timeline.reverse(), // Reverse the timeline when leaving back
    });
  }

  $(".span-element.is-stack-heading-span").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), {
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
    createScrollTrigger($(this), tl);
  });
  // Avoid flash of unstyled content
  gsap.set(".tour-img_panel", { opacity: 1 });
});

/* FADE IN TEXT ON SCROLL ANIMATION */
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

// Opacity Fade
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
  const fadeInElements = document.querySelectorAll("[fade-in]");
  fadeInElements.forEach((element) => {
    createFadeInScrollTrigger(element);
  });
});

// For desktop screensize only //
let mm = gsap.matchMedia();
mm.add("(min-width: 992px)", () => {
  whySection();
  scrollFlip();
  //   marquee(),
  //   navStagger(),
  //   headLight(),
  //   headRe(),
  //   textLight(),
  //   textRe(),
  //   text2Light(),
  //   heroALight(),
  //   aboutStat(),
  //   () => {}
});
