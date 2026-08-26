/* =========================================================
   QUEST FINANCE LAB — MOTION SYSTEM
========================================================= */

const page = document.body.dataset.page;


/* =========================================================
   ABOUT — SECTION REVEAL
========================================================= */

if (page === "about") {

  const sections =
    document.querySelectorAll(".content-section");


  sections.forEach((section, index) => {

    /* 첫 번째 About 영역은 처음부터 표시 */
    if (index === 0) {
      return;
    }

    section.classList.add("reveal-section");


    Array
      .from(section.children)
      .forEach((child, childIndex) => {

        child.classList.add("reveal-child");

        child.style.setProperty(
          "--reveal-order",
          childIndex
        );

      });

  });


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px"
      }
    );


  requestAnimationFrame(() => {

  requestAnimationFrame(() => {

   requestAnimationFrame(() => {

  requestAnimationFrame(() => {

    document
      .querySelectorAll(".reveal-section")
      .forEach((section) => {
        revealObserver.observe(section);
      });

  });

});

  });

});

}

/* =========================================================
   LEARNING PROGRESS
   About + Curriculum only
========================================================= */

if (
  page === "about" ||
  page === "curriculum"
) {

  const learningLists =
    document.querySelectorAll(".learning-list");


  function updateLearningLists() {

    const targetY =
      window.innerHeight * 0.48;


    learningLists.forEach((list) => {

      const items =
        Array.from(
          list.querySelectorAll(".learning-item")
        );


      if (!items.length) {
        return;
      }


      let activeIndex = 0;

      const listRect =
        list.getBoundingClientRect();


      /*
       * 아직 리스트에 도달하지 않았을 때
       */

      if (listRect.top > targetY) {

        activeIndex = 0;

      }


      /*
       * 리스트를 전부 지나간 뒤
       */

      else if (listRect.bottom < targetY) {

        activeIndex =
          items.length - 1;

      }


      /*
       * 현재 리스트 안을 스크롤 중
       */

      else {

        let closestDistance =
          Infinity;


        items.forEach(
          (item, index) => {

            const rect =
              item.getBoundingClientRect();


            const itemCenter =
              rect.top +
              rect.height / 2;


            const distance =
              Math.abs(
                itemCenter - targetY
              );


            if (
              distance <
              closestDistance
            ) {

              closestDistance =
                distance;

              activeIndex =
                index;

            }

          }
        );

      }


      /*
       * Active item
       */

      items.forEach(
        (item, index) => {

          item.classList.toggle(
            "is-active",
            index === activeIndex
          );

        }
      );


      /*
       * Progress rail
       */

      const progress =
        items.length > 1

          ? activeIndex /
            (items.length - 1)

          : 1;


      list.style.setProperty(
        "--learning-progress",
        progress
      );

    });

  }


  window.addEventListener(
    "scroll",
    updateLearningLists,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateLearningLists
  );


  updateLearningLists();

}



/* =========================================================
   STICKY HEADER DEPTH
   All Pages
========================================================= */

const siteHeader =
  document.querySelector(".site-header");


function updateHeaderDepth() {

  if (!siteHeader) {
    return;
  }


  siteHeader.classList.toggle(
    "is-scrolled",
    window.scrollY > 24
  );

}


window.addEventListener(
  "scroll",
  updateHeaderDepth,
  {
    passive: true
  }
);


updateHeaderDepth();