// Seiten-Umschaltung zwischen Home und Produkten
function switchPage(pageId) {
  const homeView = document.getElementById('view-home');
  const productsView = document.getElementById('view-products');
  const links = document.querySelectorAll('.nav-link');

  if (pageId === 'products') {
    homeView.classList.remove('active');
    productsView.classList.add('active');
    
    links.forEach(l => l.classList.remove('active'));
    links[1].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    productsView.classList.remove('active');
    homeView.classList.add('active');
    
    links.forEach(l => l.classList.remove('active'));
    links[0].classList.add('active');
  }
}

// Weiches Scrollen zu Abschnitten auf der Startseite
function scrollToSection(sectionId) {
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

// Bei Klick auf Eigenfertigungs-Möbel direkt zum Kontaktformular springen und Produkt eintragen
function scrollToContact(productName) {
  switchPage('home');
  setTimeout(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const textarea = document.querySelector('.contact-form textarea');
      if (textarea) {
        textarea.value = `Hallo Team Maison Müller in Oschatz,\n\nich interessiere mich für das Produkt "${productName}" und hätte dazu gerne nähere Informationen oder eine Beratung.`;
      }
    }
  }, 150);
}

// Produkt-Filterung (Alle / Eigenfertigung / Partner)
function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Echter E-Mail-Versand über deine Formspree-URL
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const data = new FormData(form);
  feedback.textContent = 'Ihre Nachricht wird versendet...';

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      feedback.textContent = 'Vielen Dank! Ihre Anfrage an Maison Müller (Oschatz) wurde erfolgreich gesendet.';
      form.reset();
    } else {
      feedback.textContent = 'Fehler beim Senden. Bitte versuchen Sie es erneut.';
    }
  } catch (error) {
    feedback.textContent = 'Fehler beim Senden. Bitte überprüfen Sie Ihre Internetverbindung.';
  }
});