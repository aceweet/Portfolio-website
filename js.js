gsap.registerPlugin(ScrollTrigger);

const textElements = gsap.utils.toArray(".text");

textElements.forEach((text) => {
  gsap.to(text, {
    backgroundSize: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: text,
      start: "center 80%",
      end: "center 20%",
      scrub: true,
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        startCounting(entry.target);
      }
    });
  });

  let counters = document.querySelectorAll(".count-number");

  counters.forEach(function (counter) {
    observer.observe(counter);
  });

  function startCounting(element) {
    let startValue = parseInt(element.dataset.start, 10); // Retrieve the starting value from the data-start attribute
    let endValue = parseInt(element.dataset.target, 10);
    let duration = 1000;

    let range = endValue - startValue;
    let current = startValue;
    let increment = endValue > startValue ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));

    let timer = setInterval(function () {
      current += increment;
      element.textContent = current;

      if (current === endValue) {
        clearInterval(timer);
      }
    }, stepTime);
  }
});

//
