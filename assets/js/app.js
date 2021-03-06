// Nav Menu Start
const viewMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

viewMenu("menu-bar", "menu-links");

// Action

const linkToggle = document.querySelectorAll(".nav-link");

function openClose() {
  const navLinks = document.getElementById("menu-links");
  navLinks.classList.remove("show");
}

linkToggle.forEach((n) => n.addEventListener("click", openClose));

// Nav Menu End

// Scroll Sections
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".menu_list a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".menu_list a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

// var secActive = document.querySelectorAll('section[id]');

// window.addEventListener('scroll', secScroll)

// function secScroll() {
//   var scrollY = window.pageYOffset

//   secActive.forEach(current => {
//     var secHeight = current.offsetHeight;
//     var secTop = current.offsetTop - 50;
//     sectionId = current.getAttribute('id');

//     if (scrollY > secTop && scrollY <= secTop + secHeight) {
//       document.querySelector('.menu_list a[href*=' + sectionId + ']').classList.add('active');
//     } else {
//       document.querySelector('.menu_list a[href*=' + sectionId + ']').classList.remove('active');
//     }
//   })
// }

// Yearly Update
const yearly = new Date();
const newly = (document.querySelector(
  ".yearly"
).innerHTML = yearly.getFullYear());

// Scroll to Top

window.onscroll = function () {
  scrollFunction();
  chatMe();
  fixedNav();
};

function scrollFunction() {
  var scrollToTop = document.querySelector("#totop");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
}

function chatMe() {
  var waChat = document.querySelector(".wa-chat");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    waChat.classList.add("whatsapp-btn");
  } else {
    waChat.classList.remove("whatsapp-btn");
  }
}

function fixedNav() {
  var topNav = document.querySelector(".stickytop");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    topNav.classList.add("stickynav");
  } else {
    topNav.classList.remove("stickynav");
  }
}
// Scroll to Top End

// window.onload = function () {
//   var stat = new CountUp("counter", 2000);
//   stat.start();
// };


// window.onload = function () {
//   const countUp = document.querySelectorAll(".stats_num");
//   const speed = 2260;

//   countUp.forEach((stats_num) => {
//     const countUpdate = () => {
//       const target = +stats_num.getAttribute("data-target");
//       const count = +stats_num.innerText;

//       const inc = target / speed;

//       if (count < target) {
//         stats_num.innerText = Math.ceil(count + inc);
//         setTimeout(countUpdate, 1);
//       } else {
//         count.innerText = target;
//       }
//     };
//     countUpdate();
//   });
// };

// $(document).ready(function () {
//   $(".stats-num").counterUp({
//     delay: 10,
//     time: 6000,
//   });
// });

// Animation

const effects = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: false,
});

effects.reveal(".hero-name", {
  origin: "left",
});
effects.reveal(".hero-bigtext", {
  origin: "left",
  delay: 200,
});
effects.reveal(".hero-smalltext", {
  origin: "left",
  delay: 400,
});
effects.reveal(".stat-card, .hire-card, .port-items", {
  origin: "bottom",
  interval: 200,
  delay: 600,
});
effects.reveal(
  ".mobile-heading, .submit, .action-text, .pc-heading, .logo-heading, .web-title, .sert-title",
  {
    origin: "bottom",
    delay: 500,
  }
);
effects.reveal(".my-image", {});
effects.reveal(".logo-wrap, .new-col", {
  interval: 200,
});
effects.reveal(".mob-btn, .about-cta, .hero-cta", {
  scale: 0.16,
});
effects.reveal(".web-left", {});

effects.reveal(".web-right", {
  delay: 100,
});

effects.reveal(".contact-bigtext, .contact-smalltext, .inputs-ani", {
  scale: 0.16,
  interval: 200,
});

effects.reveal(".social-ico", {
  origin: "left",
  interval: 200,
  delay: 200,
});
