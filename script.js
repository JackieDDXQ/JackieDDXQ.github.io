const navItems = document.querySelectorAll('.nav-item');
const sections = ['hero-section', 'timeline-section', 'capabilities-section', 'projects-section', 'contact-section'];

navItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    if (index > 0 && index <= sections.length) {
      const targetSection = document.querySelector(`.${sections[index - 1]}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});



const btnPrimary = document.querySelector('.btn-primary');
if (btnPrimary) {
  btnPrimary.addEventListener('click', () => {
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

const btnSecondary = document.querySelector('.btn-secondary');
if (btnSecondary) {
  btnSecondary.addEventListener('click', () => {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const sections = document.querySelectorAll('section');
  
  let currentSection = 0;
  sections.forEach((section, index) => {
    if (section.offsetTop <= scrollPosition + 200) {
      currentSection = index;
    }
  });
  
  navItems.forEach((item, index) => {
    item.classList.remove('active');
  });
  
  if (currentSection < navItems.length - 1) {
    navItems[currentSection + 1].classList.add('active');
  } else {
    navItems[0].classList.add('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  
  setTimeout(() => {
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    });
  }, 100);
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease';
});