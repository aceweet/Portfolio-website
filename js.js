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
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        startCounting(entry.target);
      }
    });
  });

  var counters = document.querySelectorAll(".count-number");

  counters.forEach(function (counter) {
    observer.observe(counter);
  });

  function startCounting(element) {
    var startValue = parseInt(element.dataset.start, 10); // Retrieve the starting value from the data-start attribute
    var endValue = parseInt(element.dataset.target, 10);
    var duration = 1000;

    var range = endValue - startValue;
    var current = startValue;
    var increment = endValue > startValue ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));

    var timer = setInterval(function () {
      current += increment;
      element.textContent = current;

      if (current === endValue) {
        clearInterval(timer);
      }
    }, stepTime);
  }
});
