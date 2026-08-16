/* =========================
   Current Year
========================= */

document.getElementById("year").textContent =
new Date().getFullYear();


/* =========================
   Navbar Background
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if(window.scrollY > 30){
    header.classList.add("scrolled");
  }else{
    header.classList.remove("scrolled");
  }

});


/* =========================
   Mobile Menu
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("open");

});


document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

  });

});


/* =========================
   Scroll Reveal
========================= */

const revealElements =
document.querySelectorAll(".reveal");

const revealObserver =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

},{
  threshold:0.12
});


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================
   Active Navigation Link
========================= */

const sections =
document.querySelectorAll("section[id]");

const navItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
    section.offsetTop - 150;

    if(window.scrollY >= sectionTop){

      current = section.getAttribute("id");

    }

  });


  navItems.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){

      link.classList.add("active");

    }

  });

});


/* =========================
   Portfolio V2 Enhancements
========================= */

const progressBar =
document.getElementById("scrollProgress");

const backToTop =
document.getElementById("backToTop");


window.addEventListener("scroll", () => {

  const max =
  document.documentElement.scrollHeight - window.innerHeight;

  progressBar.style.width =
  (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";

  backToTop.classList.toggle(
    "show",
    window.scrollY > 500
  );

});


backToTop.addEventListener("click", () =>

  window.scrollTo({
    top:0,
    behavior:"smooth"
  })

);


const roles = [
  "BCA Student",
  "Developer",
  "Cybersecurity Enthusiast",
  "Web Explorer",
  "Always Learning"
];

const typingText =
document.getElementById("typingText");

let roleIndex = 0,
    charIndex = 0,
    deleting = false;


function typeRole(){

  const role = roles[roleIndex];

  typingText.textContent =
    deleting
      ? role.slice(0, --charIndex)
      : role.slice(0, ++charIndex);

  let delay =
    deleting ? 45 : 80;


  if(!deleting && charIndex === role.length){

    deleting = true;
    delay = 1200;

  }

  else if(deleting && charIndex === 0){

    deleting = false;

    roleIndex =
      (roleIndex + 1) % roles.length;

    delay = 300;

  }


  setTimeout(typeRole, delay);

}


typeRole();


/* =========================
   Gallery / Lightbox
========================= */

const zoomables = [
  ...document.querySelectorAll(
    ".zoomable, .gallery-item img"
  )
];

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const lightboxCaption =
document.getElementById("lightboxCaption");

let currentImage = 0;


function showImage(index){

  currentImage =
    (index + zoomables.length) %
    zoomables.length;

  const img =
    zoomables[currentImage];

  lightboxImage.src =
    img.src;

  lightboxCaption.textContent =
    img.dataset.caption ||
    img.alt ||
    "";

}


function openLightbox(index){

  showImage(index);

  lightbox.classList.add("open");

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeLightbox(){

  lightbox.classList.remove("open");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


zoomables.forEach((img,index) => {

  img.addEventListener(
    "click",
    () => openLightbox(index)
  );

});


document
  .getElementById("lightboxClose")
  .addEventListener(
    "click",
    closeLightbox
  );


document
  .getElementById("lightboxPrev")
  .addEventListener(
    "click",
    () => showImage(currentImage - 1)
  );


document
  .getElementById("lightboxNext")
  .addEventListener(
    "click",
    () => showImage(currentImage + 1)
  );


lightbox.addEventListener("click", e => {

  if(e.target === lightbox){

    closeLightbox();

  }

});


document.addEventListener("keydown", e => {

  if(!lightbox.classList.contains("open"))
    return;


  if(e.key === "Escape")
    closeLightbox();


  if(e.key === "ArrowLeft")
    showImage(currentImage - 1);


  if(e.key === "ArrowRight")
    showImage(currentImage + 1);

});


/* =========================
   Animated Background Particles
========================= */

const canvas =
document.getElementById("particles");

const ctx =
canvas.getContext("2d");

let dots = [];


function resizeCanvas(){

  canvas.width =
    innerWidth * devicePixelRatio;

  canvas.height =
    innerHeight * devicePixelRatio;

  canvas.style.width =
    innerWidth + "px";

  canvas.style.height =
    innerHeight + "px";


  ctx.setTransform(
    devicePixelRatio,
    0,
    0,
    devicePixelRatio,
    0,
    0
  );


  dots =
    Array.from(
      {
        length:
          Math.min(
            55,
            Math.floor(innerWidth / 22)
          )
      },
      () => ({

        x: Math.random() * innerWidth,

        y: Math.random() * innerHeight,

        r: Math.random() * 1.5 + .4,

        vx: (Math.random() - .5) * .18,

        vy: (Math.random() - .5) * .18

      })
    );

}


function animateDots(){

  ctx.clearRect(
    0,
    0,
    innerWidth,
    innerHeight
  );


  ctx.fillStyle =
    "rgba(120,220,255,.35)";


  dots.forEach(d => {

    d.x += d.vx;
    d.y += d.vy;


    if(
      d.x < 0 ||
      d.x > innerWidth
    ){

      d.vx *= -1;

    }


    if(
      d.y < 0 ||
      d.y > innerHeight
    ){

      d.vy *= -1;

    }


    ctx.beginPath();

    ctx.arc(
      d.x,
      d.y,
      d.r,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });


  requestAnimationFrame(
    animateDots
  );

}


resizeCanvas();

animateDots();

window.addEventListener(
  "resize",
  resizeCanvas
);


/* =========================
   V3 Enhancements
========================= */

window.addEventListener("load", () => {

  setTimeout(
    () =>
      document
        .getElementById("pageLoader")
        ?.classList.add("hide"),
    350
  );

});


/* =========================
   Theme Toggle
========================= */

const themeBtn =
document.getElementById("themeBtn");

const themeIcon =
themeBtn?.querySelector("i");

const savedTheme =
localStorage.getItem(
  "portfolio-theme"
);


if(savedTheme === "light"){

  document.body.classList.add("light");

}


function syncThemeIcon(){

  if(!themeIcon)
    return;


  themeIcon.className =
    document.body.classList.contains("light")
      ? "fa-solid fa-sun"
      : "fa-solid fa-moon";

}


syncThemeIcon();


themeBtn?.addEventListener("click", () => {

  document.body.classList.toggle("light");


  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("light")
      ? "light"
      : "dark"
  );


  syncThemeIcon();

});


/* =========================
   Toast
========================= */

const toast =
document.getElementById("toast");


function showToast(message){

  if(!toast)
    return;


  toast.textContent =
    message;


  toast.classList.add("show");


  clearTimeout(
    window.__toastTimer
  );


  window.__toastTimer =
    setTimeout(
      () =>
        toast.classList.remove("show"),
      1800
    );

}


document
  .getElementById("shareBtn")
  ?.addEventListener(
    "click",
    async () => {

      const shareData = {

        title:
          document.title,

        text:
          "Check out Junaid Ahmed's portfolio.",

        url:
          location.href

      };


      try{

        if(navigator.share){

          await navigator.share(
            shareData
          );

        }

        else{

          await navigator.clipboard.writeText(
            location.href
          );

          showToast(
            "Portfolio link copied!"
          );

        }

      }

      catch(e){}

    }
  );


/* =========================
   Custom Cursor
========================= */

const cursor =
document.getElementById("customCursor");


if(
  cursor &&
  matchMedia("(pointer:fine)").matches
){

  window.addEventListener(
    "mousemove",
    e => {

      cursor.style.left =
        e.clientX + "px";

      cursor.style.top =
        e.clientY + "px";

    }
  );


  document
    .querySelectorAll(
      "a,button,.project-card,.skill-card,.gallery-item,.certificate-card"
    )
    .forEach(el => {

      el.addEventListener(
        "mouseenter",
        () =>
          cursor.classList.add("hover")
      );


      el.addEventListener(
        "mouseleave",
        () =>
          cursor.classList.remove("hover")
      );

    });

}


/* =========================
   Desktop Card Tilt
========================= */

if(
  matchMedia("(pointer:fine)").matches &&
  !matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
){

  document
    .querySelectorAll(
      ".project-card,.skill-card,.life-card"
    )
    .forEach(card => {


      card.addEventListener(
        "mousemove",
        e => {

          const r =
            card.getBoundingClientRect();


          const x =
            (e.clientX - r.left) /
              r.width -
            .5;


          const y =
            (e.clientY - r.top) /
              r.height -
            .5;


          card.style.transform =
            `perspective(800px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-4px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () =>
          card.style.transform = ""
      );

    });

}