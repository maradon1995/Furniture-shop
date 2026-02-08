"use strict";

window.addEventListener("load", load);

function load() {
  /* Перевірка мобільного браузера */
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  /* Додавання класу touch для HTML, якщо браузер мобільний */
  function addTouchAttr() {
    // Додавання data-fls-touch для HTML, якщо браузер мобільний
    if (isMobile.any())
      document.documentElement.setAttribute("data-fls-touch", "");
  }

  /* Menu burger open - close */

  function initFooterMenus() {
    const footerMenus = document.querySelectorAll(".body-footer__list");
    if (footerMenus.length) {
      const matchMedia = window.matchMedia(`(width <= 36.0625em)`);
      matchMedia.addEventListener("change", function () {
        setFooterMenus(matchMedia.matches);
      });

      function setFooterMenus() {
        footerMenus.forEach((footerMenu) => {
          if (matchMedia.matches) {
            footerMenu.style.cssText += `height: 0;`;
          } else {
            footerMenu.style.cssText = ``;
          }
        });
      }
      setFooterMenus();
    }
  }

  initFooterMenus();
  addTouchAttr();

  document.addEventListener("click", documentActions);
  window.addEventListener('scroll', windowScroll)
  /* func heigth header if window start scroling*/

  const header = document.querySelector('.header');

  function windowScroll(e) {
    if(scrollY > 90) {
      header.classList.add('header--scroll')
    } else {
      header.classList.remove('header--scroll')
    }
  }

  /* func close - open items */

  function documentActions(e) {
    const targetElement = e.target;
    /* for mobile */
    if (isMobile.any()) {
      /* open - close sub menu items */
      if (targetElement.closest(".menu__sub-link")) {
        const currentElement = targetElement.closest(".menu__sub-link");
        document.documentElement.toggleAttribute("data-sub-menu-open");
      } else {
        document.documentElement.removeAttribute("data-sub-menu-open");
      }

      /* open - close footer items if window width <= 577px */
      if (targetElement.closest(".body-footer__title")) {
        const currentTitle = targetElement.closest(".body-footer__title");
        const currentList = currentTitle.nextElementSibling;
        if (window.innerWidth <= 577) {
          currentTitle.toggleAttribute("data-footer-menu-open");
          if (currentTitle.hasAttribute("data-footer-menu-open")) {
            currentList.style.cssText = ``;
            const currentListHeight = currentList.offsetHeight;
            currentList.style.cssText = `height: 0;`;
            currentList.offsetHeight;
            currentList.style.cssText = `height: ${currentListHeight}px`;
          } else {
            currentList.style.cssText = `height: 0;`;
          }
        }
      }
    }
    if (targetElement.closest(".icon-menu")) {
      document.documentElement.toggleAttribute("data-menu-open");
    }
  }


}
