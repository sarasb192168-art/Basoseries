const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const toast = document.getElementById("toast");

function openCategory(name){
  modalTitle.textContent = name;
  modal.classList.add("show");
}

function closeModal(e){
  if(!e || e.target === modal || e.target.classList.contains("close")){
    modal.classList.remove("show");
  }
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove("show"),2200);
}

function goToShop(){
  document.getElementById("shop").scrollIntoView({behavior:"smooth"});
  showToast("Welcome to Basoseries");
}

function toggleMenu(){
  const navbar = document.querySelector(".navbar");
  const menuButton = document.querySelector(".menu-btn");
  const isOpen = navbar.classList.toggle("nav-open");
  menuButton.setAttribute("aria-expanded",String(isOpen));
}

/* Navbar click + smooth scroll */
document.querySelectorAll("#main-nav a").forEach(link=>{
  link.addEventListener("click",()=>{
    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-btn");

    navbar.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded","false");
  });
});

/* Yellow line follows the section while scrolling */
const navLinks = document.querySelectorAll("#main-nav a");

const sections = [
  {id:"home",link:document.querySelector('#main-nav a[href="#home"]')},
  {id:"shop",link:document.querySelector('#main-nav a[href="#shop"]')},
  {id:"categories",link:document.querySelector('#main-nav a[href="#categories"]')},
  {id:"about",link:document.querySelector('#main-nav a[href="#about"]')},
  {id:"contact",link:document.querySelector('#main-nav a[href="#contact"]')}
];

function updateActiveNav(){
  const scrollPosition=window.scrollY+180;

  let current=sections[0];

  sections.forEach(section=>{
    const element=document.getElementById(section.id);

    if(element && scrollPosition>=element.offsetTop){
      current=section;
    }
  });

  navLinks.forEach(link=>link.classList.remove("active"));

  if(current.link){
    current.link.classList.add("active");
  }
}

window.addEventListener("scroll",updateActiveNav);
window.addEventListener("load",updateActiveNav);

/* Scroll reveal */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* Escape closes modal */
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") modal.classList.remove("show");
});

/* Fast custom cursor */
const cursor=document.querySelector(".cursor");
const cursorRing=document.querySelector(".cursor-ring");

if(cursor && cursorRing){

  document.addEventListener("mousemove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";

    cursorRing.style.left=e.clientX+"px";
    cursorRing.style.top=e.clientY+"px";
  });

}

/* Premium animated hero spotlight */
const hero=document.querySelector(".hero");

if(hero){

  hero.addEventListener("mousemove",e=>{
    const rect=hero.getBoundingClientRect();

    const x=((e.clientX-rect.left)/rect.width)*100;
    const y=((e.clientY-rect.top)/rect.height)*100;

    hero.style.setProperty("--spot-x",x+"%");
    hero.style.setProperty("--spot-y",y+"%");
  });

  hero.addEventListener("mouseenter",()=>{
    hero.style.setProperty("--spot-x","50%");
    hero.style.setProperty("--spot-y","50%");
  });

}