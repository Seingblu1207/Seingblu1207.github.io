// Select all the elements at the start 
let search = document.querySelector('.search-box');
const HomeBtn = document.querySelector('#HomeBtn');
const AcercaBtn = document.querySelector('#AcercaBtn');
const ServiciosBtn = document.querySelector('#ServiciosBtn');
const ContactosBtn = document.querySelector('#ContactosBtn');
const BlogBtn = document.querySelector('#BlogBtn');
const ClientesBtn = document.querySelector('#ClientesBtn');

const homeSection = document.querySelector('#Home');
const aboutSection = document.querySelector('#About');
const ServicesSection = document.querySelector('#Services');
const ContactosSection = document.querySelector('#Contacts');
const blogSection = document.querySelector('#Home');
const ClientesSection = document.querySelector('#Home');

// Attach click handlers to all the elements 
// adds a toggle class of active to the search element on click of #HomeBtn 
HomeBtn.onclick = () => {
  search.classList.toggle('active');
  window.scrollTo({
    top: homeSection.offsetTop,
    behavior: 'smooth'
  });
};

// Smooth scroll to aboutSection on click of #ContactosBtn 
ContactosBtn.onclick = () => {
  window.scrollTo({
    top: aboutSection.offsetTop,
    behavior: 'smooth'
  });
};

// Smooth scroll to ServicesSection on click of #ServiciosBtn 
ServiciosBtn.onclick = () => {
  window.scrollTo({
    top: ServicesSection.offsetTop,
    behavior: 'smooth'
  });
};

//Smooth scroll to blogSection on click of #BlogBtn 
BlogBtn.onclick = () => {
  window.scrollTo({
    top: blogSection.offsetTop,
    behavior: 'smooth'
  });
};

// Smooth scroll to AcercaSection on click of #AcercaBtn 
AcercaBtn.onclick = () => {
  window.scrollTo({
    top: AcercaSection.offsetTop,
    behavior: 'smooth'
  });
};

//Smooth scroll to ClientesSection on click of #ClientesBtn 
ClientesBtn.onclick = () => {
  window.scrollTo({
    top: ClientesSection.offsetTop,
    behavior: 'smooth'
  });
}; 
